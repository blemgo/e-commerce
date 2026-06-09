import { Home } from '@views/Home';
import { CatalogPage } from '@views/Catalog';
import { ProductPage } from '@views/ProductPage';
import { LoginPage } from '@views/Login';
import type { Page } from './types';

export const PAGES: Page[] = [
  { path: '/', element: <Home />, name: 'Home' },
  { path: '/catalog', element: <CatalogPage />, name: 'Catalog' },
  { path: '/product/:productId', element: <ProductPage />, name: 'Product' },
];

export const AUTH_PAGES: Page[] = [
  { path: '/login', element: <LoginPage />, name: 'Login' },
];
