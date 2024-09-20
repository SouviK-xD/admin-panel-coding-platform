const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../configDB');

class StudentMaster extends Model {}

StudentMaster.init(
  {
    studentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'StudentMaster',
    tableName: 'student_master',
    timestamps: false, 
  }
);

module.exports = StudentMaster; 