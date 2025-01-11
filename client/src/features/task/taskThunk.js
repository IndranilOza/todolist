import { createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

// Fetch tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (userId, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const token = auth?.token;
      const data = await taskService.getTasks(userId, token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data || "Error fetching tasks"
      );
    }
  }
);

// Create a new task
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const token = auth?.token;
      const data = await taskService.createTask(task, token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data || "Error adding task"
      );
    }
  }
);

// Update an existing task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, task }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const token = auth?.token;
      const data = await taskService.updateTask(id, task, token);
      return { id, ...data };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data || "Error updating task"
      );
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const token = auth?.token;
      await taskService.deleteTask(id, token);
      return id; // Only returning ID of the deleted task
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data || "Error deleting task"
      );
    }
  }
);
