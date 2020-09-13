import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';

import accountSlice from './account';
import taskSlice from './task';

export const rootReducer = combineReducers({
  account: accountSlice.reducer,
  task: taskSlice.reducer,
});
export type AppState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./index', () => {
    const newRootReducer = require('./index').rootReducer;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;

export default store;
