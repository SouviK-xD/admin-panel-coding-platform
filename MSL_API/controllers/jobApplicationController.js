const JobApplication = require('../models/jobApplication');

// Create Application
const saveApplication = async (req, res) => {
    try {
        const { full_name, email, phone, address, linkedin, cover_letter, job_position} = req.body;
        const resume_path = req.file ? req.file.path : null;

        if (!resume_path) {
            return res.status(400).json({ error: "Resume is required" });
        }

        const application = await JobApplication.create({
            full_name,
            email,
            phone,
            address,
            linkedin,
            resume_path,
            cover_letter,
            job_position,
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while saving the application." });
    }
};

// Read All Applications
const getAllApplications = async (req, res) => {
    try {
        const applications = await JobApplication.findAll();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching applications." });
    }
};

// Read Single Application
const getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await JobApplication.findByPk(id);

        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the application." });
    }
};

// Update Application
const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, phone, address, linkedin, cover_letter , job_position} = req.body;
        const resume_path = req.file ? req.file.path : null;

        const application = await JobApplication.findByPk(id);

        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        await application.update({
            full_name,
            email,
            phone,
            address,
            linkedin,
            resume_path,
            cover_letter,
            job_position
        });

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the application." });
    }
};

// Delete Application
const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await JobApplication.findByPk(id);

        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        await application.destroy();
        res.status(204).json({ message: "Application deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the application." });
    }
};

module.exports = {
    saveApplication,
    getAllApplications,
    getApplicationById,
    deleteApplication,
    updateApplication,
};
