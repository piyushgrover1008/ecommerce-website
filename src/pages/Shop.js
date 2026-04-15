import { products } from '../data/products.js';
import { categories } from '../data/collections.js';
import ProductCard from '../components/ProductCard.js';
import FilterChip from '../components/FilterChip.js';
import { formatPrice } from '../utils/formatPrice.js';

const Shop = {
  render: async (params) => {
    const container = document.createElement('div');
    container.className = 'max-w-[1440px] mx-auto px-6 py-12';

    // Get filter from URL
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const filterType = urlParams.get('filter') || params?.filter;
    const collectionType = urlParams.get('collection');
    const categoryType = urlParams.get('category');

    let filteredProducts = [...products];

    if (filterType === 'new') filteredProducts = filteredProducts.filter(p => p.newArrival);
    if (filterType === 'curated') filteredProducts = filteredProducts.filter(p => p.curated);
    if (collectionType) {
       // Mock collection filter - in real app, products would have a collectionId
       if (collectionType === 'neon-nomad') filteredProducts = filteredProducts.filter(p => p.category === 'Footwear' || p.category === 'Outerwear');
       if (collectionType === 'cyber-pastel') filteredProducts = filteredProducts.filter(p => p.category === 'Tops' || p.category === 'Audio');
       if (collectionType === 'mono-lith') filteredProducts = filteredProducts.filter(p => p.category === 'Accessories' || p.category === 'Bottoms');
    }
    if (categoryType) filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === categoryType.toLowerCase());

    container.innerHTML = `
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-12 border-b border-outline-variant/10 pb-8">
        <div>
          <h1 class="text-5xl font-display font-bold tracking-tight mb-2">
            ${collectionType ? collectionType.replace('-', ' ').toUpperCase() : 'COLLECTIONS 2026'}
          </h1>
          <p class="text-xs font-bold tracking-[0.2em] text-secondary uppercase">${filteredProducts.length} ITEMS FOUND</p>
        </div>
        
        <!-- Sorting -->
        <div class="flex items-center gap-4">
          <span class="text-[10px] font-bold tracking-widest text-secondary">SORT BY:</span>
          <select class="bg-transparent border-none outline-none text-xs font-bold tracking-widest cursor-pointer">
            <option>FEATURED</option>
            <option>PRICE: LOW TO HIGH</option>
            <option>PRICE: HIGH TO LOW</option>
            <option>NEWEST</option>
          </select>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-64 flex-shrink-0">
          <div class="sticky top-32 space-y-12">
            <!-- Categories -->
            <div>
              <h4 class="text-[10px] font-bold tracking-[0.3em] mb-6 uppercase">CATEGORIES</h4>
              <div class="flex flex-wrap gap-2">
                ${categories.map(cat => FilterChip.render({ 
                  label: cat, 
                  value: cat.toLowerCase(),
                  selected: categoryType === cat.toLowerCase()
                })).join('')}
              </div>
            </div>

            <!-- Price Range -->
            <div>
              <h4 class="text-[10px] font-bold tracking-[0.3em] mb-6 uppercase">PRICE RANGE</h4>
              <div class="space-y-4">
                <input type="range" min="0" max="3000" step="100" class="w-full accent-primary">
                <div class="flex justify-between text-[10px] font-bold text-secondary">
                  <span>$0</span>
                  <span>$3,000</span>
                </div>
              </div>
            </div>

            <!-- Colors -->
            <div>
              <h4 class="text-[10px] font-bold tracking-[0.3em] mb-6 uppercase">COLORS</h4>
              <div class="flex flex-wrap gap-3">
                <button class="w-6 h-6 rounded-full bg-on-surface border border-outline-variant/20 hover:scale-110 transition-transform"></button>
                <button class="w-6 h-6 rounded-full bg-surface-container-low border border-outline-variant/20 hover:scale-110 transition-transform"></button>
                <button class="w-6 h-6 rounded-full bg-primary border border-outline-variant/20 hover:scale-110 transition-transform"></button>
                <button class="w-6 h-6 rounded-full bg-secondary border border-outline-variant/20 hover:scale-110 transition-transform"></button>
              </div>
            </div>

            <button class="text-[10px] font-bold tracking-widest text-primary underline underline-offset-4" id="clear-filters">
              CLEAR ALL FILTERS
            </button>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="flex-1">
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
            ${filteredProducts.length > 0 
              ? filteredProducts.map(product => ProductCard.render(product)).join('')
              : `<div class="col-span-full py-24 text-center">
                   <p class="text-secondary italic">No products match your current filters.</p>
                 </div>`
            }
          </div>

          <!-- Pagination -->
          ${filteredProducts.length > 0 ? `
            <div class="mt-24 border-t border-outline-variant/10 pt-12 flex items-center justify-between">
              <button class="flex items-center gap-2 text-[10px] font-bold tracking-widest disabled:opacity-30" disabled>
                <span class="material-symbols-outlined text-[18px]">arrow_back</span> PREV
              </button>
              <div class="flex gap-4">
                <span class="w-8 h-8 flex items-center justify-center rounded-full bg-on-surface text-surface text-xs font-bold">01</span>
                <span class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-low text-xs font-bold cursor-pointer">02</span>
                <span class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-low text-xs font-bold cursor-pointer">03</span>
              </div>
              <button class="flex items-center gap-2 text-[10px] font-bold tracking-widest">
                NEXT <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    return container;
  },
  afterRender: () => {
    // Add event listeners for filters
    document.querySelectorAll('[data-value]').forEach(chip => {
      chip.addEventListener('click', () => {
        const val = chip.getAttribute('data-value');
        window.location.hash = `#/shop?category=${val}`;
      });
    });

    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        window.location.hash = '#/shop';
      });
    }
  }
};

export default Shop;
