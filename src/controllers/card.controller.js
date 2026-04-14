import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Card, Student, Staff, School, Class, PrintLog } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { generateCardPDF } from '../services/pdf/card.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCard = async (req, res) => {
  const { type, student_id, staff_id, school_id } = req.body;

  if (!type || !school_id) {
    return errorResponse(res, 400, 'Type and school_id are required');
  }

  const school = await School.findByPk(school_id);
  if (!school) return errorResponse(res, 404, 'School not found');

  let entity = null;
  let cardData = {
    type,
    schoolName: school.name,
    schoolCode: school.code,
  };

  if (type === 'student') {
    entity = await Student.findByPk(student_id, {
      include: [{ model: Class, as: 'class' }]
    });
    if (!entity) return errorResponse(res, 404, 'Student not found');
    
    cardData = {
      ...cardData,
      id: entity.id,
      firstName: entity.first_name,
      lastName: entity.last_name,
      studentNumber: entity.student_number,
      className: entity.class?.name,
      // photoBuffer/stampBuffer logic could be handled if URLs are local or HTTP
    };
  } else {
    entity = await Staff.findByPk(staff_id);
    if (!entity) return errorResponse(res, 404, 'Staff not found');

    cardData = {
      ...cardData,
      id: entity.id,
      firstName: entity.first_name,
      lastName: entity.last_name,
      function: entity.function
    };
  }

  try {
    // Generate PDF
    const pdfBuffer = await generateCardPDF(cardData);

    // Ensure directory exists
    const uploadsDir = path.join(__dirname, '../../uploads/cards');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = `card_${type}_${entity.id}_${Date.now()}.pdf`;
    const filepath = path.join(uploadsDir, filename);

    fs.writeFileSync(filepath, pdfBuffer);

    // Save record in Card table
    const card = await Card.create({
      school_id,
      type,
      student_id: type === 'student' ? student_id : null,
      staff_id: type === 'staff' ? staff_id : null,
      pdf_url: `uploads/cards/${filename}`,
      printed_at: null
    });

    // Return the response
    successResponse(res, 201, 'Card generated successfully', card);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, 'Error generating PDF card');
  }
};

export const downloadCard = async (req, res) => {
  const card = await Card.findByPk(req.params.id);
  if (!card) return errorResponse(res, 404, 'Card not found');

  const filePath = path.join(__dirname, '../../', card.pdf_url);
  
  if (!fs.existsSync(filePath)) {
    return errorResponse(res, 404, 'PDF file not found on server');
  }

  // Update print log
  await PrintLog.create({
    card_id: card.id,
    printed_by: req.user.id,
    printed_at: new Date()
  });

  await card.update({ printed_at: new Date() });

  res.download(filePath);
};
