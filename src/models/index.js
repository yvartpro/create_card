import User from './user.model.js';
import School from './school.model.js';
import Option from './option.model.js';
import Class from './class.model.js';
import Student from './student.model.js';
import Staff from './staff.model.js';
import Card from './card.model.js';
import PrintLog from './printLog.model.js';
import sequelize from '../config/database.js';

// School belongsTo User
School.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.hasMany(School, { foreignKey: 'owner_id', as: 'schools' });

// Option belongsTo School
Option.belongsTo(School, { foreignKey: 'school_id', as: 'school' });
School.hasMany(Option, { foreignKey: 'school_id', as: 'options' });

// Class belongsTo School and Option
Class.belongsTo(School, { foreignKey: 'school_id', as: 'school' });
School.hasMany(Class, { foreignKey: 'school_id', as: 'classes' });
Class.belongsTo(Option, { foreignKey: 'option_id', as: 'option' });
Option.hasMany(Class, { foreignKey: 'option_id', as: 'classes' });

// Student belongsTo School and Class
Student.belongsTo(School, { foreignKey: 'school_id', as: 'school' });
School.hasMany(Student, { foreignKey: 'school_id', as: 'students' });
Student.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });
Class.hasMany(Student, { foreignKey: 'class_id', as: 'students' });

// Staff belongsTo School
Staff.belongsTo(School, { foreignKey: 'school_id', as: 'school' });
School.hasMany(Staff, { foreignKey: 'school_id', as: 'staff' });

// Card belongsTo School, Student, Staff
Card.belongsTo(School, { foreignKey: 'school_id', as: 'school' });
School.hasMany(Card, { foreignKey: 'school_id', as: 'cards' });
Card.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });
Student.hasMany(Card, { foreignKey: 'student_id', as: 'cards' });
Card.belongsTo(Staff, { foreignKey: 'staff_id', as: 'staff' });
Staff.hasMany(Card, { foreignKey: 'staff_id', as: 'cards' });

// PrintLog belongsTo Card and User
PrintLog.belongsTo(Card, { foreignKey: 'card_id', as: 'card' });
Card.hasMany(PrintLog, { foreignKey: 'card_id', as: 'printLogs' });
PrintLog.belongsTo(User, { foreignKey: 'printed_by', as: 'user' });
User.hasMany(PrintLog, { foreignKey: 'printed_by', as: 'printLogs' });

export {
  sequelize,
  User,
  School,
  Option,
  Class,
  Student,
  Staff,
  Card,
  PrintLog
};
