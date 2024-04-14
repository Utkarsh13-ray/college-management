import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ClassAssignments = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userDetails } = useSelector((state) => state.user); // Selector function to get userDetails from Redux store
  const { cname } = useParams();
  console.log(userDetails); // Log userDetails to check if it's being retrieved correctly

  const getItems = async () => {
    setLoading(true);
    try {
        const res = await axios.get("http://localhost:5000/api/v1/items");
        console.log(res);

        // Filter the items based on the name property matching the cname value from the URL
        const filteredItems = res.data.items.filter(item => item.name === cname);

        // Update the state with the filtered items
        setItems(filteredItems);
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
};

  const downloadFile = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/items/download/${id}`,
        { responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "file.pdf";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div>
      <div className="items">
        {items.length > 0 ? (
          items.map((item) => (
            <div className="item" key={item._id}>
              <h3>{item.name}</h3>
              <button onClick={() => downloadFile(item._id)}>
                Download File
              </button>
            </div>
          ))
        ) : (
          <p>You don't have any assignments.</p>
        )}
      </div>
    </div>
  );
};

export default ClassAssignments;
