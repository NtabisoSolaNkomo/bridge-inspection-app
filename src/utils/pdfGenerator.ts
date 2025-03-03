
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { InspectionReport } from '@/pages/Reports';

// Extend jsPDF to include the autoTable method
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generateInspectionPDF = (report: InspectionReport): jsPDF => {
  // Initialize PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Add header with blue background
  doc.setFillColor(41, 128, 185); // Blue header
  doc.rect(0, 0, pageWidth, 30, 'F');
  
  // Add title with white text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Bridge Inspection Report', pageWidth / 2, 20, { align: 'center' });
  
  // Reset text color for the rest of the document
  doc.setTextColor(0, 0, 0);
  
  // Add bridge image if available (placeholder - using bridge icon drawn manually)
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 25, 40, pageWidth / 2 + 25, 40); // Bridge deck
  doc.line(pageWidth / 2 - 20, 40, pageWidth / 2 - 20, 50); // Left pillar
  doc.line(pageWidth / 2 + 20, 40, pageWidth / 2 + 20, 50); // Right pillar
  
  // Add report details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  // Add info box with light blue background
  doc.setFillColor(235, 245, 251);
  doc.roundedRect(14, 60, pageWidth - 28, 50, 3, 3, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.text(`Bridge: ${report.bridgeName}`, 20, 70);
  doc.text(`Location: ${report.location}`, 20, 80);
  doc.text(`Inspector: ${report.inspectorName}`, 20, 90);
  doc.text(`Date: ${new Date(report.date).toLocaleDateString()}`, 20, 100);
  
  // Add summary section with styled header
  doc.setFillColor(41, 128, 185, 0.1);
  doc.roundedRect(14, 120, pageWidth - 28, 8, 1, 1, 'F');
  
  doc.setFontSize(14);
  doc.setTextColor(41, 128, 185);
  doc.text('Inspection Summary', 20, 126);
  doc.setTextColor(0, 0, 0);
  
  // Count issues by severity
  const issueCounts = { minor: 0, moderate: 0, critical: 0 };
  report.items.forEach(item => {
    item.comments.forEach(comment => {
      issueCounts[comment.severity]++;
    });
  });
  
  // Add summary stats with icons
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total inspection items: ${report.items.length}`, 20, 140);
  doc.text(`Issues found: ${issueCounts.minor + issueCounts.moderate + issueCounts.critical}`, 20, 150);
  
  // Add colored boxes for issue counts
  // Critical
  doc.setFillColor(231, 76, 60);
  doc.rect(20, 158, 10, 10, 'F');
  doc.text(`Critical issues: ${issueCounts.critical}`, 35, 165);
  
  // Moderate
  doc.setFillColor(243, 156, 18);
  doc.rect(20, 173, 10, 10, 'F');
  doc.text(`Moderate issues: ${issueCounts.moderate}`, 35, 180);
  
  // Minor
  doc.setFillColor(46, 204, 113);
  doc.rect(20, 188, 10, 10, 'F');
  doc.text(`Minor issues: ${issueCounts.minor}`, 35, 195);
  
  // Add notes if available
  if (report.notes) {
    doc.setFillColor(41, 128, 185, 0.1);
    doc.roundedRect(14, 210, pageWidth - 28, 8, 1, 1, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(41, 128, 185);
    doc.text('Notes', 20, 216);
    doc.setTextColor(0, 0, 0);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    // Split notes into multiple lines if needed
    const splitNotes = doc.splitTextToSize(report.notes, pageWidth - 40);
    doc.text(splitNotes, 20, 230);
  }
  
  // Add detailed findings section
  doc.addPage();
  
  // Add header with blue background
  doc.setFillColor(41, 128, 185);
  doc.rect(0, 0, pageWidth, 20, 'F');
  
  // Add section title with white text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Detailed Findings', pageWidth / 2, 13, { align: 'center' });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Create a table for the detailed findings
  const tableData = [];
  
  report.items.forEach(item => {
    item.comments.forEach(comment => {
      tableData.push([
        item.title,
        item.category,
        comment.text,
        comment.severity.charAt(0).toUpperCase() + comment.severity.slice(1),
        comment.priority.charAt(0).toUpperCase() + comment.priority.slice(1)
      ]);
    });
  });
  
  if (tableData.length > 0) {
    doc.autoTable({
      startY: 30,
      head: [['Section', 'Category', 'Comment', 'Severity', 'Priority']],
      body: tableData,
      headStyles: { 
        fillColor: [41, 128, 185], 
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 30 },
      styles: { 
        fontSize: 10,
        cellPadding: 5,
        overflow: 'linebreak' 
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
        3: { 
          fontStyle: 'bold',
          cellWidth: 'auto'
        },
        4: { cellWidth: 'auto' }
      }
    });
  }
  
  // Add photos section
  let startY = doc.autoTable.previous.finalY + 20;
  if (startY > pageHeight - 60) {
    doc.addPage();
    startY = 30;
  }
  
  // Photos title
  doc.setFillColor(41, 128, 185, 0.1);
  doc.roundedRect(14, startY - 8, pageWidth - 28, 8, 1, 1, 'F');
  
  doc.setFontSize(14);
  doc.setTextColor(41, 128, 185);
  doc.setFont('helvetica', 'bold');
  doc.text('Photo Documentation', 20, startY);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  
  // Iterate through items and add photos
  let photoY = startY + 10;
  let photoX = 20;
  let maxHeightInRow = 0;
  const photoWidth = 80;
  const photoHeight = 60;
  
  report.items.forEach((item, index) => {
    if (item.photoUrl) {
      // Check if we need to move to next page
      if (photoY + photoHeight > pageHeight - 20) {
        doc.addPage();
        photoY = 30;
        maxHeightInRow = 0;
      }
      
      // Check if we need to move to next row
      if (photoX + photoWidth > pageWidth - 20) {
        photoX = 20;
        photoY += maxHeightInRow + 35;
        maxHeightInRow = 0;
      }
      
      try {
        // Add a placeholder for the image (in a real scenario, we'd use the actual URL)
        doc.setDrawColor(200, 200, 200);
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(photoX, photoY, photoWidth, photoHeight, 2, 2, 'FD');
        
        // Try to add the actual image if it starts with data:image
        if (item.photoUrl.startsWith('data:image') || item.photoUrl.startsWith('blob:')) {
          doc.addImage(item.photoUrl, 'JPEG', photoX, photoY, photoWidth, photoHeight);
        } else {
          // Draw a placeholder icon
          doc.setFontSize(20);
          doc.setTextColor(150, 150, 150);
          doc.text('📷', photoX + photoWidth/2, photoY + photoHeight/2, { align: 'center' });
        }
        
        // Add caption
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        const caption = doc.splitTextToSize(`${item.title} (${item.category})`, photoWidth);
        doc.text(caption, photoX, photoY + photoHeight + 10, { align: 'left' });
        
        // Update position for next photo
        photoX += photoWidth + 20;
        maxHeightInRow = Math.max(maxHeightInRow, photoHeight);
      } catch (error) {
        console.error('Error adding image to PDF:', error);
        
        // In case of error, add a placeholder with error message
        doc.setFontSize(9);
        doc.setTextColor(255, 0, 0);
        doc.text('Image error', photoX + photoWidth/2, photoY + photoHeight/2, { align: 'center' });
        
        // Update position for next photo
        photoX += photoWidth + 20;
        maxHeightInRow = Math.max(maxHeightInRow, photoHeight);
      }
    }
  });
  
  // Add footer with page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Add footer line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);
    
    // Add page numbers
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Bridge Inspection Report - ${report.bridgeName} - Page ${i} of ${pageCount}`, 
      pageWidth / 2, pageHeight - 10, { align: 'center' });
  }
  
  return doc;
};

export const downloadPDF = (doc: jsPDF, filename: string): void => {
  doc.save(filename);
};
