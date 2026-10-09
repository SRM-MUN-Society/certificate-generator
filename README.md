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

## 🎨 Design Tips

### Template Preparation

**For Images:**
- **Resolution:** Minimum 1920×1080px (higher = better)
- **Format:** PNG or JPG
- **Orientation:** Landscape or portrait
- **Design Space:** Leave blank areas for text

**For PDFs:**
- **Pages:** First page only (multi-page PDFs supported)
- **Quality:** 300 DPI or higher recommended
- **File Size:** Under 10MB for best performance
- **Processing:** Converts automatically in 2-10 seconds

### Text Positioning

**Shortcuts:**
- **Center:** X = 50%, Y = your choice
- **Left edge:** X = 10-15%
- **Right edge:** X = 85-90%
- **Top area:** Y = 15-25%
- **Bottom area:** Y = 75-85%

### Font Selection

**15 Available Fonts:**

**System Font:**
- SF Pro (Apple) - Mac/iOS native, clean modern

**Serif (Traditional):**
- Cinzel - Classic formal
- Playfair Display - Elegant sophisticated
- Cormorant Garamond - Editorial
- Lora - Readable body text

**Script (Elegant):**
- Great Vibes - Calligraphy
- Alex Brush - Formal cursive
- Dancing Script - Flowing
- Satisfy - Modern brush
- Pacifico - Playful

**Sans-Serif (Modern):**
- Inter - Technical clean
- Montserrat - Geometric
- Roboto - Universal
- Open Sans - Friendly
- DM Sans - Contemporary

**Font Pairing Examples:**

**Classic Professional:**
```
Title: Cinzel Bold (48px)
Name: Alex Brush (56px)
Body: Cormorant Garamond (18px)
```

**Modern Tech:**
```
Title: SF Pro Bold (48px)
Name: Great Vibes (56px)
Body: Inter Regular (18px)
```

**Contemporary Clean:**
```
Title: Montserrat Bold (48px)
Name: Dancing Script (60px)
Body: Open Sans (18px)
```

### Typography Guidelines

**Font Sizes:**
- **Title:** 40-60px
- **Recipient Name:** 50-70px
- **Body Text:** 16-24px
- **Date/Small Text:** 14-18px

**Best Practices:**
- Use 2-3 fonts maximum
- Contrast fonts for hierarchy (serif + sans, script + sans)
- Ensure text color contrasts with background
- Test with longest/shortest names in your list

---

## 📊 CSV Format Reference

### Simple Format - Just Names!

The simplest possible format. Just list names, one per line:

```
Alexandra Chen
David K. Vance
Emily Sophia Rose
Michael Rodriguez
Sarah Johnson
```

**That's it!** No headers, no commas, no special formatting needed.

---

### Optional: With Header

If you prefer, add a "Name" header:

```
Name
Alexandra Chen
David K. Vance
Emily Sophia Rose
```

Both formats work identically.

---

### Works With:
- ✅ **Plain text files** (.txt, .csv)
- ✅ **Excel files** (.xlsx, .xls)
- ✅ **Google Sheets** (export as CSV)
- ✅ **Copy/paste** from anywhere

### Tips:
- One name per line
- No special characters needed
- Works with any text editor
- Copy names from emails, documents, websites
- Perfect for quick certificate generation

---

## 🔧 Technical Details

### Built With

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **PDF Processing:** PDF.js (Mozilla)
- **Image Export:** modern-screenshot, jsPDF
- **File Packaging:** JSZip

### System Requirements

- **Node.js:** v16 or higher
- **Browser:** Chrome, Firefox, Safari, Edge (latest)
- **RAM:** 4GB minimum, 8GB recommended for large batches
- **Storage:** ~100MB for application

### Performance

- **Template Upload:** Instant (images), 2-10 sec (PDFs)
- **Certificate Generation:** 2-5 seconds per certificate
- **Batch Processing:** 100 certificates in ~5 minutes
- **Export Quality:** 2x rendering for high-quality output

### File Sizes

- **Template Images:** Recommend < 5MB
- **Template PDFs:** Recommend < 10MB
- **Output PDFs:** ~100-500KB each
- **Output PNGs:** ~200KB-2MB each (depends on template)

### Browser Support

| Browser | Status |
|---------|--------|
| Chrome | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| Edge | ✅ Full support |
| Mobile | ⚠️ Limited (drag-and-drop may be awkward) |

---

## 🛡️ Security & Privacy

### Data Privacy

- ✅ **Client-side processing** - All template editing in browser
- ✅ **No server uploads** - Templates stay on your device
- ✅ **Local storage** - Templates stored in browser memory only
- ✅ **No tracking** - No analytics or data collection
- ✅ **Privacy-first** - Your data never leaves your device

### Recommendations

- Test generation with 1-2 recipients first
- Keep recipient data secure (CSV files)
- Review recipient list before bulk generation

---

## 📝 Common Use Cases

### Educational Institutions
- Course completion certificates
- Graduation diplomas
- Training certifications
- Academic achievements

### Corporate Training
- Employee training programs
- Professional development
- Compliance certifications
- Onboarding completion

### Online Courses
- MOOC completions
- Bootcamp certificates
- Skill-based certifications
- Workshop participation

### Events & Conferences
- Attendance certificates
- Speaker recognition
- Sponsor acknowledgment
- Participation awards

### Professional Certifications
- Industry credentials
- Skill validation
- License certifications
- Membership certificates

---

## 🐛 Troubleshooting

### Template Won't Upload

**Issue:** File upload fails

**Solutions:**
- Check file is valid image (PNG, JPG) or PDF
- Ensure file size < 10MB
- Try different file format
- Refresh page and try again

### PDF Conversion Hangs

**Issue:** "Converting PDF..." doesn't complete

**Solutions:**
- Wait longer (complex PDFs take 10-15 seconds)
- Reduce PDF file size/complexity
- Try exporting PDF at lower quality
- Refresh and try simpler PDF first

### Text Not Showing

**Issue:** Text element invisible in preview

**Solutions:**
- Check position (X/Y should be 0-100%)
- Verify text color contrasts with background
- Increase font size
- Click element to select and reposition

### Export/Generation Fails

**Issue:** Certificate generation errors

**Solutions:**
- Ensure template is uploaded
- Verify at least one recipient exists
- Check browser console for errors
- Try generating single certificate first
- Close other browser tabs (free up memory)

### Font Not Rendering

**Issue:** Font looks different than expected

**Solutions:**
- **SF Pro:** Only available on Mac/iOS, uses fallback elsewhere
- **Web Fonts:** Check internet connection
- **Preview:** Font may differ in export vs preview
- **Try Different:** Use widely-supported font like Inter

---

## 💡 Tips & Best Practices

### Before Generating Batch

1. ✅ Upload and verify template looks good
2. ✅ Add one test recipient
3. ✅ Generate single certificate
4. ✅ Verify all text appears correctly
5. ✅ Check fonts and colors in PDF/PNG
6. ✅ Test with longest name in your list
7. ✅ Save template configuration

### Template Design

- Use high-resolution source files (2000px+ width)
- Leave ample space for text (especially long names)
- Choose contrasting colors for text
- Test both light and dark text colors
- Include brand elements in template image
- Design for your target page size (Letter, A4, etc.)

### Recipient Data

- Clean data before import (remove duplicates)
- Verify names are correctly formatted
- Keep original CSV as backup
- Test import with small sample first

### Performance

- Close unnecessary browser tabs
- Process large batches in chunks (100-200 at a time)
- Use PDF format for smaller file sizes
- Generate overnight for very large batches

---

## 🎓 Example Workflow

### Complete Certificate Generation Process

**1. Design Phase (15 minutes)**
```
→ Create certificate template in Canva/Illustrator
→ Export as PDF or high-res PNG
→ Upload to CertiGen Pro
→ Add text elements for name, course, date
→ Choose fonts and colors
→ Position elements with drag-and-drop
→ Preview with sample name
→ Save template configuration
```

**2. Data Preparation (5 minutes)**
```
→ Export recipient list from LMS/spreadsheet
→ Format as CSV with required columns
→ Clean data (remove duplicates, fix typos)
→ Verify email addresses
→ Import to CertiGen Pro
→ Preview 2-3 certificates to verify
```

**3. Generation (10 minutes for 100)**
```
→ Select export format (PDF recommended)
→ Click Generate & Download ZIP
→ Wait for batch processing
→ Download ZIP file
→ Verify random samples
→ Distribute certificates as needed
```

**Total Time: ~30 minutes for complete process**

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with React and TypeScript
- PDF processing powered by PDF.js (Mozilla)
- Font loading via Google Fonts
- Icons by Lucide React
- Export engine: modern-screenshot, jsPDF

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check troubleshooting section above
- Review example files: `sample-recipients.csv`, `sample-template-config.json`

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

Create `.env` file (optional):
```
PORT=3000
NODE_ENV=production
```

### Build Output

```
dist/
  ├── index.html          # Frontend entry
  ├── assets/             # JS, CSS bundles
  └── server.cjs          # Express server
```

---

**Made with ❤️ for automated certificate generation**

**Start creating professional certificates in minutes!** 🎓✨
