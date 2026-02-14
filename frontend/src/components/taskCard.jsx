import "../styles/TaskCard.css";

const PRIORITY_LABELS = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

function TaskCard({ task, onEdit, onDelete, onToggle }) {
    return (
      <div className={`task-card ${task.completed ? "completed" : ""}`}>
        {/* Priority badge */}
        <span className={`priority-badge priority-${task.priority}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
  
        {/* Title */}
        <h3 className="task-card-title">{task.title}</h3>
  
        {/* Description */}
        {task.description && (
          <p className="task-card-desc">{task.description}</p>
        )}
  
        {/* Date */}
        <span className="task-card-date">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
  
        {/* Actions */}
        <div className="task-card-actions">
          <button
            className={`btn-toggle ${task.completed ? "done" : ""}`}
            onClick={() => onToggle(task.id)}
            title={task.completed ? "Mark as pending" : "Mark as done"}
          >
            {task.completed ? "Undo" : "Done"}
          </button>
          <button className="btn-edit" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  export default TaskCard;