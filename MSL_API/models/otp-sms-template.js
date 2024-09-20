const { DataTypes, Sequelize, Model } = require("sequelize");
const { sequelize } = require("../configDB");

require("dotenv").config();

class AppOTPSmsTemplate extends Model{}
AppOTPSmsTemplate.init(
  
  {
    record_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    template_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    template_name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    template_message: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING(100),
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
      defaultValue: "N",
    },
  },
  {
    sequelize,
    timestamps: false, 
    tableName: "app_sms_template_master", 
  }
);
module.exports = AppOTPSmsTemplate;
