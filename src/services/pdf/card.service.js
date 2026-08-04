import PDFDocument from 'pdfkit';
import { generateQRCode } from '../../utils/qr.js';

const primaryColor = '#0B3C6F';
const secondaryColor = '#3A7DBA';

const drawCard = async (doc, data, pageNumber = 1) => {
  // Main Card Border & Background
  doc.rect(40, 40, 250, 140).fillColor('white').stroke(primaryColor).lineWidth(1.2).fillAndStroke();

  // Header Bar
  doc.rect(40, 40, 250, 30).fill(primaryColor);
  doc.fillColor('white').font('Helvetica-Bold').fontSize(10).text(data.schoolName?.toUpperCase() || 'ÉCOLE NON DÉFINIE', 45, 52, {
    width: 240,
    align: 'center'
  });

  if (pageNumber === 1) {
    // --- RECTO (Front) ---
    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(7).text('RECTO', 42, 32);

    // Photo Section
    const photoX = 55;
    const photoY = 78;
    const photoW = 55;
    const photoH = 65;

    doc.rect(photoX, photoY, photoW, photoH).stroke('#cccccc').lineWidth(0.5);
    if (data.photoBuffer) {
      try {
        doc.image(data.photoBuffer, photoX + 1, photoY + 1, { width: photoW - 2, height: photoH - 2 });
      } catch (e) {
        doc.fillColor('#cccccc').fontSize(6).text('ERR PHOTO', photoX, photoY + 25, { align: 'center', width: photoW });
      }
    } else {
      doc.fillColor('#cccccc').fontSize(6).text('PHOTO', photoX, photoY + 25, { align: 'center', width: photoW });
    }

    // Details Section
    const detailsX = 120;
    let detailsY = 80;

    const addDetail = (label, value) => {
      if (!value && label !== 'NOM:') return; // Skip if empty, but always show name
      doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(7).text(label, detailsX, detailsY);
      doc.fillColor('#111827').font('Helvetica').fontSize(8).text(value || 'N/A', detailsX + 50, detailsY);
      detailsY += 14;
    };

    if (data.type === 'student') {
      addDetail('NOM:', data.lastName);
      addDetail('PRÉNOM:', data.firstName);
      addDetail('CLASSE:', data.className);
      addDetail('MATRICULE:', data.studentNumber);
    } else {
      addDetail('NOM:', data.lastName);
      addDetail('PRÉNOM:', data.firstName);
      addDetail('FONCTION:', data.function);
      addDetail('GENRE:', data.gender === 'M' ? 'MASCULIN' : 'FÉMININ');
    }

    // QR Code
    try {
      const identifier = data.type === 'student' ? data.studentNumber : `STAFF-${data.id}`;
      const qrData = JSON.stringify({ id: data.id, num: identifier, sch: data.schoolCode, type: data.type });
      const qrBuffer = await generateQRCode(qrData);
      doc.image(qrBuffer, 240, 130, { width: 35, height: 35 });
    } catch (e) {}

  } else {
    // --- VERSO (Back) ---
    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(7).text('VERSO', 42, 32);

    // School Logo (Top right of content area)
    if (data.schoolLogo) {
      try {
        doc.image(data.schoolLogo, 230, 75, { fit: [35, 35] });
      } catch (e) {}
    }

    // Conditions
    doc.fillColor('#374151').font('Helvetica-Bold').fontSize(7).text('CONDITIONS D\'UTILISATION', 55, 78);
    doc.font('Helvetica').fontSize(6).fillColor('#4B5563').text(
      '1. Cette carte est strictement personnelle.\n2. En cas de perte, avisez l\'administration.\n3. Tout usage frauduleux est passible de sanctions.',
      55, 88, { width: 150 }
    );

    // Validity
    const year = new Date().getFullYear();
    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(7).text(`ANNÉE SCOLAIRE: ${year}-${year + 1}`, 55, 115);

    // Authority Section
    doc.fillColor('#111827').font('Helvetica-Bold').fontSize(7).text('LE DIRECTEUR', 180, 115, { align: 'center', width: 100 });

    // Signature & Stamp (placed under "LE DIRECTEUR")
    if (data.signature) {
      try {
        doc.image(data.signature, 195, 122, { width: 40 });
      } catch (e) {}
    }
    if (data.schoolStamp) {
      try {
        doc.image(data.schoolStamp, 210, 118, { width: 35 });
      } catch (e) {}
    }

    // Principal/Admin Stamp if separate
    if (data.principalStamp) {
        try {
          doc.image(data.principalStamp, 185, 118, { width: 30 });
        } catch (e) {}
    }
  }

  // Bottom Accent Bar
  doc.rect(40, 172, 250, 8).fill(secondaryColor);
  doc.fillColor('white').fontSize(5).text('MA CARTE - NM ACADEMIA', 40, 174, { width: 250, align: 'center' });
};

export const generateCardPDF = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: [330, 220], margin: 0 });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Page 1: Recto
      await drawCard(doc, data, 1);

      // Page 2: Verso
      doc.addPage({ size: [330, 220], margin: 0 });
      await drawCard(doc, data, 2);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
