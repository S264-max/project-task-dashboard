function ProjectCard({
  project,
  onOpen,
  onEdit,
  onDelete,
}) {
  const totalTasks = project.tasks?.length || 0;

  const completedTasks =
    project.tasks?.filter(
      (task) => task.status === "Done"
    ).length || 0;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (
    <div className="project-card glass card">
      {/* Header */}

      <div className="project-card-header">
        <div>
          <h3>{project.title}</h3>

          <p>{project.description}</p>
        </div>
      </div>

      {/* statistics */}

      <div className="project-stats">

        <div className="project-stat">
          <span>Total Tasks</span>
          <strong>{totalTasks}</strong>
        </div>

        <div className="project-stat">
          <span>Completed</span>
          <strong>{completedTasks}</strong>
        </div>

      </div>

      {/* progress */}

      <div className="progress-section">

        <div className="progress-info">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* actions */}

      <div className="project-actions">

        <button
          className="btn btn-primary"
          onClick={() => onOpen(project)}
        >
          Open
        </button>

        <button
          className="btn"
          onClick={() => onEdit(project)}
        >
          Edit
        </button>

        <button
          className="btn btn-danger"
          onClick={() =>
            onDelete(project.id)
          }
        >
          Delete
        </button>

      </div>
    </div>
  );
}

export default ProjectCard;