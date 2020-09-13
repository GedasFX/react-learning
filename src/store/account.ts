import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '.';
import { Hub, Auth } from 'aws-amplify';

const accountSlice = createSlice({
  name: '[ACCOUNT]',
  initialState: {
    loading: false,
    user: undefined as { username: string; token: string } | undefined,
  },
  reducers: {
    login: (state) => ({ ...state, loading: true }),
    loginSuccess: (
      state,
      action: PayloadAction<{ user: { username: string; token: string } }>
    ) => ({
      ...state,
      user: action.payload.user,
    }),
    loginFailure: (state) => ({
      ...state,
    }),
    logout: (state) => ({ ...state, user: undefined }),
  },
});

export const accountActions = accountSlice.actions;
export const accountThunkActions = {
  login: (): AppThunk => async (dispatch) => {
    dispatch(accountActions.login());

    const handleLoginSuccess = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      const session = await Auth.currentSession();

      dispatch(
        accountActions.loginSuccess({
          user: {
            username: userData.getUsername(),
            token: session.getAccessToken().getJwtToken(),
          },
        })
      );
    };

    // Setup Auth changes listener.
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'cognitoHostedUI':
          handleLoginSuccess();
          break;
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          dispatch(accountActions.loginFailure());
          break;
        case 'signOut':
          dispatch(accountActions.logout());
          break;
      }
    });

    // Maybe user is already logged in? If so 
    handleLoginSuccess();
  },
};

export default accountSlice;
