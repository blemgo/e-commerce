import { Home } from '@views/Home';
import { LoginPage } from '@views/Login';
import type { Page } from './types';

export const PAGES: Page[] = [
  { path: '/', element: <Home />, name: 'Home' },
];

export const AUTH_PAGES: Page[] = [
  { path: '/login', element: <LoginPage />, name: 'Login' },
];
