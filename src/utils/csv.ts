import { Recipient } from "../types";

/**
 * Parses a CSV string or plain text list into Recipient objects.
 * Supports:
 * 1. Simple name list (one name per line)
 * 2. CSV with "name" or "names" header
 * 3. Multi-column CSV (only name column is used)
 */
export function parseCSV(text: string): Recipient[] {
  if (!text || text.trim() === "") return [];

  // Split by lines
  const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
  
  if (lines.length === 0) return [];

  const recipients: Recipient[] = [];
  
  // Check if first line is a header
  const firstLine = lines[0].toLowerCase().trim();
  const isHeader = firstLine === "name" || 
                   firstLine === "names" || 
                   firstLine.includes("name") && firstLine.includes(",");
  
  const startIndex = isHeader ? 1 : 0;

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // If it's a CSV line with commas, extract the name column
    let name: string;
    if (line.includes(",")) {
      // Parse CSV line
      const parts = parseCSVLine(line);
      
      // Find name column (first non-empty value or column with "name" in header)
      if (isHeader) {
        const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
        const nameIndex = headers.findIndex(h => h.includes("name"));
        name = nameIndex !== -1 && nameIndex < parts.length ? parts[nameIndex] : parts[0];
      } else {
        name = parts[0]; // Use first column as name
      }
    } else {
      // Simple text line
      name = line;
    }

    name = name.trim().replace(/^"|"$/g, ""); // Remove surrounding quotes
    
    if (name) {
      recipients.push({
        id: `rcpt-${Date.now()}-${i}`,
        name,
        status: "pending"
      });
    }
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
 * Formats a list of recipients back into CSV string format (names only)
 */
export function recipientsToCSV(recipients: Recipient[]): string {
  const rows = recipients.map((r) => r.name);
  return rows.join("\n");
}
