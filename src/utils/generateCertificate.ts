import { jsPDF } from 'jspdf';

export async function generateCertificate(userName: string, date: string): Promise<void> {
  // A4 Landscape: 297 x 210 mm
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Load the template image
  const templateImg = new Image();
  templateImg.src = '/certificate-template.jpg';

  await new Promise((resolve, reject) => {
    templateImg.onload = resolve;
    templateImg.onerror = reject;
  });

  // Add the background image covering the whole A4 page
  doc.addImage(templateImg, 'JPEG', 0, 0, 297, 210);

  // Set font
  doc.setFont('helvetica', 'normal');
  
  // 1. Participant Name
  doc.setFontSize(28);
  doc.setTextColor(42, 60, 26); // Dark green matching the theme
  const nameWidth = doc.getTextWidth(userName);
  // Center horizontally (A4 width is 297)
  const xName = (297 - nameWidth) / 2;
  // Position it below "THIS IS TO CERTIFY THAT"
  // Moved up to Y=110 to sit above the gold line and prevent overlap
  doc.text(userName, xName, 110);

  // 2. Program Director (Pooja Sharma)
  doc.setFontSize(14);
  doc.setTextColor(42, 42, 40);
  const directorText = 'Pooja Sharma';
  const directorWidth = doc.getTextWidth(directorText);
  // Place on the bottom left line (around x=70, y=175)
  // Let's align it horizontally with the left line. Assuming the line is centered around x=75
  const xDir = 75 - (directorWidth / 2);
  doc.text(directorText, xDir, 175);

  // 3. Date
  const dateWidth = doc.getTextWidth(date);
  // Place on the bottom right line (around x=222)
  const xDate = 222 - (dateWidth / 2);
  doc.text(date, xDate, 175);

  // Save the PDF
  doc.save(`Shikhar_Certificate_${userName.replace(/\s+/g, '_')}.pdf`);
}
