import { products } from '../data/products.js';
import { formatPrice } from '../utils/formatPrice.js';

const SearchOverlay = {
  init: () => {
    const overlay = document.createElement('div');
    overlay.id = 'search-overlay';
    overlay.className = 'fixed inset-0 z-[110] hidden h-full w-full';
    overlay.innerHTML = `
      <div class="absolute inset-0 bg-on-surface/60 backdrop-blur-2xl opacity-0 transition-opacity duration-500" data-search-bg></div>
      <div class="relative z-10 max-w-[1440px] mx-auto px-6 pt-32 h-full flex flex-col">
        <div class="flex items-center border-b-2 border-primary pb-4 mb-20 translate-y-12 opacity-0 transition-all duration-500" data-search-input-wrapper>
          <span class="material-symbols-outlined text-white text-[32px] mr-6">search</span>
          <input 
            type="text" 
            id="search-query" 
            placeholder="WHAT ARE YOU LOOKING FOR?" 
            class="bg-transparent border-none outline-none text-white text-3xl md:text-5xl font-display font-light placeholder:text-white/20 w-full"
          >
          <button class="text-white hover:text-primary transition-colors" data-search-close>
            <span class="material-symbols-outlined text-[32px]">close</span>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto hide-scrollbar pb-24 opacity-0" data-search-results-wrapper>
           <h4 class="text-[10px] font-bold tracking-[0.4em] text-white/40 mb-12 uppercase">SEARCH RESULTS</h4>
           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16" id="search-results">
              <!-- Results here -->
           </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = document.getElementById('search-query');
    const resultsContainer = document.getElementById('search-results');
    const closeBtn = overlay.querySelector('[data-search-close]');
    const bg = overlay.querySelector('[data-search-bg]');

    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      if (query.length < 2) {
        resultsContainer.innerHTML = '';
        return;
      }

      const results = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      );

      resultsContainer.innerHTML = results.map(product => `
        <a href="#/product/${product.id}" class="group block" data-search-close>
          <div class="aspect-[4/5] bg-white/5 rounded-xl overflow-hidden mb-6">
            <img src="${product.images[0].url}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
          </div>
          <h5 class="text-white font-display font-bold text-lg mb-2 line-clamp-1">${product.name}</h5>
          <p class="text-white/50 text-xs font-bold tracking-widest">${formatPrice(product.price)}</p>
        </a>
      `).join('');
    });

    const closeHandler = () => {
      overlay.querySelector('[data-search-bg]').classList.replace('opacity-100', 'opacity-0');
      overlay.querySelector('[data-search-input-wrapper]').classList.add('translate-y-12', 'opacity-0');
      overlay.querySelector('[data-search-results-wrapper]').classList.replace('opacity-100', 'opacity-0');
      setTimeout(() => {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
      }, 500);
    };

    closeBtn.addEventListener('click', closeHandler);
    bg.addEventListener('click', closeHandler);
    
    // Close on escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.classList.contains('hidden')) closeHandler();
    });

    // Handle link clicks inside results
    resultsContainer.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeHandler();
    });
  },

  open: () => {
    const overlay = document.getElementById('search-overlay');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Force reflow
    overlay.offsetHeight;

    overlay.querySelector('[data-search-bg]').classList.replace('opacity-0', 'opacity-100');
    overlay.querySelector('[data-search-input-wrapper]').classList.remove('translate-y-12', 'opacity-0');
    overlay.querySelector('[data-search-results-wrapper]').classList.replace('opacity-0', 'opacity-100');
    
    document.getElementById('search-query').focus();
  }
};

export default SearchOverlay;
