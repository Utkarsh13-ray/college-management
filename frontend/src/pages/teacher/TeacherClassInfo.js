// import React, { useState, useEffect, useRef } from "react";
// import "./App.css";
// import axios from "axios";

// const ClassSubjects = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef(null);
//   const [name, setName] = useState("");

//   const getItems = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/v1/items");
//       setItems(res.data.items);
//       setLoading(false);
//       console.log(res.data.items);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const addItem = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("file", fileInputRef.current.files[0]);
//       const res = await axios.post(
//         "http://localhost:5000/api/v1/items",
//         formData
//       );
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <div className="addItems">
//         <input
//           type="text"
//           placeholder="add name"
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input type="file" ref={fileInputRef} />
//         <button onClick={addItem}>Add</button>
//       </div>
      
//     </div>
//   );
// };

// export default ClassSubjects;
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";

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
    <div>
      <div className="addItems">
        <input
          type="text"
          placeholder="add name"
          onChange={(e) => setName(e.target.value)}
        />
        <input type="file" ref={fileInputRef} />
        <button onClick={addItem}>Add</button>
      </div>
      {isUploaded && <p>Uploaded!</p>} {/* Conditionally render the "Uploaded" message */}
    </div>
  );
};

export default ClassSubjects;
