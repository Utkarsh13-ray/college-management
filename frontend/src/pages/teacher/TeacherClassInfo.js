import React, { useState } from 'react';
import axios from 'axios';

const ClassAssignments = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('assignment', file);
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/assignments/upload`, formData, { // Update the URL to match the backend route
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Assignment uploaded successfully!');
    } catch (error) {
      console.error('Error uploading assignment:', error);
      alert('Failed to upload assignment.');
    }
  };

  return (
    <div>
      <h2>Upload Assignment</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default ClassAssignments;
