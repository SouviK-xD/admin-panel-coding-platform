import React, { useState, useEffect } from 'react';
import { CButton, CForm, CFormInput, CTable, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell } from '@coreui/react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;  

const getUserIdFromLocalStorage = () => {
  // Replace this with the actual method of obtaining the user ID
  return 1; // Replace with the actual user ID
};
export default function TopicMaster() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState({ topic: '', status: 'Y' });
  const [editTopic, setEditTopic] = useState(null);
  
  
  
  // Fetch all topics on component load
  useEffect(() => {
    fetchTopics();
  }, []);
  
  // Fetch all topics from the server
  const fetchTopics = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/topics`);
      setTopics(response.data.data);
    } catch (error) {
      console.error('Error fetching topics', error);
    }
  };
  
 // Create a new topic
 const handleCreateTopic = async (e) => {
  e.preventDefault();
  const userId = getUserIdFromLocalStorage(); // Replace with the method to get the user ID

  try {
    await axios.post(`${BASE_URL}/topics`, { ...newTopic, created_by: userId });
    fetchTopics();
    setNewTopic({ topic: '', status: 'Y' });
  } catch (error) {
    console.error('Error creating topic', error);
  }
};

// Edit a topic
const handleEditTopic = async (e) => {
  e.preventDefault();
  const userId = getUserIdFromLocalStorage();
  try {
    await axios.put(`${BASE_URL}/topics/${editTopic.record_id}`, { ...editTopic, modified_by: userId });
    fetchTopics();
    setEditTopic(null);
  } catch (error) {
    console.error('Error editing topic', error);
  }
};

// Delete a topic
const handleDeleteTopic = async (record_id) => {
  try {
    await axios.delete(`${BASE_URL}/topics/${record_id}`);
    fetchTopics();
  } catch (error) {
    console.error('Error deleting topic', error);
  }
};

return (
  <div>
    <h1>Topic Master</h1>

    {/* Create Topic Form */}
    <div>
      <h2>Create New Topic</h2>
      <CForm onSubmit={handleCreateTopic}>
        <CFormInput
          type="text"
          value={newTopic.topic}
          onChange={(e) => setNewTopic({ ...newTopic, topic: e.target.value })}
          placeholder="Enter topic name"
          required
        />
        <CButton type="submit" color="primary">Create Topic</CButton>
      </CForm>
    </div>

    {/* Display Topics */}
    <div>
      <h2>Topics List</h2>
      {topics.length > 0 ? (
        <CTable>
          <thead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Topic Name</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </thead>
          <CTableBody>
            {topics.map((topic) => (
              <CTableRow key={topic.record_id}>
                <CTableDataCell>{topic.record_id}</CTableDataCell>
                <CTableDataCell>{topic.topic}</CTableDataCell>
                <CTableDataCell>{topic.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" onClick={() => setEditTopic(topic)}>Edit</CButton>{' '}
                  <CButton color="danger" onClick={() => handleDeleteTopic(topic.record_id)}>Delete</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      ) : (
        <p>No topics found</p>
      )}
    </div>

    {/* Edit Topic Form */}
    {editTopic && (
      <div>
        <h2>Edit Topic</h2>
        <CForm onSubmit={handleEditTopic}>
          <CFormInput
            type="text"
            value={editTopic.topic}
            onChange={(e) => setEditTopic({ ...editTopic, topic: e.target.value })}
            placeholder="Enter topic name"
            required
          />
          <CButton type="submit" color="primary">Save Changes</CButton>
          <CButton color="secondary" onClick={() => setEditTopic(null)}>Cancel</CButton>
        </CForm>
      </div>
    )}
  </div>
);
}