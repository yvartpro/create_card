import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Option extends Model {}

Option.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  school_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Option',
  tableName: 'options'
});

export default Option;
