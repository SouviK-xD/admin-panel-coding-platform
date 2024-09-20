const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../configDB");

class User extends Model {}
User.init(
  {
    user_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    avatar_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    mobile_no: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(512),
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
    status: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: 'N',
    },
    first_name: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM('M', 'F', 'T'),
      allowNull: true,
    },
    address_line_1: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    address_line_2: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING(256),
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user_detail',
    timestamps: false, // Disables the automatic createdAt and updatedAt columns
  }
);

module.exports = User;
