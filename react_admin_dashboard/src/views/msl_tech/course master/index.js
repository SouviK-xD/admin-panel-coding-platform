import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;  

const CourseMaster = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null); // For editing course
  const [newCourse, setNewCourse] = useState({
    course_title: '',
    description: '',
    image: '',
    display: false,
    status: 'N',
    created_by: 1 // Replace with dynamic user_id if needed
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await axios.get(`${BASE_URL}/coursesToDisplay`);
        setCourses(result.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleAddOrUpdateCourse = async () => {
    try {
      if (editingCourse) {
        // Update the course
        await axios.put(
          `${BASE_URL}/courses/${editingCourse.record_id}`,
          { ...newCourse, modified_by: 1 } // Replace `1` with dynamic user_id if needed
        );
      } else {
        // Create a new course
        await axios.post(`${BASE_URL}/courses`, newCourse);
      }

      // Reset the form after submission
      setNewCourse({
        course_title: '',
        description: '',
        image: '',
        display: false,
        status: 'N',
        created_by: 1, // Replace with dynamic user_id if needed
      });
      setShowModal(false);
      setEditingCourse(null);

      // Refresh the courses list
      const result = await axios.get(`${BASE_URL}/coursesToDisplay`);
      console.log('Fetched courses after addition:', result.data.data); // Log the response
      setCourses(result.data.data);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleDeleteCourse = async (course_id) => {
    try {
      await axios.delete(`${BASE_URL}/courses/${course_id}`);
      // Refresh the courses list after deletion
      const result = await axios.get(`${BASE_URL}/coursesToDisplay`);
      setCourses(result.data.data);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setNewCourse({
      course_title: course.course_title,
      description: course.description,
      image: course.image,
      display: course.display,
      status: course.status,
      created_by: course.created_by, // Ensure the created_by field is preserved for updates
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingCourse(null);
    setNewCourse({
      course_title: '',
      description: '',
      image: '',
      display: false,
      status: 'N',
      created_by: 1 // Replace with dynamic user_id if needed
    });
    setShowModal(true);
  };

  return (
    <div>
      <Button onClick={openAddModal}>Add Course</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Display</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.record_id}>
              <td>{course.course_title}</td>
              <td>{course.description}</td>
              <td>{course.image}</td>
              <td>{course.display ? 'Yes' : 'No'}</td>
              <td>{course.status === 'Y' ? 'Active' : 'Inactive'}</td>
              <td>
                <Button variant="warning" onClick={() => openEditModal(course)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteCourse(course.record_id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCourse ? 'Edit Course' : 'Add Course'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCourseTitle">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                value={newCourse.course_title}
                onChange={(e) => setNewCourse({ ...newCourse, course_title: e.target.value })}
                placeholder="Enter course title"
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                placeholder="Enter course description"
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={newCourse.image}
                onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                placeholder="Enter image URL"
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={newCourse.status}
                onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value })}
              >
                <option value="Y">Active</option>
                <option value="N">Inactive</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDisplay">
              <Form.Check
                type="checkbox"
                label="Display on Home Page"
                checked={newCourse.display}
                onChange={(e) => setNewCourse({ ...newCourse, display: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateCourse}>
            {editingCourse ? 'Save Changes' : 'Add Course'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CourseMaster;
