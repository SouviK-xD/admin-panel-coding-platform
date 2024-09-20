const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../configDB');

class MentorMaster extends Model {}

MentorMaster.init(
  {
    mentorId: {
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
    modelName: 'MentorMaster',
    tableName: 'mentor_master',
    timestamps: false, 
  }
);

module.exports = MentorMaster; 
