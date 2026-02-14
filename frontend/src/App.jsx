import { useState, useEffect } from "react";
import * as taskService from "./services/TaskService";
import Navbar from "./components/Navbar";
import FilterBar from "./components/filterBar";
import TaskCarousel from "./components/TaskList";
import AddTaskForm from "./components/AddTask";
import EditTaskModal from "./components/EditTaskModal";


function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load tasks on first render
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.fetchTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      setError("Could not connect to the server. Make sure it is running on port 4000.");
    } finally {
      setLoading(false);
    }
  };

  //Handle

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      setShowAddForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const updated = await taskService.updateTask(id, taskData);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setEditingTask(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleTask = async (id) => {
    try {
      const updated = await taskService.toggleTask(id);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      alert(err.message);
    }
  };

  

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">

        {/* Filter bar */}
        <FilterBar filter={filter} onFilterChange={setFilter} counts={counts} />

        {/* Main content area */}
        {loading && <p className="status-msg">Loading tasks…</p>}
        {error && <p className="status-msg error">{error}</p>}

        {!loading && !error && (
          <TaskCarousel
            tasks={filteredTasks}
            onEdit={(task) => setEditingTask(task)}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
          />
        )}
        <button className="add-task-btn" onClick={() => setShowAddForm(true)}>Add Task</button>
        {showAddForm && (
          <AddTaskForm
            onAdd={handleAddTask}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </main>

      {/* Edit modal  */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={handleUpdateTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default App;
