
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
  
  // Add title
  doc.setFontSize(20);
  doc.text('Bridge Inspection Report', pageWidth / 2, 20, { align: 'center' });
  
  // Add report details
  doc.setFontSize(12);
  doc.text(`Bridge: ${report.bridgeName}`, 14, 40);
  doc.text(`Location: ${report.location}`, 14, 48);
  doc.text(`Inspector: ${report.inspectorName}`, 14, 56);
  doc.text(`Date: ${new Date(report.date).toLocaleDateString()}`, 14, 64);
  
  // Add summary section
  doc.setFontSize(16);
  doc.text('Inspection Summary', 14, 80);
  
  // Count issues by severity
  const issueCounts = { minor: 0, moderate: 0, critical: 0 };
  report.items.forEach(item => {
    item.comments.forEach(comment => {
      issueCounts[comment.severity]++;
    });
  });
  
  doc.setFontSize(12);
  doc.text(`Total inspection items: ${report.items.length}`, 14, 90);
  doc.text(`Issues found: ${issueCounts.minor + issueCounts.moderate + issueCounts.critical}`, 14, 98);
  doc.text(`Critical issues: ${issueCounts.critical}`, 14, 106);
  doc.text(`Moderate issues: ${issueCounts.moderate}`, 14, 114);
  doc.text(`Minor issues: ${issueCounts.minor}`, 14, 122);
  
  // Add notes if available
  if (report.notes) {
    doc.setFontSize(16);
    doc.text('Notes', 14, 140);
    doc.setFontSize(12);
    doc.text(report.notes, 14, 150);
  }
  
  // Add detailed findings section
  doc.addPage();
  doc.setFontSize(16);
  doc.text('Detailed Findings', 14, 20);
  
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
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 30 }
    });
  }
  
  return doc;
};

export const downloadPDF = (doc: jsPDF, filename: string): void => {
  doc.save(filename);
};
