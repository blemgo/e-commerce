import { Home } from '@views/Home';
import { Login } from '@views/Login';
import type { Page } from './types';
import { createPage } from './functions';

export const PAGES: Page[] = [
  createPage('/', <Home />, 'Home'),
];

export const AUTH_PAGES: Page[] = [
  createPage('/login', <Login />, 'Login'),
];
