const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../configDB");

class Degree extends Model {}

Degree.init(
  {
    degree_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    degree: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    eligibility_criteria: {
      type: DataTypes.STRING(50),
    },
    duration: {
      type: DataTypes.STRING(100),
    },
  },
  { sequelize, tableName: "degree", modelName: "Degree", timestamps: false }
);

Degree.sync()
  .then(() => {
    console.log("Degree table created..");
  })
  .catch((err) => {
    console.log("Error while create Degree Table : " + err);
  });

module.exports = {
  Degree,
};
