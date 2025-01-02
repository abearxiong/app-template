import { useContextKey } from '@kevisual/store/config';
import { Page } from '@kevisual/store/page';
import { QueryRouterServer } from '@kevisual/router';
export const render = ({ renderRoot }) => {
  renderRoot.innerHTML = `
    <h1>Hello, World!</h1>
  `;
};

const page = useContextKey('page', () => {
  return new Page({
    basename: '',
  });
});

if (page) {
  page.addPage('/app-template', 'home');
  page.subscribe('home', () => {
    render({
      renderRoot: document.getElementById('ai-root'),
    });
  });
}

const app = useContextKey('app', () => {
  console.error('app not found');
  return null as unknown as QueryRouterServer;
});
if (app) {
  app
    .route({
      path: 'app-template',
      key: 'render',
    })
    .define(async (ctx) => {
      let { renderRoot } = ctx.query;
      if (!renderRoot) {
        ctx.throw(404, 'renderRoot is required');
      }
      if (typeof renderRoot === 'string') {
        renderRoot = document.querySelector(renderRoot);
      }
      if (!renderRoot) {
        ctx.throw(404, 'renderRoot not found');
      }
      render({
        renderRoot,
      });
    }).addTo(app);
}
