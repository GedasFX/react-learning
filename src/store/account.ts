import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CognitoUser } from "@aws-amplify/auth";

export const accountSlice = createSlice({
  name: "[ACCOUNT]",
  initialState: { user: undefined as CognitoUser | undefined },
  reducers: {
    signIn: (state, { payload }: PayloadAction<{ user: CognitoUser }>) => ({
      ...state,
      user: payload.user,
    }),
    signOut: (state) => ({ ...state, user: undefined }),
  },
});
