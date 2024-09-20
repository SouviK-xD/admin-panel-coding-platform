const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../configDB");

class CollegeDegreeMapping extends Model {}

CollegeDegreeMapping.init(
  {
    mapping_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    college_id: {
      type: DataTypes.INTEGER,
    },
    degree_id: {
      type: DataTypes.INTEGER,
    },
    created_by: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: "admin",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    modified_by: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: "admin",
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "college_degree_map",
    modelName: "CollegeDegreeMapping",
    timestamps: false,
  }
);
CollegeDegreeMapping.sync()
  .then(() => {
    console.log("CollegeDegreeMapping table created..");
  })
  .catch((err) => {
    console.log("Error while create CollegeDegreeMapping Table : " + err);
  });

module.exports = {
  CollegeDegreeMapping,
};
