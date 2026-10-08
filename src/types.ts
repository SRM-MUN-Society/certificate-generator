export interface Recipient {
  id: string;
  name: string;
  email: string;
  course: string;
  date: string;
  customField?: string;
  status?: "pending" | "generating" | "success" | "failed";
  error?: string;
}

export interface TextElement {
  id: string;
  label: string; // Display name (e.g., "Recipient Name", "Course Title")
  placeholder: string; // Placeholder variable like {name}, {course}, or static text
  text: string; // Actual text content
  x: number; // Position X in percentage (0-100)
  y: number; // Position Y in percentage (0-100)
  fontSize: number; // in pixels
  fontFamily: string;
  color: string; // hex color
  bold: boolean;
  italic: boolean;
  uppercase: boolean;
  textAlign: "left" | "center" | "right";
  width?: number; // Optional width constraint in percentage
}

export interface CustomTemplate {
  id: string;
  name: string;
  backgroundImage: string; // base64 or URL
  width: number; // Template width in pixels (for aspect ratio)
  height: number; // Template height in pixels
  textElements: TextElement[];
  createdAt: string;
}

export interface EmailSettings {
  emailUser: string;
  emailKey: string;
  subject: string;
  messageTemplate: string;
}
