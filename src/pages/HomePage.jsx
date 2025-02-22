import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import SearchBar from '../components/SearchBar';
import { addTask, updateTask, deleteTask, setFilters } from '../features/tasksSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const filters = useSelector((state) => state.tasks.filters);
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  // Handle adding a new task
  const handleAddTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      image: task.image[0], // Ensure this is a File object
    };
    dispatch(addTask(newTask));
    setShowForm(false); // Hide the form after submission
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

  // Handle filter by state
  const handleStateFilter = (state) => {
    dispatch(setFilters({ state }));
  };

  // Handle filter by priority
  const handlePriorityFilter = (priority) => {
    dispatch(setFilters({ priority }));
  };

  // Filter tasks based on search term, state, and priority
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesState = filters.state ? task.status === filters.state : true;
    const matchesPriority = filters.priority ? task.priority === filters.priority : true;
    return matchesSearch && matchesState && matchesPriority;
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Task Management App</h1>

      {/* Button to toggle form visibility */}
      <div className="text-center mb-4">
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Hide Form' : 'Add New Task'}
        </button>
      </div>

      {/* Form (conditionally rendered) */}
      {showForm && (
        <div className="row mb-4">
          <div className="col-md-8 offset-md-2">
            <TaskForm onSubmit={handleAddTask} />
          </div>
        </div>
      )}

      {/* Search Bar and Filters */}
      <div className="row mb-4">
        <div className="col-md-8 offset-md-2">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-8 offset-md-2">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="stateFilter" className="form-label">Filter by State</label>
              <select
                id="stateFilter"
                className="form-select"
                onChange={(e) => handleStateFilter(e.target.value)}
                value={filters.state || ''}
              >
                <option value="">All States</option>
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="priorityFilter" className="form-label">Filter by Priority</label>
              <select
                id="priorityFilter"
                className="form-select"
                onChange={(e) => handlePriorityFilter(e.target.value)}
                value={filters.priority || ''}
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <TaskList tasks={filteredTasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;