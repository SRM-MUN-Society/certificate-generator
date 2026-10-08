import { CustomTemplate, TextElement } from "./types";

export const POPULAR_FONTS = [
  { name: "SF Pro (Apple System Font)", value: "SF Pro Display, SF Pro Text, -apple-system, system-ui, sans-serif" },
  { name: "Cinzel (Classic Roman)", value: "Cinzel" },
  { name: "Cormorant Garamond (Editorial Serif)", value: "Cormorant Garamond" },
  { name: "Playfair Display (Elegant Serif)", value: "Playfair Display" },
  { name: "Great Vibes (Calligraphy Script)", value: "Great Vibes" },
  { name: "Alex Brush (Formal Cursive)", value: "Alex Brush" },
  { name: "Satisfy (Modern Brush)", value: "Satisfy" },
  { name: "Montserrat (Clean Sans)", value: "Montserrat" },
  { name: "Inter (Modern Technical UI)", value: "Inter" },
  { name: "DM Sans (Geometric Sans)", value: "DM Sans" },
  { name: "Pacifico (Playful Handwriting)", value: "Pacifico" },
  { name: "Roboto (Modern Sans)", value: "Roboto" },
  { name: "Open Sans (Friendly Sans)", value: "Open Sans" },
  { name: "Lora (Elegant Serif)", value: "Lora" },
  { name: "Dancing Script (Flowing Script)", value: "Dancing Script" },
];

export const DEFAULT_EMAIL_SETTINGS = {
  emailUser: "",
  emailKey: "",
  subject: "Congratulations {name}! Your Certificate for {course} is ready",
  messageTemplate: `Dear {name},

Congratulations on completing the {course}!

We are delighted to present you with your official Certificate of Completion. You can find your certified document attached to this email.

Details:
- Recipient: {name}
- Program: {course}
- Date of Issuance: {date}

We wish you the absolute best in your future endeavors. Keep up the amazing work!

Best regards,
The CertiGen Pro Team`
};

// Default text elements for a new template
export const createDefaultTextElements = (): TextElement[] => [
  {
    id: `elem-${Date.now()}-1`,
    label: "Certificate Title",
    placeholder: "CERTIFICATE OF ACHIEVEMENT",
    text: "CERTIFICATE OF ACHIEVEMENT",
    x: 50,
    y: 20,
    fontSize: 48,
    fontFamily: "Cinzel",
    color: "#1a1208",
    bold: true,
    italic: false,
    uppercase: true,
    textAlign: "center",
  },
  {
    id: `elem-${Date.now()}-2`,
    label: "Recipient Name",
    placeholder: "{name}",
    text: "{name}",
    x: 50,
    y: 45,
    fontSize: 56,
    fontFamily: "Great Vibes",
    color: "#1e293b",
    bold: false,
    italic: false,
    uppercase: false,
    textAlign: "center",
  },
  {
    id: `elem-${Date.now()}-3`,
    label: "Course Name",
    placeholder: "{course}",
    text: "{course}",
    x: 50,
    y: 60,
    fontSize: 28,
    fontFamily: "Playfair Display",
    color: "#0f172a",
    bold: true,
    italic: false,
    uppercase: false,
    textAlign: "center",
  },
  {
    id: `elem-${Date.now()}-4`,
    label: "Date",
    placeholder: "{date}",
    text: "{date}",
    x: 50,
    y: 75,
    fontSize: 18,
    fontFamily: "Inter",
    color: "#64748b",
    bold: false,
    italic: false,
    uppercase: false,
    textAlign: "center",
  },
];
