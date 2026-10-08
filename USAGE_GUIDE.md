# CertiGen Pro - Usage Guide

## Quick Start Guide

### Step 1: Upload Your Certificate Template

1. **Prepare your template image or PDF:**
   - **Image formats:** PNG, JPG, JPEG, GIF, WEBP
   - **PDF format:** Single-page or multi-page (first page will be used)
   - Recommended dimensions: 1920×1080px (landscape) or 1080×1920px (portrait)
   - Higher resolution = better quality output
   - Leave space for text elements

2. **Upload the template:**
   - Click the **"Template"** tab
   - Click **"Upload Template (Image or PDF)"**
   - Select your certificate background file
   - **If PDF:** Wait for automatic conversion to image (takes a few seconds)
   - **If Image:** Wait for template to load in the preview

### Step 2: Customize Text Elements

The app comes with 4 default text elements. You can customize, add, or remove them:

#### Editing Text Elements:

1. **Select an element:**
   - Click on any text element in the list (left panel)
   - Or click directly on the text in the preview

2. **Switch to Typography tab:**
   - Customize all text properties:
     - **Label:** Internal name for the element
     - **Text Content:** The actual text or use dynamic variables
     - **Font Family:** Choose from 14+ premium fonts
     - **Font Size:** Adjust with slider (10-120px)
     - **Color:** Pick any color using color picker
     - **Text Align:** Left, Center, or Right
     - **Style:** Bold, Italic, or UPPERCASE

3. **Position the text:**
   - **Drag & Drop:** Click and drag text elements in the preview
   - **Sliders:** Use X/Y position sliders for precise placement
   - **Percentage-based:** 0-100% for both axes (50% = center)

#### Dynamic Variables:

Use these placeholders in your text content to auto-populate from recipient data:

- `{name}` - Recipient's full name
- `{course}` - Course or program name
- `{date}` - Date of issuance
- `{email}` - Recipient's email address
- `{custom}` - Custom field (if provided in CSV)

**Example:**
```
Text: "Presented to {name} for completing {course}"
Result: "Presented to Alexandra Chen for completing Advanced Machine Learning"
```

#### Adding/Removing Elements:

- **Add New:** Click **"Add Text"** button → New element appears at center
- **Remove:** Click trash icon next to any element

### Step 3: Manage Recipients

#### Manual Entry:

1. Go to **Recipients** tab
2. Fill in the form:
   - Name (required)
   - Email
   - Course/Program
   - Date
3. Click **"Add Recipient"**

#### CSV/Excel Import:

1. Prepare a spreadsheet with these columns:
   ```
   name,email,course,date
   ```

2. Example CSV:
   ```csv
   name,email,course,date
   "John Doe","john@example.com","Web Development","October 8, 2026"
   "Jane Smith","jane@example.com","Data Science","October 8, 2026"
   ```

3. Click **"Import CSV/Excel"**
4. Select your file
5. Recipients will appear in the list

#### Managing Recipients:

- **Preview:** Click any recipient to see their certificate in the preview
- **Delete:** Click trash icon to remove individual recipients
- **Clear All:** Click "Clear All" to remove entire list
- **Export:** Click download icon to export current list as CSV

### Step 4: Save Your Template Configuration

1. After customizing your template, click **"Save Config"**
2. A JSON file downloads with all your settings:
   - Text elements and their properties
   - Positions, fonts, colors
   - Template dimensions
3. **Load Later:** Use **"Load Config"** to restore your template

**Benefits:**
- Reuse templates for future batches
- Share templates with colleagues
- Back up your designs

### Step 5: Generate Certificates

#### Choose Export Settings:

1. Go to **Delivery** tab
2. **Export Format:**
   - **PDF:** Best for printing, email attachments
   - **PNG:** Image format, good for web display

3. **Delivery Mode:**
   - **Download ZIP:** All certificates packaged together
   - **Email:** Sends certificates directly to recipients

#### Download ZIP:

1. Select **"Download ZIP"** mode
2. Choose export format (PDF/PNG)
3. Click **"Generate & Download"**
4. Wait for processing (progress shown in modal)
5. ZIP file downloads automatically

#### Email Delivery:

1. Select **"Email"** mode
2. Enter SMTP credentials:
   - **Email Username:** Your email address
   - **App Password:** Generate from your email provider
     - Gmail: https://myaccount.google.com/apppasswords
     - Outlook: Use account password or app password
3. Customize email:
   - **Subject:** Use variables like `{name}`, `{course}`
   - **Message Template:** Personalized message body
4. Click **"Send Certificates"**
5. Certificates are emailed + backup ZIP downloads

## Tips & Best Practices

### Template Design:

1. **File Formats:** 
   - **Images:** PNG, JPG, JPEG, GIF, WEBP
   - **PDF:** Automatically converted to high-quality image
   - PDF templates are rendered at 2x scale for maximum quality
2. **Resolution:** Use at least 1920×1080px for crisp output
3. **Safe Zones:** Leave 100-150px margins for text elements
4. **Contrast:** Ensure text colors contrast well with background
5. **Test Print:** Generate a sample PDF and print to verify quality

### PDF Templates:

1. **Single Page:** First page of PDF is used as template
2. **Multi-Page:** Only first page is extracted
3. **Quality:** PDF is rendered at 2x resolution (high quality)
4. **Processing Time:** PDF conversion takes 2-5 seconds
5. **File Size:** PDFs under 10MB work best

### Text Positioning:

1. **Center Alignment:** Use 50% X position for centered text
2. **Multiple Lines:** Add separate text elements for each line
3. **Fine Tuning:** Use sliders after rough drag-and-drop positioning
4. **Preview Different Recipients:** Check how long/short names look

### Font Selection:

1. **Hierarchy:**
   - Large decorative fonts for title (Cinzel, Playfair)
   - Script fonts for names (Great Vibes, Alex Brush)
   - Clean sans-serif for body text (Inter, Montserrat)

2. **Readability:** 
   - Minimum 14px for body text
   - 40px+ for recipient names
   - 48px+ for titles

### Batch Processing:

1. **Test First:** Generate 1-2 certificates to verify layout
2. **Check Data:** Review recipient list for typos
3. **Save Config:** Always save before generating large batches
4. **Processing Time:** ~2-5 seconds per certificate

### Email Delivery:

1. **Gmail Users:** Must enable 2FA and create App Password
2. **Subject Line:** Keep under 70 characters
3. **Message Template:** Include all dynamic variables
4. **Test Email:** Send to yourself first before bulk dispatch
5. **Limits:** Gmail allows ~500 emails/day

## Troubleshooting

### Template Won't Upload:

- **Check file format:** Must be image (PNG, JPG, JPEG, GIF, WEBP) or PDF
- **PDF files:** First page will be automatically converted to image
- **File size:** Keep under 10MB for best performance
- **PDF conversion:** May take 5-10 seconds for large PDFs
- **Browser:** Try a different browser if issues persist
- **Corrupted PDF:** Try re-exporting PDF from source application

### Text Not Showing:

- **Check position:** May be off-screen (adjust X/Y values)
- **Color:** May blend with background (change text color)
- **Font size:** May be too small (increase size)

### Export Issues:

- **No template:** Must upload template before exporting
- **Empty recipients:** Add at least one recipient
- **Browser memory:** Close other tabs for large batches

### Email Delivery Fails:

- **Wrong credentials:** Double-check email and app password
- **Account security:** Enable less secure apps or use app password
- **Recipient emails:** Verify email addresses are valid
- **Spam filters:** Ask recipients to check spam folder

## Keyboard Shortcuts

- **Arrow Keys:** Fine-tune selected element position (when implemented)
- **Delete:** Remove selected element (when implemented)
- **Ctrl/Cmd + S:** Save template config (browser default save)

## Advanced Features

### Custom Fields:

Add a `customField` column to your CSV for additional dynamic data:

```csv
name,email,course,date,customField
"John Doe","john@example.com","Web Dev","Oct 8, 2026","Grade: A+"
```

Use `{custom}` in text elements to display it.

### Template Dimensions:

- **Landscape:** 1920×1080 (16:9), 2000×1414 (√2:1)
- **Portrait:** 1080×1920 (9:16), 1414×2000 (1:√2)
- **Square:** 2000×2000

### Multi-Language Support:

- Unicode fonts support international characters
- Test with sample data containing special characters
- Some script fonts may not support all languages

## Support & Resources

### Sample Files:

- `sample-template-config.json` - Example template configuration
- `sample-recipients.csv` - Example recipient data

### Fonts Used:

- **System:** SF Pro (Apple devices only, falls back to system-ui)
- **Serif:** Cinzel, Cormorant Garamond, Playfair Display, Lora
- **Script:** Great Vibes, Alex Brush, Satisfy, Dancing Script, Pacifico
- **Sans-Serif:** Inter, Montserrat, DM Sans, Roboto, Open Sans

### External Resources:

- Free certificate templates: Canva, Freepik, Envato
- Font previews: Google Fonts (https://fonts.google.com)
- CSV editor: Excel, Google Sheets, LibreOffice

## FAQ

**Q: Can I use my own fonts?**
A: Currently includes 15 fonts (SF Pro + 14 Google Fonts). See FONT_NOTES.md for adding custom fonts. SF Pro is Apple's system font - available on Mac/iOS, falls back to system-ui on other platforms.

**Q: Maximum number of recipients?**
A: No hard limit, but recommended batch size is 100-500 for performance.

**Q: Can I add images/logos to the template?**
A: Include them in your background template image. Dynamic logo placement coming soon.

**Q: What file formats are supported?**
A: 
- **Templates:** PNG, JPG, JPEG, GIF, WEBP, PDF
- **Export:** PDF, PNG
- **Import:** CSV, XLSX, XLS

**Q: Is my data secure?**
A: All processing happens in your browser. Data is not sent to any server except for email delivery.

**Q: Can I commercial use?**
A: Check the license file. Generally MIT licensed = commercial use OK.

---

**Need more help?** Check the GitHub repository for issues and discussions.
