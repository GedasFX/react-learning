import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
import Auth from '@aws-amplify/auth';
import { Button } from '@material-ui/core';

export default () => {
  const { user } = useSelector((s: AppState) => s.account);

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
