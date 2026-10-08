import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface PdfToImageResult {
  imageData: string; // base64 data URL
  width: number;
  height: number;
}

/**
 * Convert first page of PDF to high-quality image
 * @param pdfFile - PDF file object
 * @param scale - Scale factor for quality (default: 2 for high quality)
 * @returns Promise with base64 image data and dimensions
 */
export async function convertPdfToImage(
  pdfFile: File,
  scale: number = 2
): Promise<PdfToImageResult> {
  try {
    // Read PDF file as array buffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    
    // Load PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    // Get first page
    const page = await pdf.getPage(1);
    
    // Get viewport with scale
    const viewport = page.getViewport({ scale });
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Could not get canvas context');
    }
    
    // Set canvas dimensions
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Render PDF page to canvas
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    
    await page.render(renderContext).promise;
    
    // Convert canvas to base64 image
    const imageData = canvas.toDataURL('image/png', 1.0);
    
    return {
      imageData,
      width: viewport.width,
      height: viewport.height,
    };
  } catch (error) {
    console.error('PDF conversion error:', error);
    throw new Error(`Failed to convert PDF to image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Check if file is a PDF
 */
export function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

/**
 * Validate PDF file
 */
export async function validatePdf(file: File): Promise<boolean> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    return pdf.numPages > 0;
  } catch (error) {
    return false;
  }
}
