function Sidebar({
  projects,
  currentView,
  setCurrentView,
  setSelectedProjectId,
  onAddProject,
}) {
  return (
    <aside className="sidebar glass">
      {/* logo */}

      <div className="logo">
        <div className="logo-icon">📋</div>

        <div>
          <h2>TaskSync</h2>
          <p>Project Dashboard</p>
        </div>
      </div>

      {/* navigation */}

      <nav className="sidebar-nav">
        <button
          className={`sidebar-btn ${
            currentView === "projects" ? "active" : ""
          }`}
          onClick={() => {
            setCurrentView("projects");
            setSelectedProjectId(null);
          }}
        >
           All Projects
        </button>

        <button
          className="sidebar-btn add-btn"
          onClick={onAddProject}
        >
          + New Project
        </button>
      </nav>

      {/* statistics */}

      <div className="sidebar-stats">
        <div className="stat-card">
          <span>Total Projects</span>

          <h2>{projects.length}</h2>
        </div>

        <div className="stat-card">
          <span>Total Tasks</span>

          <h2>
            {projects.reduce(
              (total, project) =>
                total + (project.tasks?.length || 0),
              0
            )}
          </h2>
        </div>
      </div>

      {/* footer */}

      <div className="sidebar-footer">
        <small>
          Stay Organized Stay Productive !
        </small>

        
      </div>
    </aside>
  );
}

export default Sidebar;