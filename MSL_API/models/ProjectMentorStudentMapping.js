const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../configDB');

class ProjectMentorStudentMapping extends Model {}

ProjectMentorStudentMapping.init(
  {
    recordId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    projectRole: {
      type: DataTypes.ENUM('student', 'mentor'),
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    progressLevel: {
      type: DataTypes.ENUM('Beginner Level', 'Intermediate Level', 'Advanced Level'),
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'ProjectMentorStudentMapping',
    tableName: 'project_mentor_student_mapping',
    timestamps: false,
  }
);

module.exports = { ProjectMentorStudentMapping };
