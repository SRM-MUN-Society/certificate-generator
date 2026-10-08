import React, { useRef, useState, useEffect } from "react";
import { CustomTemplate, Recipient, TextElement } from "../types";

interface CertificatePreviewProps {
  template: CustomTemplate;
  recipient: Recipient | null;
  previewRef?: React.RefObject<HTMLDivElement | null>;
  isExporting?: boolean;
  selectedElementId?: string | null;
  onElementClick?: (elementId: string) => void;
  isDragging?: boolean;
  onDragStart?: (elementId: string, e: React.MouseEvent) => void;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  template,
  recipient,
  previewRef,
  isExporting = false,
  selectedElementId = null,
  onElementClick,
  isDragging = false,
  onDragStart,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (isExporting) return;

    const updateScale = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.clientWidth || 0;
        if (parentWidth > 0 && template.width > 0) {
          setScale(parentWidth / template.width);
        }
      }
    };

    updateScale();
    
    const observer = new ResizeObserver(() => {
      updateScale();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener("resize", updateScale);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [isExporting, template.width]);

  // Fallback recipient info if none selected
  const activeRecipient: Recipient = recipient || {
    id: "preview-id",
    name: "Alexandra Chen",
    email: "alexandra.chen@example.com",
    course: "Advanced Data Science & Machine Learning",
    date: "October 8, 2026",
  };

  // Interpolate placeholders
  const interpolate = (text: string) => {
    return text
      .replace(/{name}/g, activeRecipient.name)
      .replace(/{course}/g, activeRecipient.course)
      .replace(/{date}/g, activeRecipient.date)
      .replace(/{email}/g, activeRecipient.email)
      .replace(/{custom}/g, activeRecipient.customField || "");
  };

  const renderTextElement = (elem: TextElement) => {
    const displayText = interpolate(elem.text);
    
    const style: React.CSSProperties = {
      position: "absolute",
      left: `${elem.x}%`,
      top: `${elem.y}%`,
      transform: "translate(-50%, -50%)",
      fontSize: isExporting ? `${elem.fontSize * 1.5}px` : `${elem.fontSize}px`,
      fontFamily: elem.fontFamily,
      color: elem.color,
      fontWeight: elem.bold ? "700" : "400",
      fontStyle: elem.italic ? "italic" : "normal",
      textTransform: elem.uppercase ? "uppercase" : "none",
      textAlign: elem.textAlign,
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      maxWidth: elem.width ? `${elem.width}%` : "90%",
      cursor: !isExporting && onElementClick ? "move" : "default",
      userSelect: "none",
      pointerEvents: isExporting ? "none" : "auto",
    };

    const isSelected = selectedElementId === elem.id;

    return (
      <div
        key={elem.id}
        style={style}
        className={`text-element ${isSelected && !isExporting ? "ring-2 ring-blue-500 ring-offset-2" : ""} ${isDragging ? "pointer-events-none" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          if (onElementClick && !isExporting) {
            onElementClick(elem.id);
          }
        }}
        onMouseDown={(e) => {
          if (onDragStart && !isExporting) {
            e.stopPropagation();
            onDragStart(elem.id, e);
          }
        }}
      >
        {displayText}
      </div>
    );
  };

  const renderContent = () => (
    <>
      {/* Background Image */}
      <img
        src={template.backgroundImage}
        alt="Certificate Template"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Text Elements Overlay */}
      {template.textElements.map((elem) => renderTextElement(elem))}
    </>
  );

  if (isExporting) {
    return (
      <div
        ref={previewRef as any}
        id="certificate-export-target"
        className="relative overflow-hidden"
        style={{
          width: `${template.width}px`,
          height: `${template.height}px`,
        }}
      >
        {renderContent()}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden flex items-start justify-start bg-gray-100 rounded-lg"
      style={{ 
        height: scale > 0 ? `${template.height * scale}px` : "auto",
        minHeight: "400px"
      }}
    >
      <div
        ref={previewRef as any}
        id="certificate-render-target"
        className="absolute top-0 left-0 overflow-hidden shadow-lg"
        style={{
          width: `${template.width}px`,
          height: `${template.height}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};
