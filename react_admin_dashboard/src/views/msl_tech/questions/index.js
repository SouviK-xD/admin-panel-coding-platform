import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea
} from '@coreui/react';
import { getAllQuestions, createQuestion, editQuestion, deleteQuestion } from '../../../api';

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ question: '', description: '', level: 'Beginner', created_by: '', status: 'N' });
  const [editQuestionData, setEditQuestionData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    getAllQuestions()
      .then(response => {
        setQuestions(response.data.data);
        setError(null); // Clear any existing errors
      })
      .catch(error => {
        setError("Error fetching questions: " + (error.response ? error.response.data : error.message));
      });
  };

  const validateForm = () => {
    if (!newQuestion.question || !newQuestion.description || !newQuestion.created_by) {
      setError('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  // Create a new question
  const handleCreateQuestion = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const questionData = {
      question: newQuestion.question,
      description: newQuestion.description,
      level: newQuestion.level || 'Beginner',
      created_by: newQuestion.created_by,
      status: newQuestion.status || 'N',
    };

    try {
      const response = await createQuestion(questionData);
      console.log('Question created successfully:', response.data);
      fetchQuestions(); // Refresh the question list after creating
      setNewQuestion({ question: '', description: '', level: 'Beginner', created_by: '', status: 'N' });
      setError(null); // Clear any errors
    } catch (error) {
      setError("Error creating question: " + (error.response ? error.response.data : error.message));
    }
  };

  // Open modal for editing
  const handleEditClick = (question) => {
    setEditQuestionData(question);
    setIsEditMode(true);
    setModalOpen(true);
  };

  // Submit edited question
  const handleEditQuestion = async () => {
    try {
      const response = await editQuestion(editQuestionData.record_id, {
        question_id: editQuestionData.record_id,  // Send record_id as question_id
        updated_by: 1,  // Add updated_by, adjust this value accordingly
        question: editQuestionData.question,
        description: editQuestionData.description,
        level: editQuestionData.level,
      });
      console.log('Question edited successfully:', response.data);
      fetchQuestions();
      setModalOpen(false); // Close the modal after successful edit
      setError(null); // Clear any errors
    } catch (error) {
      setError("Error editing question: " + (error.response ? error.response.data : error.message));
    }
  };
  

  // Delete a question
  const handleDeleteClick = async (questionId) => {
    try {
      // Pass the deleted_by parameter as well
      await deleteQuestion(questionId, 1);  
      console.log('Question deleted successfully');
      fetchQuestions();
    } catch (error) {
      setError("Error deleting question: " + (error.response ? error.response.data : error.message));
    }
  };
  
  

  return (
    <div className="page-container">
      <h1 className="page-title">Questions</h1>

      {error && <p className="error-message">{error}</p>}

      {/* Create Question Form */}
      <div className="create-question">
        <CForm>
          <div className="form-group">
            <CFormLabel htmlFor="question">Question</CFormLabel>
            <CFormInput
              type="text"
              id="question"
              value={newQuestion.question}
              onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
              placeholder="Enter question"
            />
          </div>
          <div className="form-group">
            <CFormLabel htmlFor="description">Description</CFormLabel>
            <CFormTextarea
              id="description"
              value={newQuestion.description}
              onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
              placeholder="Enter description"
            />
          </div>
          <div className="form-group">
            <CFormLabel htmlFor="level">Level</CFormLabel>
            <CFormInput
              type="text"
              id="level"
              value={newQuestion.level}
              onChange={(e) => setNewQuestion({ ...newQuestion, level: e.target.value })}
              placeholder="Enter difficulty level"
            />
          </div>
          <div className="form-group">
            <CFormLabel htmlFor="created_by">Created By</CFormLabel>
            <CFormInput
              type="number"
              id="created_by"
              value={newQuestion.created_by}
              onChange={(e) => setNewQuestion({ ...newQuestion, created_by: e.target.value })}
              placeholder="Enter creator ID"
            />
          </div>
          <div className="form-group">
            <CFormLabel htmlFor="status">Status</CFormLabel>
            <CFormInput
              type="text"
              id="status"
              value={newQuestion.status}
              onChange={(e) => setNewQuestion({ ...newQuestion, status: e.target.value })}
              placeholder="Enter status"
            />
          </div>
          <CButton onClick={handleCreateQuestion} color="primary">Create Question</CButton>
        </CForm>
      </div>

      {/* Question List */}
      <CRow>
        {questions.map((question) => (
          <CCol key={question.record_id} xs="12" md="6" lg="4">
            <div className="question-card">
              <h5>{question.question}</h5>
              <p>{question.description}</p>
              <CButton onClick={() => handleEditClick(question)} color="warning">Edit</CButton>
              <CButton onClick={() => handleDeleteClick(question.record_id)} color="danger">Delete</CButton>
            </div>
          </CCol>
        ))}
      </CRow>

      {/* Edit Question Modal */}
      <CModal visible={isModalOpen} onClose={() => setModalOpen(false)}>
        <CModalHeader>
          <h5>{isEditMode ? 'Edit Question' : 'View Question'}</h5>
        </CModalHeader>
        <CModalBody>
          {editQuestionData && (
            <CForm>
              <div className="form-group">
                <CFormLabel htmlFor="edit-question">Question</CFormLabel>
                <CFormInput
                  type="text"
                  id="edit-question"
                  value={editQuestionData.question}
                  onChange={(e) => setEditQuestionData({ ...editQuestionData, question: e.target.value })}
                  placeholder="Enter question"
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-group">
                <CFormLabel htmlFor="edit-description">Description</CFormLabel>
                <CFormTextarea
                  id="edit-description"
                  value={editQuestionData.description}
                  onChange={(e) => setEditQuestionData({ ...editQuestionData, description: e.target.value })}
                  placeholder="Enter description"
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-group">
                <CFormLabel htmlFor="edit-level">Level</CFormLabel>
                <CFormInput
                  type="text"
                  id="edit-level"
                  value={editQuestionData.level}
                  onChange={(e) => setEditQuestionData({ ...editQuestionData, level: e.target.value })}
                  placeholder="Enter difficulty level"
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-group">
                <CFormLabel htmlFor="edit-status">Status</CFormLabel>
                <CFormInput
                  type="text"
                  id="edit-status"
                  value={editQuestionData.status}
                  onChange={(e) => setEditQuestionData({ ...editQuestionData, status: e.target.value })}
                  placeholder="Enter status"
                  disabled={!isEditMode}
                />
              </div>
            </CForm>
          )}
        </CModalBody>
        <CModalFooter>
          {isEditMode ? (
            <>
              <CButton onClick={handleEditQuestion} color="primary">Save Changes</CButton>
              <CButton onClick={() => setModalOpen(false)} color="secondary">Cancel</CButton>
            </>
          ) : (
            <CButton onClick={() => setModalOpen(false)} color="secondary">Close</CButton>
          )}
        </CModalFooter>
      </CModal>
    </div>
  );
}
