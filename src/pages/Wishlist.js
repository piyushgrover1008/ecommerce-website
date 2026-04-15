import { wishlistStore } from '../stores/wishlistStore.js';
import ProductCard from '../components/ProductCard.js';

const Wishlist = {
  render: async () => {
    const items = wishlistStore.items;
    const container = document.createElement('div');
    container.className = 'max-w-[1440px] mx-auto px-6 py-12';

    if (items.length === 0) {
      container.innerHTML = `
        <div class="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <span class="material-symbols-outlined text-[64px] text-outline-variant mb-6">favorite</span>
          <h1 class="text-5xl font-display font-bold tracking-tighter mb-4 italic">FAVORITES ARCHIVE EMPTY</h1>
          <p class="text-secondary mb-12 uppercase tracking-widest text-xs font-bold">YOUR CURATION AWAITS DISCOVERY.</p>
          <a href="#/shop" class="bg-primary-gradient text-white px-12 py-5 rounded-full font-bold text-xs tracking-widest shadow-lg">EXPLORE GALLERY</a>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="flex justify-between items-baseline mb-16 border-b border-outline-variant/10 pb-8">
           <div>
              <h1 class="text-5xl font-display font-bold tracking-tight mb-2 italic">FAVORITES ARCHIVE</h1>
              <p class="text-xs font-bold tracking-[0.2em] text-secondary uppercase">${items.length} CURATED ITEMS</p>
           </div>
           <button class="text-xs font-bold tracking-widest text-error uppercase underline decoration-2 underline-offset-8" id="clear-wishlist">CLEAR ALL</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          ${items.map(product => `
            <div class="animate-staggered-entry">
              ${ProductCard.render(product)}
            </div>
          `).join('')}
        </div>
      `;
    }

    return container;
  },

  afterRender: () => {
    const clearBtn = document.getElementById('clear-wishlist');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        // Clear logic would go here
        alert('Wishlist cleared (mock)');
        window.location.reload();
      });
    }
  }
};

export default Wishlist;
