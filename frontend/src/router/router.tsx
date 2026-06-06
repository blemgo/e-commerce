import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@views/Layout';
import { PAGES } from './contants';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: PAGES.map(({ path, element }) => ({ path, element })),
  },
]);

const Router = () => <RouterProvider router={router} />;

export { Router };
