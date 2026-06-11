import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@views/Layout';
import { AuthLayout } from '@views/AuthLayout';
import { CATALOG_PAGES, PAGES, ACCOUNT_ROUTE, AUTH_PAGES } from './constants';

const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: CATALOG_PAGES.map(({ path, element }) => ({ path, element })),
  },
  {
    element: <Layout variant="basic" />,
    children: [
      ...PAGES.map(({ path, element }) => ({ path, element })),
      ACCOUNT_ROUTE,
    ],
  },
  {
    element: <AuthLayout />,
    children: AUTH_PAGES.map(({ path, element }) => ({ path, element })),
  },
]);

const Router = () => <RouterProvider router={appRouter} />;

export { Router, appRouter };
