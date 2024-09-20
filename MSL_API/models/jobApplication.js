const { DataTypes } = require('sequelize');
const { sequelize } = require('../configDB');

const JobApplication = sequelize.define('JobApplication', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
    },
    linkedin: {
        type: DataTypes.STRING,
    },
    resume_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cover_letter: {
        type: DataTypes.TEXT,
    },
    job_position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'job_applications',
    timestamps: false, 
});

module.exports = JobApplication;
