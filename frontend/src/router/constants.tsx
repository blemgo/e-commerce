import { Home } from '@views/Home';
import { CatalogPage } from '@views/Catalog';
import { ProductPage } from '@views/ProductPage';
import { LoginPage } from '@views/Login';
import { CheckoutPage } from '@views/Checkout';
import { OrdersPage } from '@views/Orders';
import { ProtectedRoute } from './ProtectedRoute';
import type { Page } from './types';

export const CATALOG_PAGES: Page[] = [
  { path: '/', element: <Home />, name: 'Home' },
  { path: '/catalog', element: <CatalogPage />, name: 'Catalog' },
  { path: '/product/:productId', element: <ProductPage />, name: 'Product' },
];

export const PAGES: Page[] = [
  {
    path: '/checkout',
    element: (
      <ProtectedRoute>
        <CheckoutPage />
      </ProtectedRoute>
    ),
    name: 'Checkout',
  },
  {
    path: '/orders',
    element: (
      <ProtectedRoute>
        <OrdersPage />
      </ProtectedRoute>
    ),
    name: 'Orders',
  },
];

export const AUTH_PAGES: Page[] = [
  { path: '/login', element: <LoginPage />, name: 'Login' },
];
