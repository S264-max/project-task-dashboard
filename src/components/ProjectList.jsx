import ProjectCard from "./ProjectCard";

function ProjectList({
  projects,
  onOpen,
  onEdit,
  onDelete,
}) {
  if (projects.length === 0) {
    return (
      <div className="empty-state glass card">
        <div className="empty-icon">📁</div>

        <h2>No Projects Yet</h2>

        <p>
          Create your first project to start managing tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onOpen={onOpen}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProjectList;