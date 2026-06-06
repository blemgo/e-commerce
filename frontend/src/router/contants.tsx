import { Home } from '@views/Home';
import type { Page } from './types';
import { createPage } from './functions';

export const PAGES: Page[] = [
  createPage('/', <Home />, 'Home'),
];
