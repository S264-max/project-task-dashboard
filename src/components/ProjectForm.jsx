import { useEffect, useState } from "react";

function ProjectForm({
  show,
  editingProject,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title);
      setDescription(editingProject.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingProject, show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Project title is required.");
      return;
    }

    const project = {
      id: editingProject?.id || Date.now(),
      title: title.trim(),
      description: description.trim(),
      tasks: editingProject?.tasks || [],
    };

    onSave(project);
  };

  return (
    <div className="modal-overlay">
      <div className="modal glass">
        <div className="modal-header">
          <h2>
            {editingProject
              ? "Edit Project"
              : "New Project"}
          </h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            {/* ✕ */}X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Title</label>

            <input
              type="text"
              placeholder="Enter project title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="5"
              placeholder="Enter project description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
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
              {editingProject
                ? "Update Project"
                : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;