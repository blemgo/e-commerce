import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { Home } from '@views/Home';
import { CatalogPage } from '@views/Catalog';
import { ProductPage } from '@views/ProductPage';
import { LoginPage } from '@views/Login';
import { CheckoutPage } from '@views/Checkout';
import { AccountLayout } from '@views/Account';
import { ProfilePage } from '@views/Account/Profile';
import { OrdersPage } from '@views/Account/Orders';
import { OrderTrackingPage } from '@views/Account/OrderTracking';
import { AddressesPage } from '@views/Account/Addresses';
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
];

export const ACCOUNT_ROUTE: RouteObject = {
  path: '/account',
  element: (
    <ProtectedRoute>
      <AccountLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Navigate to="/account/profile" replace /> },
    { path: 'profile', element: <ProfilePage /> },
    { path: 'orders', element: <OrdersPage /> },
    { path: 'orders/:orderId', element: <OrderTrackingPage /> },
    { path: 'addresses', element: <AddressesPage /> },
  ],
};

export const AUTH_PAGES: Page[] = [
  { path: '/login', element: <LoginPage />, name: 'Login' },
];
