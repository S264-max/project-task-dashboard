import { useEffect, useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import ProjectList from "./components/ProjectList";
import ProjectForm from "./components/ProjectForm";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {

  /* 
      project states
   */

  const [projects, setProjects] = useState([]);

  const [selectedProjectId, setSelectedProjectId] =
    useState(null);

  const [currentView, setCurrentView] =
    useState("projects");

  const [showProjectForm, setShowProjectForm] =
    useState(false);

  const [editingProject, setEditingProject] =
    useState(null);

  /* task states */

  const [showTaskForm, setShowTaskForm] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  /* selected project */

  const selectedProject =
    projects.find(
      (project) =>
        project.id === selectedProjectId
    );

  /* local storage */

  useEffect(() => {

    const data =
      localStorage.getItem("projects");

    if (data) {

      setProjects(JSON.parse(data));

    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "projects",
      JSON.stringify(projects)
    );

  }, [projects]);

  /* project crud operations */

  const handleSaveProject = (project) => {

    if (editingProject) {

      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id
            ? project
            : p
        )
      );

      setEditingProject(null);

    } else {

      setProjects((prev) => [
        ...prev,
        project,
      ]);

    }

    setShowProjectForm(false);

  };

  const handleDeleteProject = (id) => {

    if (
      !window.confirm(
        "Delete this project?"
      )
    )
      return;

    setProjects((prev) =>
      prev.filter(
        (project) =>
          project.id !== id
      )
    );

    if (selectedProjectId === id) {

      setSelectedProjectId(null);

      setCurrentView("projects");

    }

  };

  const handleEditProject = (
    project
  ) => {

    setEditingProject(project);

    setShowProjectForm(true);

  };

  const handleOpenProject = (
    project
  ) => {

    setSelectedProjectId(project.id);

    setCurrentView("tasks");

  };
    /* task crud operations */

  const handleSaveTask = (task) => {
    if (!selectedProject) return;

    const updatedProjects = projects.map((project) => {
      if (project.id !== selectedProjectId) {
        return project;
      }

      if (editingTask) {
        return {
          ...project,
          tasks: project.tasks.map((item) =>
            item.id === task.id ? task : item
          ),
        };
      }

      return {
        ...project,
        tasks: [...project.tasks, task],
      };
    });

    setProjects(updatedProjects);

    setEditingTask(null);
    setShowTaskForm(false);
  };

  /* edit task */

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  /* delete task */

  const handleDeleteTask = (taskId) => {
    if (!window.confirm("Delete this task?")) return;

    const updatedProjects = projects.map((project) => {
      if (project.id !== selectedProjectId) {
        return project;
      }

      return {
        ...project,
        tasks: project.tasks.filter(
          (task) => task.id !== taskId
        ),
      };
    });

    setProjects(updatedProjects);
  };

  /*add task */

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  /* close modals*/

  const closeProjectModal = () => {
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const closeTaskModal = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };
    /*user interface */

  return (
    <>
      <div className="app-layout">
        {/* sidebar */}

        <Sidebar
          projects={projects}
          currentView={currentView}
          setCurrentView={setCurrentView}
          setSelectedProjectId={setSelectedProjectId}
          onAddProject={() => {
            setEditingProject(null);
            setShowProjectForm(true);
          }}
        />

        {/* main */}

        <main className="main-content">
          <Header
            currentView={currentView}
            selectedProject={selectedProject}
          />

          {/* projects */}

          {currentView === "projects" && (
            <ProjectList
              projects={projects}
              onOpen={handleOpenProject}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          )}

          {/* tasks */}

          {currentView === "tasks" && selectedProject && (
            <>
              <div className="page-actions">
                <button
                  className="btn"
                  onClick={() => {
                    setCurrentView("projects");
                    setSelectedProjectId(null);
                  }}
                >
                  ← Back to Projects
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleAddTask}
                >
                  + Add Task
                </button>
              </div>

              <TaskList
                project={selectedProject}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            </>
          )}
        </main>
      </div>

      {/* project form */}

      <ProjectForm
        show={showProjectForm}
        editingProject={editingProject}
        onClose={closeProjectModal}
        onSave={handleSaveProject}
      />

      {/* task form */}

      <TaskForm
        show={showTaskForm}
        editingTask={editingTask}
        onClose={closeTaskModal}
        onSave={handleSaveTask}
      />
    </>
  );
}

export default App;