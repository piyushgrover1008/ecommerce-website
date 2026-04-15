import { products } from '../data/products.js';
import { reviews } from '../data/reviews.js';
import ProductCard from '../components/ProductCard.js';
import { formatPrice } from '../utils/formatPrice.js';
import { cartStore } from '../stores/cartStore.js';

const ProductDetail = {
  render: async (params) => {
    const product = products.find(p => p.id === params.id);
    if (!product) return '<div>Product not found</div>';

    const productReviews = reviews[product.id] || [];
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const container = document.createElement('div');
    container.className = 'max-w-[1440px] mx-auto px-6 py-12';

    container.innerHTML = `
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 mb-12 text-[10px] font-bold tracking-widest text-secondary uppercase">
        <a href="#/" class="hover:text-primary transition-colors">HOME</a>
        <span class="material-symbols-outlined text-[14px]">chevron_right</span>
        <a href="#/shop" class="hover:text-primary transition-colors">SHOP</a>
        <span class="material-symbols-outlined text-[14px]">chevron_right</span>
        <a href="#/shop?category=${product.category.toLowerCase()}" class="hover:text-primary transition-colors">${product.category}</a>
        <span class="material-symbols-outlined text-[14px]">chevron_right</span>
        <span class="text-on-surface">${product.name}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
        <!-- Gallery -->
        <div class="space-y-6">
          <div class="relative aspect-[4/5] bg-surface-container-low rounded-2xl overflow-hidden cursor-zoom-in" id="main-image-container">
            <img src="${product.images[0].url}" alt="${product.images[0].alt}" class="w-full h-full object-cover transition-transform duration-700" id="main-image">
          </div>
          <div class="grid grid-cols-4 gap-4">
            ${product.images.map((img, idx) => `
              <div class="aspect-square bg-surface-container-low rounded-lg overflow-hidden cursor-pointer border-2 ${idx === 0 ? 'border-primary' : 'border-transparent'}" data-thumb-idx="${idx}">
                <img src="${img.url}" alt="${img.alt}" class="w-full h-full object-cover">
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Info -->
        <div class="flex flex-col">
          <div class="mb-12">
            ${product.badge ? `<span class="inline-block bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">${product.badge}</span>` : ''}
            <h1 class="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4">${product.name}</h1>
            <p class="text-2xl font-bold mb-8">${formatPrice(product.price)}</p>
            <p class="text-secondary leading-relaxed mb-12 max-w-lg">
              ${product.description}
            </p>

            <div class="space-y-8 mb-12">
              <!-- Finish selection -->
              <div>
                <h4 class="text-[10px] font-bold tracking-[0.3em] mb-4 uppercase">FINISH</h4>
                <div class="flex gap-4">
                  <button class="w-10 h-10 rounded-full bg-on-surface border-2 border-primary"></button>
                  <button class="w-10 h-10 rounded-full bg-surface-container-highest border-2 border-transparent hover:border-outline-variant/50"></button>
                </div>
              </div>

              <!-- Size selection -->
              <div>
                <div class="flex justify-between items-center mb-4">
                  <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase">SELECT SIZE</h4>
                  <button class="text-[10px] font-bold tracking-widest underline underline-offset-4 opacity-50">SIZE GUIDE</button>
                </div>
                <div class="grid grid-cols-4 gap-2">
                  ${['S', 'M', 'L', 'XL'].map(size => `
                    <button class="py-4 border border-outline-variant/20 rounded-lg text-xs font-bold hover:bg-on-surface hover:text-surface transition-all">${size}</button>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="flex gap-4">
              <button class="flex-1 bg-primary-gradient text-white py-5 rounded-full font-bold text-xs tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-transform" id="add-to-cart-btn">
                ADD TO COLLECTION
              </button>
              <button class="w-16 h-16 flex items-center justify-center rounded-full border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
                <span class="material-symbols-outlined">favorite</span>
              </button>
            </div>
          </div>

          <!-- Technical Specs Accordion (simplified for now) -->
          <div class="border-t border-outline-variant/10 py-8">
            <details class="group">
              <summary class="flex items-center justify-between cursor-pointer list-none">
                <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase">TECHNICAL SPECIFICATIONS</h4>
                <span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div class="pt-6 space-y-4">
                <div class="flex justify-between border-b border-outline-variant/5 pb-2">
                  <span class="text-xs text-secondary italic">Construction</span>
                  <span class="text-xs font-bold">Architectural Layered Upper</span>
                </div>
                <div class="flex justify-between border-b border-outline-variant/5 pb-2">
                  <span class="text-xs text-secondary italic">Core</span>
                  <span class="text-xs font-bold">Kinetic Responsive Foam</span>
                </div>
                <div class="flex justify-between border-b border-outline-variant/5 pb-2">
                  <span class="text-xs text-secondary italic">Materials</span>
                  <span class="text-xs font-bold">Technical Mesh, TPU Overlays</span>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <section class="py-24 border-t border-outline-variant/10">
        <div class="flex flex-col md:flex-row justify-between items-baseline gap-8 mb-16">
          <div>
            <h2 class="text-4xl font-display font-bold tracking-tight mb-2 italic">GALLERY VOICES</h2>
            <div class="flex items-center gap-2">
              <div class="flex text-primary">
                 <span class="material-symbols-outlined text-[18px]">star</span>
                 <span class="material-symbols-outlined text-[18px]">star</span>
                 <span class="material-symbols-outlined text-[18px]">star</span>
                 <span class="material-symbols-outlined text-[18px]">star</span>
                 <span class="material-symbols-outlined text-[18px]">star_half</span>
              </div>
              <span class="text-xs font-bold tracking-widest">4.8 / 5.0 (24 REVIEWS)</span>
            </div>
          </div>
          <button class="text-xs font-bold tracking-widest border-b-2 border-primary pb-1">WRITE A REVIEW</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${productReviews.length > 0 ? productReviews.map(review => `
            <div class="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/5">
              <div class="flex justify-between items-start mb-6">
                <div>
                   <h4 class="text-xs font-bold tracking-widest mb-1">${review.author}</h4>
                   <span class="text-[8px] text-primary font-bold uppercase tracking-[0.2em]">VERIFIED COLLECTOR</span>
                </div>
                <span class="text-[10px] text-secondary font-bold">${review.date}</span>
              </div>
              <p class="text-secondary text-sm leading-relaxed">${review.text}</p>
            </div>
          `).join('') : `
            <div class="col-span-full py-12 text-center text-secondary italic">
              No reviews yet for this masterpiece. Be the first to share your experience.
            </div>
          `}
        </div>
      </section>

      <!-- Related Products -->
      <section class="py-24 border-t border-outline-variant/10">
        <h2 class="text-4xl font-display font-bold tracking-tight mb-16 italic">CURATED FOR YOU</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          ${relatedProducts.map(p => ProductCard.render(p)).join('')}
        </div>
      </section>
    `;
    return container;
  },

  afterRender: (params) => {
    const product = products.find(p => p.id === params.id);
    if (!product) return;

    // Thumbnail switching
    document.querySelectorAll('[data-thumb-idx]').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const idx = thumb.getAttribute('data-thumb-idx');
        const mainImg = document.getElementById('main-image');
        mainImg.src = product.images[idx].url;
        mainImg.alt = product.images[idx].alt;

        // Update active thumbnail border
        document.querySelectorAll('[data-thumb-idx]').forEach(t => t.classList.replace('border-primary', 'border-transparent'));
        thumb.classList.replace('border-transparent', 'border-primary');
      });
    });

    // Add to cart
    const addBtn = document.getElementById('add-to-cart-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        cartStore.addItem(product);
      });
    }

    // Zoom effect
    const container = document.getElementById('main-image-container');
    const img = document.getElementById('main-image');
    if (container && img) {
      container.addEventListener('mousemove', (e) => {
        const x = e.clientX - container.offsetLeft;
        const y = e.clientY - container.offsetTop;
        
        img.style.transformOrigin = `${(x / container.offsetWidth) * 100}% ${(y / container.offsetHeight) * 100}%`;
        img.style.transform = 'scale(1.5)';
      });

      container.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      });
    }
  }
};

export default ProductDetail;
