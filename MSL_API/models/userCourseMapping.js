const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../configDB');

class UserCourseMapping extends Model {}

UserCourseMapping.init(
  {
    record_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    modified_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
    modified_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    avatar_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'UserCourseMapping',
    tableName: 'user_course_mapping',
    timestamps: false, 
  }
);

module.exports = {UserCourseMapping};
