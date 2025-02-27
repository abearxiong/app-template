import type { Page } from '@kevisual/store/page';
import type { QueryRouterServer } from '@kevisual/router';
import { basename } from './modules/basename';
export const page = useContextKey('page', () => {
  return new window.Page({
    basename,
  }) as unknown as Page;
});
export const app = useContextKey('app', () => {
  console.error('app not found');
  return null as unknown as QueryRouterServer;
});
