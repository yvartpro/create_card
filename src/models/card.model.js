import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Card extends Model {}

Card.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  school_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('student', 'staff'),
    allowNull: false
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  qr_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pdf_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  printed_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Card',
  tableName: 'denis_cards'
});

export default Card;
