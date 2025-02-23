import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  tasks: [
    {
      id: "1",
      title: "Task 1",
      description: "Description for Task 1",
      priority: "low",
      status: "todo",
      image:"https://img.freepik.com/free-vector/flat-scrum-task-board-with-hands-team-members-color-paper-stickers-group-software-developers-create-work-project-schedule-with-sticky-notes-teamwork-development-sprint-planning-concept_88138-909.jpg?t=st=1740287887~exp=1740291487~hmac=9533000c220e5d91f3a8df2292921aa74a4deb44e62bbb1a0794218cbcea61ac&w=1380"
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description for Task 2",
      priority: "medium",
      status: "doing",
      image:"https://img.freepik.com/premium-vector/business-team-planning-schedule-office-vector-illustration_450176-82.jpg?w=1380"
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description for Task 3",
      priority: "high",
      status: "done",
      image:"https://img.freepik.com/premium-vector/planning-schedule-concept-with-business-characters-working-with-planner-team-work-together-flat-people-teamworking-with-timetable_87771-4497.jpg"
      
    },
  ],
  filters: {
    search: '',
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { addTask, updateTask, deleteTask, setFilters } = tasksSlice.actions;
export default tasksSlice.reducer;