import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListTasksQuery } from '../API';
import { AppThunk } from '.';
import API, { GraphQLResult } from '@aws-amplify/api';
import { listTasks } from '../graphql/queries';
import { Task } from '../models';

const taskSlice = createSlice({
  name: '[TASK]',
  initialState: {
    tasks: [] as Task[],
    loading: false,
  },
  reducers: {
    getTasks: (state) => ({ ...state, loading: true }),
    getTasksSuccess: (state, action: PayloadAction<{ tasks: Task[] }>) => ({
      ...state,
      tasks: action.payload.tasks,
    }),

    execFailure: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const taskActions = taskSlice.actions;
export const taskThunkActions = {
  getTasks: (): AppThunk => async (dispatch) => {
    dispatch(taskActions.getTasks());

    try {
      const gqlResult = (await API.graphql({
        query: listTasks,
      })) as GraphQLResult<ListTasksQuery>;

      dispatch(
        taskActions.getTasksSuccess({
          tasks: gqlResult.data?.listTasks?.items as any,
        })
      );
    } catch (e) {
      dispatch(taskActions.execFailure(e));
    }
  },
};

export default taskSlice;
