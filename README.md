# CertiGen Pro

**A professional certificate generation and automation platform.** Upload your own certificate templates (images or PDFs), customize text placement with drag-and-drop, and generate batch certificates with automated email delivery.

---

## ✨ Features

- **📄 Custom Templates** - Upload any certificate template (PNG, JPG, PDF)
- **🎨 Visual Editor** - Drag-and-drop text placement with live preview
- **✍️ Full Typography Control** - 15+ fonts, colors, sizes, alignment
- **🔄 Dynamic Variables** - Use `{name}`, `{course}`, `{date}`, `{email}`
- **👥 Batch Processing** - Generate certificates for unlimited recipients
- **📊 CSV/Excel Import** - Bulk import recipient data
- **📧 Email Delivery** - Automated SMTP email distribution
- **💾 Save Templates** - Export/import template configurations as JSON
- **📱 PDF Support** - Automatic PDF to image conversion
- **🎯 High Quality** - Print-ready PDF and PNG exports

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
- Course Name (`{course}`)
- Date (`{date}`)

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
{name}   → Recipient's full name
{course} → Course or program name
{date}   → Date of issuance
{email}  → Recipient's email address
{custom} → Custom field (if in CSV)
```

**Add/Remove Elements:**
- Click **"Add Text"** to create new element
- Click trash icon to delete element

---

### 3. Add Recipients

#### Option A: Manual Entry

1. Go to **Recipients** tab
2. Fill in the form:
   - Name (required)
   - Email
   - Course/Program
   - Date
3. Click **"Add Recipient"**

#### Option B: CSV/Excel Import

1. Prepare spreadsheet with columns: `name`, `email`, `course`, `date`

**Example CSV:**
```csv
name,email,course,date
"John Doe","john@example.com","Web Development","January 15, 2027"
"Jane Smith","jane@example.com","Data Science","January 15, 2027"
```

2. Click **"Import CSV/Excel"**
3. Select your file
4. Recipients appear in list

**Download Template CSV:**
- Click download icon to export current list as template

---

### 4. Generate Certificates

#### Option A: Download ZIP

1. Go to **Delivery** tab
2. Choose **Export Format:**
   - **PDF** - Best for printing and professional use
   - **PNG** - Image format for web/social media
3. Select **"Download ZIP"** mode
4. Click **"Generate & Download"**
5. Wait for processing (progress shown)
6. ZIP file downloads automatically

#### Option B: Email Delivery

**Setup (First Time Only):**

1. Get SMTP credentials:
   - **Gmail:** Enable 2FA → Generate App Password ([instructions](https://support.google.com/accounts/answer/185833))
   - **Outlook/Others:** Use account password or app-specific password

2. Go to **Delivery** tab
3. Select **"Email"** mode
4. Enter credentials:
   - **Email Username:** your-email@gmail.com
   - **App Password:** Your generated app password

**Customize Email:**
- **Subject:** `Congratulations {name}! Your {course} Certificate`
- **Message:** Use variables in email body

**Send:**
1. Click **"Send Certificates"**
2. Certificates emailed to each recipient
3. Backup ZIP also downloads

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

## � CSV Format Reference

### Required Columns

```csv
name,email,course,date
```

### Optional Columns

```csv
name,email,course,date,customField
```

### Example with All Fields

```csv
name,email,course,date,customField
"Alexandra Chen","alex@university.edu","Machine Learning","October 15, 2026","Honors"
"David Vance","david@company.org","Leadership","October 15, 2026","Executive Track"
"Emily Rose","emily@institute.com","UX Design","October 15, 2026","Distinction"
```

### Tips

- Use quotes for names with commas
- Date format: Any readable format (e.g., "January 1, 2027" or "2027-01-01")
- Email is optional if only downloading certificates
- Custom field can be used with `{custom}` variable

---

## 🔧 Technical Details

### Built With

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **PDF Processing:** PDF.js (Mozilla)
- **Image Export:** modern-screenshot, jsPDF
- **Email:** Nodemailer (SMTP)

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
- ✅ **SMTP only** - Email credentials used only for sending
- ✅ **No tracking** - No analytics or data collection
- ✅ **Local storage** - Templates stored in browser memory only

### Email Security

- Use **App Passwords**, never account passwords
- Credentials stored in memory only (not saved)
- TLS/SSL encryption for email transmission
- No credential storage between sessions

### Recommendations

- Test email with 1-2 recipients first
- Keep recipient data secure (CSV files)
- Use strong app passwords
- Review recipient list before bulk send

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

### Email Delivery Issues

**Issue:** Emails not sending

**Solutions:**
- **Gmail:** Ensure 2FA enabled and using App Password (not account password)
- **SMTP:** Verify credentials are correct
- **Limits:** Gmail limit is ~500 emails/day
- **Test:** Send to yourself first to verify setup
- **Spam:** Ask recipients to check spam folders

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
- Standardize date formats
- Verify email addresses are valid
- Include all required fields
- Keep original CSV as backup
- Test import with small sample first

### Email Delivery

- Send test batch (5-10) before full batch
- Personalize subject line with variables
- Keep message professional and concise
- Include certificate as attachment (automatic)
- Stay within provider email limits
- Send during business hours for better delivery

### Performance

- Close unnecessary browser tabs
- Process large batches in chunks (100-200 at a time)
- Use PDF format for smaller file sizes
- Generate overnight for very large batches
- Save progress by exporting CSV at intervals

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
→ Choose delivery mode (Download or Email)
→ Configure email if needed
→ Click Generate
→ Wait for batch processing
→ Download ZIP file
→ Verify random samples
```

**4. Distribution (if email)**
```
→ Certificates automatically sent
→ Backup ZIP downloaded
→ Monitor email logs
→ Follow up with bounced emails
→ Respond to recipient questions
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
