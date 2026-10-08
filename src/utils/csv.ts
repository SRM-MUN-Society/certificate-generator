import { Recipient } from "../types";

/**
 * Parses a standard CSV string into a list of Recipient objects.
 * Automatically aligns headers case-insensitively.
 */
export function parseCSV(text: string): Recipient[] {
  if (!text || text.trim() === "") return [];

  // Split lines by newline, taking care of quoted lines (simple CSV regex)
  const lines: string[] = [];
  let currentLine = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
      currentLine += char;
    } else if ((char === "\r" || char === "\n") && !insideQuotes) {
      if (currentLine.trim() !== "") {
        lines.push(currentLine);
      }
      currentLine = "";
      // Skip next char if we have \r\n
      if (char === "\r" && text[i + 1] === "\n") {
        i++;
      }
    } else {
      currentLine += char;
    }
  }
  if (currentLine.trim() !== "") {
    lines.push(currentLine);
  }

  if (lines.length < 2) return [];

  // Parse header
  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase());

  // Find header index mappings
  const nameIdx = headers.findIndex((h) => h.includes("name") || h.includes("recipient") || h === "to");
  const emailIdx = headers.findIndex((h) => h.includes("email") || h.includes("mail") || h === "id");
  const courseIdx = headers.findIndex((h) => h.includes("course") || h.includes("program") || h.includes("subject") || h === "event" || h.includes("topic"));
  const dateIdx = headers.findIndex((h) => h.includes("date") || h.includes("issued") || h.includes("time") || h === "on");
  const customIdx = headers.findIndex((h) => h.includes("custom") || h.includes("id") || h.includes("field") || h.includes("meta") || h.includes("grade") || h.includes("score"));

  const recipients: Recipient[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0 || (values.length === 1 && values[0] === "")) continue;

    const getValue = (idx: number, fallback: string) => {
      if (idx !== -1 && idx < values.length) {
        return values[idx].trim().replace(/^"|"$/g, ""); // Strip quotes if any
      }
      return fallback;
    };

    const name = getValue(nameIdx, "Recipient " + i);
    const email = getValue(emailIdx, "");
    const course = getValue(courseIdx, "Professional Program");
    const date = getValue(dateIdx, new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }));
    const customField = customIdx !== -1 ? getValue(customIdx, "") : undefined;

    recipients.push({
      id: `rcpt-${Date.now()}-${i}`,
      name,
      email,
      course,
      date,
      customField,
      status: "pending"
    });
  }

  return recipients;
}

/**
 * Splits a single CSV row, respecting double quotes
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let currentVal = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      result.push(currentVal);
      currentVal = "";
    } else {
      currentVal += char;
    }
  }
  result.push(currentVal);
  return result;
}

/**
 * Formats a list of recipients back into CSV string format
 */
export function recipientsToCSV(recipients: Recipient[]): string {
  const header = "Name,Email,Course,Date,CustomField";
  const rows = recipients.map((r) => {
    const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;
    return `${escape(r.name)},${escape(r.email)},${escape(r.course)},${escape(r.date)},${escape(r.customField || "")}`;
  });
  return [header, ...rows].join("\n");
}
