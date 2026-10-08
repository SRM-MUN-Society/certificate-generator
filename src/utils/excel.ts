import ExcelJS from "exceljs";
import { Recipient } from "../types";

/**
 * Parses an Excel (.xlsx or .xls) file from an ArrayBuffer into Recipient objects using ExcelJS.
 */
export async function parseExcel(arrayBuffer: ArrayBuffer): Promise<Recipient[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(arrayBuffer);
  
  if (workbook.worksheets.length === 0) return [];
  
  const worksheet = workbook.worksheets[0];
  const rows: any[][] = [];

  worksheet.eachRow({ includeEmpty: false }, (row) => {
    const rowValues: any[] = [];
    if (Array.isArray(row.values)) {
      // ExcelJS row.values is 1-indexed, element 0 is empty/undefined
      for (let col = 1; col < row.values.length; col++) {
        let val = row.values[col];
        if (val && typeof val === "object") {
          if ("result" in val) {
            val = (val as any).result;
          } else if ("text" in val) {
            val = (val as any).text;
          } else if ("hyperlink" in val && "text" in val) {
            val = (val as any).text;
          }
        }
        rowValues.push(val);
      }
    }
    rows.push(rowValues);
  });

  if (rows.length < 2) return [];

  // Headers row is the first row
  const headers = (rows[0] as any[]).map((h) => 
    (h !== undefined && h !== null ? String(h) : "").trim().toLowerCase()
  );

  // Find header index mappings (aligned with parseCSV)
  const nameIdx = headers.findIndex((h) => h.includes("name") || h.includes("recipient") || h === "to");
  const emailIdx = headers.findIndex((h) => h.includes("email") || h.includes("mail") || h === "id");
  const courseIdx = headers.findIndex((h) => h.includes("course") || h.includes("program") || h.includes("subject") || h === "event" || h.includes("topic"));
  const dateIdx = headers.findIndex((h) => h.includes("date") || h.includes("issued") || h.includes("time") || h === "on");
  const customIdx = headers.findIndex((h) => h.includes("custom") || h.includes("id") || h.includes("field") || h.includes("meta") || h.includes("grade") || h.includes("score"));

  const recipients: Recipient[] = [];

  for (let i = 1; i < rows.length; i++) {
    const values = rows[i] as any[];
    if (!values || values.length === 0) continue;

    // Check if the entire row is empty
    const isRowEmpty = values.every((v) => v === undefined || v === null || String(v).trim() === "");
    if (isRowEmpty) continue;

    const getValue = (idx: number, fallback: string) => {
      if (idx !== -1 && idx < values.length) {
        const val = values[idx];
        if (val !== undefined && val !== null) {
          if (val instanceof Date) {
            return val.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
          }
          return String(val).trim();
        }
      }
      return fallback;
    };

    const name = getValue(nameIdx, "Recipient " + i);
    const email = getValue(emailIdx, "");
    const course = getValue(courseIdx, "Professional Program");
    const date = getValue(dateIdx, new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
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
