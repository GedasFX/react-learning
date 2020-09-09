import React from 'react';
import { useRoutes } from 'react-router-dom';
import { PartialRouteObject } from '../../utils/PartialRouteObject';

import Layout from './_Layout';

import DashboardView from './DashboardView';

const routes: PartialRouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <DashboardView />,
      },
    ],
  },
];

export default () => {
  return useRoutes(routes);
};
