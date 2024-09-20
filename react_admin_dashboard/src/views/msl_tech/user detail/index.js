import React, { useState, useEffect } from 'react';
import {
  CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CModal, CModalHeader,
  CModalTitle, CModalBody, CModalFooter, CForm, CFormInput, CFormSelect
} from '@coreui/react';
import { fetchUserDetails, createUser, updateUser, deleteUser } from '../../../services/userService';
import 'tailwindcss/tailwind.css'; 


export default function UserDetails() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    avatar_name: '',
    mobile_no: '',
    password: '',
    first_name: '',
    last_name: '',
    gender: 'M',
    address_line_1: '',
    date_of_birth: '',
    address_line_2: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    img_path: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await fetchUserDetails();
    setUsers(data);
  };

  const handleShow = (user) => {
    setSelectedUser(user);
    setFormData(user || {
      avatar_name: '',
      mobile_no: '',
      password: '',
      first_name: '',
      last_name: '',
      gender: 'M',
      address_line_1: '',
      date_of_birth: '',
      address_line_2: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
      img_path: '',
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (selectedUser) {
      await updateUser(selectedUser.user_id, formData);
    } else {
      await createUser(formData);
    }
    fetchUsers();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="p-4">
      <CButton color="primary" onClick={() => handleShow(null)} className="mb-4">
        Add New User
      </CButton>
      <CTable striped hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>User ID</CTableHeaderCell>
            <CTableHeaderCell>Avatar</CTableHeaderCell>
            <CTableHeaderCell>Mobile No</CTableHeaderCell>
            <CTableHeaderCell>First Name</CTableHeaderCell>
            <CTableHeaderCell>Last Name</CTableHeaderCell>
            <CTableHeaderCell>Gender</CTableHeaderCell>
            <CTableHeaderCell>Address Line 1</CTableHeaderCell>
            <CTableHeaderCell>Date of Birth</CTableHeaderCell>
            <CTableHeaderCell>City</CTableHeaderCell>
            <CTableHeaderCell>State</CTableHeaderCell>
            <CTableHeaderCell>Country</CTableHeaderCell>
            <CTableHeaderCell>Postal Code</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map(user => (
            <CTableRow key={user.user_id}>
              <CTableDataCell>{user.user_id}</CTableDataCell>
              <CTableDataCell>{user.avatar_name || 'N/A'}</CTableDataCell>
              <CTableDataCell>{user.mobile_no}</CTableDataCell>
              <CTableDataCell>{user.first_name || 'N/A'}</CTableDataCell>
              <CTableDataCell>{user.last_name || 'N/A'}</CTableDataCell>
              <CTableDataCell>{user.gender || 'N/A'}</CTableDataCell>
              <CTableDataCell>{user.address_line_1 || 'N/A'}</CTableDataCell>
              <CTableDataCell>{user.date_of_birth || 'N/A'}</CTableDataCell>
              <CTableDataCell>{user.city || 'N/A'}</CTableDataCell>
              <CTableDataCell>{user.state || 'N/A'}</CTableDataCell>
              <CTableDataCell>{user.country || 'N/A'}</CTableDataCell>
              <CTableDataCell>{user.postal_code || 'N/A'}</CTableDataCell>
              <CTableDataCell>
                <CButton color="warning" className="mr-2" onClick={() => handleShow(user)}>
                  Edit
                </CButton>
                <CButton color="danger" onClick={() => handleDelete(user.user_id)}>
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Modal for Add/Edit */}
      <CModal visible={showModal} onClose={handleClose}>
        <CModalHeader>
          <CModalTitle>{selectedUser ? 'Edit User' : 'Add New User'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              name="avatar_name"
              label="Avatar Name"
              value={formData.avatar_name}
              onChange={handleChange}
            />
            <CFormInput
              type="text"
              name="mobile_no"
              label="Mobile No"
              value={formData.mobile_no}
              onChange={handleChange}
              required
            />
            <CFormInput
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <CFormInput
              type="text"
              name="first_name"
              label="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <CFormInput
              type="text"
              name="last_name"
              label="Last Name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <CFormSelect
              name="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="T">Other</option>
            </CFormSelect>
            <CFormInput
              type="text"
              name="address_line_1"
              label="Address Line 1"
              value={formData.address_line_1}
              onChange={handleChange}
            />
            <CFormInput
              type="date"
              name="date_of_birth"
              label="Date of Birth"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
            <CFormInput
              type="text"
              name="address_line_2"
              label="Address Line 2"
              value={formData.address_line_2}
              onChange={handleChange}
            />
            <CFormInput
              type="text"
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
            />
            <CFormInput
              type="text"
              name="state"
              label="State"
              value={formData.state}
              onChange={handleChange}
            />
            <CFormInput
              type="text"
              name="country"
              label="Country"
              value={formData.country}
              onChange={handleChange}
            />
            <CFormInput
              type="text"
              name="postal_code"
              label="Postal Code"
              value={formData.postal_code}
              onChange={handleChange}
            />
            <CFormInput
              type="text"
              name="img_path"
              label="Image Path"
              value={formData.img_path}
              onChange={handleChange}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleClose}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            {selectedUser ? 'Save Changes' : 'Add User'}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}
