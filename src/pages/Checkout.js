import { cartStore } from '../stores/cartStore.js';
import { formatPrice } from '../utils/formatPrice.js';

const Checkout = {
  state: {
    step: 1, // 1: Shipping, 2: Payment, 3: Review
    formData: {
      shipping: {},
      payment: {}
    }
  },

  render: async () => {
    if (cartStore.isEmpty) {
      window.location.hash = '#/cart';
      return document.createElement('div');
    }

    const container = document.createElement('div');
    container.className = 'max-w-[1440px] mx-auto px-6 py-12';

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <!-- Main Form -->
        <div class="lg:col-span-8">
          <!-- Stepper -->
          <div class="flex items-center gap-12 mb-16 border-b border-outline-variant/10 pb-8">
            <div class="flex items-center gap-4 ${Checkout.state.step === 1 ? 'text-primary' : Checkout.state.step > 1 ? 'text-on-surface' : 'text-secondary/50'}">
              <span class="text-xs font-bold font-display tracking-widest italic underline decoration-2 underline-offset-8">01 SHIPPING</span>
            </div>
            <div class="flex items-center gap-4 ${Checkout.state.step === 2 ? 'text-primary' : Checkout.state.step > 2 ? 'text-on-surface' : 'text-secondary/50'}">
              <span class="text-xs font-bold font-display tracking-widest italic underline decoration-2 underline-offset-8">02 PAYMENT</span>
            </div>
            <div class="flex items-center gap-4 ${Checkout.state.step === 3 ? 'text-primary' : Checkout.state.step > 3 ? 'text-on-surface' : 'text-secondary/50'}">
              <span class="text-xs font-bold font-display tracking-widest italic underline decoration-2 underline-offset-8">03 REVIEW</span>
            </div>
          </div>

          <div id="checkout-step-content">
            ${Checkout.renderStep()}
          </div>
        </div>

        <!-- Sidebar Summary -->
        <div class="lg:col-span-4">
          <div class="bg-surface-container-low p-10 rounded-2xl sticky top-32">
            <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase mb-10 pb-4 border-b border-outline-variant/20">YOUR SELECTION</h4>
            
            <div class="space-y-6 mb-10 max-h-[400px] overflow-y-auto hide-scrollbar">
              ${cartStore.items.map(item => `
                <div class="flex gap-4">
                  <div class="w-16 h-20 bg-surface-container-lowest rounded-lg overflow-hidden flex-shrink-0">
                    <img src="${item.images[0].url}" class="w-full h-full object-cover">
                  </div>
                  <div class="flex-1 pt-1">
                    <div class="flex justify-between items-start mb-1">
                      <h5 class="text-[10px] font-bold uppercase tracking-tight line-clamp-1">${item.name}</h5>
                      <span class="text-[10px] font-bold">${formatPrice(item.price * item.quantity)}</span>
                    </div>
                    <p class="text-[8px] text-secondary font-bold uppercase tracking-widest">${item.quantity} X ${formatPrice(item.price)}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="space-y-4 pt-8 border-t border-on-surface/10">
              <div class="flex justify-between items-center text-[10px] font-bold text-secondary">
                <span class="tracking-widest capitalize">SUBTOTAL</span>
                <span>${formatPrice(cartStore.subtotal)}</span>
              </div>
              <div class="flex justify-between items-center text-[10px] font-bold text-secondary">
                <span class="tracking-widest capitalize">SHIPPING</span>
                <span>FREE</span>
              </div>
              <div class="flex justify-between items-center text-[10px] font-bold text-secondary">
                <span class="tracking-widest capitalize">TAX</span>
                <span>${formatPrice(cartStore.subtotal * 0.08)}</span>
              </div>
              <div class="flex justify-between items-center pt-4 border-t border-primary/20">
                <span class="text-xs font-bold tracking-widest uppercase">TOTAL COST</span>
                <span class="text-2xl font-display font-bold text-primary">${formatPrice(cartStore.subtotal * 1.08)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    return container;
  },

  renderStep: () => {
    switch (Checkout.state.step) {
      case 1:
        return `
          <h2 class="text-2xl font-display font-bold mb-10 tracking-tight italic">SHIPPING INFORMATION</h2>
          <form id="shipping-form" class="space-y-8">
            <div class="grid grid-cols-2 gap-8">
              <div class="space-y-2">
                <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">FIRST NAME</label>
                <input type="text" name="firstName" required class="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 outline-none focus:border-primary transition-colors text-sm font-bold">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">LAST NAME</label>
                <input type="text" name="lastName" required class="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 outline-none focus:border-primary transition-colors text-sm font-bold">
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">STREET ADDRESS</label>
              <input type="text" name="address" required class="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 outline-none focus:border-primary transition-colors text-sm font-bold">
            </div>
            <div class="grid grid-cols-3 gap-8">
              <div class="space-y-2">
                <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">CITY</label>
                <input type="text" name="city" required class="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 outline-none focus:border-primary transition-colors text-sm font-bold">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">STATE</label>
                <input type="text" name="state" required class="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 outline-none focus:border-primary transition-colors text-sm font-bold">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">ZIP CODE</label>
                <input type="text" name="zip" required class="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 outline-none focus:border-primary transition-colors text-sm font-bold">
              </div>
            </div>
            
            <div class="pt-8">
              <button type="submit" class="bg-primary-gradient text-white px-12 py-5 rounded-full font-bold text-xs tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-transform">
                CONTINUE TO PAYMENT
              </button>
            </div>
          </form>
        `;
      case 2:
        return `
          <h2 class="text-2xl font-display font-bold mb-10 tracking-tight italic">PAYMENT METHOD</h2>
          <form id="payment-form" class="space-y-8">
            <div class="space-y-2">
              <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">CARDHOLDER NAME</label>
              <input type="text" name="cardName" required class="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 outline-none focus:border-primary transition-colors text-sm font-bold uppercase">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">CARD NUMBER</label>
              <input type="text" name="cardNumber" placeholder="0000 0000 0000 0000" required class="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 outline-none focus:border-primary transition-colors text-sm font-bold">
            </div>
            <div class="grid grid-cols-2 gap-8">
              <div class="space-y-2">
                <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">EXPIRY DATE</label>
                <input type="text" name="expiry" placeholder="MM/YY" required class="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 outline-none focus:border-primary transition-colors text-sm font-bold">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">CVV</label>
                <input type="password" name="cvv" placeholder="***" maxlength="3" required class="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 outline-none focus:border-primary transition-colors text-sm font-bold">
              </div>
            </div>
            
            <div class="pt-8 flex gap-6">
              <button type="button" class="text-secondary font-bold text-[10px] tracking-widest uppercase hover:text-on-surface transition-colors" id="back-to-shipping">
                BACK TO SHIPPING
              </button>
              <button type="submit" class="bg-primary-gradient text-white px-12 py-5 rounded-full font-bold text-xs tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-transform">
                REVIEW ORDER
              </button>
            </div>
          </form>
        `;
      case 3:
        return `
          <h2 class="text-2xl font-display font-bold mb-10 tracking-tight italic">FINAL REVIEW</h2>
          <div class="space-y-12 mb-16">
            <div class="p-8 border border-outline-variant/20 rounded-2xl relative group hover:border-primary/50 transition-colors">
              <h4 class="text-[10px] font-bold tracking-[0.2em] text-secondary mb-4 uppercase">SHIPPING TO</h4>
              <p class="font-bold text-sm">${Checkout.state.formData.shipping.firstName} ${Checkout.state.formData.shipping.lastName}</p>
              <p class="text-sm text-secondary">${Checkout.state.formData.shipping.address}, ${Checkout.state.formData.shipping.city}, ${Checkout.state.formData.shipping.state} ${Checkout.state.formData.shipping.zip}</p>
            </div>
            
            <div class="p-8 border border-outline-variant/20 rounded-2xl relative group hover:border-primary/50 transition-colors">
              <h4 class="text-[10px] font-bold tracking-[0.2em] text-secondary mb-4 uppercase">PAYMENT METHOD</h4>
              <p class="font-bold text-sm">ENDING IN ${Checkout.state.formData.payment.cardNumber.slice(-4)}</p>
              <p class="text-sm text-secondary">${Checkout.state.formData.payment.cardName}</p>
            </div>
          </div>
          
          <div class="pt-8 flex gap-6">
            <button type="button" class="text-secondary font-bold text-[10px] tracking-widest uppercase hover:text-on-surface transition-colors" id="back-to-payment">
              BACK TO PAYMENT
            </button>
            <button type="button" class="bg-primary-gradient text-white px-12 py-5 rounded-full font-bold text-xs tracking-widest shadow-lg hover:scale-[1.05] active:scale-95 transition-transform" id="place-order-btn">
              PLACE ORDER
            </button>
          </div>
        `;
    }
  },

  afterRender: () => {
    const update = async () => {
      const app = document.getElementById('app');
      app.innerHTML = '';
      app.appendChild(await Checkout.render());
      Checkout.afterRender();
    };

    const shippingForm = document.getElementById('shipping-form');
    if (shippingForm) {
      shippingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(shippingForm);
        Checkout.state.formData.shipping = Object.fromEntries(data.entries());
        Checkout.state.step = 2;
        update();
      });
    }

    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
      paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(paymentForm);
        Checkout.state.formData.payment = Object.fromEntries(data.entries());
        Checkout.state.step = 3;
        update();
      });

      document.getElementById('back-to-shipping').addEventListener('click', () => {
        Checkout.state.step = 1;
        update();
      });
    }

    const placeOrderBtn = document.getElementById('place-order-btn');
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', async () => {
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = '<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> PROCESSING...';
        
        // Mock delay
        setTimeout(() => {
          cartStore.clearCart();
          window.location.hash = '#/confirmation';
        }, 2000);
      });

      document.getElementById('back-to-payment').addEventListener('click', () => {
        Checkout.state.step = 2;
        update();
      });
    }
  }
};

export default Checkout;
