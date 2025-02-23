import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import Kanban from "../components/Kanban";
import {
  addTask,
  updateTask,
  deleteTask,
  setFilters,
} from "../features/tasksSlice";

const HomePage = ({ navLink }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const filters = useSelector((state) => state.tasks.filters);
  const [showForm, setShowForm] = useState(false);

  // Handle adding a new task
  const handleAddTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      image: task.image[0],
    };
    dispatch(addTask(newTask));
    setShowForm(false);
  };

  // Handle updating a task
  const handleUpdateTask = (id, updatedTask) => {
    dispatch(updateTask({ id, updatedTask }));
  };

  // Handle deleting a task
  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  // Handle search by name
  const handleSearch = (searchTerm) => {
    dispatch(setFilters({ search: searchTerm }));
  };

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const task = tasks.find((task) => task.id.toString() === draggableId);

    // Update the task's status based on the destination column
    const updatedTask = { ...task, status: destination.droppableId };

    dispatch(updateTask({ id: task.id, updatedTask }));
  };

  // Filter tasks based on search term, state, and priority
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesState = filters.state ? task.status === filters.state : true;
    const matchesPriority = filters.priority
      ? task.priority === filters.priority
      : true;
    return matchesSearch && matchesState && matchesPriority;
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-light min-vh-100 p-4">
        <div className="container">
          {/* Header */}
          <h1 className="text-center mb-4">
            {navLink === "list" ? "List View" : "Kanban Board"}
          </h1>
          {/* Search Bar and Add New Button */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="flex-grow-1 me-3 mt-3">
              <SearchBar onSearch={handleSearch} />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Hide Form" : "Add New Task"}
            </button>
          </div>

          {/* Form  */}
          {showForm && (
            <div className="mb-4">
              <TaskForm onSubmit={handleAddTask} />
            </div>
          )}
          {navLink === "list" ? (
            <div className="row">
              <div className="col">
                <TaskList
                  setFilters={setFilters}
                  filters={filters}
                  tasks={filteredTasks}
                  onUpdate={handleUpdateTask}
                  onDragEnd={onDragEnd}
                  onDelete={handleDeleteTask}
                />
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col">
                <Kanban
                  tasks={filteredTasks}
                  onUpdate={handleUpdateTask}
                  onDragEnd={onDragEnd}
                  onDelete={handleDeleteTask}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default HomePage;
