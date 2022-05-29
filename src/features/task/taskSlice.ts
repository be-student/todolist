import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "../../app/store";

export interface tasks {
  id: number;
  title: string;
  description: string;
  tag: Array<string>;
  complete: boolean;
  createdAt: number;
  goalAt: number;
}

export interface CheckedState {
  isComplete: boolean;
  isNotComplete: boolean;
  tasks: Array<tasks>;
}

const initialState: CheckedState = {
  isComplete: false,
  isNotComplete: false,
  tasks: [
    {
      id: 1,
      title: "first Task",
      description: "task description",
      tag: ["tag1", "tag2"],
      complete: false,
      createdAt: new Date().valueOf(),
      goalAt: new Date().valueOf() + 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: 2,
      title: "second Task",
      description: "task2 description",
      tag: ["tag2", "tag3"],
      complete: true,
      createdAt: new Date().valueOf(),
      goalAt: new Date().valueOf() + 1000 * 60 * 60 * 24 * 4,
    },
  ],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    checkComplete: (state) => {
      (state.isComplete = !state.isComplete), (state.isNotComplete = false);
    },
    checkNotComplete: (state) => {
      (state.isComplete = false), (state.isNotComplete = !state.isNotComplete);
    },
    addTask: (state, action: PayloadAction<Partial<tasks>>) => {
      (action.payload.id =
        (state.tasks.length > 0 ? state.tasks[state.tasks.length - 1].id : 1) +
        1),
        (action.payload.createdAt = new Date().valueOf());
      state.tasks.push(action.payload as tasks);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    deleteCompletedTask: (state) => {
      state.tasks = state.tasks.filter((task) => task.complete === false);
    },
    checkTask: (state, action: PayloadAction<number>) => {
      state.tasks[
        state.tasks.findIndex((element) => element.id === action.payload)
      ].complete =
        !state.tasks[
          state.tasks.findIndex((element) => element.id === action.payload)
        ].complete;
    },
  },
});

export const {
  checkComplete,
  checkNotComplete,
  deleteCompletedTask,
  addTask,
  checkTask,
  deleteTask,
} = taskSlice.actions;
export const selectComplete = (state: AppState) => state.task.isComplete;
export const selectNotComplete = (state: AppState) => state.task.isNotComplete;
export const selectTasks = (state: AppState) => state.task.tasks;
export default taskSlice.reducer;
