const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configDB'); // Make sure this path is correct

// Define the class extending the Model class
class NewUserCourseMapping extends Model {}

// Initialize the model using the init method
NewUserCourseMapping.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    record_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    avatar_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'new_user_course_mapping', // The name of the model
    tableName: 'new_user_course_mapping', // The table name in the database
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the model
module.exports = NewUserCourseMapping;
