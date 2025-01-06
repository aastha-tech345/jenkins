import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

const App = () => {
  const [todos, setTodos] = useState([]); // Array of todos
  const [newTodo, setNewTodo] = useState(""); // Input for new todo
  const [editIndex, setEditIndex] = useState(null); // Index for editing a todo
  const [editValue, setEditValue] = useState(""); // Updated value of the todo

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  // Update an existing todo
  const updateTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = editValue.trim() ? editValue : updatedTodos[index];
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h4>Add Your New Record...</h4>

      {/* Create Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Add a new to-do"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", borderRadius: "4px" }}
        />
        <button onClick={addTodo} style={{ padding: "5px 10px" }}>
          Add
        </button>
      </div>

      {/* To-Do List */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  style={{
                    marginRight: "10px",
                    padding: "5px",
                    borderRadius: "4px",
                  }}
                />
                <button
                  onClick={() => updateTodo(index)}
                  style={{ padding: "5px 10px" }}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <span>{todo}</span>

                <CiEdit
                  onClick={() => {
                    setEditIndex(index);
                    setEditValue(todo);
                  }}
                  style={{
                    marginLeft: "10px",
                    border: "none",
                    color: "blue",
                    cursor: "pointer",
                  }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
