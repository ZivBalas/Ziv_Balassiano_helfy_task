const express = require("express");
const router = express.Router();
const { validateTask, validateTaskId} = require("../middleware/valid");


let tasks = [
  {
    id: 1,
    title: "Set up project structure",
    description:
      "Initialize the React frontend and Express backend with proper folder organization.",
    completed: true,
    createdAt: new Date("2026-02-10T09:00:00").toISOString(),
    priority: "high",
  },
  {
    id: 2,
    title: "Build REST API endpoints",
    description:
      "Create CRUD endpoints for task management including validation middleware.",
    completed: true,
    createdAt: new Date("2026-02-11T10:30:00").toISOString(),
    priority: "high",
  },
  {
    id: 3,
    title: "Design task card component",
    description:
      "Create a reusable card component with priority colour indicators and action buttons.",
    completed: false,
    createdAt: new Date("2026-02-12T14:00:00").toISOString(),
    priority: "medium",
  },
  {
    id: 4,
    title: "Implement infinite carousel",
    description:
      "Build the endless animated carousel using only vanilla CSS transitions and React.",
    completed: false,
    createdAt: new Date("2026-02-13T08:15:00").toISOString(),
    priority: "high",
  },
  {
    id: 5,
    title: "Add filtering feature",
    description:
      "Allow users to filter the task list by All, Pending, or Completed status.",
    completed: false,
    createdAt: new Date("2026-02-13T16:45:00").toISOString(),
    priority: "medium",
  },
  {
    id: 6,
    title: "Write project documentation",
    description:
      "Create a README with setup instructions, API reference and feature overview.",
    completed: false,
    createdAt: new Date("2026-02-14T11:00:00").toISOString(),
    priority: "low",
  },
];

let nextId = 7;

// get all tasks
router.get("/", (req, res) => {
    console.log("Current tasks in backend:", tasks);
    res.json(tasks);
});


// create a new task

router.post("/", validateTask, (req, res) => {
  const { title, completed, description, priority } = req.body;
 


  const newTask = {
    id: nextId,
    title: title.trim(),
    description: (description || "").trim(),
    completed: completed || false,
    createdAt: new Date().toISOString(),
    priority: priority || "medium",
  };
  nextId++;
  tasks.push(newTask);
  console.log("New task added:", tasks);
  res.status(201).json(newTask);
});

// update a task
router.put("/:id", validateTask, validateTaskId(tasks), (req, res) => {

    const { title, description, completed, priority } = req.body;
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Task not found" });

    if (title !== undefined) tasks[index].title = title.trim();
    if (description !== undefined) tasks[index].description = description.trim();
    if (completed !== undefined) tasks[index].completed = Boolean(completed);
    if (priority !== undefined) tasks[index].priority = priority;
    
    console.log("Task updated:", tasks);
    res.json(tasks[index]);
});

// toggle the completed status of a task
router.patch("/:id/toggle", validateTaskId(tasks), (req, res) => {

  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  tasks[index].completed = !tasks[index].completed;
  console.log("Task toggled:", tasks);
  res.json(tasks[index]);
});

// delete a task
router.delete("/:id", validateTaskId(tasks), (req, res) => {

  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  const deleted = tasks.splice(index, 1)[0];
  console.log("Task deleted:", tasks);
  res.json(deleted);
});

module.exports = router;
