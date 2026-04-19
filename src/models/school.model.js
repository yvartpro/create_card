import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class School extends Model {}

School.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  logo_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  signature_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stamp_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  principal_stamp_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'School',
  tableName: 'denis_schools'
});

export default School;
