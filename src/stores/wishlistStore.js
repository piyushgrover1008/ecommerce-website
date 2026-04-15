class WishlistStore {
  constructor() {
    this.items = this.loadFromStorage();
  }

  loadFromStorage() {
    const saved = localStorage.getItem('kinetic_wishlist');
    return saved ? JSON.parse(saved) : [];
  }

  saveToStorage() {
    localStorage.setItem('kinetic_wishlist', JSON.stringify(this.items));
  }

  toggle(product) {
    const index = this.items.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.items.splice(index, 1);
    } else {
      this.items.push(product);
    }
    this.saveToStorage();
  }

  isInWishlist(productId) {
    return this.items.some(item => item.id === productId);
  }
}

export const wishlistStore = new WishlistStore();
