import { jsPDF } from 'jspdf';


export const generateSessionTranscript = (sessionNumber: number, title: string) => {
  const raw = localStorage.getItem('shikhar-program-data');
  const state = raw ? JSON.parse(raw) : { sessions: {} };
  const sessionAnswers = state.sessions?.[sessionNumber]?.exerciseData || {};
  const reflection = sessionAnswers.reflection || '';
  
  // Create PDF
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Fonts and Colors
  doc.setFont('helvetica', 'normal');
  const primaryColor: [number, number, number] = [85, 107, 47]; // Olive Green
  const secondaryColor: [number, number, number] = [218, 165, 32]; // Gold
  const textColor: [number, number, number] = [40, 40, 40];

  let y = 20;
  const margin = 20;
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;

  const checkPageBreak = (neededSpace: number) => {
    if (y + neededSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
      addHeader();
    }
  };

  const addHeader = () => {
    // Header bar
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 15, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('THE GROWTH PROJECT', margin, 10);
    
    doc.setTextColor(...secondaryColor);
    doc.text('SHIKHAR PROGRAMME', pageWidth - margin, 10, { align: 'right' });
    y = 30;
  };

  // Title
  addHeader();
  doc.setTextColor(...primaryColor);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(`Session ${sessionNumber} Transcript`, margin, y);
  y += 10;
  
  doc.setFontSize(16);
  doc.setTextColor(...secondaryColor);
  doc.text(title, margin, y);
  y += 15;

  // Metadata
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, y);
  
  // Divider
  y += 5;
  doc.setDrawColor(230, 230, 230);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  // Questions and Answers
  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Responses', margin, y);
  y += 10;

  Object.entries(sessionAnswers).forEach(([taskId, answer]) => {
    checkPageBreak(40);
    
    // Question/Task ID
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'bold');
    doc.text(`Task: ${taskId.replace('-', ' ').toUpperCase()}`, margin, y);
    y += 7;

    // Answer
    doc.setFontSize(11);
    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'normal');
    
    const answerStr = typeof answer === 'string' ? answer : JSON.stringify(answer);
    const splitAnswer = doc.splitTextToSize(answerStr || 'No response provided.', pageWidth - 2 * margin);
    doc.text(splitAnswer, margin, y);
    y += (splitAnswer.length * 6) + 10;
  });

  // Reflection
  if (reflection) {
    checkPageBreak(50);
    y += 5;
    
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Session Reflection', margin, y);
    y += 10;

    doc.setFontSize(11);
    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'italic');
    
    const splitReflection = doc.splitTextToSize(reflection, pageWidth - 2 * margin);
    doc.text(splitReflection, margin, y);
    y += (splitReflection.length * 6) + 15;
  }

  // Footer Signature
  checkPageBreak(30);
  y += 10;
  doc.setTextColor(...secondaryColor);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(12);
  doc.text('Keep growing.', margin, y);
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.text('- Dr. Pooja Sharma', margin, y);

  // Save the PDF
  doc.save(`Shikhar_Session_${sessionNumber}_Transcript.pdf`);
};
