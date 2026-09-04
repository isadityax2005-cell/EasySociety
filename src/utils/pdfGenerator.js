import { jsPDF } from 'jspdf';

/**
 * Generates an official, legal Maharashtra CHS Maintenance PDF Receipt
 * using vector drawing and typography in jsPDF.
 */
export function generateReceiptPDF(flat, societyInfo, bankInfo, billingConfig) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const receiptNo = `ES-2026-A${flat.flatNumber}-${(flat.utr || 'VJSB').slice(-6)}`;
  const paymentDate = flat.paymentDate || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const filename = `GoldenNest_Receipt_Flat_${flat.flatNumber}_${billingConfig.currentMonth.replace(/\s+/g, '_')}.pdf`;

  // Colors
  const navy = [15, 23, 42];
  const indigo = [99, 102, 241];
  const emerald = [16, 185, 129];
  const gray = [100, 116, 139];
  const darkGray = [51, 65, 85];
  const lightBg = [248, 250, 252];

  // 1. Outer Border & Header Banner
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.5);
  doc.roundedRect(10, 10, 190, 277, 3, 3, 'S');

  // Decorative top accent bar
  doc.setFillColor(...indigo);
  doc.rect(10, 10, 190, 4, 'F');

  // 2. Society Header Information
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...navy);
  doc.text(societyInfo.name, 105, 24, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...gray);
  doc.text(`Registration No: ${societyInfo.regNo}`, 105, 30, { align: 'center' });
  doc.text(societyInfo.address, 105, 35, { align: 'center' });

  // Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.line(18, 40, 192, 40);

  // 3. Receipt Title Badge
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...indigo);
  doc.roundedRect(55, 44, 100, 10, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...indigo);
  doc.text('OFFICIAL MAINTENANCE PAYMENT RECEIPT', 105, 50.5, { align: 'center' });

  // 4. Receipt Metadata Box (Two Columns)
  doc.setFillColor(...lightBg);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(18, 58, 174, 34, 2, 2, 'FD');

  doc.setFontSize(9);
  // Column 1
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...gray);
  doc.text('RECEIPT NO:', 24, 65);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...navy);
  doc.text(receiptNo, 55, 65);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...gray);
  doc.text('FLAT & WING:', 24, 73);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...navy);
  doc.text(`Flat ${flat.flatNumber} (Wing A, Floor ${flat.floor || 1})`, 55, 73);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...gray);
  doc.text('RESIDENT NAME:', 24, 81);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...navy);
  doc.text(`${flat.ownerName} (${flat.residentType || 'Owner'})`, 55, 81);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...gray);
  doc.text('CONTACT NO:', 24, 89);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  doc.text(flat.phone, 55, 89);

  // Column 2
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...gray);
  doc.text('DATE OF RECEIPT:', 115, 65);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...navy);
  doc.text(paymentDate, 152, 65);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...gray);
  doc.text('BILLING MONTH:', 115, 73);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...indigo);
  doc.text(billingConfig.currentMonth, 152, 73);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...gray);
  doc.text('PAYMENT MODE:', 115, 81);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  doc.text('UPI / QR Code', 152, 81);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...gray);
  doc.text('BANK UTR / REF:', 115, 89);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...emerald);
  doc.text(flat.utr || 'VERIFIED-BY-TREASURER', 152, 89);

  // 5. Itemized Fee Breakup Table
  const tableTop = 98;
  doc.setFillColor(...navy);
  doc.rect(18, tableTop, 174, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('SR', 24, tableTop + 5.5);
  doc.text('PARTICULARS / ACCOUNT HEAD', 38, tableTop + 5.5);
  doc.text('AMOUNT (INR)', 185, tableTop + 5.5, { align: 'right' });

  const items = [
    { sr: '1', name: 'Society Service & Maintenance Charges', amt: `Rs. ${billingConfig.breakdown.maintenanceFee.toFixed(2)}` },
    { sr: '2', name: 'Sinking Fund Contribution (Statutory MCS Rule)', amt: `Rs. ${billingConfig.breakdown.sinkingFund.toFixed(2)}` },
    { sr: '3', name: 'Building Major Repair & Painting Reserve Fund', amt: `Rs. ${billingConfig.breakdown.repairFund.toFixed(2)}` },
    { sr: '4', name: 'Water Tanker & Common Electricity Charges', amt: `Rs. ${billingConfig.breakdown.waterCharges.toFixed(2)}` },
    { sr: '5', name: 'Festival & Cultural Activity Advance', amt: `Rs. ${billingConfig.breakdown.festivalAdvance.toFixed(2)}` },
  ];

  let currentY = tableTop + 8;
  doc.setFontSize(9);

  items.forEach((item, index) => {
    const isEven = index % 2 === 0;
    if (isEven) {
      doc.setFillColor(250, 250, 250);
      doc.rect(18, currentY, 174, 8, 'F');
    }
    doc.setDrawColor(241, 245, 249);
    doc.line(18, currentY + 8, 192, currentY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkGray);
    doc.text(item.sr, 24, currentY + 5.5);
    doc.text(item.name, 38, currentY + 5.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...navy);
    doc.text(item.amt, 185, currentY + 5.5, { align: 'right' });

    currentY += 8;
  });

  // Total Row Box
  doc.setFillColor(...emerald);
  doc.rect(18, currentY, 174, 11, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL AMOUNT PAID', 24, currentY + 7.5);
  doc.text(`Rs. ${flat.amount.toLocaleString('en-IN')}.00`, 185, currentY + 7.5, { align: 'right' });

  // Amount in words
  currentY += 16;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  doc.text('Amount in words: Rupees Two Thousand Five Hundred Only', 24, currentY);

  // 6. Bank Account & Settlement Note
  currentY += 10;
  doc.setFillColor(...lightBg);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(18, currentY, 174, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...navy);
  doc.text(`Bank Credited: ${bankInfo.bankName} (${bankInfo.branch})`, 24, currentY + 7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...gray);
  doc.text(`Account Name: ${bankInfo.accountName}  |  A/C No: ${bankInfo.accountNumber}`, 24, currentY + 13);
  doc.text(`IFSC: ${bankInfo.ifsc}  |  UPI ID: ${bankInfo.upiId}`, 24, currentY + 18);

  // 7. Society Digital Seal & Treasurer Signature
  currentY += 32;

  // Stamp circle (left)
  doc.setDrawColor(...emerald);
  doc.setLineWidth(0.8);
  doc.circle(55, currentY + 10, 16, 'S');
  doc.circle(55, currentY + 10, 14, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...emerald);
  doc.text('GOLDEN NEST PH 1 CHS', 55, currentY + 7, { align: 'center' });
  doc.text('★ VERIFIED ★', 55, currentY + 11, { align: 'center' });
  doc.text('TREASURER OFFICE', 55, currentY + 15, { align: 'center' });

  // Treasurer signature line (right)
  doc.setDrawColor(...navy);
  doc.setLineWidth(0.5);
  doc.line(135, currentY + 16, 185, currentY + 16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...navy);
  doc.text('Rajkumar Singh', 160, currentY + 12, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.text('Hon. Treasurer (Building A)', 160, currentY + 20, { align: 'center' });
  doc.text('Golden Nest Phase 1 CHS', 160, currentY + 24, { align: 'center' });

  // 8. Footer Note
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...gray);
  doc.text('This is a computer-generated official receipt issued by EasySociety Digital Portal.', 105, 275, { align: 'center' });
  doc.text('Subject to realization of payment. No physical signature required.', 105, 279, { align: 'center' });

  // Trigger browser download
  doc.save(filename);

  return doc;
}
