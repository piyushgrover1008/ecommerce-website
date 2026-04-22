const Footer = {
  render: async () => {
    return `
      <div class="bg-surface-container-low pt-24 pb-12 border-t border-outline-variant/10">
        <div class="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2 mb-6">
              <div class="w-6 h-6 bg-primary-gradient rounded-full flex items-center justify-center">
                <span class="text-white font-display font-bold text-[10px]">K</span>
              </div>
              <span class="font-display font-bold tracking-tighter text-sm">KINETIC GALLERY</span>
            </div>
            <p class="text-secondary text-sm leading-relaxed max-w-[240px]">
              Defining the future of high-end editorial commerce through intentional design and tonal depth.
            </p>
          </div>

          <!-- Links 1 -->
          <div>
            <h4 class="font-display font-bold text-xs tracking-widest mb-6">EXPLORE</h4>
            <ul class="flex flex-col gap-4">
              <li><a href="#/shop?filter=new" class="text-sm text-secondary hover:text-primary transition-colors">New Arrivals</a></li>
              <li><a href="#/shop" class="text-sm text-secondary hover:text-primary transition-colors">Collections</a></li>
              <li><a href="#/shop?filter=curated" class="text-sm text-secondary hover:text-primary transition-colors">Curated Picks</a></li>
              <li><a href="#/about" class="text-sm text-secondary hover:text-primary transition-colors">Our Story</a></li>
            </ul>
          </div>

          <!-- Links 2 -->
          <div>
            <h4 class="font-display font-bold text-xs tracking-widest mb-6">SUPPORT</h4>
            <ul class="flex flex-col gap-4">
              <li><a href="#/contact" class="text-sm text-secondary hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#/faq" class="text-sm text-secondary hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#/shipping" class="text-sm text-secondary hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#/privacy" class="text-sm text-secondary hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div>
            <h4 class="font-display font-bold text-xs tracking-widest mb-6">NEWSLETTER</h4>
            <p class="text-secondary text-sm mb-6">Subscribe for exclusive drops and editorial updates.</p>
            <form class="flex border-b border-on-surface/20 pb-2">
              <input type="email" placeholder="Email address" class="bg-transparent border-none outline-none text-sm w-full placeholder:text-secondary/50">
              <button type="submit" class="material-symbols-outlined text-secondary hover:text-primary transition-colors">arrow_forward</button>
            </form>
          </div>
        </div>

        <!-- Bottom -->
        <div class="max-w-[1440px] mx-auto px-6 pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p class="text-[10px] text-secondary tracking-widest uppercase">© ${new Date().getFullYear()} KINETIC GALLERY. ALL RIGHTS RESERVED.</p>
          <div class="flex gap-8">
            <a href="#" class="text-xs text-secondary hover:text-primary transition-colors">INSTAGRAM</a>
            <a href="#" class="text-xs text-secondary hover:text-primary transition-colors">TWITTER</a>
            <a href="#" class="text-xs text-secondary hover:text-primary transition-colors">VIMEO</a>
          </div>
        </div>
      </div>
    `;
  },
  afterRender: () => {
    const form = document.querySelector('footer form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const button = form.querySelector('button');
        const email = input.value;
        
        if (email) {
          button.innerText = 'check';
          button.classList.add('text-primary');
          input.value = 'THANK YOU FOR SUBSCRIBING';
          input.disabled = true;
          
          setTimeout(() => {
            button.innerText = 'arrow_forward';
            button.classList.remove('text-primary');
            input.value = '';
            input.disabled = false;
          }, 3000);
        }
      });
    }
  }
};

export default Footer;
