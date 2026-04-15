import { cartStore } from '../stores/cartStore.js';
import { formatPrice } from '../utils/formatPrice.js';
import { eventBus, EVENTS } from '../utils/eventBus.js';

const Cart = {
  render: async () => {
    const items = cartStore.items;
    const container = document.createElement('div');
    container.className = 'max-w-[1440px] mx-auto px-6 py-12';

    if (items.length === 0) {
      container.innerHTML = `
        <div class="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <h1 class="text-6xl font-display font-bold tracking-tighter mb-6">YOUR BAG IS EMPTY</h1>
          <p class="text-secondary mb-12">The gallery awaits your curation.</p>
          <a href="#/shop" class="bg-primary-gradient text-white px-12 py-5 rounded-full font-bold text-xs tracking-widest shadow-lg">START SHOPPING</a>
        </div>
      `;
      return container;
    }

    container.innerHTML = `
      <h1 class="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16 italic underline decoration-primary decoration-4 underline-offset-[16px]">CURATED SELECTION</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <!-- Cart Items -->
        <div class="lg:col-span-8 space-y-12">
          ${items.map(item => `
            <div class="flex flex-col sm:flex-row gap-8 pb-12 border-b border-outline-variant/10 group">
              <div class="w-full sm:w-40 aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden flex-shrink-0">
                <img src="${item.images[0].url}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
              </div>
              <div class="flex-1 flex flex-col pt-2">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-display font-bold tracking-tight">${item.name}</h3>
                  <span class="text-lg font-bold">${formatPrice(item.price * item.quantity)}</span>
                </div>
                <p class="text-[10px] text-secondary font-bold uppercase tracking-[0.2em] mb-6">${item.category}</p>
                
                <div class="mt-auto flex justify-between items-end">
                  <div class="flex items-center gap-6">
                    <div class="flex items-center border border-outline-variant/20 rounded-full px-4 py-2">
                      <button class="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors text-lg" data-id="${item.id}" data-action="decrease">-</button>
                      <span class="w-12 text-center text-sm font-bold">${item.quantity}</span>
                      <button class="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors text-lg" data-id="${item.id}" data-action="increase">+</button>
                    </div>
                  </div>
                  <button class="text-[10px] font-bold tracking-widest text-secondary hover:text-error transition-colors underline underline-offset-8" data-id="${item.id}" data-action="remove">REMOVE ITEM</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Summary -->
        <div class="lg:col-span-4">
          <div class="bg-surface-container-low p-10 rounded-2xl sticky top-32">
            <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase mb-10 pb-4 border-b border-outline-variant/20">ORDER SUMMARY</h4>
            
            <div class="space-y-6 mb-10">
              <div class="flex justify-between items-center">
                <span class="text-secondary text-xs font-bold tracking-widest">SUBTOTAL</span>
                <span class="text-lg font-bold">${formatPrice(cartStore.subtotal)}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-secondary text-xs font-bold tracking-widest">SHIPPING</span>
                <span class="text-xs font-bold uppercase">CALCULATED AT NEXT STEP</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-secondary text-xs font-bold tracking-widest">TAX</span>
                <span class="text-xs font-bold uppercase">CALCULATED AT NEXT STEP</span>
              </div>
            </div>

            <div class="pt-8 border-t border-on-surface/10 mb-10">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-bold tracking-widest uppercase">ESTIMATED TOTAL</span>
                <span class="text-3xl font-display font-bold tracking-tight text-primary">${formatPrice(cartStore.subtotal)}</span>
              </div>
            </div>

            <a href="#/checkout" class="w-full block bg-primary-gradient text-white py-5 rounded-full text-center text-[10px] font-bold tracking-widest uppercase shadow-xl hover:scale-[1.02] active:scale-95 transition-transform mb-6">
              PROCEED TO CHECKOUT
            </a>
            
            <a href="#/shop" class="w-full block text-center text-[10px] font-bold tracking-widest uppercase text-secondary hover:text-on-surface transition-colors italic">
              CONTINUE SHOPPING
            </a>
          </div>
        </div>
      </div>
    `;
    return container;
  },

  afterRender: () => {
    // Re-bind events (same as CartDrawer but for this page)
    const updatePage = async () => {
      const app = document.getElementById('app');
      app.innerHTML = '';
      app.appendChild(await Cart.render());
      Cart.afterRender();
    };

    document.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        const action = btn.getAttribute('data-action');

        if (action === 'increase') {
          const item = cartStore.items.find(i => i.id === id);
          cartStore.updateQuantity(id, item.quantity + 1);
        } else if (action === 'decrease') {
          const item = cartStore.items.find(i => i.id === id);
          cartStore.updateQuantity(id, item.quantity - 1);
        } else if (action === 'remove') {
          cartStore.removeItem(id);
        }
        updatePage();
      });
    });
  }
};

export default Cart;
