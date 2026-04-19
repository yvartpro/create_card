import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class PrintLog extends Model {}

PrintLog.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  card_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  printed_by: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  printed_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'PrintLog',
  tableName: 'denis_print_logs',
  timestamps: false
});

export default PrintLog;
