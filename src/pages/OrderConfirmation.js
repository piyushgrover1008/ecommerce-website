const OrderConfirmation = {
  render: async () => {
    const orderNumber = Math.floor(Math.random() * 90000000) + 10000000;
    const container = document.createElement('div');
    container.className = 'min-h-[70vh] flex flex-col items-center justify-center text-center p-8';
    container.innerHTML = `
      <div class="mb-12 relative animate-staggered-entry">
        <div class="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
          <span class="material-symbols-outlined text-[64px] text-primary">verified</span>
        </div>
      </div>
      
      <h1 class="text-5xl font-display font-bold tracking-tight mb-4 animate-staggered-entry delay-100">ORDER CONFIRMED</h1>
      <p class="text-secondary mb-8 animate-staggered-entry delay-200 uppercase tracking-widest font-bold">ORDER #${orderNumber}</p>
      
      <p class="text-secondary mb-12 max-w-sm animate-staggered-entry delay-300">
        Thank you for your curation. Our artisans are now processing your selection. You will receive an electronic confirmation shortly.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-6 animate-staggered-entry delay-400">
        <a href="#/account" class="bg-surface-container-low text-on-surface px-10 py-4 rounded-full font-bold text-xs tracking-widest hover:bg-secondary/10 transition-colors">
          TRACK ORDER
        </a>
        <a href="#/" class="bg-primary-gradient text-white px-10 py-4 rounded-full font-bold text-xs tracking-widest shadow-lg hover:scale-105 transition-transform">
          RETURN TO GALLERY
        </a>
      </div>
    `;
    return container;
  }
};

export default OrderConfirmation;
