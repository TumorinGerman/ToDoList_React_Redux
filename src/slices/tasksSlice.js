// @ts-check
/* eslint-disable no-param-reassign */
import axios from "axios";

import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  current,
} from "@reduxjs/toolkit";
import routes from "../routes.js";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(routes.tasksPath());
  return response.data.items;
});

// BEGIN (write your solution here)
export const postTask = createAsyncThunk("task/postTask", async (name) => {
  const response = await axios.post(routes.tasksPath(), name);
  return response.data;
});

export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  const response = await axios.delete(routes.taskPath(id));
  return response.data;
});

const tasksAdapter = createEntityAdapter();

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState({}),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        tasksAdapter.addMany(state, action);
      })
      .addCase(postTask.fulfilled, (state, action) => {
        tasksAdapter.addOne(state, action);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        tasksAdapter.removeOne(state, action.payload);
      });
  },
});

export const { actions } = tasksSlice;
export const selectors = tasksAdapter.getSelectors((state) => state.tasks);
export default tasksSlice.reducer;
// END
