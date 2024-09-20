import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function MentorMaster() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [mentorName, setMentorName] = useState('');

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
    const selectedUser = users.find(user => user.user_id === parseInt(e.target.value));
    setSelectedUserId(selectedUser.user_id); // Auto-fill user ID
    setMentorName(`${selectedUser.avatar_name} ${selectedUser.last_name || ''}`.trim()); // Auto-fill mentor name
  };

  const addMentor = () => {
    axios.post(`${BASE_URL}/mentors`, {
      userId: selectedUserId,
      name: mentorName,
    })
    .then(response => {
      console.log("Mentor added successfully:", response.data);
    })
    .catch(error => {
      console.error("Error adding mentor:", error);
    });
  };

  return (
    <div>
      <h2>Mentor Master</h2>
      <div>
        <label>Select Mentor Name: </label>
        <select onChange={handleUserChange} value={selectedUserId}>
          <option value="">Select a mentor</option>
          {users.map(user => (
            <option key={user.user_id} value={user.user_id}>
              {`${user.avatar_name} ${user.last_name || ''}`.trim()}
            </option>
          ))}
        </select>
      </div>
      <button onClick={addMentor}>Add Mentor</button>
    </div>
  );
}
