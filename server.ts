import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Set up body parsers with generous limits for base64 certificate attachments
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Native Node.js SMTP email dispatch handler
  app.post("/api/send-certificates", async (req: express.Request, res: express.Response) => {
    try {
      const { emailUser, emailKey, subject, messageTemplate, recipients } = req.body || {};

      if (!emailUser || !emailKey) {
        return res.status(400).json({ error: "Sender email username and API key/App Password are required." });
      }

      if (!Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({ error: "Recipient list with certificate data is required." });
      }

      const isGmail = emailUser.toLowerCase().endsWith("@gmail.com");

      // Configure SMTP transporter
      const transporter = nodemailer.createTransport(
        isGmail
          ? {
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: emailUser,
                pass: emailKey,
              },
            }
          : {
              host: "smtp.gmail.com",
              port: 587,
              secure: false,
              auth: {
                user: emailUser,
                pass: emailKey,
              },
            }
      );

      const results: Array<{ email: string; name: string; status: "success" | "failed"; error?: string }> = [];

      for (const r of recipients) {
        if (!r || !r.email) {
          results.push({
            email: r?.email || "unknown",
            name: r?.name || "Unknown",
            status: "failed",
            error: "Missing email address",
          });
          continue;
        }

        const recipientName = r.name || "Recipient";
        const recipientCourse = r.course || "Program";
        const recipientDate = r.date || new Date().toLocaleDateString();

        const sub = (subject || "Certificate of Completion")
          .replaceAll("{name}", recipientName)
          .replaceAll("{course}", recipientCourse);

        const defaultBody =
          "Hello {name},\n\nPlease find attached your Certificate of Completion for {course}.\n\nBest regards,\nCertiGen Pro";
        const bodyText = (messageTemplate || defaultBody)
          .replaceAll("{name}", recipientName)
          .replaceAll("{course}", recipientCourse)
          .replaceAll("{date}", recipientDate);

        try {
          const attachments = [];
          if (r.fileData) {
            const match = typeof r.fileData === "string" ? r.fileData.match(/^data:(.+);base64,(.+)$/) : null;
            const fname = r.fileName || `certificate_${recipientName.replace(/\s+/g, "_")}.pdf`;

            if (match) {
              const buffer = Buffer.from(match[2], "base64");
              attachments.push({
                filename: fname,
                content: buffer,
                contentType: match[1],
              });
            } else {
              attachments.push({
                filename: fname,
                path: r.fileData,
              });
            }
          }

          await transporter.sendMail({
            from: `CertiGen Pro <${emailUser}>`,
            to: r.email,
            subject: sub,
            text: bodyText,
            attachments,
          });

          results.push({
            email: r.email,
            name: recipientName,
            status: "success",
          });
        } catch (mailErr: any) {
          console.error(`Failed to email ${r.email}:`, mailErr);
          results.push({
            email: r.email,
            name: recipientName,
            status: "failed",
            error: mailErr?.message || "Failed to send email",
          });
        }
      }

      const total = results.length;
      const succeeded = results.filter((x) => x.status === "success").length;
      const failed = total - succeeded;

      return res.json({
        success: true,
        summary: {
          total,
          succeeded,
          failed,
        },
        details: results,
      });
    } catch (err: any) {
      console.error("Email send endpoint error:", err);
      return res.status(500).json({
        error: "Failed to process email dispatch request",
        details: err?.message || String(err),
      });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
