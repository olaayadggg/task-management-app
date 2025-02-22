import React, { useState } from 'react';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image change in edit mode
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setUpdatedTask({ ...updatedTask, image: file });
    }
  };

  // Handle task update
  const handleUpdate = () => {
    onUpdate(task.id, updatedTask);
    setIsEditing(false);
    setImagePreview(null);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedTask(task); // Reset to the original task
    setImagePreview(null); // Clear the image preview
  };

  // Generate image URL for display
  const imageUrl = imagePreview || (updatedTask.image && updatedTask.image instanceof File ? URL.createObjectURL(updatedTask.image) : null);

  return (
    <div className="card h-100 shadow-sm hover-shadow" style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}>
      {imageUrl && (
        <img src={imageUrl} alt="Task" className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
      )}
      <div className="card-body d-flex flex-column">
        {isEditing ? (
          <div>
            <div className="mb-3">
              <label className="form-label">Change Image</label>
              <input type="file" accept="image/jpeg, image/png, image/gif" onChange={handleImageChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                value={updatedTask.title}
                onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                value={updatedTask.description}
                onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Priority</label>
              <select
                value={updatedTask.priority}
                onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
                className="form-control"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                value={updatedTask.status}
                onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}
                className="form-control"
              >
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>
            <button onClick={handleUpdate} className="btn btn-primary me-2">
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex-grow-1">
            <h5 className="card-title fw-bold">{task.title}</h5>
            <p className="card-text text-muted">{task.description}</p>
            <div className="mb-2">
              <span className="badge bg-info me-2">Priority: {task.priority}</span>
              <span className="badge bg-warning">Status: {task.status}</span>
            </div>
          </div>
        )}
        <div className="mt-auto d-flex justify-content-between">
          <button onClick={() => setIsEditing(true)} className="btn btn-outline-warning">
            Edit
          </button>
          <button onClick={() => onDelete(task.id)} className="btn btn-outline-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;