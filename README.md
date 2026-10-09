# CertiGen Pro

**A professional certificate generation and automation platform.** Upload your own certificate templates (images or PDFs), customize text placement with drag-and-drop, and generate batch certificates with ZIP download export.

---

## ✨ Features

- **📄 Custom Templates** - Upload any certificate template (PNG, JPG, PDF)
- **🎨 Visual Editor** - Drag-and-drop text placement with live preview
- **✍️ Full Typography Control** - 15+ fonts, colors, sizes, alignment
- **🔄 Dynamic Variables** - Use `{name}` for recipient names
- **👥 Batch Processing** - Generate certificates for unlimited recipients
- **📊 CSV/Excel Import** - Bulk import recipient data
- **💾 Save Templates** - Export/import template configurations as JSON
- **📱 PDF Support** - Automatic PDF to image conversion
- **🎯 High Quality** - Print-ready PDF and PNG exports
- **📦 ZIP Export** - Download all certificates in one file

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/certigen-pro.git
cd certigen-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

---

## 📖 How to Use

### 1. Upload Your Template

**Step 1:** Click the **Template** tab

**Step 2:** Click **"Upload Template (Image or PDF)"**

**Step 3:** Select your certificate background file:
- **Images:** PNG, JPG, JPEG, GIF, WEBP
- **PDF:** First page auto-converts to image (2-5 seconds)

**Result:** Template loads with 4 default text elements

---

### 2. Customize Text Elements

**Default Elements:**
- Certificate Title
- Recipient Name (`{name}`)

**To Customize:**

1. **Select Element:**
   - Click text in preview OR
   - Click in element list (left panel)

2. **Edit Typography (Typography Tab):**
   - **Text Content:** Enter text or use variables
   - **Font:** Choose from 15 professional fonts
   - **Size:** Adjust with slider (10-120px)
   - **Color:** Pick any color
   - **Style:** Bold, italic, uppercase
   - **Alignment:** Left, center, right

3. **Position Text:**
   - **Drag & Drop:** Click and drag text in preview
   - **Fine-tune:** Use X/Y sliders for precision

**Dynamic Variables:**
```
{name} → Recipient's name
```

**Add/Remove Elements:**
- Click **"Add Text"** to create new element
- Click trash icon to delete element

---

### 3. Add Recipients

#### Option A: Manual Entry

1. Go to **Recipients** tab
2. Enter recipient name
3. Click **"Add Recipient"**

#### Option B: CSV/Excel Import

**Simple Format - Just Names!**

```csv
Alexandra Chen
David K. Vance
Emily Sophia Rose
```

*That's it! One name per line.*

**Optional: With Header**
```csv
Name
Alexandra Chen
David K. Vance
```

**Import Steps:**
1. Click **"Import CSV/Excel"**
2. Select your file (text list or spreadsheet)
3. Recipients appear instantly

**Download Template:**
- Click download icon to export current list

---

### 4. Generate Certificates

1. Go to **Delivery** tab
2. Choose **Export Format:**
   - **PDF** - Best for printing and professional use
   - **PNG** - Image format for web/social media
3. Click **"Generate & Download ZIP"**
4. Wait for processing (progress modal shows status)
5. ZIP file downloads automatically with all certificates

---

### 5. Save Your Template

**Save Configuration:**
1. After designing, click **"Save Config"**
2. JSON file downloads with all settings
3. Saves: text elements, positions, fonts, colors

**Load Configuration:**
1. Click **"Load Config"**
2. Select previously saved JSON file
3. Template restored instantly

**Benefits:**
- Reuse templates for future batches
- Share templates with team members
- Maintain consistent branding

---

## 🔧 Technical Details

### Built With

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **PDF Processing:** PDF.js (Mozilla)
- **Image Export:** modern-screenshot, jsPDF
- **File Packaging:** JSZip

---

**Made with ❤️ for automated certificate generation**