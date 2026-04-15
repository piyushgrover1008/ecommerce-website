import { eventBus, EVENTS } from '../utils/eventBus.js';

const Toast = {
  init: () => {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-24 right-6 z-[100] flex flex-col gap-4 pointer-events-none';
    document.body.appendChild(container);

    eventBus.on(EVENTS.SHOW_TOAST, ({ message, type = 'success' }) => {
      Toast.show(message, type);
    });
  },

  show: (message, type) => {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const colors = {
      success: 'bg-on-surface text-surface',
      error: 'bg-error text-white',
      info: 'bg-primary text-white'
    };

    toast.className = `${colors[type]} px-6 py-4 rounded-lg shadow-ambient flex items-center gap-3 animate-staggered-entry pointer-events-auto cursor-pointer`;
    toast.innerHTML = `
      <span class="material-symbols-outlined text-[20px]">${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}</span>
      <p class="text-xs font-bold tracking-wide uppercase">${message}</p>
    `;

    container.appendChild(toast);

    // Auto-remove
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.4s ease-in';
      setTimeout(() => toast.remove(), 400);
    }, 4000);

    // Click to remove
    toast.addEventListener('click', () => toast.remove());
  }
};

export default Toast;
