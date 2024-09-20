const JobApplication = require('../models/jobApplication');

const saveApplications = async (applicationData) => {
    console.log("Inside Application data")
    try {
        console.log(applicationData)
        const application = await JobApplication.create(applicationData);
        return application;
    } catch (error) {
        throw new Error("Error while saving the application.");
    }
};

module.exports = {
    saveApplications
};
