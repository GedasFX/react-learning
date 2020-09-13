import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../store';
import { Hub, Auth } from 'aws-amplify';
import { Button } from '@material-ui/core';
import { accountActions } from '../../../store/account';

export default () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s: AppState) => s.account);

  useEffect(() => {
    const updateUser = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      const session = await Auth.currentSession();

      dispatch(
        accountActions.signInSuccess({
          user: {
            username: userData.getUsername(),
            token: session.getAccessToken().getJwtToken(),
          },
        })
      );
    };

    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'cognitoHostedUI':
          updateUser();
          break;
        case 'signOut':
          dispatch(accountActions.signOut());
          break;
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    updateUser();
  }, [dispatch]);

  if (user) {
    return (
      <div>
        <p>User: {user.username}</p>
        <Button onClick={() => Auth.signOut()}>Sign Out</Button>
      </div>
    );
  }
  return (
    <div>
      <p>User: None</p>
      <Button onClick={() => Auth.federatedSignIn()}>Federated Sign In</Button>
    </div>
  );
};
