import React, { lazy } from 'react';
import { PartialRouteObject } from './utils/PartialRouteObject';

const PublicModule = lazy(() => import('./views/public'));
const AdminModule = lazy(() => import('./views/admin'));

export default [
  {
    path: '/*',
    element: <PublicModule />,
  },
  {
    path: 'admin/*',
    element: <AdminModule />,
  },
] as PartialRouteObject[];
