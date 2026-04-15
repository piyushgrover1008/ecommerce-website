import Drawer from './Drawer.js';
import { cartStore } from '../stores/cartStore.js';
import { eventBus, EVENTS } from '../utils/eventBus.js';
import { formatPrice } from '../utils/formatPrice.js';

const CartDrawer = {
  id: 'cart-drawer-global',

  render: () => {
    const items = cartStore.items;
    
    let content = '';
    if (items.length === 0) {
      content = `
        <div class="h-full flex flex-col items-center justify-center text-center p-8">
          <span class="material-symbols-outlined text-[64px] text-outline-variant mb-6">shopping_bag</span>
          <h3 class="font-display font-bold text-lg mb-2">YOUR BAG IS EMPTY</h3>
          <p class="text-secondary text-sm mb-8">Items you add to your bag will appear here.</p>
          <a href="#/shop" class="bg-primary text-white px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase" data-drawer-close>START EXPLORING</a>
        </div>
      `;
    } else {
      content = `
        <div class="flex flex-col h-full">
          <div class="flex-1 space-y-8 mb-8">
            ${items.map(item => `
              <div class="flex gap-4 group">
                <div class="w-20 h-24 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0">
                  <img src="${item.images[0].url}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 flex flex-col">
                  <div class="flex justify-between items-start mb-1">
                    <h4 class="text-xs font-bold uppercase tracking-tight line-clamp-1">${item.name}</h4>
                    <span class="text-xs font-bold">${formatPrice(item.price * item.quantity)}</span>
                  </div>
                  <p class="text-[10px] text-secondary font-bold uppercase tracking-widest mb-4">${item.category}</p>
                  
                  <div class="mt-auto flex justify-between items-center">
                    <div class="flex items-center border border-outline-variant/20 rounded-full px-2 py-1">
                      <button class="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors" data-id="${item.id}" data-action="decrease">-</button>
                      <span class="w-8 text-center text-xs font-bold">${item.quantity}</span>
                      <button class="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors" data-id="${item.id}" data-action="increase">+</button>
                    </div>
                    <button class="text-[10px] font-bold tracking-widest text-secondary hover:text-error transition-colors underline underline-offset-4" data-id="${item.id}" data-action="remove">REMOVE</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="border-t border-outline-variant/10 pt-6 mt-auto">
            <div class="flex justify-between items-center mb-6">
              <span class="text-[10px] font-bold tracking-[0.2em] text-secondary uppercase">SUBTOTAL</span>
              <span class="text-xl font-bold">${formatPrice(cartStore.subtotal)}</span>
            </div>
            <p class="text-[10px] text-secondary mb-8">Shipping and taxes calculated at checkout.</p>
            <div class="space-y-3">
              <a href="#/cart" class="w-full block bg-secondary-container text-on-surface py-4 rounded-full text-center text-[10px] font-bold tracking-widest uppercase hover:bg-secondary/10 transition-colors" data-drawer-close>VIEW FULL BAG</a>
              <a href="#/checkout" class="w-full block bg-primary-gradient text-white py-4 rounded-full text-center text-[10px] font-bold tracking-widest uppercase shadow-lg hover:scale-[1.02] active:scale-95 transition-transform" data-drawer-close>CHECKOUT</a>
            </div>
          </div>
        </div>
      `;
    }

    return Drawer.render({
      id: CartDrawer.id,
      title: 'SHOPPING BAG',
      content: content,
      side: 'right'
    });
  },

  init: () => {
    // Only init once
    if (document.getElementById(CartDrawer.id)) return;

    const drawerContainer = document.createElement('div');
    drawerContainer.id = 'cart-drawer-wrapper';
    document.body.appendChild(drawerContainer);

    const updateDrawer = () => {
      drawerContainer.innerHTML = CartDrawer.render();
      Drawer.init(CartDrawer.id);
      CartDrawer.bindEvents();
    };

    updateDrawer();

    eventBus.on(EVENTS.CART_UPDATED, updateDrawer);
    eventBus.on(EVENTS.OPEN_CART, () => Drawer.open(CartDrawer.id));

    // Also open when navbar cart clicked
    document.addEventListener('click', (e) => {
      if (e.target.closest('#cart-button')) {
        Drawer.open(CartDrawer.id);
      }
    });
  },

  bindEvents: () => {
    const container = document.getElementById(CartDrawer.id);
    container.querySelectorAll('[data-action]').forEach(btn => {
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
      });
    });
  }
};

export default CartDrawer;
