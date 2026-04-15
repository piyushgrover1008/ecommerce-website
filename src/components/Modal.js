const Modal = {
  render: ({ id, title, content, actions = '' }) => {
    return `
      <div id="${id}" class="fixed inset-0 z-[100] hidden overflow-hidden">
        <div class="absolute inset-0 bg-on-surface/40 backdrop-blur-md opacity-0 transition-opacity duration-500" data-modal-overlay></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] h-auto max-h-[90vh] w-[calc(100%-48px)] max-w-2xl bg-surface rounded-2xl shadow-ambient opacity-0 scale-95 transition-all duration-500 overflow-hidden flex flex-col" data-modal-content>
          <!-- Header -->
          <div class="p-6 flex items-center justify-between border-b border-outline-variant/10">
            <h3 class="font-display font-bold text-lg uppercase tracking-tight">${title}</h3>
            <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors" data-modal-close>
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <!-- Body -->
          <div class="p-8 overflow-y-auto hide-scrollbar flex-1">
            ${content}
          </div>

          <!-- Actions -->
          ${actions ? `
            <div class="p-6 border-t border-outline-variant/10 flex justify-end gap-4">
              ${actions}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  open: (id) => {
    const modal = document.getElementById(id);
    const overlay = modal.querySelector('[data-modal-overlay]');
    const content = modal.querySelector('[data-modal-content]');

    modal.classList.remove('hidden');
    // Force reflow
    modal.offsetHeight;

    overlay.classList.replace('opacity-0', 'opacity-100');
    content.classList.replace('opacity-0', 'opacity-100');
    content.classList.replace('-translate-y-[40%]', '-translate-y-1/2');
    content.classList.replace('scale-95', 'scale-100');
    document.body.style.overflow = 'hidden';
  },

  close: (id) => {
    const modal = document.getElementById(id);
    const overlay = modal.querySelector('[data-modal-overlay]');
    const content = modal.querySelector('[data-modal-content]');

    overlay.classList.replace('opacity-100', 'opacity-0');
    content.classList.replace('opacity-100', 'opacity-0');
    content.classList.replace('-translate-y-1/2', '-translate-y-[40%]');
    content.classList.replace('scale-100', 'scale-95');

    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 500);
  },

  init: (id) => {
    const modal = document.getElementById(id);
    const closeBtns = modal.querySelectorAll('[data-modal-close]');
    const overlay = modal.querySelector('[data-modal-overlay]');

    closeBtns.forEach(btn => btn.addEventListener('click', () => Modal.close(id)));
    overlay.addEventListener('click', () => Modal.close(id));
  }
};

export default Modal;
