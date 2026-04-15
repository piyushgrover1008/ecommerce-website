import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard.js';

const Home = {
  render: async () => {
    const heroImageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp0gy9Hz8tWhYURQ8Zz7JTWkszKBCdRviLvghiKimm4mUdhjX-NZ6MeVXGE7DE_JfPEPyvPto4HQmXNTu5NUcQqNLB5H6XFGspjBG6wKtyIVVEpVv0lvaIAL93csDgq4VYYjnzFXtKB2rD03ZWQFbfU8Kh_lRNL92zUNH73nJFB5wSGtt80qIHuy4rCIKvYyUZOWsLZlWYI_HDApzFTsgY_NHrM-RR2lbUP2fmt7M-1fFOvv0UwnVGoS3L6c7ZquI1uKKiNB4MCoU';
    
    const container = document.createElement('div');
    
    // Hero Section
    const heroSection = document.createElement('section');
    heroSection.className = 'relative h-screen min-h-[700px] w-full overflow-hidden bg-on-surface';
    heroSection.innerHTML = `
      <!-- Background Image with Grayscale and Parallax -->
      <div class="absolute inset-0 z-0">
        <img 
          src="${heroImageUrl}" 
          alt="Kinetic Gallery Hero" 
          class="w-full h-full object-cover grayscale brightness-50 contrast-125 transition-transform duration-[2s] scale-110"
          id="hero-bg"
        >
      </div>

      <!-- Overlay Content -->
      <div class="relative z-10 h-full max-w-[1440px] mx-auto px-6 flex flex-col justify-center">
        <!-- Season Label -->
        <div class="mb-8 animate-staggered-entry flex">
          <div class="glass-nav px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
            <span class="text-[10px] text-white font-bold tracking-[0.2em] uppercase">SS26 — THE KINETIC SHIFT</span>
          </div>
        </div>

        <!-- Headline -->
        <h1 class="text-white text-6xl md:text-8xl lg:text-[120px] font-display font-light leading-[0.9] tracking-tighter mb-8 animate-staggered-entry delay-100">
          FUTURE<br>UNFOLDING<span class="text-primary">.</span>
        </h1>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-staggered-entry delay-200">
          <a href="#/shop" class="bg-primary-gradient text-white px-10 py-4 rounded-full font-bold text-xs tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-primary/20">
            EXPLORE COLLECTION
          </a>
          <button class="group flex items-center gap-4 text-white">
            <div class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-on-surface transition-all">
              <span class="material-symbols-outlined fill-current">play_arrow</span>
            </div>
            <span class="text-xs font-bold tracking-widest">WATCH FILM</span>
          </button>
        </div>
      </div>
    `;
    container.appendChild(heroSection);

    // New Arrivals Section
    const newArrivalsData = products.filter(p => p.newArrival).slice(0, 4);
    const arrivalsSection = document.createElement('section');
    arrivalsSection.className = 'py-32 max-w-[1440px] mx-auto px-6';
    arrivalsSection.innerHTML = `
      <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
        <div>
          <h2 class="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">NEW DROPS</h2>
          <p class="text-secondary max-w-sm">The latest iterations of our core silhouettes, engineered for the upcoming season.</p>
        </div>
        <a href="#/shop?filter=new" class="group flex items-center gap-2 text-xs font-bold tracking-widest">
          VIEW ALL DROPS
          <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        ${newArrivalsData.map((product, index) => `
          <div class="reveal-on-scroll ${index % 2 === 1 ? 'lg:mt-12' : ''}">
            ${ProductCard.render(product)}
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(arrivalsSection);

    // Trending Collections Bento Grid
    const collectionsSection = document.createElement('section');
    collectionsSection.className = 'py-32 bg-surface-container-low';
    collectionsSection.innerHTML = `
      <div class="max-w-[1440px] mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16 text-center italic">EDITORIAL CHAPTERS</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
          <!-- Neon Nomad (Large) -->
          <a href="#/shop?collection=neon-nomad" class="relative group overflow-hidden rounded-2xl md:col-span-2 reveal-on-scroll">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhUftwWOivwn3P-uqL7lNdMAUZvL9Ty5iOPKjGovUrDJiYnx2kNsKqkxHVAzQKvMhY5qjdPtU8HSU5i-pMFijxwUoef88gvFvCsUL2AcZPutuTyeU2zhQaY7pKlFTJyRxTL8xalNh7Kb4tkAUuJ1ov-dBC6xQscNQgQAVrokkRJrmQ4Z9lXhwdhT-BTnD1CmxO8idM7GMfRnl69MzyyLBfDYoKICEopwxllA1yY-j1jg7vA72jhE4fNFHcHA1QGuLQpQcUfNsG-4E" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div class="absolute bottom-10 left-10 text-white">
              <span class="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 block">CHAPTER 01</span>
              <h3 class="text-4xl font-display font-bold mb-4">THE NEON NOMAD</h3>
              <p class="text-sm text-white/70 max-w-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Energetic shifts and urban agility. Explore the collection designed for the digital dawn.</p>
              <div class="flex items-center gap-2 text-xs font-bold tracking-widest">
                SHOP COLLECTION <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </div>
            </div>
          </a>

          <!-- Cyber Pastel -->
          <a href="#/shop?collection=cyber-pastel" class="relative group overflow-hidden rounded-2xl reveal-on-scroll">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCroY1DNP-mxaOHYr2cS8CEP16JR0xV2KnAhPX0wX_zXyRu08x2MvzEu2lGM2OBvGfzcmRVlrhDqKMtHH9dPqHtM28V_Cv2RMk3SWH7MPZNL4qY8J65cDKMHCs_-z9o64G9iifxEC26DoM8k7t0K0f9UoGC3_DeUmcAohGXUX3OiEYcQp48FTU8xg9XdY9c4SNVPDjsc1lM4T1gV4Y9jncBfCAVYeweolnrlNMZZ9d0O5xpUQM-oFUnHEFWkMdOCXNxVIZG9rplzlQ" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
            <div class="absolute inset-0 bg-on-surface/20 group-hover:bg-on-surface/40 transition-colors"></div>
            <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
               <h3 class="text-2xl font-display font-bold">CYBER PASTEL</h3>
               <span class="text-[10px] font-bold tracking-[0.2em] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">EXPLORE</span>
            </div>
          </a>

          <!-- Mono-Lith -->
          <a href="#/shop?collection=mono-lith" class="relative group overflow-hidden rounded-2xl reveal-on-scroll delay-100">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX54HKr-utEAqEcs32z-e0N57YTZrSAZc1XRkHK4g5rfJYjuwtLdI45a1E3JAlE5wM3lMe_hcxLdTmHLkPiY408q3bm1NZwzpF59fAVu5N_dzFfqCAumobGdLqzqLKeXT37H_Hc8JFKAr0IyyHsVutaipg3yu1SsD86nKKfiytAZj81tqCYka4neqNEPPzeKvyVcw3US13PT2vmXh-74Enu647wr_s9RNJ_QFfvuJD3JqLdz6qrzXiUKmzAzmAzT_u3aviZHBKJdo" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
            <div class="absolute inset-0 bg-on-surface/20 group-hover:bg-on-surface/40 transition-colors"></div>
            <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
               <h3 class="text-2xl font-display font-bold">MONO-LITH</h3>
               <span class="text-[10px] font-bold tracking-[0.2em] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">EXPLORE</span>
            </div>
          </a>
        </div>
      </div>
    `;
    container.appendChild(collectionsSection);

    // Curated Staff Picks (Editorial Product Highlight)
    const curatedProduct = products.find(p => p.id === '16');
    const staffPicksSection = document.createElement('section');
    staffPicksSection.className = 'py-32 overflow-hidden';
    staffPicksSection.innerHTML = `
      <div class="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-24">
        <!-- Interactive Product Image -->
        <div class="relative reveal-on-scroll">
          <div class="aspect-square rounded-full overflow-hidden ghost-border p-12">
            <img src="${curatedProduct.images[0].url}" class="w-full h-full object-contain hover:scale-110 transition-transform duration-700" id="staff-pick-img">
          </div>
          <!-- Floating badge -->
          <div class="absolute -top-4 -right-4 w-32 h-32 bg-primary text-white rounded-full flex flex-col items-center justify-center rotate-12 shadow-2xl animate-pulse">
            <span class="text-[10px] font-bold tracking-widest">EDITOR'S</span>
            <span class="text-xl font-display font-bold">CHOICE</span>
          </div>
        </div>

        <!-- Info -->
        <div class="reveal-on-scroll">
          <span class="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-6 block">STAFF PICKS // 01</span>
          <h2 class="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 italic">${curatedProduct.name}</h2>
          <p class="text-secondary text-lg leading-relaxed mb-12">
            A masterclass in technical construction. The Velocity Frame Runner balances a complex architectural upper with the plush comfort of our Kinetic Foam core. Available in Bone and Carbon Grey.
          </p>
          
          <div class="flex items-center gap-4 mb-12">
            <button class="w-8 h-8 rounded-full bg-[#E5E7EB] border-2 border-primary" data-color="bone"></button>
            <button class="w-8 h-8 rounded-full bg-[#1F2937] border-2 border-transparent hover:border-primary transition-colors" data-color="carbon"></button>
            <span class="text-xs font-bold tracking-widest ml-4 uppercase" id="selected-color">BONE WHITE</span>
          </div>

          <button class="bg-primary-gradient text-white px-12 py-5 rounded-full font-bold text-xs tracking-widest flex items-center gap-4 hover:scale-105 active:scale-95 transition-transform" id="add-staff-pick">
            ADD TO BAG — $295.00
          </button>
        </div>
      </div>
    `;
    container.appendChild(staffPicksSection);

    return container;
  },
  afterRender: () => {
    // Parallax effect
    const heroBg = document.getElementById('hero-bg');
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (heroBg && scroll < window.innerHeight) {
        heroBg.style.transform = `translateY(${scroll * 0.3}px) scale(1.1)`;
      }
    });

    // Zoom in on load
    setTimeout(() => {
      if (heroBg) heroBg.classList.remove('scale-110');
    }, 100);

    // Intersection Observer for reveal-on-scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-staggered-entry');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    // Staff Pick Interaction
    const staffPickBtn = document.getElementById('add-staff-pick');
    if (staffPickBtn) {
      staffPickBtn.addEventListener('click', () => {
        const product = products.find(p => p.id === '16');
        import('../stores/cartStore.js').then(({ cartStore }) => {
          cartStore.addItem(product);
        });
      });
    }
  }
};

export default Home;
