const fs = require('fs');
const pdfParse = require('pdf-parse');

async function extractParagraphsFromPDF(filePath, paragraphNumbers) {
  const dataBuffer = fs.readFileSync(filePath);

  try {
    const data = await pdfParse(dataBuffer);
    const text = data.text;
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');

    const extractedParagraphs = paragraphNumbers.map(num => {
      const regex = new RegExp(`^${num}\\.`);
      const startIndex = paragraphs.findIndex(p => regex.test(p));
      if (startIndex === -1) return null;

      let paragraph = paragraphs[startIndex];
      for (let i = startIndex + 1; i < paragraphs.length; i++) {
        if (/^\d+\./.test(paragraphs[i])) break;
        paragraph += '\n' + paragraphs[i];
      }
      return paragraph;
    }).filter(p => p);

    const resultString = extractedParagraphs.join('\n\n\n\n\n\n\n\n');
    console.log(resultString);
  } catch (error) {
    console.error('Error reading PDF:', error);
  }
}


// Example usage:
extractParagraphsFromPDF('prueba4.pdf', [1, 2, 26]);
// extractParagraphsFromScannedPDF('path/to/scanned.pdf', [5, 6]); 