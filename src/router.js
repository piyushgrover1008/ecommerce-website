export const routes = {
  '#/': 'Home',
  '#/shop': 'Shop',
  '#/product': 'ProductDetail',
  '#/cart': 'Cart',
  '#/checkout': 'Checkout',
  '#/confirmation': 'OrderConfirmation',
  '#/login': 'Login',
  '#/register': 'Register',
  '#/account': 'Account',
  '#/wishlist': 'Wishlist',
  '#/about': 'About',
  '#/contact': 'Contact',
  '#/faq': 'FAQ',
  '#/privacy': 'Privacy'
};

import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

class Router {
  constructor() {
    this.app = document.getElementById('app');
    this.navbar = document.getElementById('navbar');
    this.footer = document.getElementById('footer');
    
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => {
      if (!window.location.hash) {
        window.location.hash = '#/';
      }
      this.initGlobalComponents();
      this.handleRoute();
    });
  }

  async initGlobalComponents() {
    this.navbar.innerHTML = await Navbar.render();
    Navbar.init();
    
    this.footer.innerHTML = await Footer.render();
    if (Footer.afterRender) Footer.afterRender();
  }

  async handleRoute() {
    const hash = window.location.hash || '#/';
    
    // Simple path matching
    let path = hash;
    let params = {};

    // Handle dynamic product routes: #/product/:id
    if (hash.startsWith('#/product/')) {
      const parts = hash.split('/');
      path = '#/product';
      params.id = parts[parts.length - 1];
    }

    const pageName = routes[path] || 'NotFound';
    this.renderPage(pageName, params);
  }

  async renderPage(pageName, params) {
    try {
      // Lazy load the page
      const module = await import(`./pages/${pageName}.js`);
      const page = module.default;
      
      // Clean app container
      this.app.innerHTML = '';
      this.app.className = 'pt-20 min-h-[calc(100vh-80px)]'; // Adjust for navbar height
      
      // Render the page
      const content = await page.render(params);
      this.app.appendChild(content);
      
      // Post-render lifecycle
      if (page.afterRender) {
        page.afterRender(params);
      }

      // Update Navbar state (active links)
      Navbar.updateActiveLinks();

      // Scroll to top
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Routing error:', error);
      const notFoundModule = await import('./pages/NotFound.js');
      const notFoundPage = notFoundModule.default;
      this.app.innerHTML = '';
      this.app.appendChild(await notFoundPage.render());
    }
  }
}

export const router = new Router();
