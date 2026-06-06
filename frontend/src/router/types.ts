import type { ReactElement } from 'react';

export interface Page {
  path: string;
  element: ReactElement;
  name: string;
}
