export const render = ({ renderRoot }) => {
  renderRoot.innerHTML = `
    <h1>Hello, World!</h1>
  `;
};

render({
  renderRoot: document.getElementById('ai-root'),
});
