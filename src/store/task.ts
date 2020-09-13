import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetTaskQuery } from '../API';

const taskSlice = createSlice({
  name: '[TASK]',
  initialState: {
    tasks: [] as GetTaskQuery[],
  },
  reducers: {
    getTaskSuccess: (
      state,
      action: PayloadAction<{ tasks: GetTaskQuery[] }>
    ) => ({
      ...state,
      tasks: action.payload.tasks,
    }),

    operationFailure: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const taskActions = taskSlice.actions;

export default taskSlice;
