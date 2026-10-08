# CertiGen Pro — Custom Certificate Designer & Automator

**CertiGen Pro** is a full-featured web application designed to create, customize, and bulk-generate print-ready certificates with automated email distribution. Built with React and Node.js/Express, it streamlines the certification workflow from visual layout design to mass issuance.

---

## ✨ Features

- **🎨 Custom Template Upload:** Upload your own certificate template images (PNG, JPG) or PDF files - no pre-built templates required!
- **📄 PDF Support:** Convert PDF templates to high-quality images automatically for text overlay
- **🖱️ Drag & Drop Text Placement:** Click and drag text elements anywhere on your template with pixel-perfect positioning
- **✍️ Full Typography Control:** Customize font family, size, color, weight, alignment, and styling for each text element
- **📝 Dynamic Placeholders:** Use `{name}`, `{course}`, `{date}`, and `{email}` variables that auto-populate from recipient data
- **💾 Save & Load Templates:** Export template configurations as JSON files for reuse across projects
- **👥 Dynamic Dataset & Preview:** Switch between recipients instantly with the interactive live preview
- **📊 Bulk CSV / Excel Import:** Manage and review multiple recipients with easy spreadsheet import
- **📧 Automated Email Dispatch:** Built-in SMTP gateway support to bulk-email certificates directly to recipients
- **📄 Print-Ready Export:** High-quality PDF or PNG output with customizable dimensions

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Mail Gateway:** Nodemailer / SMTP Service
- **Export Engine:** modern-screenshot, jsPDF
- **Hosting / Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Deehan123/certigen-pro.git
   cd certigen-pro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

---

## 📖 How to Use

### 1. Upload Your Template

1. Click the **"Upload Template (Image or PDF)"** button in the Template tab
2. Select your certificate template:
   - **Image formats:** PNG, JPG, JPEG, GIF, WEBP
   - **PDF format:** First page will be converted to high-quality image
3. The template will load with default text elements

### 2. Customize Text Elements

1. Click on any text element in the preview to select it
2. Use the **Typography** tab to customize:
   - Text content (use `{name}`, `{course}`, `{date}` for dynamic data)
   - Font family, size, and color
   - Bold, italic, and uppercase styling
   - Text alignment (left, center, right)
3. **Drag text elements** directly on the preview to reposition them
4. Use the position sliders for precise X/Y positioning

### 3. Add or Remove Text Elements

- Click **"Add Text"** to create new text elements
- Click the trash icon on any element to delete it
- Each element can be independently positioned and styled

### 4. Manage Recipients

1. Go to the **Recipients** tab
2. **Import from CSV/Excel:**
   - Click "Import CSV/Excel"
   - File should have columns: `name`, `email`, `course`, `date`
3. **Add manually:**
   - Fill in the form and click "Add Recipient"
4. Click on any recipient to preview their certificate

### 5. Generate Certificates

1. Go to the **Delivery** tab
2. Choose export format (PDF or PNG)
3. Select delivery mode:
   - **Download ZIP:** Generates all certificates in a ZIP file
   - **Email:** Sends certificates directly to recipients (requires SMTP setup)
4. Click **"Generate & Download"** or **"Send Certificates"**

### 6. Save Your Template

- Click **"Save Config"** to download your template configuration as JSON
- Use **"Load Config"** to reload a saved template configuration
- Template configurations include all text elements and their styling

---

## 🎯 Use Cases

- **Educational Institutions:** Graduation certificates, course completion
- **Corporate Training:** Professional development certificates
- **Events & Conferences:** Attendance and participation certificates
- **Workshops:** Skill-based certification
- **Awards & Recognition:** Achievement and excellence awards

---

## 📧 Email Setup (Optional)

To use the email delivery feature:

1. Set up an SMTP-compatible email account (Gmail, Outlook, etc.)
2. Generate an App Password (for Gmail: https://myaccount.google.com/apppasswords)
3. In the Delivery tab, enter:
   - Email Username (your email address)
   - App Password/Key
   - Customize the email subject and message template

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with React and TypeScript
- Powered by modern-screenshot and jsPDF
- Icons by Lucide React

---

**Made with ❤️ for certificate automation**
