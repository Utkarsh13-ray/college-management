import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Stack, Typography } from '@mui/material';

const ClassSubjects = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [isUploaded, setIsUploaded] = useState(false); // State to manage the visibility of the "Uploaded" message

  const getItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/v1/items");
      setItems(res.data.items);
      setLoading(false);
      console.log(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", fileInputRef.current.files[0]);
      const res = await axios.post(
        "http://localhost:5000/api/v1/items",
        formData
      );
      console.log(res);
      setIsUploaded(true); // Set isUploaded to true after successfully adding an item
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isUploaded) {
      // Reset isUploaded after a short delay (for example, 3 seconds)
      const timeout = setTimeout(() => {
        setIsUploaded(false);
      }, 3000);

      // Clear the timeout if the component unmounts or is updated
      return () => clearTimeout(timeout);
    }
  }, [isUploaded]);

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4">Add Assignment</Typography>
        </Stack>
        <div className="addItems">
          <input
            type="text"
            placeholder="Class Name"
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={styles.input}
          />
          <button
            onClick={addItem}
            style={styles.button}
          >
            Upload
          </button>
        </div>
        {isUploaded && <p style={{ color: "green" }}>Uploaded!</p>}
        {/* Conditionally render the "Uploaded" message */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
    backgroundColor: "#f0f0f0"
  },
  formContainer: {
    width: "90%",
    maxWidth: "500px",
    padding: "20px",
    backgroundColor: "white", // Set background color to white
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    marginTop:'20px'
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop:'20px',
    backgroundColor: "#0077b6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    
  }

};

export default ClassSubjects;
