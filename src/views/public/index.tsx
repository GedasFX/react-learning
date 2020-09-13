import React from 'react';
import { PartialRouteObject } from '../../utils/PartialRouteObject';
import { useRoutes } from 'react-router-dom';

import Layout from './_Layout';

import HomeView from './HomeView';

import LoginView from './account/LoginView';
import TasksView from './TasksView';

const routes: PartialRouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomeView />,
      },
      {
        path: 'tasks',
        element: <TasksView />,
      },
      {
        path: 'account',
        children: [{ path: 'login', element: <LoginView /> }],
      },
    ],
  },
];

export default () => {
  return useRoutes(routes);
};
