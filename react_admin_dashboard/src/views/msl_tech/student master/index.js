import React, { useState, useEffect } from 'react';
import axios from 'axios';


const BASE_URL = import.meta.env.VITE_API_BASE_URL
export default function StudentMaster() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [studentName, setStudentName] = useState('');

  // Fetch user details for the dropdown
  useEffect(() => {
    axios.get(`${BASE_URL}/userDetails`) 
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the user details!", error);
      });
  }, []);

  const handleUserChange = (e) => {
    const selectedUser = users.find(user => `${user.avatar_name} ${user.last_name}` === e.target.value);
    setSelectedUserId(selectedUser.user_id); // Auto-fill user ID
    setStudentName(e.target.value); // Auto-fill student name
  };

  const addStudent = () => {
    axios.post(`${BASE_URL}/students`, {
      userId: selectedUserId,
      name: studentName,
    })
    .then(response => {
      console.log("Student added successfully:", response.data);
    })
    .catch(error => {
      console.error("Error adding student:", error.message);
    });
  };

  return (
    <div>
      <h2>Student Master</h2>
      <div>
        <label>Select Student Name: </label>
        <select onChange={handleUserChange} value={studentName}>
          <option value="">Select a student</option>
          {users.map(user => (
            <option key={user.user_id} value={`${user.avatar_name} ${user.last_name}`}>
              {user.avatar_name} {user.last_name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={addStudent}>Add Student</button>
    </div>
  );
}
