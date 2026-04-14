import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Class extends Model {}

Class.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  option_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  school_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Class',
  tableName: 'classes'
});

export default Class;
