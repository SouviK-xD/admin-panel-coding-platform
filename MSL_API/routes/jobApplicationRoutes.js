const express = require('express');
const { 
    saveApplication, 
    getAllApplications, 
    getApplicationById, 
    updateApplication, 
    deleteApplication 
} = require('../controllers/jobApplicationController');
const upload = require('../middleware/multer');

const router = express.Router();

router.post('/apply', upload.single('resume'), saveApplication);

router.get('/applications', getAllApplications);

router.get('/applications/:id', getApplicationById);

router.put('/applications/:id', upload.single('resume'), updateApplication);

router.delete('/applications/:id', deleteApplication);

module.exports = router;
