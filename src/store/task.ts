import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetTaskQuery, ListTasksQuery } from '../API';
import { AppThunk } from '.';
import { API } from 'aws-amplify';
import { listTasks } from '../graphql/queries';

const taskSlice = createSlice({
  name: '[TASK]',
  initialState: {
    tasks: [] as GetTaskQuery[],
    loading: false,
  },
  reducers: {
    getTasks: (state) => ({ ...state, loading: true }),
    getTasksSuccess: (
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
export const taskThunkActions = {
  getTasks: (): AppThunk => async (dispatch) => {
    dispatch(taskActions.getTasks());

    const tasks: GraphQLResult<ListTasksQuery> = await API.graphql({
      query: listTasks,
    });
  },
};

export type d = typeof taskSlice.actions;
export default taskSlice;
