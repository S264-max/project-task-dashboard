function TaskFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="task-filter glass">
      {/* search */}

      <div className="filter-group">
        <label>Search Task</label>

        <input
          type="text"
          placeholder="Search by task title..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>

      {/* status  of the task*/}

      <div className="filter-group">
        <label>Status</label>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* sort */}

      <div className="filter-group">
        <label>Sort By</label>

        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value)
          }
        >
          <option value="asc">
            Due Date ↑
          </option>

          <option value="desc">
            Due Date ↓
          </option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilter;