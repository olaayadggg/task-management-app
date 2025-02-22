import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from './TaskCard';
import { moveTask } from '../features/tasksSlice';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  // Group tasks by status
  const groupedTasks = {
    todo: tasks.filter((task) => task.status === 'todo'),
    doing: tasks.filter((task) => task.status === 'doing'),
    done: tasks.filter((task) => task.status === 'done'),
  };

  // Handle drag-and-drop
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If dropped outside the list, do nothing
    if (!destination) return;

    // If dropped in the same column, do nothing
    if (source.droppableId === destination.droppableId) return;

    // Move the task to the new column
    dispatch(moveTask({ taskId: parseInt(draggableId), newStatus: destination.droppableId }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="row">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="col-md-4">
            <h3 className="text-center text-capitalize">{status}</h3>
            <Droppable droppableId={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="p-3 bg-light rounded"
                >
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-3"
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;