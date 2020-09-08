import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "[ACCOUNT]",
  initialState: {
    user: undefined as { username: string; token: string } | undefined,
  },
  reducers: {
    signInSuccess: (
      state,
      action: PayloadAction<{ user: { username: string; token: string } }>
    ) => ({
      ...state,
      user: action.payload.user,
    }),
    signInFailure: (state) => ({
      ...state,
    }),
    signOut: (state) => ({ ...state, user: undefined }),
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice;
