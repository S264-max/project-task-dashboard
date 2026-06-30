function Header({ currentView, selectedProject }) {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="dashboard-header glass">
      <div className="header-left">
        <span className="breadcrumb">
          Dashboard /
          {currentView === "projects"
            ? " Projects"
            : ` ${selectedProject?.title || "Tasks"}`}
        </span>

        <h1>
          {currentView === "projects"
            ? "Project Dashboard"
            : selectedProject?.title}
        </h1>

        <p className="header-subtitle">
          {currentView === "projects"
            ? "Manage all your projects in one place."
            : selectedProject?.description}
        </p>
      </div>

      <div className="header-right">
        <div className="date-card">
          <span>Today</span>
          <strong>{formattedDate}</strong>
        </div>
      </div>
    </header>
  );
}

export default Header;