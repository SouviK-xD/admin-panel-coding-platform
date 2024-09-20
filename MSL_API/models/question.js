const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../configDB");

class Question extends Model {}

Question.init(
  {
    record_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_path: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    level: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'Beginner',
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
      defaultValue: null,
      onUpdate: DataTypes.NOW,
    },
    modified_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: "N",
    },
  },
  {
    sequelize,
    modelName: "Question",
    tableName: "questions",
    timestamps: false,
  }
);

module.exports = Question;
