import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './ProtectedPdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ProtectedPdfViewer({ pdfPath, maxPages = 10, height = 600 }) {
  const [pageCount, setPageCount] = useState(0);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(700);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onLoadSuccess({ numPages }) {
    setPageCount(Math.min(numPages, maxPages));
  }

  return (
    <div
      ref={containerRef}
      className="protected-pdf-viewer"
      style={{ height: `${height}px` }}
      onContextMenu={e => e.preventDefault()}
    >
      <Document
        file={pdfPath}
        onLoadSuccess={onLoadSuccess}
        loading={<div className="pdf-loading">Loading preview...</div>}
        error={<div className="pdf-error">Unable to load preview.</div>}
      >
        {Array.from({ length: pageCount }, (_, i) => (
          <Page
            key={i + 1}
            pageNumber={i + 1}
            width={containerWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
      {pageCount > 0 && (
        <div className="pdf-page-limit-notice">
          Preview limited to first {pageCount} page{pageCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

export default ProtectedPdfViewer;
