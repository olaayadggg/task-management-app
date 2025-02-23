import React from "react";
import TaskCard from "./TaskCard";
import { useDispatch } from "react-redux";

const TaskList = ({ tasks = [], onUpdate, onDelete, filters, setFilters }) => {
  const dispatch = useDispatch();

  // Handle filter by state
  const handleStateFilter = (state) => {
    dispatch(setFilters({ state }));
  };

  // Handle filter by priority
  const handlePriorityFilter = (priority) => {
    dispatch(setFilters({ priority }));
  };
  return (
    <div>
      <div className="row g-3 mb-4">
        <div className="col-md-6 text-start">
          <label htmlFor="stateFilter" className="form-label">
            Filter by State
          </label>
          <select
            id="stateFilter"
            className="form-select"
            onChange={(e) => handleStateFilter(e.target.value)}
            value={filters.state || ""}
          >
            <option value="">All States</option>
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="col-md-6 text-start">
          <label htmlFor="priorityFilter" className="form-label">
            Filter by Priority
          </label>
          <select
            id="priorityFilter"
            className="form-select"
            onChange={(e) => handlePriorityFilter(e.target.value)}
            value={filters.priority || ""}
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div className="row">
        {tasks.map((task) => (
          <div key={task.id} className="col-md-4 mb-4">
            <TaskCard task={task} onUpdate={onUpdate} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;