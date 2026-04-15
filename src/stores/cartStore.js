import { eventBus, EVENTS } from '../utils/eventBus.js';

class CartStore {
  constructor() {
    this.items = this.loadFromStorage();
  }

  loadFromStorage() {
    const saved = localStorage.getItem('kinetic_cart');
    return saved ? JSON.parse(saved) : [];
  }

  saveToStorage() {
    localStorage.setItem('kinetic_cart', JSON.stringify(this.items));
    eventBus.emit(EVENTS.CART_UPDATED, this.items);
  }

  addItem(product, quantity = 1, variant = null) {
    const existingIndex = this.items.findIndex(item => 
      item.id === product.id && 
      JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        ...product,
        quantity,
        variant
      });
    }

    this.saveToStorage();
    eventBus.emit(EVENTS.SHOW_TOAST, { 
      message: `${product.name} added to your bag`, 
      type: 'success' 
    });
  }

  removeItem(productId, variant = null) {
    this.items = this.items.filter(item => 
      !(item.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant))
    );
    this.saveToStorage();
  }

  updateQuantity(productId, quantity, variant = null) {
    const index = this.items.findIndex(item => 
      item.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (index > -1) {
      this.items[index].quantity = Math.max(1, quantity);
      this.saveToStorage();
    }
  }

  clearCart() {
    this.items = [];
    this.saveToStorage();
  }

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get subtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get isEmpty() {
    return this.items.length === 0;
  }
}

export const cartStore = new CartStore();
