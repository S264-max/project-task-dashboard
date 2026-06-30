function TaskSummary({ tasks }) {
  const total = tasks.length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const done = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const summary = [
    {
      title: "Total Tasks",
      value: total,
      icon: "",
      className: "summary-total",
    },
    {
      title: "Pending",
      value: pending,
      icon: "",
      className: "summary-pending",
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: "",
      className: "summary-progress",
    },
    {
      title: "Completed",
      value: done,
      icon: "",
      className: "summary-done",
    },
  ];

  return (
    <div className="summary-grid">
      {summary.map((item) => (
        <div
          key={item.title}
          className={`summary-card glass ${item.className}`}
        >
          <div className="summary-icon">
            {item.icon}
          </div>

          <div>
            <h3>{item.value}</h3>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskSummary;