import ExcelJS from "exceljs";
import { Recipient } from "../types";

/**
 * Parses an Excel (.xlsx or .xls) file from an ArrayBuffer into Recipient objects.
 * Supports:
 * 1. Simple name list (one name per row)
 * 2. Excel with "Name" or "Names" header
 * 3. Multi-column Excel (only name column is used)
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

  if (rows.length === 0) return [];

  const recipients: Recipient[] = [];
  
  // Check if first row is a header
  const firstRow = rows[0] as any[];
  const firstCellStr = firstRow[0] ? String(firstRow[0]).toLowerCase().trim() : "";
  const isHeader = firstCellStr === "name" || 
                  firstCellStr === "names" ||
                  firstCellStr.includes("name");

  const startIndex = isHeader ? 1 : 0;

  // Find name column index if header exists
  let nameColumnIndex = 0;
  if (isHeader) {
    const headers = firstRow.map(h => h ? String(h).toLowerCase().trim() : "");
    const nameIndex = headers.findIndex(h => h.includes("name"));
    if (nameIndex !== -1) {
      nameColumnIndex = nameIndex;
    }
  }

  for (let i = startIndex; i < rows.length; i++) {
    const row = rows[i] as any[];
    if (!row || row.length === 0) continue;

    const nameValue = row[nameColumnIndex];
    if (nameValue === undefined || nameValue === null) continue;

    const name = String(nameValue).trim();
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
