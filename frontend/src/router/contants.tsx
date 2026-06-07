import { Home } from '@views/Home';
import { LoginPage } from '@views/Login';
import type { Page } from './types';
import { createPage } from './functions';

export const PAGES: Page[] = [
  createPage('/', <Home />, 'Home'),
];

export const AUTH_PAGES: Page[] = [
  createPage('/login', <LoginPage />, 'Login'),
];
