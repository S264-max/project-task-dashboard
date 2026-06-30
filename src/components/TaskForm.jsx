import { useEffect, useState } from "react";

function TaskForm({
  show,
  editingTask,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDueDate(editingTask.dueDate);
      setStatus(editingTask.status);
    } else {
      setTitle("");
      setStatus("Pending");

      const today = new Date()
        .toISOString()
        .split("T")[0];

      setDueDate(today);
    }
  }, [editingTask, show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title cannot be empty.");
      return;
    }

    const today = new Date()
      .toISOString()
      .split("T")[0];

    if (dueDate < today) {
      alert(
        "Due date must be today or in the future."
      );
      return;
    }

    onSave({
      id: editingTask?.id || Date.now(),
      title: title.trim(),
      dueDate,
      status,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal glass">

        <div className="modal-header">

          <h2>
            {editingTask
              ? "Edit Task"
              : "Create Task"}
          </h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            X
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Task Title</label>

            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>Due Date</label>

            <input
              type="date"
              value={dueDate}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                setDueDate(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>Status</label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>Pending</option>

              <option>
                In Progress
              </option>

              <option>Done</option>

            </select>

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              {editingTask
                ? "Update Task"
                : "Create Task"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default TaskForm;