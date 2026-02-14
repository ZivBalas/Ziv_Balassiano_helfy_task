import { useState } from "react";
import "../styles/EditTaskModal.css";

function EditTaskModal({ task, onSave, onClose }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [error, setError] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!title.trim()) {
        setError("Title cannot be empty.");
        return;
      }
      if (!priority.trim()) {
        setError("Priority cannot be empty.");
        return;
      }
  
      onSave(task.id, { title, description, priority });
    };
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-title">Edit Task</h2>
  
          <form onSubmit={handleSubmit}>
            {error && <p className="form-error">{error}</p>}
  
            <div className="form-group">
              <label htmlFor="edit-title">Title *</label>
              <input
                id="edit-title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="edit-description">Description</label>
              <textarea
                id="edit-description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="edit-priority">Priority *</label>
              <select
                id="edit-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
  
            <div className="modal-actions">
              <button type="submit" className="btn-save">
                Save Changes
              </button>
              <button type="button" className="btn-close" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default EditTaskModal;
  