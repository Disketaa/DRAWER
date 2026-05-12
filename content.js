function inject(container) {
  if (container.querySelector('[data-bb]')) return;

  const ref = container.children[1];
  if (!ref) return;

  const btn = document.createElement('button');
  btn.textContent = '📦 Отрисовать баннер';
  btn.dataset.bb = '1';
  btn.className = ref.className;

  btn.addEventListener('click', () => {});

  container.insertBefore(btn, ref);
}

function findAndInject() {
  for (const el of document.querySelectorAll('div')) {
    if (el.children.length === 2 &&
        el.children[0]?.tagName === 'BUTTON' &&
        el.children[1]?.tagName === 'BUTTON') {
      inject(el);
      return true;
    }
  }
  return false;
}

if (!findAndInject()) {
  const observer = new MutationObserver(() => {
    if (findAndInject()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}