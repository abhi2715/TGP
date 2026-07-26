const { jsPDF } = require("jspdf");

for (let i = 1; i <= 6; i++) {
  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.text(`Shikhar Session ${i} - Placeholder PDF`, 20, 30);
  doc.setFontSize(14);
  doc.text("The Growth Project", 20, 50);
  doc.text("This is a placeholder for the actual session PDF content.", 20, 70);
  doc.save(`public/pdfs/session-${i}.pdf`);
}
console.log("PDFs generated.");
