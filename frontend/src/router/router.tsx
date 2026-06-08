import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@views/Layout';
import { AuthLayout } from '@views/AuthLayout';
import { PAGES, AUTH_PAGES } from './constants';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: PAGES.map(({ path, element }) => ({ path, element })),
  },
  {
    element: <AuthLayout />,
    children: AUTH_PAGES.map(({ path, element }) => ({ path, element })),
  },
]);

const Router = () => <RouterProvider router={router} />;

export { Router };
