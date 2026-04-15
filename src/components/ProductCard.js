import { formatPrice } from '../utils/formatPrice.js';

const ProductCard = {
  render: (product) => {
    const { id, name, category, price, images, badge } = product;
    const isNew = badge === 'NEW';
    const isSoldOut = badge === 'SOLD_OUT';

    return `
      <div class="group cursor-pointer">
        <div class="relative aspect-[4/5] bg-surface-container-low rounded-lg overflow-hidden mb-4">
          <!-- Badge -->
          ${isNew ? `
            <div class="absolute top-4 left-4 z-10 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
              NEW
            </div>
          ` : ''}
          ${isSoldOut ? `
            <div class="absolute inset-0 z-10 bg-on-surface/40 backdrop-blur-[2px] flex items-center justify-center">
              <span class="bg-surface text-on-surface text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest">SOLD OUT</span>
            </div>
          ` : ''}

          <!-- Image -->
          <img 
            src="${images[0].url}" 
            alt="${images[0].alt}" 
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          >

          <!-- Floating Actions -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button class="flex-1 bg-surface-container-lowest text-on-surface text-[10px] font-bold py-3 rounded-full shadow-ambient hover:bg-primary hover:text-white transition-colors uppercase tracking-wider">
              Quick View
            </button>
            <button class="w-12 h-12 bg-primary-gradient text-white flex items-center justify-center rounded-full shadow-lg hover:scale-110 active:scale-90 transition-transform">
              <span class="material-symbols-outlined text-[20px]">add_shopping_cart</span>
            </button>
          </div>

          <!-- Click Overlay (Navigates to detail) -->
          <a href="#/product/${id}" class="absolute inset-0 z-0"></a>
        </div>

        <!-- Info -->
        <div class="flex justify-between items-start gap-4">
          <div>
            <p class="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">${category}</p>
            <h3 class="font-display font-bold text-sm leading-tight group-hover:text-primary transition-colors">${name}</h3>
          </div>
          <p class="font-bold text-sm">${formatPrice(price)}</p>
        </div>
      </div>
    `;
  }
};

export default ProductCard;
