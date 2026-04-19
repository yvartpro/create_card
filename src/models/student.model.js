import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Student extends Model {}

Student.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  school_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  middle_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('M', 'F'),
    allowNull: false
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  birth_place: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  guardian_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  guardian_phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  student_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  photo_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Student',
  tableName: 'denis_students'
});

export default Student;
