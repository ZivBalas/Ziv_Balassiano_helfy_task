import { useState } from "react";
import "../styles/AddTask.css";

function AddTaskForm({ onAdd, onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [error, setError] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!title.trim()) {
        setError("Please enter a task title.");
        return;
      }
  
      onAdd({ title, description, priority });
      // Reset form
      setTitle("");
      setDescription("");
      setPriority("medium");
      setError("");
    };
  
    return (
        <div className="modal-overlay" onClick={onClose}>
        <form className="add-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
          <h2 className="add-form-title">Add New Task</h2>
  
          {error && <p className="form-error">{error}</p>}
  
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                id="title"
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="priority">Priority *</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
  
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="3"
              placeholder="Add extra details (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
  
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Create Task
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  export default AddTaskForm;
  