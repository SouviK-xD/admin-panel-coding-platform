import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCardTitle, CTable, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CForm, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function PracticeMaster() {
  const [practices, setPractices] = useState([]);
  const [displayPractices, setDisplayPractices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPractice, setCurrentPractice] = useState(null);
  const [formData, setFormData] = useState({
    practice_title: '',
    description: '',
    status: 'A',
    display: 1,
    problem_count: 0,
    review_ratings: 0,
    learner_count: 0,
    created_by: 1,
  });

  useEffect(() => {
    fetchPractices();
    fetchDisplayPractices();
  }, []);

  const fetchPractices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/practicesToDisplay`);
      setPractices(response.data.data);
    } catch (error) {
      console.error("Error fetching all practices:", error);
    }
  };

  const fetchDisplayPractices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/practicesToDisplay`);
      setDisplayPractices(response.data.data);
    } catch (error) {
      console.error("Error fetching display practices:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`${BASE_URL}/update/${currentPractice.record_id}/practice`, formData);
      } else {
        await axios.post(`${BASE_URL}/create/practice`, formData);
      }
      setShowModal(false);
      fetchPractices();
      fetchDisplayPractices();
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  const handleEdit = (practice) => {
    setIsEditMode(true);
    setCurrentPractice(practice);
    setFormData(practice);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`${BASE_URL}/delete/${id}/practice`);
        fetchPractices();
        fetchDisplayPractices();
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  return (
    <div>
      <CCard>
        <CCardBody>
          <CCardTitle>Practice Master Dashboard</CCardTitle>
          <CButton color="primary" onClick={() => { setIsEditMode(false); setFormData({ practice_title: '', description: '', status: 'A', display: 1, problem_count: 0, review_ratings: 0, learner_count: 0, created_by: 1 }); setShowModal(true); }}>
            Add New Practice
          </CButton>
          <div>
            <h4>All Practices</h4>
            <CTable>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Display</th>
                  <th>Status</th>
                  <th>Problem Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {practices.map(practice => (
                  <tr key={practice.record_id}>
                    <td>{practice.practice_title}</td>
                    <td>{practice.description}</td>
                    <td>{practice.display ? 'Yes' : 'No'}</td>
                    <td>{practice.status}</td>
                    <td>{practice.problem_count}</td>
                    <td>
                      <CButton color="info" onClick={() => handleEdit(practice)}>Edit</CButton>
                      <CButton color="danger" onClick={() => handleDelete(practice.record_id)}>Delete</CButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </CTable>
          </div>
          <div>
            <h4>Practices to Display</h4>
            <CTable>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Display</th>
                  <th>Status</th>
                  <th>Problem Count</th>
                </tr>
              </thead>
              <tbody>
                {displayPractices.map(practice => (
                  <tr key={practice.record_id}>
                    <td>{practice.practice_title}</td>
                    <td>{practice.description}</td>
                    <td>{practice.display ? 'Yes' : 'No'}</td>
                    <td>{practice.status}</td>
                    <td>{practice.problem_count}</td>
                  </tr>
                ))}
              </tbody>
            </CTable>
          </div>
        </CCardBody>
      </CCard>

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>
          <CModalTitle>{isEditMode ? 'Edit Practice' : 'Create Practice'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              type="text"
              name="practice_title"
              label="Practice Title"
              value={formData.practice_title}
              onChange={handleChange}
              required
            />
            <CFormTextarea
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <CFormSelect
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="A">Active</option>
              <option value="I">Inactive</option>
            </CFormSelect>
            <CFormSelect
              name="display"
              label="Display"
              value={formData.display}
              onChange={handleChange}
              required
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </CFormSelect>
            <CButton type="submit" color="primary">
              {isEditMode ? 'Update Practice' : 'Create Practice'}
            </CButton>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

{/* <div>
  <h4>Chart View</h4>
  <CChartBar
  data={getChartData()}
  labels="Practice Title"
  options={{ responsive: true }}
  />
  // const getChartData = () => {
  //   return {
  //     labels: practices.map(p => p.practice_title),
  //     datasets: [
  //       {
  //         label: 'Problem Count',
  //         data: practices.map(p => p.problem_count),
  //         backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //         borderColor: 'rgba(75, 192, 192, 1)',
  //       },
  //       {
  //         label: 'Learner Count',
  //         data: practices.map(p => p.learner_count),
  //         backgroundColor: 'rgba(153, 102, 255, 0.2)',
  //         borderColor: 'rgba(153, 102, 255, 1)',
  //       },
  //     ],
  //   };
  // };
</div> */}