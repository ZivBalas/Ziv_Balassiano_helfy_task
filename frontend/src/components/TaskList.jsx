import { useState } from "react";
import TaskCard from "./TaskCard";
import "../styles/TaskList.css";


function TaskCarousel({ tasks, onEdit, onDelete, onToggle }) {
  const [isPaused, setIsPaused] = useState(false);

  // Empty state 
  if (tasks.length === 0) {
    return (
      <div className="carousel-empty">
        <span className="empty-icon">&#128203;</span>
        <h2>No tasks found</h2>
        <p>Add a new task or change the filter to see tasks here.</p>
      </div>
    );
  }

  //If there are less the 6 card, copy the card to make it full
  let baseItems = [...tasks];
  while (baseItems.length > 0 && baseItems.length < 6) {
    baseItems = [...baseItems, ...tasks];
  }

  //Time to scroll one full cycle
  const duration = baseItems.length * 4; 

  
  const trackKey = tasks.map((t) => `${t.id}-${t.completed}`).join(",");

  return (
    <section className="carousel-section">
    
      <div
        className="carousel-viewport"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="carousel-track"
          key={trackKey}
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {/* First set of cards */}
          <div className="carousel-set">
            {baseItems.map((task, index) => (
              <TaskCard
                key={`set1-${task.id}-${index}`}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            ))}
          </div>

          {/* Duplicate set — creates the seamless infinite loop */}
          <div className="carousel-set">
            {baseItems.map((task, index) => (
              <TaskCard
                key={`set2-${task.id}-${index}`}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="carousel-hint">Hover over the carousel to pause scrolling</p>
    </section>
  );
}

export default TaskCarousel;