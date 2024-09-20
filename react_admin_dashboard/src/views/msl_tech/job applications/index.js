import React, { useState, useEffect } from 'react';
import { getAllApplications, deleteApplication } from '../../../api';
import axios from 'axios';
import { CButton, CTable, CTableHeaderCell, CTableBody, CTableRow, CTableHead, CTableDataCell, CForm, CFormInput } from '@coreui/react';
import 'tailwindcss/tailwind.css'; 


export default function JobApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  // Fetch all applications
  const fetchApplications = () => {
    getAllApplications()
      .then(response => {
        setApplications(response.data);
      })
      .catch(error => {
        console.error("Error fetching applications", error);
      });
  };

  // Handle delete application
  const handleDelete = (id) => {
    deleteApplication(id)
      .then(() => {
        fetchApplications(); // Refresh the list after deletion
      })
      .catch(error => {
        console.error("Error deleting application", error);
      });
  };

  // Handle edit button click
  const handleEdit = (app) => {
    setSelectedApp(app); // Set the selected application for editing
  };

  // Handle form submit for adding or editing an application
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (selectedApp) {
      // Update an existing application (PUT /applications/:id)
      axios.put(`http://localhost:3000/api/job/applications/${selectedApp.id}`, formData)
        .then(() => {
          fetchApplications();
          setSelectedApp(null); // Reset the form
          event.target.reset(); // Clear the form
        })
        .catch(error => console.error('Error updating application', error));
    } else {
      // Create a new application (POST /apply)
      axios.post('http://localhost:3000/api/job/apply', formData)
        .then(() => {
          fetchApplications();
          event.target.reset(); // Clear the form
        })
        .catch(error => console.error('Error creating application', error));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Job Applications</h1>

      {/* Applications Table */}
      <CTable hover bordered className="mb-6 shadow-lg">
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Full Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Phone</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>LinkedIn</CTableHeaderCell>
            <CTableHeaderCell>Cover Letter</CTableHeaderCell>
            <CTableHeaderCell>Job Position</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {applications.map(app => (
            <CTableRow key={app.id}>
              <CTableDataCell>{app.id}</CTableDataCell>
              <CTableDataCell>{app.full_name}</CTableDataCell>
              <CTableDataCell>{app.email}</CTableDataCell>
              <CTableDataCell>{app.phone}</CTableDataCell>
              <CTableDataCell>{app.address}</CTableDataCell>
              <CTableDataCell>{app.linkedin}</CTableDataCell>
              <CTableDataCell>{app.cover_letter}</CTableDataCell>
              <CTableDataCell>{app.job_position}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" className="mr-2" onClick={() => handleEdit(app)}>Edit</CButton>
                <CButton color="danger" onClick={() => handleDelete(app.id)}>Delete</CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Application Form */}
      <h2 className="text-2xl font-semibold mb-4">{selectedApp ? 'Edit' : 'Add'} Application</h2>
      <CForm onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-6 rounded-lg shadow-md">
        <CFormInput
          name="full_name"
          placeholder="Full Name"
          defaultValue={selectedApp?.full_name || ''}
          required
          className="p-2 border rounded"
        />
        <CFormInput
          name="email"
          placeholder="Email"
          type="email"
          defaultValue={selectedApp?.email || ''}
          required
          className="p-2 border rounded"
        />
        <CFormInput
          name="phone"
          placeholder="Phone"
          defaultValue={selectedApp?.phone || ''}
          required
          className="p-2 border rounded"
        />
        <CFormInput
          name="address"
          placeholder="Address"
          defaultValue={selectedApp?.address || ''}
          required
          className="p-2 border rounded"
        />
        <CFormInput
          name="linkedin"
          placeholder="LinkedIn"
          defaultValue={selectedApp?.linkedin || ''}
          required
          className="p-2 border rounded"
        />
        <CFormInput
          name="cover_letter"
          placeholder="Cover Letter"
          defaultValue={selectedApp?.cover_letter || ''}
          required
          className="p-2 border rounded"
        />
        <CFormInput
          name="job_position"
          placeholder="Job Position"
          defaultValue={selectedApp?.job_position || ''}
          required
          className="p-2 border rounded"
        />
        <CFormInput
          type="file"
          name="resume"
          className="p-2 border rounded"
        />
        <CButton type="submit" color="success" className="md:col-span-2 mt-4">
          {selectedApp ? 'Update' : 'Create'}
        </CButton>
      </CForm>
    </div>
  );
}