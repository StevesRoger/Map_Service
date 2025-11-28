import type { Transaction } from '../types/api';
import jsPDF from 'jspdf';

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  transaction: Transaction;
  customerName: string;
  customerEmail: string;
  logoImage?: string;
}

export function generateInvoiceHTML(data: InvoiceData): string {
  const { invoiceNumber, date, transaction, customerName, customerEmail } = data;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${invoiceNumber}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #ffffff;
      padding: 40px 20px;
      color: #1a1a1a;
    }
    
    .invoice-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .invoice-header {
      background: linear-gradient(135deg, #1b5ba5 0%, #0d3d6e 100%);
      padding: 40px;
      color: white;
    }
    
    .logo-section {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }
    
    .logo {
      width: 48px;
      height: 48px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .logo svg {
      width: 28px;
      height: 28px;
      fill: #1b5ba5;
    }
    
    .company-name {
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.5px;
    }
    
    .invoice-title {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 8px;
      font-weight: 400;
    }
    
    .invoice-number {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -1px;
    }
    
    .invoice-body {
      padding: 40px;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 2px solid #f0f0f0;
    }
    
    .info-section h3 {
      font-size: 12px;
      text-transform: uppercase;
      color: #666;
      margin-bottom: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    
    .info-section p {
      font-size: 14px;
      line-height: 1.6;
      color: #1a1a1a;
    }
    
    .transaction-details {
      background: #f9fafb;
      border-radius: 8px;
      padding: 30px;
      margin-bottom: 30px;
    }
    
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .detail-row:last-child {
      border-bottom: none;
    }
    
    .detail-label {
      font-size: 14px;
      color: #666;
      font-weight: 500;
    }
    
    .detail-value {
      font-size: 14px;
      color: #1a1a1a;
      font-weight: 600;
    }
    
    .amount-section {
      background: #1b5ba5;
      color: white;
      padding: 24px 30px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    
    .amount-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .amount-label {
      font-size: 16px;
      font-weight: 500;
      opacity: 0.9;
    }
    
    .amount-value {
      font-size: 36px;
      font-weight: 700;
      letter-spacing: -1px;
    }
    
    .status-badge {
      display: inline-block;
      padding: 6px 16px;
      background: #10b981;
      color: white;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 12px;
    }
    
    .footer {
      padding: 30px 40px;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }
    
    .footer-content {
      text-align: center;
    }
    
    .footer h4 {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }
    
    .footer p {
      font-size: 12px;
      color: #666;
      line-height: 1.6;
    }
    
    .footer-links {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e5e7eb;
    }
    
    .footer-links p {
      font-size: 11px;
      color: #999;
    }
    
    @media print {
      body {
        padding: 0;
      }
      
      .invoice-container {
        border: none;
        border-radius: 0;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <!-- Header -->
    <div class="invoice-header">
      <div class="logo-section">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <span class="company-name">RokTenh Map API</span>
      </div>
      <div>
        <p class="invoice-title">INVOICE</p>
        <p class="invoice-number">#${invoiceNumber}</p>
      </div>
    </div>
    
    <!-- Body -->
    <div class="invoice-body">
      <!-- Info Grid -->
      <div class="info-grid">
        <div class="info-section">
          <h3>Invoice To</h3>
          <p><strong>${customerName}</strong></p>
          <p>${customerEmail}</p>
        </div>
        <div class="info-section">
          <h3>Invoice Details</h3>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Payment Method :</strong> KHQR</p>
        </div>
      </div>
      
      <!-- Transaction Details -->
      <div class="transaction-details">
        <div class="detail-row">
          <span class="detail-label">Description</span>
          <span class="detail-value">Account top-up via KHQR</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Transaction Type</span>
          <span class="detail-value">${transaction.type.replace('_', ' ').toUpperCase()}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Processing Fee</span>
          <span class="detail-value">$0.00</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Balance After Transaction</span>
          <span class="detail-value">$${transaction.balanceAfter.toFixed(2)}</span>
        </div>
      </div>
      
      <!-- Amount Section -->
      <div class="amount-section">
        <div class="amount-row">
          <div>
            <p class="amount-label">Total Amount</p>
            <div class="status-badge">PAID</div>
          </div>
          <p class="amount-value">$${Math.abs(transaction.amount).toFixed(2)}</p>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="footer-content">
        <h4>RokTenh Map API</h4>
        <p>Map Service Platform</p>
        <p>Providing geocoding, routing, and place search services</p>
        <div class="footer-links">
          <p>This is an automated invoice. No signature required.</p>
          <p>© ${new Date().getFullYear()} RokTenh Map API. All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export function downloadInvoice(data: InvoiceData): void {
  const { invoiceNumber, date, transaction, customerName, customerEmail, logoImage } = data;
  
  // Create PDF with A4 size
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Header - Blue gradient background (simulated with rectangle)
  pdf.setFillColor(27, 91, 165); // #1b5ba5
  pdf.rect(0, 0, pageWidth, 60, 'F');
  
  // Add logo if provided
  if (logoImage) {
    try {
      // Try to add the image - works with data URLs, http URLs, blob URLs, and file paths
      pdf.addImage(logoImage, 'PNG', margin, 14, 12, 12, undefined, 'FAST');
    } catch (error) {
      // Fallback to white circle with blue center if image fails to load
      pdf.setFillColor(255, 255, 255);
      pdf.circle(margin + 6, 20, 6, 'F');
      pdf.setFillColor(27, 91, 165);
      pdf.circle(margin + 6, 20, 3, 'F');
    }
  } else {
    // Fallback logo design
    pdf.setFillColor(255, 255, 255);
    pdf.circle(margin + 6, 20, 6, 'F');
    pdf.setFillColor(27, 91, 165);
    pdf.circle(margin + 6, 20, 3, 'F');
  }
  
  // Company name
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont(undefined, 'bold');
  pdf.text('RokTenh Map API', margin + 15, 23);
  
  // Invoice label
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.text('INVOICE', margin, 42);
  
  // Invoice number
  pdf.setFontSize(24);
  pdf.setFont(undefined, 'bold');
  pdf.text(`#${invoiceNumber}`, margin, 52);
  
  // Reset text color for body
  pdf.setTextColor(0, 0, 0);
  
  let yPos = 75;
  
  // Invoice To section
  pdf.setFontSize(9);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(100, 100, 100);
  pdf.text('INVOICE TO', margin, yPos);
  
  pdf.setFontSize(11);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text(customerName, margin, yPos + 7);
  
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(80, 80, 80);
  pdf.text(customerEmail, margin, yPos + 13);
  
  // Invoice Details section (right side)
  const rightColX = pageWidth / 2 + 10;
  pdf.setFontSize(9);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(100, 100, 100);
  pdf.text('INVOICE DETAILS', rightColX, yPos);
  
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Date: ${date}`, rightColX, yPos + 7);
  pdf.text(`Payment Method : KHQR`, rightColX, yPos + 13);
  
  yPos += 28;
  
  // Separator line
  pdf.setDrawColor(220, 220, 220);
  pdf.setLineWidth(0.5);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  
  yPos += 10;
  
  // Transaction Details box
  pdf.setFillColor(249, 250, 251);
  pdf.rect(margin, yPos, contentWidth, 50, 'F');
  
  yPos += 8;
  
  // Transaction details rows
  const details = [
    ['Description', 'Account top-up via KHQR'],
    ['Transaction Type', transaction.type.replace('_', ' ').toUpperCase()],
    ['Processing Fee', '$0.00'],
    ['Balance After Transaction', `$${transaction.balanceAfter.toFixed(2)}`]
  ];
  
  pdf.setFontSize(9);
  details.forEach((detail, index) => {
    pdf.setTextColor(100, 100, 100);
    pdf.setFont(undefined, 'normal');
    pdf.text(detail[0], margin + 5, yPos + (index * 10));
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text(detail[1], pageWidth - margin - 5, yPos + (index * 10), { align: 'right' });
    
    if (index < details.length - 1) {
      pdf.setDrawColor(229, 231, 235);
      pdf.line(margin + 5, yPos + (index * 10) + 3, pageWidth - margin - 5, yPos + (index * 10) + 3);
    }
  });
  
  yPos += 45;
  
  // Amount section
  pdf.setFillColor(27, 91, 165);
  pdf.rect(margin, yPos, contentWidth, 35, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'normal');
  pdf.text('Total Amount', margin + 5, yPos + 10);
  
  // PAID badge
  pdf.setFillColor(16, 185, 129);
  pdf.rect(margin + 5, yPos + 15, 20, 8, 'F');
  pdf.setFontSize(8);
  pdf.setFont(undefined, 'bold');
  pdf.text('PAID', margin + 15, yPos + 20, { align: 'center' });
  
  // Amount value
  pdf.setFontSize(28);
  pdf.setFont(undefined, 'bold');
  pdf.text(`$${Math.abs(transaction.amount).toFixed(2)}`, pageWidth - margin - 5, yPos + 23, { align: 'right' });
  
  // Footer
  yPos = pageHeight - 45;
  
  pdf.setFillColor(249, 250, 251);
  pdf.rect(0, yPos, pageWidth, 45, 'F');
  
  pdf.setDrawColor(229, 231, 235);
  pdf.line(0, yPos, pageWidth, yPos);
  
  yPos += 10;
  
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(11);
  pdf.setFont(undefined, 'bold');
  pdf.text('RokTenh Map API', pageWidth / 2, yPos, { align: 'center' });
  
  pdf.setFontSize(9);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(100, 100, 100);
  pdf.text('Map Service Platform', pageWidth / 2, yPos + 6, { align: 'center' });
  pdf.text('Providing geocoding, routing, and place search services', pageWidth / 2, yPos + 11, { align: 'center' });
  
  yPos += 18;
  pdf.setDrawColor(229, 231, 235);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  
  pdf.setFontSize(8);
  pdf.setTextColor(120, 120, 120);
  pdf.text('This is an automated invoice. No signature required.', pageWidth / 2, yPos + 5, { align: 'center' });
  pdf.setTextColor(160, 160, 160);
  pdf.text(`© ${new Date().getFullYear()} RokTenh Map API. All rights reserved.`, pageWidth / 2, yPos + 10, { align: 'center' });
  
  // Save the PDF
  pdf.save(`RokTenh-Invoice-${invoiceNumber}.pdf`);
}

export function generateInvoiceNumber(): string {
  const prefix = 'RTM';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
}