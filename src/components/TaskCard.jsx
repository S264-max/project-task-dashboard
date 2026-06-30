function TaskCard({
  task,
  onEdit,
  onDelete,
}) {
  const today = new Date().toISOString().split("T")[0];

  const isOverdue =
    task.status !== "Done" &&
    task.dueDate < today;

  const getStatusClass = () => {
    switch (task.status) {
      case "Done":
        return "status-done";

      case "In Progress":
        return "status-progress";

      default:
        return "status-pending";
    }
  };

  return (
    <div className="task-card glass card">

      <div className="task-header">

        <h3>{task.title}</h3>

        <span className={`status-badge ${getStatusClass()}`}>
          {task.status}
        </span>

      </div>

      <div className="task-body">

        <div className="task-date">
           Due: {task.dueDate}
        </div>

        {isOverdue && (
          <div className="overdue">
            Overdue
          </div>
        )}

      </div>

      <div className="task-actions">

        <button
          className="btn"
          onClick={onEdit}
        >
           Edit
        </button>

        <button
          className="btn btn-danger"
          onClick={onDelete}
        >
           Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;