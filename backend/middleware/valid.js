

const VALID_PRIORITIES = ["low", "medium", "high"];


function validateTask(req, res, next) {
  const { title, priority } = req.body;

  // Title and priority are required and must be a non-empty string
  if (title !== undefined) {
    if (title.trim().length === 0) {
      return res.status(400).json({ error: "Title must be a non-empty ." });
    }
  }

  if(priority !== undefined) {
    if(!VALID_PRIORITIES.includes(priority)) {
      return res.status(400).json({ error: `Priority must be one of: ${VALID_PRIORITIES.join(", ")}` });
    }
  }

  next();
}


function validateTaskId(tasks) {
    return (req, res, next) => {
      const id = parseInt(req.params.id);
      const task = tasks.find(t => t.id === id);
      if (!task) {
        return res.status(404).json({ error: `Task with id ${id} not found.` });
      }
      next();
    };
  }

module.exports = { validateTask, validateTaskId };
