import PDFDocument from 'pdfkit';
import { generateQRCode } from '../../utils/qr.js';

export const generateCardPDF = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Standard CR80 ID Card size (85.6mm x 54mm) in points: 242.64 x 153
      // Orientation: Landscape
      const doc = new PDFDocument({
        size: [242.64, 153],
        margins: { top: 0, left: 0, right: 0, bottom: 0 }
      });

      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // --- PAGE 1: RECTO (Front) ---
      
      // Header Background
      doc.rect(0, 0, 242.64, 35).fill('#0f4c81');

      // "REPUBLIQUE"
      doc.fillColor('#ffffff').fontSize(6).text('REPUBLIQUE DEMOCRATIQUE DU CONGO', 0, 5, { align: 'center', width: 242.64 });

      // School Name in Header
      doc.fillColor('#ffffff').fontSize(9).font('Helvetica-Bold').text(data.schoolName?.toUpperCase() || 'ÉCOLE NON DÉFINIE', 0, 15, { align: 'center', width: 242.64 });

      // Photo Section (Left)
      const photoX = 15;
      const photoY = 45;
      const photoW = 60;
      const photoH = 75;

      doc.rect(photoX, photoY, photoW, photoH).stroke('#0f4c81');
      if (data.photoBuffer) {
        doc.image(data.photoBuffer, photoX + 1, photoY + 1, { width: photoW - 2, height: photoH - 2 });
      } else {
        doc.fillColor('#cccccc').fontSize(7).text('PAS DE PHOTO', photoX, photoY + 30, { align: 'center', width: photoW });
      }

      // Details Section (Right)
      const detailsX = 85;
      const detailsY = 45;

      doc.fillColor('#0f4c81').fontSize(7).font('Helvetica-Bold').text('NOM:', detailsX, detailsY);
      doc.fillColor('#000000').fontSize(8).font('Helvetica').text(`${data.lastName} ${data.firstName}`, detailsX + 30, detailsY);

      doc.fillColor('#0f4c81').fontSize(7).font('Helvetica-Bold').text('CLASSE:', detailsX, detailsY + 15);
      doc.fillColor('#000000').fontSize(8).font('Helvetica').text(data.className || 'N/A', detailsX + 35, detailsY + 15);

      doc.fillColor('#0f4c81').fontSize(7).font('Helvetica-Bold').text('SEXE:', detailsX, detailsY + 30);
      doc.fillColor('#000000').fontSize(8).font('Helvetica').text(data.gender === 'M' ? 'MASCULIN' : 'FÉMININ', detailsX + 30, detailsY + 30);

      doc.fillColor('#0f4c81').fontSize(7).font('Helvetica-Bold').text('MATRICULE:', detailsX, detailsY + 45);
      doc.fillColor('#000000').fontSize(8).font('Helvetica').text(data.studentNumber || 'N/A', detailsX + 45, detailsY + 45);

      // QR Code (Bottom Right)
      const qrData = JSON.stringify({
        id: data.id,
        num: data.studentNumber,
        sch: data.schoolCode
      });
      const qrBuffer = await generateQRCode(qrData);
      doc.image(qrBuffer, 190, 95, { width: 40, height: 40 });

      // Footer line
      doc.rect(0, 143, 242.64, 10).fill('#0f4c81');
      doc.fillColor('#ffffff').fontSize(5).text('CARTE D\'IDENTITÉ SCOLAIRE', 0, 145, { align: 'center', width: 242.64 });

      // --- PAGE 2: VERSO (Back) ---
      doc.addPage({
        size: [242.64, 153],
        margins: { top: 0, left: 0, right: 0, bottom: 0 }
      });

      // Background decorative element
      doc.rect(0, 0, 242.64, 153).fill('#f9f9f9');
      doc.rect(0, 0, 242.64, 10).fill('#0f4c81');

      // School Logo (Center small)
      if (data.schoolLogo) {
          doc.image(data.schoolLogo, 106, 20, { width: 30 });
      }

      // Information text
      doc.fillColor('#333333').fontSize(7).font('Helvetica-Bold').text('CONDITIONS D\'UTILISATION', 15, 30);
      doc.font('Helvetica').fontSize(6).text('1. Cette carte est strictement personnelle.\n2. En cas de perte, veuillez informer l\'administration de l\'école.\n3. Tout usage frauduleux expose son auteur à des sanctions.', 15, 45, { width: 150 });

      // Validity
      const currentYear = new Date().getFullYear();
      doc.fillColor('#0f4c81').fontSize(7).font('Helvetica-Bold').text(`ANNÉE SCOLAIRE: ${currentYear}-${currentYear+1}`, 15, 80);

      // Signature & Stamp Section
      doc.fillColor('#000000').fontSize(7).font('Helvetica-Bold').text('LE DIRECTEUR', 150, 80, { align: 'center', width: 80 });

      // Signature placeholder
      if (data.signature) {
          doc.image(data.signature, 160, 90, { width: 60 });
      }

      // Stamp placeholder
      if (data.schoolStamp) {
          doc.image(data.schoolStamp, 170, 85, { width: 50 });
      }

      // Contact or Address
      doc.fillColor('#666666').fontSize(6).text('Contact: contact@nmacademia.bi | www.nmacademia.bi', 0, 135, { align: 'center', width: 242.64 });

      // Final Footer
      doc.rect(0, 143, 242.64, 10).fill('#0f4c81');

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
