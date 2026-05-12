function inject(container) {
  if (container.querySelector('[data-bb]')) return;

  const ref = container.children[1];
  if (!ref) return;

  const btn = document.createElement('button');
  btn.textContent = '🤖 Отрисовать баннер';
  btn.dataset.bb = '1';
  btn.className = ref.className;

  btn.addEventListener('click', () => {});

  container.insertBefore(btn, ref);
}

function findAndInject() {
  const canvas = document.querySelector('canvas');
  if (!canvas) return;

  let node = canvas.parentElement;
  while (node) {
    for (const child of node.children) {
      if (child.tagName === 'DIV' &&
          child.children.length === 2 &&
          child.children[0]?.tagName === 'BUTTON' &&
          child.children[1]?.tagName === 'BUTTON') {
        inject(child);
        return;
      }
    }
    node = node.parentElement;
  }
}

findAndInject();

new MutationObserver(findAndInject)
    .observe(document.body, { childList: true, subtree: true });