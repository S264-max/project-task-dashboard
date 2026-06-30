import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import TaskSummary from "./TaskSummary";
import TaskFilter from "./TaskFilter";

function TaskList({
  project,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const tasks = project?.tasks || [];

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Filter
   if (searchTerm.trim()) {
  filtered = filtered.filter((task) =>
    task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
}

if (statusFilter !== "All") {
  filtered = filtered.filter(
    (task) => task.status === statusFilter
  );
}

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);

      return sortOrder === "asc"
        ? dateA - dateB
        : dateB - dateA;
    });

    return filtered;
  }, [tasks, searchTerm, statusFilter, sortOrder]);

  return (
    <div className="glass card">

      {/* top Section */}

      <div className="flex-between mb-3">

        <div>
          <h2>{project.title}</h2>

          <p>{project.description}</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={onAddTask}
        >
          + Add Task
        </button>

      </div>

      {/* summary */}

      <TaskSummary tasks={tasks} />

      {/* filter */}

      <TaskFilter
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  sortOrder={sortOrder}
  setSortOrder={setSortOrder}
/>
      {/* empty State */}

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"></div>

          <h2>No Tasks Found</h2>

          <p>
            Create your first task to get started.
          </p>
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() =>
                onDeleteTask(task.id)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;