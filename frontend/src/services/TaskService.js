const API_URL = "http://localhost:4000/api/tasks";

// Fetch all tasks from the server
export async function fetchTasks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

// Create a new task
export async function createTask(taskData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to create task");
  }
  return res.json();
}

// Update an existing task
export async function updateTask(id, taskData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to update task");
  }
  return res.json();
}

// Delete a task
export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
}

// Toggle the completed status of a task
export async function toggleTask(id) {
  const res = await fetch(`${API_URL}/${id}/toggle`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to toggle task");
  return res.json();
}
