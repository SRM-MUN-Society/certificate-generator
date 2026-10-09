import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  Upload,
  Plus,
  Trash2,
  Download,
  CheckCircle,
  AlertCircle,
  Eye,
  Type,
  Image as ImageIcon,
  Users,
  Loader2,
  Move,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Save,
  X,
} from "lucide-react";
import {
  Recipient,
  CustomTemplate,
  TextElement,
} from "./types";
import {
  POPULAR_FONTS,
  createDefaultTextElements,
} from "./constants";
import { CertificatePreview } from "./components/CertificatePreview";
import { parseCSV, recipientsToCSV } from "./utils/csv";
import { parseExcel } from "./utils/excel";
import { convertPdfToImage, isPdfFile } from "./utils/pdf";
import { domToPng } from "modern-screenshot";
import { jsPDF } from "jspdf";
import JSZip from "jszip";

export default function App() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<"template" | "typography" | "recipients" | "delivery">("template");
  
  // Custom Template State
  const [customTemplate, setCustomTemplate] = useState<CustomTemplate | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Recipients
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: "rcpt-1", name: "Alexandra Chen", status: "pending" },
    { id: "rcpt-2", name: "David K. Vance", status: "pending" },
    { id: "rcpt-3", name: "Emily Sophia Rose", status: "pending" },
  ]);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string>("rcpt-1");
  const [newRecipientName, setNewRecipientName] = useState("");

  // Export format
  const [exportFormat, setExportFormat] = useState<"pdf" | "png">("pdf");

  // Status & Progress UI states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatusText, setProcessingStatusText] = useState("");
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [exportingRecipient, setExportingRecipient] = useState<Recipient | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  // Alerts/Toasts
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Refs for uploads and render target
  const templateInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const exportTargetRef = useRef<HTMLDivElement>(null);

  // --- ACTIONS & HANDLERS ---
  
  // Show standard toast
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Select a recipient for live preview
  const getSelectedRecipient = (): Recipient | null => {
    return recipients.find((r) => r.id === selectedRecipientId) || recipients[0] || null;
  };

  // Handle template image upload
  const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if it's a PDF file
    const isPdf = isPdfFile(file);
    
    if (!isPdf && !file.type.includes("image/")) {
      showToast("Please upload a valid image (PNG, JPG) or PDF file", "error");
      return;
    }

    try {
      if (isPdf) {
        // Handle PDF file
        showToast("Converting PDF to image...", "success");
        
        const result = await convertPdfToImage(file, 2); // 2x scale for quality
        
        const newTemplate: CustomTemplate = {
          id: `template-${Date.now()}`,
          name: file.name.split(".")[0],
          backgroundImage: result.imageData,
          width: result.width,
          height: result.height,
          textElements: createDefaultTextElements(),
          createdAt: new Date().toISOString(),
        };
        
        setCustomTemplate(newTemplate);
        setSelectedElementId(newTemplate.textElements[0]?.id || null);
        showToast("PDF template uploaded successfully! You can now customize text placement.", "success");
      } else {
        // Handle image file
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Str = event.target?.result as string;
          
          // Get image dimensions
          const img = new Image();
          img.onload = () => {
            const newTemplate: CustomTemplate = {
              id: `template-${Date.now()}`,
              name: file.name.split(".")[0],
              backgroundImage: base64Str,
              width: img.width,
              height: img.height,
              textElements: createDefaultTextElements(),
              createdAt: new Date().toISOString(),
            };
            
            setCustomTemplate(newTemplate);
            setSelectedElementId(newTemplate.textElements[0]?.id || null);
            showToast("Template uploaded successfully! You can now customize text placement.", "success");
          };
          img.onerror = () => {
            showToast("Failed to load image. Please try another file.", "error");
          };
          img.src = base64Str;
        };
        reader.onerror = () => {
          showToast("Failed to read image file.", "error");
        };
        reader.readAsDataURL(file);
      }
    } catch (error: any) {
      console.error("Template upload error:", error);
      showToast(error.message || "Failed to upload template. Please try again.", "error");
    }
  };

  // Add new text element
  const handleAddTextElement = () => {
    if (!customTemplate) return;

    const newElement: TextElement = {
      id: `elem-${Date.now()}`,
      label: "New Text",
      placeholder: "Enter text",
      text: "New Text",
      x: 50,
      y: 50,
      fontSize: 24,
      fontFamily: "Inter",
      color: "#000000",
      bold: false,
      italic: false,
      uppercase: false,
      textAlign: "center",
    };

    setCustomTemplate({
      ...customTemplate,
      textElements: [...customTemplate.textElements, newElement],
    });
    setSelectedElementId(newElement.id);
    showToast("New text element added", "success");
  };

  // Delete text element
  const handleDeleteTextElement = (elementId: string) => {
    if (!customTemplate) return;

    setCustomTemplate({
      ...customTemplate,
      textElements: customTemplate.textElements.filter((e) => e.id !== elementId),
    });
    
    if (selectedElementId === elementId) {
      setSelectedElementId(customTemplate.textElements[0]?.id || null);
    }
    showToast("Text element deleted", "success");
  };

  // Update selected text element
  const updateSelectedElement = (updates: Partial<TextElement>) => {
    if (!customTemplate || !selectedElementId) return;

    setCustomTemplate({
      ...customTemplate,
      textElements: customTemplate.textElements.map((elem) =>
        elem.id === selectedElementId ? { ...elem, ...updates } : elem
      ),
    });
  };

  const getSelectedElement = (): TextElement | null => {
    if (!customTemplate || !selectedElementId) return null;
    return customTemplate.textElements.find((e) => e.id === selectedElementId) || null;
  };

  // Drag and drop handlers
  const handleDragStart = (elementId: string, e: React.MouseEvent) => {
    if (!customTemplate) return;
    
    setSelectedElementId(elementId);
    setIsDragging(true);
    
    const element = customTemplate.textElements.find((el) => el.id === elementId);
    if (!element) return;

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    
    setDragOffset({ x: offsetX, y: offsetY });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!customTemplate || !selectedElementId || !previewContainerRef.current) return;

      const container = previewContainerRef.current;
      const rect = container.getBoundingClientRect();
      const scale = rect.width / customTemplate.width;

      const x = ((e.clientX - rect.left - dragOffset.x * scale) / scale / customTemplate.width) * 100;
      const y = ((e.clientY - rect.top - dragOffset.y * scale) / scale / customTemplate.height) * 100;

      updateSelectedElement({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, selectedElementId, customTemplate, dragOffset]);

  // Save template configuration
  const handleSaveTemplate = () => {
    if (!customTemplate) return;

    const dataStr = JSON.stringify(customTemplate, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${customTemplate.name || "template"}_config.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast("Template configuration saved!", "success");
  };

  // Load template configuration
  const handleLoadTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const template = JSON.parse(event.target?.result as string) as CustomTemplate;
        setCustomTemplate(template);
        setSelectedElementId(template.textElements[0]?.id || null);
        showToast("Template configuration loaded!", "success");
      } catch (err) {
        showToast("Failed to load template configuration", "error");
      }
    };
    reader.readAsText(file);
  };

  // Parse custom CSV or Excel files
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isExcel = fileExtension === "xlsx" || fileExtension === "xls";

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        let parsed: Recipient[] = [];
        if (isExcel) {
          const buffer = event.target?.result as ArrayBuffer;
          parsed = await parseExcel(buffer);
        } else {
          const csvText = event.target?.result as string;
          parsed = parseCSV(csvText);
        }

        if (parsed.length > 0) {
          setRecipients(parsed);
          setSelectedRecipientId(parsed[0].id);
          showToast(`Successfully imported ${parsed.length} recipients!`, "success");
        } else {
          showToast("Could not find any recipient rows. Please verify headers.", "error");
        }
      } catch (err) {
        showToast(`Failed to parse ${isExcel ? "Excel" : "CSV"} spreadsheet. Ensure it is a valid format.`, "error");
      }
    };

    if (isExcel) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  };

  // Add individual recipient manually
  const handleAddRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipientName.trim()) {
      showToast("Recipient Name is required", "error");
      return;
    }

    const newRcpt: Recipient = {
      id: `rcpt-${Date.now()}`,
      name: newRecipientName.trim(),
      status: "pending",
    };

    setRecipients([...recipients, newRcpt]);
    setSelectedRecipientId(newRcpt.id);
    setNewRecipientName("");
    showToast("Added recipient to your active list!", "success");
  };

  // Delete recipient
  const handleDeleteRecipient = (id: string) => {
    const updated = recipients.filter((r) => r.id !== id);
    setRecipients(updated);
    if (selectedRecipientId === id && updated.length > 0) {
      setSelectedRecipientId(updated[0].id);
    }
    showToast("Recipient removed", "success");
  };

  // Clear all recipients
  const handleClearAllRecipients = () => {
    if (confirm("Are you sure you want to clear your entire recipient list?")) {
      setRecipients([]);
      showToast("Recipient list cleared", "success");
    }
  };

  // Download current list as CSV template
  const handleDownloadCSVTemplate = () => {
    const csvContent = recipientsToCSV(recipients);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "certigen_recipients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- CORE ZIP GENERATION AND BATCH EXPORT ---
  const renderCertificateData = async (recipient: Recipient): Promise<{ blob: Blob; base64: string }> => {
    if (!customTemplate) {
      throw new Error("No template configured");
    }

    setExportingRecipient(recipient);
    await new Promise<void>((resolve) => setTimeout(resolve, 200));

    const targetElement = document.getElementById("certificate-export-target");
    if (!targetElement) {
      throw new Error(`Export target element was not found in the DOM for recipient "${recipient.name}".`);
    }

    let base64DataUrl: string;
    try {
      base64DataUrl = await domToPng(targetElement, {
        scale: 2.0,
      });
    } catch (screenshotErr: any) {
      console.error("modern-screenshot generation error:", screenshotErr);
      throw new Error(`Failed to capture certificate image: ${screenshotErr.message || "Screenshot error"}`);
    }

    if (exportFormat === "pdf") {
      const pdf = new jsPDF({
        orientation: customTemplate.width > customTemplate.height ? "landscape" : "portrait",
        unit: "px",
        format: [customTemplate.width, customTemplate.height],
      });
      pdf.addImage(base64DataUrl, "PNG", 0, 0, customTemplate.width, customTemplate.height, undefined, "FAST");
      const pdfBlob = pdf.output("blob");
      
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(pdfBlob);
      });
      const base64 = await base64Promise;
      return { blob: pdfBlob, base64 };
    } else {
      const response = await fetch(base64DataUrl);
      const imgBlob = await response.blob();
      return { blob: imgBlob, base64: base64DataUrl };
    }
  };

  const handleBatchExecution = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customTemplate) {
      showToast("Please upload a template first", "error");
      return;
    }

    if (recipients.length === 0) {
      showToast("Your recipient list is currently empty.", "error");
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);
    setExportError(null);
    setProcessingStatusText("Preparing to generate certificates...");
    setShowProgressModal(true);

    try {
      const zip = new JSZip();
      const extension = exportFormat === "pdf" ? "pdf" : "png";

      for (let i = 0; i < recipients.length; i++) {
        const rcpt = recipients[i];
        const progressPercentage = Math.round(((i + 1) / recipients.length) * 90);
        setProcessingProgress(progressPercentage);
        setProcessingStatusText(`Generating certificate ${i + 1} of ${recipients.length} (${rcpt.name})...`);

        const { blob } = await renderCertificateData(rcpt);
        const safeFileName = `certificate_${rcpt.name.replace(/[^a-zA-Z0-9]/g, "_")}.${extension}`;
        
        zip.file(safeFileName, blob);
      }

      setProcessingStatusText("Packaging ZIP archive...");
      setProcessingProgress(95);
      
      const contentZip = await zip.generateAsync({ type: "blob" });
      setProcessingProgress(100);
      
      const url = URL.createObjectURL(contentZip);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Certificates_${new Date().toISOString().slice(0,10)}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showToast(`Successfully generated ${recipients.length} certificate(s)!`, "success");
      setShowProgressModal(false);
    } catch (error: any) {
      console.error(error);
      setExportError(error.message || "An error occurred during certificate generation.");
      showToast(error.message || "An error occurred during certificate generation.", "error");
      setProcessingStatusText(`Error: ${error.message || "Generation failed"}`);
    } finally {
      setIsProcessing(false);
      setExportingRecipient(null);
    }
  };

  const selectedElement = getSelectedElement();

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#e8d5a3] bg-gray-50">
      
      {/* BRAND HEADER */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
            C
          </div>
          <div>
            <h1 className="font-bold text-2xl text-gray-900 tracking-tight">
              CertiGen Pro
            </h1>
            <p className="text-xs text-gray-500 font-medium">Custom Certificate Generator</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 font-medium max-sm:hidden">
          <span>Recipients: <strong className="text-gray-900">{recipients.length}</strong></span>
          {customTemplate && (
            <>
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              <span>Template: <strong className="text-gray-900">{customTemplate.name}</strong></span>
            </>
          )}
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: EDITOR PANEL */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            
            {/* TABS */}
            <div className="flex overflow-x-auto bg-gray-50 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("template")}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === "template"
                    ? "border-blue-600 text-blue-600 bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Template
              </button>
              <button
                onClick={() => setActiveTab("typography")}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === "typography"
                    ? "border-blue-600 text-blue-600 bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                disabled={!customTemplate}
              >
                <Type className="w-4 h-4" />
                Typography
              </button>
              <button
                onClick={() => setActiveTab("recipients")}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === "recipients"
                    ? "border-blue-600 text-blue-600 bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Users className="w-4 h-4" />
                Recipients
              </button>
              <button
                onClick={() => setActiveTab("delivery")}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === "delivery"
                    ? "border-blue-600 text-blue-600 bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Download className="w-4 h-4" />
                Delivery
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="p-6 flex-1 overflow-y-auto max-h-[calc(100vh-300px)]">
              
              {/* TEMPLATE TAB */}
              {activeTab === "template" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Your Template</h3>
                    <p className="text-sm text-gray-600">
                      Upload a certificate template image (PNG, JPG) or PDF file and customize text placement.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <input
                      ref={templateInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleTemplateUpload}
                      className="hidden"
                    />
                    
                    <button
                      onClick={() => templateInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <Upload className="w-5 h-5" />
                      <span className="font-semibold">Upload Template (Image or PDF)</span>
                    </button>

                    {customTemplate && (
                      <>
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-semibold">Template Loaded</span>
                          </div>
                          <p className="text-sm text-green-600 mt-1">
                            {customTemplate.name} ({customTemplate.width} × {customTemplate.height}px)
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={handleSaveTemplate}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            Save Config
                          </button>
                          <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                            <Upload className="w-4 h-4" />
                            Load Config
                            <input
                              type="file"
                              accept=".json"
                              onChange={handleLoadTemplate}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>

                  {customTemplate && (
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">Text Elements</h4>
                        <button
                          onClick={handleAddTextElement}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add Text
                        </button>
                      </div>

                      <div className="space-y-2">
                        {customTemplate.textElements.map((elem) => (
                          <div
                            key={elem.id}
                            onClick={() => setSelectedElementId(elem.id)}
                            className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                              selectedElementId === elem.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex-1">
                              <div className="font-semibold text-sm text-gray-900">{elem.label}</div>
                              <div className="text-xs text-gray-500 truncate">{elem.text}</div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTextElement(elem.id);
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TYPOGRAPHY TAB */}
              {activeTab === "typography" && selectedElement && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Customize Text</h3>
                    <p className="text-sm text-gray-600">
                      Editing: <strong>{selectedElement.label}</strong>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                      <input
                        type="text"
                        value={selectedElement.label}
                        onChange={(e) => updateSelectedElement({ label: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Text Content
                        <span className="text-xs font-normal text-gray-500 ml-2">
                          Use {"{name}"} for recipient name
                        </span>
                      </label>
                      <textarea
                        value={selectedElement.text}
                        onChange={(e) => updateSelectedElement({ text: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Font Family</label>
                      <select
                        value={selectedElement.fontFamily}
                        onChange={(e) => updateSelectedElement({ fontFamily: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {POPULAR_FONTS.map((font) => (
                          <option key={font.value} value={font.value}>
                            {font.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Font Size: {selectedElement.fontSize}px
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="120"
                          value={selectedElement.fontSize}
                          onChange={(e) => updateSelectedElement({ fontSize: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                        <input
                          type="color"
                          value={selectedElement.color}
                          onChange={(e) => updateSelectedElement({ color: e.target.value })}
                          className="w-full h-10 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-600">X: {selectedElement.x.toFixed(1)}%</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="0.1"
                            value={selectedElement.x}
                            onChange={(e) => updateSelectedElement({ x: parseFloat(e.target.value) })}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-600">Y: {selectedElement.y.toFixed(1)}%</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="0.1"
                            value={selectedElement.y}
                            onChange={(e) => updateSelectedElement({ y: parseFloat(e.target.value) })}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Text Align</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateSelectedElement({ textAlign: "left" })}
                          className={`flex-1 p-2 rounded-lg border-2 transition-colors ${
                            selectedElement.textAlign === "left"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <AlignLeft className="w-5 h-5 mx-auto" />
                        </button>
                        <button
                          onClick={() => updateSelectedElement({ textAlign: "center" })}
                          className={`flex-1 p-2 rounded-lg border-2 transition-colors ${
                            selectedElement.textAlign === "center"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <AlignCenter className="w-5 h-5 mx-auto" />
                        </button>
                        <button
                          onClick={() => updateSelectedElement({ textAlign: "right" })}
                          className={`flex-1 p-2 rounded-lg border-2 transition-colors ${
                            selectedElement.textAlign === "right"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <AlignRight className="w-5 h-5 mx-auto" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Text Style</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateSelectedElement({ bold: !selectedElement.bold })}
                          className={`flex-1 px-4 py-2 rounded-lg border-2 font-bold transition-colors ${
                            selectedElement.bold
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <Bold className="w-5 h-5 mx-auto" />
                        </button>
                        <button
                          onClick={() => updateSelectedElement({ italic: !selectedElement.italic })}
                          className={`flex-1 px-4 py-2 rounded-lg border-2 italic transition-colors ${
                            selectedElement.italic
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <Italic className="w-5 h-5 mx-auto" />
                        </button>
                        <button
                          onClick={() => updateSelectedElement({ uppercase: !selectedElement.uppercase })}
                          className={`flex-1 px-4 py-2 rounded-lg border-2 text-xs font-semibold transition-colors ${
                            selectedElement.uppercase
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          ABC
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* RECIPIENTS TAB */}
              {activeTab === "recipients" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Recipients</h3>
                    <p className="text-sm text-gray-600">
                      Add recipients manually or import from CSV/Excel file.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <input
                      ref={csvInputRef}
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleCSVUpload}
                      className="hidden"
                    />
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => csvInputRef.current?.click()}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Upload className="w-5 h-5" />
                        <span className="font-semibold text-sm">Import CSV/Excel</span>
                      </button>
                      <button
                        onClick={handleDownloadCSVTemplate}
                        className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleAddRecipient} className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <input
                          type="text"
                          value={newRecipientName}
                          onChange={(e) => setNewRecipientName(e.target.value)}
                          placeholder="Recipient Name *"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                      >
                        <Plus className="w-5 h-5" />
                        Add Recipient
                      </button>
                    </form>

                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">
                        Recipients List ({recipients.length})
                      </h4>
                      {recipients.length > 0 && (
                        <button
                          onClick={handleClearAllRecipients}
                          className="text-sm text-red-600 hover:text-red-700 font-semibold"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {recipients.map((rcpt) => (
                        <div
                          key={rcpt.id}
                          onClick={() => setSelectedRecipientId(rcpt.id)}
                          className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedRecipientId === rcpt.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-gray-900">{rcpt.name}</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteRecipient(rcpt.id);
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* DELIVERY TAB */}
              {activeTab === "delivery" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Delivery Options</h3>
                    <p className="text-sm text-gray-600">
                      Choose how to export and deliver certificates.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Export Format</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setExportFormat("pdf")}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            exportFormat === "pdf"
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <FileText className="w-6 h-6 mx-auto mb-1" />
                          <div className="text-sm font-semibold">PDF</div>
                        </button>
                        <button
                          onClick={() => setExportFormat("png")}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            exportFormat === "png"
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <ImageIcon className="w-6 h-6 mx-auto mb-1" />
                          <div className="text-sm font-semibold">PNG</div>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleBatchExecution}
                      disabled={isProcessing || !customTemplate}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg shadow-lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download className="w-6 h-6" />
                          Generate & Download ZIP
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: PREVIEW PANEL */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Live Preview</h3>
              {customTemplate && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Eye className="w-4 h-4" />
                  <select
                    value={selectedRecipientId}
                    onChange={(e) => setSelectedRecipientId(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {recipients.map((rcpt) => (
                      <option key={rcpt.id} value={rcpt.id}>
                        {rcpt.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {customTemplate ? (
              <div ref={previewContainerRef}>
                <CertificatePreview
                  template={customTemplate}
                  recipient={getSelectedRecipient()}
                  previewRef={previewContainerRef}
                  selectedElementId={selectedElementId}
                  onElementClick={setSelectedElementId}
                  isDragging={isDragging}
                  onDragStart={handleDragStart}
                />
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Tip:</strong> Click and drag text elements to reposition them on the template.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <ImageIcon className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-600 font-semibold mb-2">No Template Loaded</p>
                <p className="text-sm text-gray-500 text-center max-w-sm">
                  Upload a certificate template image to get started. You'll be able to customize text placement and styling.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* HIDDEN EXPORT TARGET */}
      {exportingRecipient && customTemplate && (
        <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
          <CertificatePreview
            template={customTemplate}
            recipient={exportingRecipient}
            isExporting={true}
          />
        </div>
      )}

      {/* PROGRESS MODAL */}
      {showProgressModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Certificates</h3>
              <p className="text-sm text-gray-600 mb-6">{processingStatusText}</p>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 rounded-full"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              
              <p className="text-2xl font-bold text-gray-900">{processingProgress}%</p>

              {exportError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{exportError}</p>
                </div>
              )}

              {processingProgress === 100 && !isProcessing && (
                <button
                  onClick={() => setShowProgressModal(false)}
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          } text-white`}>
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-semibold">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
