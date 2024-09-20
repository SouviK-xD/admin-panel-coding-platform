import React from 'react'

export default function ProjectMentorStudentMapping() {
  return (
    <div>ProjectMentorStudentMapping</div>
  )
}
/**
 *?     project_id and user_id should be displayed as project name and user name in this component
 *?     we should be able to allocate students to mentor and also update the project name 
 *?     there should be dropdown of mentors and students from the mentor_master and the student_master table respectively
 *!     there is a field named as projectRole. If the project role is mentor then the new mentor name will be stored in the mentor_master table
 *!     if the project role is student then the new student name will be stored in the student_master table
*todo   the data in the project_mentor_student_mapping should also be updated on the same time
*todo   the names of student, mentor, and project will be displayed in the frontend but the idsand name of all three will be stored in the backend
*todo   
 */