import axios from 'axios';


const JOB_URL = import.meta.env.VITE_API_JOB_URL;
const APIS_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = JOB_URL;
const API_URL2 = APIS_URL;


//* JOB APPLICATIONS API
export const getAllApplications = () => axios.get(`${API_URL}/applications`);

export const getApplicationById = (id) => axios.get(`${API_URL}/applications/${id}`);

export const createApplication = (formData) => axios.post(`${API_URL}/apply`, formData);

export const updateApplication = (id, formData) => axios.put(`${API_URL}/applications/${id}`, formData);

export const deleteApplication = (id) => axios.delete(`${API_URL}/applications/${id}`);


//*  Questions APIs
export const getAllQuestions = () => axios.get(`${API_URL2}/questions`);

export const getQuestionById = (record_id) => axios.get(`${API_URL2}/questions/${record_id}`);

export const createQuestion = (formData) => axios.post(`${API_URL2}/questions`, formData); 

export const editQuestion = (record_id, formData) => axios.put(`${API_URL2}/questions/${record_id}`, formData);

export const deleteQuestion = (record_id, deleted_by) => axios.delete(`${API_URL2}/questions/${record_id}?deleted_by=${deleted_by}`);



