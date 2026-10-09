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
    y: 50,
    fontSize: 56,
    fontFamily: "Great Vibes",
    color: "#1e293b",
    bold: false,
    italic: false,
    uppercase: false,
    textAlign: "center",
  },
];
