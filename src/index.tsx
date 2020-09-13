import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';

import Amplify from '@aws-amplify/core';
import awsConfig from './aws-exports';

import { Provider as ReduxProvider } from 'react-redux';
import Store from './store';

Amplify.configure(awsConfig);

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={Store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
