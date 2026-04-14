import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Staff extends Model {}

Staff.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  school_id: {
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
  marital_status: {
    type: DataTypes.ENUM('single', 'married', 'divorced'),
    allowNull: true
  },
  number_of_children: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  function: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  photo_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Staff',
  tableName: 'staff'
});

export default Staff;
