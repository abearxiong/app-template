import { page, app } from './app.ts';
import { basename } from './modules/basename.ts';
export const render = ({ renderRoot }) => {
  renderRoot.innerHTML = `
    <h1>Hello, World!</h1>
  `;
};
console.log('basename', basename, page, app);

if (page) {
  page.addPage('/app-template', 'home');
  page.subscribe('home', () => {
    render({
      renderRoot: document.getElementById('ai-root'),
    });
  });
  page.addPage('', 'index');
  page.subscribe('index', () => {
    const root = document.getElementById('ai-root') as HTMLElement;
    root.innerHTML = `
      <h1>Hello, World!</h1>
    `;
  });
}

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
    })
    .addTo(app);
}
