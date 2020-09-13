import React, { useEffect } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core';
import theme from './theme';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

import { useDispatch } from 'react-redux';
import { accountActions } from './store/account';

import { Hub } from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';

const useStyles = makeStyles(() => ({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%',
    },
    body: {
      backgroundColor: '#f4f6f8',
      height: '100%',
      width: '100%',
    },
    a: {
      textDecoration: 'none',
    },
    '#root': {
      height: '100%',
      width: '100%',
    },
  },
}));
function App() {
  const routing = useRoutes(routes);
  useStyles();

  const dispatch = useDispatch();

  // Authentication
  useEffect(() => {
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
    const authListener = Hub.listen('auth', ({ payload: { event, data } }) => {
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

    // Maybe user is already logged in? If so, the user should be logged in from the get-go.
    handleLoginSuccess();
    return () => {
      Hub.remove('auth', authListener);
    };
  }, [dispatch]);

  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>;
}

export default App;
