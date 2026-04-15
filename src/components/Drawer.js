const Drawer = {
  render: ({ id, title, content, side = 'right' }) => {
    const translateClass = side === 'right' ? 'translate-x-full' : '-translate-x-full';
    
    return `
      <div id="${id}" class="fixed inset-0 z-[100] hidden overflow-hidden">
        <div class="absolute inset-0 bg-on-surface/40 backdrop-blur-sm opacity-0 transition-opacity duration-500" data-drawer-overlay></div>
        <div class="absolute ${side}-0 top-0 h-full w-[calc(100%-48px)] max-w-md bg-surface shadow-ambient ${translateClass} transition-transform duration-500 overflow-hidden flex flex-col" data-drawer-content>
          <!-- Header -->
          <div class="p-6 flex items-center justify-between border-b border-outline-variant/10">
            <h3 class="font-display font-bold text-lg uppercase tracking-tight">${title}</h3>
            <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors" data-drawer-close>
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <!-- Body -->
          <div class="flex-1 overflow-y-auto hide-scrollbar p-6">
            ${content}
          </div>
        </div>
      </div>
    `;
  },

  open: (id) => {
    const drawer = document.getElementById(id);
    const overlay = drawer.querySelector('[data-drawer-overlay]');
    const content = drawer.querySelector('[data-drawer-content]');

    drawer.classList.remove('hidden');
    // Force reflow
    drawer.offsetHeight;

    overlay.classList.replace('opacity-0', 'opacity-100');
    content.classList.replace('translate-x-full', 'translate-x-0');
    content.classList.replace('-translate-x-full', 'translate-x-0');
    document.body.style.overflow = 'hidden';
  },

  close: (id) => {
    const drawer = document.getElementById(id);
    const overlay = drawer.querySelector('[data-drawer-overlay]');
    const content = drawer.querySelector('[data-drawer-content]');
    const isRight = content.classList.contains('right-0');

    overlay.classList.replace('opacity-100', 'opacity-0');
    content.classList.replace('translate-x-0', isRight ? 'translate-x-full' : '-translate-x-full');

    setTimeout(() => {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
    }, 500);
  },

  init: (id) => {
    const drawer = document.getElementById(id);
    const closeBtns = drawer.querySelectorAll('[data-drawer-close]');
    const overlay = drawer.querySelector('[data-drawer-overlay]');

    closeBtns.forEach(btn => btn.addEventListener('click', () => Drawer.close(id)));
    overlay.addEventListener('click', () => Drawer.close(id));
  }
};

export default Drawer;
