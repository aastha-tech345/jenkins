import React, { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({ id: "", name: "", email: "" });
  const [records, setRecords] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("records")) || [];
    setRecords(storedRecords);
  }, []);
  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
  }, [records]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      const updatedRecords = records.map((record) =>
        record.id === formData.id ? formData : record
      );
      setRecords(updatedRecords);
    } else {
      const newRecord = { ...formData, id: Date.now().toString() };
      setRecords([...records, newRecord]);
    }
    setFormData({ id: "", name: "", email: "" });
  };

  const handleEdit = (id) => {
    const recordToEdit = records.find((record) => record.id === id);
    setFormData(recordToEdit);
  };

  const handleDelete = (id) => {
    const confirmData = confirm("Are you sure you want to delete this record?");
    if (confirmData) {
      const filteredRecords = records.filter((record) => record.id !== id);
      setRecords(filteredRecords);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>React CRUD with LocalStorage</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          onFocus={() => setIsFocused(true)}
          required
          style={{
            marginRight: "10px",
            height: "30px",
            borderRadius: "5px",
            border: isFocused ? "1px solid #015291" : "1px solid #015291",
            outline: "none",
          }}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{
            marginRight: "10px",
            height: "30px",
            borderRadius: "5px",
            border: isFocused ? "1px solid #015291" : "1px solid #015291",
            outline: "none",
          }}
        />
        <button type="submit">{formData.id ? "Update" : "Add"}</button>
      </form>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record) => (
              <tr key={record.id}>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>
                  <button onClick={() => handleEdit(record.id)}>Edit</button>
                  <button onClick={() => handleDelete(record.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
