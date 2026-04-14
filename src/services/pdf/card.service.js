import PDFDocument from 'pdfkit';
import { generateQRCode } from '../../utils/qr.js';

export const generateCardPDF = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a compact ID card sized PDF, roughly CR80 size: 3.375 x 2.125 inches
      // In points (72 points per inch): 242.64 x 153
      // We will use standard badge size: [242.64, 153] or portrait [153, 242.64]
      // Let's use portrait badge: 2.125 x 3.375 inches
      const doc = new PDFDocument({
        size: [153, 242.64],
        margins: { top: 10, left: 10, right: 10, bottom: 10 }
      });

      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Card Background / Header
      doc.rect(0, 0, 153, 40).fill('#0f4c81');
      
      // School Name
      doc.fillColor('#ffffff').fontSize(10).text(data.schoolName || 'School Name', 0, 15, { align: 'center', width: 153 });

      // Photo Frame
      doc.rect(51.5, 45, 50, 60).stroke('#cccccc');
      if (data.photoBuffer) {
        // Assume photoBuffer is passed if downloaded, else we leave frame empty
        doc.image(data.photoBuffer, 51.5, 45, { width: 50, height: 60 });
      } else {
        doc.fillColor('#cccccc').fontSize(8).text('NO PHOTO', 51.5, 70, { align: 'center', width: 50 });
      }

      // Name
      doc.fillColor('#000000').fontSize(10).text(`${data.firstName} ${data.lastName}`, 10, 115, { align: 'center', width: 133 });
      
      // Role / Class
      const subtitle = data.type === 'student' ? `Class: ${data.className || 'N/A'}` : `${data.function || 'Staff'}`;
      doc.fontSize(8).fillColor('#666666').text(subtitle, 10, 130, { align: 'center', width: 133 });

      // ID Number
      const identifier = data.type === 'student' ? data.studentNumber : `STAFF-${data.id}`;
      doc.fontSize(8).fillColor('#333333').text(`ID: ${identifier}`, 10, 142, { align: 'center', width: 133 });

      // Build QR info
      const qrData = JSON.stringify({
        id: identifier,
        type: data.type,
        school: data.schoolCode
      });
      
      const qrBuffer = await generateQRCode(qrData);
      doc.image(qrBuffer, 56.5, 160, { width: 40, height: 40 });

      if (data.stampBuffer) {
         doc.image(data.stampBuffer, 100, 200, { width: 40 });
      }

      // Footer
      doc.rect(0, 222.64, 153, 20).fill('#0f4c81');
      doc.fillColor('#ffffff').fontSize(6).text('Valid for current year only', 0, 228, { align: 'center', width: 153 });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
