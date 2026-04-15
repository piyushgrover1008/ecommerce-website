import { cartStore } from '../stores/cartStore.js';
import { eventBus, EVENTS } from '../utils/eventBus.js';
import { userStore } from '../stores/userStore.js';
import SearchOverlay from './SearchOverlay.js';

const Navbar = {
  render: async () => {
    const accountHash = userStore.isLoggedIn ? '#/account' : '#/login';
    return `
      <nav class="fixed top-0 left-0 w-full z-50 glass-nav border-b border-outline-variant/10">
        <div class="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <!-- Logo -->
          <a href="#/" class="group flex items-center gap-2">
            <div class="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center">
              <span class="text-white font-display font-bold text-xs">K</span>
            </div>
            <span class="font-display font-bold tracking-tighter text-lg group-hover:text-primary transition-colors">KINETIC GALLERY</span>
          </a>

          <!-- Nav Links (Desktop) -->
          <div class="hidden md:flex items-center gap-8">
            <a href="#/shop?filter=new" class="nav-link text-sm font-medium hover:text-primary transition-colors">NEW ARRIVALS</a>
            <a href="#/shop" class="nav-link text-sm font-medium hover:text-primary transition-colors">COLLECTIONS</a>
            <a href="#/shop?filter=curated" class="nav-link text-sm font-medium hover:text-primary transition-colors">CURATED</a>
            <a href="#/shop?filter=archive" class="nav-link text-sm font-medium hover:text-primary transition-colors">ARCHIVE</a>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-6">
            <!-- Search (Desktop) -->
            <button class="hidden lg:flex items-center gap-2 group text-secondary hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-[20px]">search</span>
              <span class="text-xs font-medium tracking-wide">SEARCH</span>
            </button>

            <!-- Account -->
            <a href="${accountHash}" class="text-on-surface hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-[24px]">person</span>
            </a>

            <!-- Cart -->
            <button class="relative group text-on-surface hover:text-primary transition-colors" id="cart-button">
              <span class="material-symbols-outlined text-[24px]">shopping_bag</span>
              <span class="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold" id="cart-count">0</span>
            </button>

            <!-- Mobile Menu Toggle -->
            <button class="md:hidden text-on-surface" id="mobile-menu-toggle">
              <span class="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>
      </nav>

      <!-- Mobile Menu Drawer (Hidden by default) -->
      <div id="mobile-menu" class="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
        <div class="absolute inset-0 bg-on-surface/20 backdrop-blur-sm opacity-0 transition-opacity duration-300" id="mobile-menu-overlay"></div>
        <div class="absolute right-0 top-0 h-full w-[280px] bg-surface translate-x-full transition-transform duration-300 shadow-ambient" id="mobile-menu-content">
          <div class="p-6">
            <div class="flex items-center justify-between mb-12">
              <span class="font-display font-bold">MENU</span>
              <button id="mobile-menu-close">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
            <div class="flex flex-col gap-6">
              <a href="#/shop?filter=new" class="text-lg font-display">NEW ARRIVALS</a>
              <a href="#/shop" class="text-lg font-display">COLLECTIONS</a>
              <a href="#/shop?filter=curated" class="text-lg font-display">CURATED</a>
              <a href="#/shop?filter=archive" class="text-lg font-display">ARCHIVE</a>
              <hr class="border-outline-variant/10">
              <a href="#/login" class="flex items-center gap-3 text-secondary">
                <span class="material-symbols-outlined">person</span>
                <span>Account</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  afterRender: () => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuContent = document.getElementById('mobile-menu-content');
    const cartCount = document.getElementById('cart-count');

    // Initial cart count
    cartCount.innerText = cartStore.totalItems;

    // Listen for cart updates
    eventBus.on(EVENTS.CART_UPDATED, () => {
      cartCount.innerText = cartStore.totalItems;
      cartCount.classList.add('scale-125');
      setTimeout(() => cartCount.classList.remove('scale-125'), 200);
    });

    // Search button
    const searchBtn = document.querySelector('button .material-symbols-outlined[innerText="search"]')?.parentElement || document.querySelector('.lg\\:flex[text*="SEARCH"]');
    // Simplified selector for the search button
    const searchButtons = document.querySelectorAll('button');
    searchButtons.forEach(btn => {
      if (btn.innerText.includes('SEARCH')) {
        btn.addEventListener('click', () => SearchOverlay.open());
      }
    });

    const toggleMenu = (open) => {
      if (open) {
        mobileMenu.classList.remove('pointer-events-none');
        mobileMenuOverlay.classList.replace('opacity-0', 'opacity-100');
        mobileMenuContent.classList.replace('translate-x-full', 'translate-x-0');
      } else {
        mobileMenu.classList.add('pointer-events-none');
        mobileMenuOverlay.classList.replace('opacity-100', 'opacity-0');
        mobileMenuContent.classList.replace('translate-x-0', 'translate-x-full');
      }
    };

    mobileMenuToggle.addEventListener('click', () => toggleMenu(true));
    mobileMenuClose.addEventListener('click', () => toggleMenu(false));
    mobileMenuOverlay.addEventListener('click', () => toggleMenu(false));

    // Update active links
    const currentHash = window.location.hash;
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === currentHash) {
        link.classList.add('text-primary');
        link.classList.add('border-b-2');
        link.classList.add('border-primary');
      }
    });
  }
};

export default Navbar;
