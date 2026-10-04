const { PDFParse } = require('pdf-parse');
const fs = require('fs');

class PdfService {
    async extractText(filePath) {
        try {
            const dataBuffer = fs.readFileSync(filePath);
            const parser = new PDFParse({ data: dataBuffer });
            const data = await parser.getText();

            // result is an object with a 'text' property in v2
            const extractedText = data && data.text ? data.text : data;

            if (!extractedText || (typeof extractedText === 'string' && extractedText.trim().length === 0)) {
                throw new Error('No meaningful text could be extracted from the PDF.');
            }

            return extractedText;
        } catch (error) {
            console.error('PDF Extraction Error:', error.message);
            throw new Error(`Failed to extract text from PDF: ${error.message}`);
        }
    }

    async deleteFile(filePath) {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (error) {
            console.error('File deletion error:', error.message);
        }
    }
}

module.exports = new PdfService();
