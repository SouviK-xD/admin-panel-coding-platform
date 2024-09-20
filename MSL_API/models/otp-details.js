const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../configDB");
class AppOTPDetails extends Model {}

AppOTPDetails.init(
  {
    record_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_mobile_no: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    otp_value: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    expire_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    usage_status: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    otp_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    template_record_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    otp_attempts: {
      type: DataTypes.BIGINT,
      allowNull: true,
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
    modelName: "AppOTPDetails",
    tableName: "app_otp_details",
    timestamps: false,
  }
);

module.exports = AppOTPDetails;
