# Font Information

## Available Fonts

CertiGen Pro includes 15 carefully selected fonts for professional certificate design:

### System Fonts

#### SF Pro (Apple System Font)
- **Full Name:** SF Pro Display, SF Pro Text
- **Type:** Sans-serif
- **Availability:** 
  - ✅ Native on macOS, iOS, iPadOS, watchOS
  - ⚠️ Not available on Windows/Linux (falls back to system-ui)
- **Best For:** Modern, clean designs with Apple aesthetic
- **Fallback:** `system-ui, sans-serif`
- **Notes:** 
  - Designed by Apple
  - Used in iOS, macOS interfaces
  - Professional, neutral appearance
  - Great readability at all sizes
  - **Recommendation:** Test on target devices

### Google Fonts (Web Fonts)

All other fonts are loaded from Google Fonts CDN and work across all platforms:

#### Serif Fonts

1. **Cinzel** - Classic Roman style
   - Best for: Traditional, formal certificates
   - Use case: Titles, headings

2. **Cormorant Garamond** - Editorial serif
   - Best for: Body text, descriptions
   - Use case: Long-form text

3. **Playfair Display** - Elegant serif
   - Best for: Sophisticated designs
   - Use case: Titles, course names

4. **Lora** - Elegant reading serif
   - Best for: Body text
   - Use case: Descriptions

#### Script/Cursive Fonts

5. **Great Vibes** - Calligraphy script
   - Best for: Recipient names
   - Use case: Signature-style text

6. **Alex Brush** - Formal cursive
   - Best for: Names, formal text
   - Use case: Recipient names

7. **Satisfy** - Modern brush
   - Best for: Casual certificates
   - Use case: Creative designs

8. **Dancing Script** - Flowing script
   - Best for: Decorative text
   - Use case: Subtitles, accents

9. **Pacifico** - Playful handwriting
   - Best for: Fun, informal certificates
   - Use case: Workshop certificates

#### Sans-Serif Fonts

10. **Montserrat** - Clean sans
    - Best for: Modern certificates
    - Use case: Body text, titles

11. **Inter** - Modern technical UI
    - Best for: Professional, tech certificates
    - Use case: Body text, data

12. **DM Sans** - Geometric sans
    - Best for: Contemporary designs
    - Use case: Body text

13. **Roboto** - Modern sans
    - Best for: Digital certificates
    - Use case: Body text, labels

14. **Open Sans** - Friendly sans
    - Best for: Approachable designs
    - Use case: Body text

---

## Font Loading

### How Fonts are Loaded

1. **Google Fonts (CDN):**
   ```html
   <!-- Add to index.html -->
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&..." rel="stylesheet">
   ```

2. **SF Pro (System Font):**
   ```css
   /* Automatically available on Apple devices */
   font-family: "SF Pro Display", "SF Pro Text", -apple-system, system-ui, sans-serif;
   ```

### Font Fallback Chain

**SF Pro:**
```
SF Pro Display → SF Pro Text → -apple-system → system-ui → sans-serif
```

**Google Fonts:**
```
Font Name → Generic Family (serif/sans-serif/cursive)
```

---

## SF Pro Detailed Information

### About SF Pro

**SF Pro** is Apple's system font used across all their platforms. It's designed for optimal readability at any size and includes multiple optical sizes:

- **SF Pro Display:** For sizes 20pt and above
- **SF Pro Text:** For sizes below 20pt
- **SF Pro Rounded:** Rounded variant (not included)

### Availability by Platform

| Platform | SF Pro Available | Fallback Font |
|----------|------------------|---------------|
| macOS 10.11+ | ✅ Yes (native) | N/A |
| iOS/iPadOS | ✅ Yes (native) | N/A |
| Windows | ❌ No | Segoe UI |
| Linux | ❌ No | system-ui |
| Android | ❌ No | Roboto |

### When to Use SF Pro

**Use SF Pro when:**
- ✅ Certificates are for Apple device users
- ✅ Modern, clean aesthetic desired
- ✅ Consistent with Apple branding
- ✅ Cross-platform testing is possible

**Avoid SF Pro when:**
- ❌ Primary audience uses Windows/Linux
- ❌ Specific font appearance critical
- ❌ Print quality must be identical across platforms

### SF Pro Characteristics

- **Style:** Geometric sans-serif
- **Weight Range:** 100-900 (system font)
- **Features:**
  - Dynamic Type support
  - Optical size variations
  - Excellent screen readability
  - Professional, neutral appearance
  - Clean, modern aesthetic

### Testing SF Pro

Since SF Pro may not be available on all systems:

1. **Preview on Mac:**
   - Test certificates on macOS device
   - Verify font renders correctly

2. **Test Fallback:**
   - Test on Windows/Linux
   - Ensure fallback looks acceptable

3. **Export Test:**
   - Generate sample PDF/PNG
   - Check font embedding in exports

---

## Font Pairing Recommendations

### Professional Certificates

**Option 1: Classic Formal**
```
Title: Cinzel (Bold, 48px)
Name: Alex Brush (56px)
Body: Cormorant Garamond (18px)
```

**Option 2: Modern Clean**
```
Title: SF Pro (Bold, 48px)
Name: Great Vibes (56px)
Body: Inter (18px)
```

**Option 3: Elegant Traditional**
```
Title: Playfair Display (Bold, 48px)
Name: Alex Brush (56px)
Body: Lora (18px)
```

### Contemporary Certificates

**Option 4: Tech/Startup**
```
Title: Montserrat (Bold, 48px)
Name: Montserrat (Light, 56px)
Body: Inter (18px)
```

**Option 5: Apple-Style Modern**
```
Title: SF Pro (Bold, 48px)
Name: SF Pro (Light, 56px)
Body: SF Pro (Regular, 18px)
```

### Casual/Creative Certificates

**Option 6: Friendly Workshop**
```
Title: Pacifico (48px)
Name: Dancing Script (56px)
Body: Open Sans (18px)
```

---

## Font Best Practices

### General Guidelines

1. **Contrast:** Use contrasting fonts for hierarchy
   - Serif + Sans-serif
   - Script + Sans-serif
   - Heavy + Light weights

2. **Limit Fonts:** Use 2-3 fonts maximum per certificate

3. **Readability:** 
   - Minimum 14px for body text
   - 40px+ for names
   - 48px+ for titles

4. **Test:** Always generate sample certificate to verify

### SF Pro Specific

1. **Platform Check:** 
   - Note your audience's platform
   - Test on target devices

2. **Fallback Planning:**
   - Ensure fallback looks good
   - Consider using more universal fonts for critical text

3. **Export Quality:**
   - SF Pro renders well in PDF exports on Mac
   - May embed as bitmap on other systems

4. **Alternative:**
   - If consistency critical, use Inter or Roboto instead
   - These are available cross-platform via Google Fonts

---

## Adding Custom Fonts

### To Add More Fonts:

1. **Update constants.ts:**
   ```typescript
   export const POPULAR_FONTS = [
     // ... existing fonts
     { name: "New Font Name", value: "Font Family, fallback" },
   ];
   ```

2. **Load Font (if web font):**
   - Add to Google Fonts link in index.html
   - Or use @font-face in CSS

3. **Add CSS Class (optional):**
   ```css
   .font-newfont { font-family: 'New Font', fallback; }
   ```

### SF Pro Alternative (If Needed)

If you want SF Pro on all platforms, you could:

1. **Purchase License** (Apple restricts redistribution)
2. **Use Web Font Alternative:**
   - Inter (very similar)
   - Roboto (also similar)
   - System-ui (platform default)

---

## Font Licensing

### Google Fonts
- **License:** Open Font License (OFL)
- **Commercial Use:** ✅ Allowed
- **Modification:** ✅ Allowed
- **Attribution:** Not required

### SF Pro
- **License:** Apple System Font
- **Availability:** Native on Apple devices
- **Distribution:** ❌ Cannot redistribute
- **Use:** ✅ OK via system fonts on Apple devices

### Important Notes

- **Google Fonts:** Free for all uses
- **SF Pro:** Cannot be distributed as web font
- **System Fonts:** Using system-ui is always safe
- **Commercial:** All included fonts are commercial-use safe

---

## Troubleshooting

### SF Pro Not Showing

**Problem:** SF Pro doesn't appear in preview
**Solution:**
1. Check if on macOS/iOS device
2. Verify font-family includes fallbacks
3. Use "system-ui" to test system font loading

### Font Not Loading

**Problem:** Google Font doesn't load
**Solution:**
1. Check internet connection
2. Verify Google Fonts CDN is accessible
3. Check browser console for errors
4. Try loading font manually in CSS

### Export Font Issues

**Problem:** Font looks different in exported PDF
**Solution:**
1. Some fonts embed differently
2. Try different font
3. Use SF Pro on Mac for consistency
4. Test export on target platform

---

## Font Resources

### Where to Find Fonts

1. **Google Fonts**
   - https://fonts.google.com
   - Free, open-source fonts
   - Easy integration

2. **Adobe Fonts**
   - https://fonts.adobe.com
   - Requires Creative Cloud
   - High-quality fonts

3. **Font Squirrel**
   - https://www.fontsquirrel.com
   - Commercial-use free fonts
   - @font-face generator

### Font Testing Tools

1. **FontPair**
   - https://fontpair.co
   - Font pairing suggestions

2. **Type Scale**
   - https://type-scale.com
   - Font size calculator

3. **Font Tester**
   - https://wordmark.it
   - Test fonts you have installed

---

## Summary

- **15 fonts available** (1 system + 14 Google Fonts)
- **SF Pro** added as first option
- **Cross-platform support** with fallbacks
- **Commercial use safe** for all fonts
- **Easy to add more fonts** if needed

**Recommendation:** Use SF Pro for Mac/iOS-targeted certificates, use Google Fonts for universal compatibility.

---

**Questions about fonts?** Check the font dropdown in the Typography tab to see all available options!
