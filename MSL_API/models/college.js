const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../configDB");

class College extends Model {}

College.init(
  {
    college_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    university_type: {
      type: DataTypes.STRING(50),
    },
    university_name: {
      type: DataTypes.STRING(100),
    },
    college_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    college_type: {
      type: DataTypes.STRING(50),
    },
    address: {
      type: DataTypes.STRING(255),
    },
    website: {
      type: DataTypes.STRING(255),
    },
    management: {
      type: DataTypes.STRING(50),
    },
    year_of_establishment: {
      type: DataTypes.STRING(4),
    },
    specialised_in: {
      type: DataTypes.STRING(100),
    },
    location: {
      type: DataTypes.STRING(10),
    },
  },
  { sequelize, tableName: "colleges", modelName: "College", timestamps: false }
);

College.sync()
  .then(() => {
    console.log("College table created..");
  })
  .catch((err) => {
    console.log("Error while create College Table : " + err);
  });

module.exports = {
  College,
};
