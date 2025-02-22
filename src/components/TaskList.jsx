import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks = [], onUpdate, onDelete }) => {
  return (
    <div className="row">
      {tasks.map((task) => (
        <div key={task.id} className="col-md-4 mb-4">
          <TaskCard task={task} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;