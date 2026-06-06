import type { ReactElement } from 'react';
import type { Page } from './types';

export const createPage = (path: string, element: ReactElement, name: string): Page => ({
  path,
  element,
  name,
});
