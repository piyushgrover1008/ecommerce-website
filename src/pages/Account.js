import { userStore } from '../stores/userStore.js';
import { cartStore } from '../stores/cartStore.js';

const Account = {
  render: async () => {
    if (!userStore.isLoggedIn) {
      window.location.hash = '#/login';
      return document.createElement('div');
    }

    const { name, email, tier, points } = userStore.user;

    const container = document.createElement('div');
    container.className = 'max-w-[1440px] mx-auto px-6 py-12';
    
    container.innerHTML = `
      <div class="flex flex-col lg:flex-row gap-16">
        <!-- Sidebar Navigation -->
        <aside class="w-full lg:w-64 space-y-12">
          <div>
            <h2 class="text-2xl font-display font-bold tracking-tight mb-2">WELCOME BACK,</h2>
            <p class="text-primary font-bold text-xs tracking-widest uppercase">${name}</p>
          </div>

          <nav class="flex flex-col gap-2">
            <a href="#/account" class="flex items-center gap-4 p-4 bg-on-surface text-surface rounded-xl text-xs font-bold tracking-widest transition-all">
              <span class="material-symbols-outlined text-[20px]">grid_view</span>
              DASHBOARD
            </a>
            <a href="#/account/orders" class="flex items-center gap-4 p-4 hover:bg-surface-container-low rounded-xl text-xs font-bold tracking-widest transition-all text-secondary">
              <span class="material-symbols-outlined text-[20px]">package_2</span>
              ORDER HISTORY
            </a>
            <a href="#/wishlist" class="flex items-center gap-4 p-4 hover:bg-surface-container-low rounded-xl text-xs font-bold tracking-widest transition-all text-secondary">
              <span class="material-symbols-outlined text-[20px]">favorite</span>
              WISHLIST
            </a>
            <a href="#/account/settings" class="flex items-center gap-4 p-4 hover:bg-surface-container-low rounded-xl text-xs font-bold tracking-widest transition-all text-secondary">
              <span class="material-symbols-outlined text-[20px]">settings</span>
              SETTINGS
            </a>
            <button id="logout-btn" class="flex items-center gap-4 p-4 hover:bg-error/5 hover:text-error rounded-xl text-xs font-bold tracking-widest transition-all text-secondary mt-8">
              <span class="material-symbols-outlined text-[20px]">logout</span>
              LOGOUT
            </button>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 space-y-16">
          <header class="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-12">
            <div>
              <h1 class="text-5xl font-display font-bold tracking-tight mb-4 italic underline decoration-primary decoration-4 underline-offset-[16px]">ACCOUNT OVERVIEW</h1>
              <p class="text-secondary">Manage your profile, orders, and kinetic preferences.</p>
            </div>
            <a href="#/shop" class="bg-primary-gradient text-white px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-primary/20">
              SHOP COLLECTION
            </a>
          </header>

          <!-- Membership Stats Bento -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
              <span class="text-[10px] font-bold tracking-widest text-secondary uppercase mb-6 block">LOYALTY TIER</span>
              <h3 class="text-3xl font-display font-bold text-primary">${tier}</h3>
              <p class="text-[10px] text-secondary mt-2 opacity-50">NEXT TIER AT 5,000 PTS</p>
            </div>
            <div class="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
              <span class="text-[10px] font-bold tracking-widest text-secondary uppercase mb-6 block">KINETIC POINTS</span>
              <h3 class="text-3xl font-display font-bold">${points}</h3>
              <p class="text-[10px] text-secondary mt-2 opacity-50">AVAILABLE FOR REDEMPTION</p>
            </div>
            <div class="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
              <span class="text-[10px] font-bold tracking-widest text-secondary uppercase mb-6 block">SAVED FAVORITES</span>
              <h3 class="text-3xl font-display font-bold">12</h3>
              <p class="text-[10px] text-secondary mt-2 opacity-50">CURATED SELECTIONS</p>
            </div>
          </div>

          <!-- Profile Info -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-surface-container-lowest p-10 rounded-2xl border border-outline-variant/10">
               <div class="flex justify-between items-center mb-10">
                 <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase text-secondary">PROFILE INFORMATION</h4>
                 <button class="text-xs font-bold text-primary italic uppercase tracking-widest underline decoration-2 underline-offset-4">EDIT</button>
               </div>
               <div class="flex items-center gap-8">
                 <div class="w-24 h-24 rounded-full overflow-hidden bg-surface-container-low">
                   <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUJpehtc4vusuBKaTyFFCbnKxKZDRfdMogLiUSfx_u2GIsEwY6e2HhwUW6wFMMj-6IgFYJcIEHioyoF1Efb1k2SmCIdJzH-fl7bO3aJq4gF3CQhlNOuMHPt0GqOoz29oHEzf6WH_cG1sOaYfBqbu9dOJHkSHOo4bhM3LkEgy367nKY0_wRhqQCy6xWQ_1ByuUe4-jmOH1hQI8YJOF-eOGsUBsOkZw0RnQpgcTSntaY2hYzIk0sTwbRHGO43dBwRueWjb44J7Ne5HU" class="w-full h-full object-cover">
                 </div>
                 <div class="space-y-1">
                   <p class="font-bold text-xl uppercase">${name}</p>
                   <p class="text-secondary text-sm">${email}</p>
                 </div>
               </div>
            </div>

            <div class="bg-surface-container-lowest p-10 rounded-2xl border border-outline-variant/10">
               <div class="flex justify-between items-center mb-10">
                 <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase text-secondary">DEFAULT SHIPPING</h4>
                 <button class="text-xs font-bold text-primary italic uppercase tracking-widest underline decoration-2 underline-offset-4">CHANGE</button>
               </div>
               <div class="space-y-1">
                 <p class="font-bold text-sm">4820 LUMINA DISTRICT, FLOOR 12</p>
                 <p class="text-secondary text-sm uppercase">SAN FRANCISCO, CA 94105</p>
                 <p class="text-secondary text-sm uppercase">UNITED STATES</p>
               </div>
            </div>
          </div>

          <!-- Recent Orders -->
          <section>
            <div class="flex justify-between items-end mb-10">
              <h2 class="text-2xl font-display font-bold">RECENT SHIPMENTS</h2>
              <a href="#/account/orders" class="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline underline-offset-8 decoration-2 transition-all">VIEW ALL ARCHIVE</a>
            </div>
            <div class="space-y-4">
              <div class="bg-surface-container-low rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center group hover:bg-surface-container-high transition-all border border-outline-variant/5">
                <div class="w-24 h-24 bg-surface-container-lowest rounded-xl overflow-hidden flex-shrink-0">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm3kB2X4BaEVvkrqxMxgp5BALkbWrCo9wHRQ7Hi4GZGoWdQ3IgkiyIrxEtIIML9IJ7Tpuqs7Kmq5x_0rdZWrqJQzsgHZ2GYvq4E-7qps-cshF1J0fqDywSCm6VccG-CheKUZ_AeAKVwLYlIIctu4h-EQ6r5mV24Ekme-HYZWInBEUq4hMV-eSL26eMGTIZRiUuIIK9Vje0D_NIVSmojUGUMlvU-fcQG1ibwqoZDt9rTD8SbsM5heu0s_WEVupn5dZsbyNE5dccNRA" class="w-full h-full object-cover">
                </div>
                <div class="flex-grow">
                  <div class="flex justify-between mb-2">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-primary">IN TRANSIT</span>
                    <span class="text-[10px] font-bold text-secondary uppercase">EST. ARRIVAL: APRIL 24</span>
                  </div>
                  <h4 class="text-lg font-display font-bold uppercase">KINETIC ZOOM X-11 "ELECTRIC"</h4>
                  <p class="text-[10px] text-secondary font-bold uppercase mt-1">ORDER #K-90283 • $240.00</p>
                </div>
                <div class="flex gap-2">
                  <button class="bg-on-surface text-surface px-8 py-3 rounded-full text-[10px] font-bold tracking-widest transition-transform hover:scale-105 active:scale-95">TRACK</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    `;
    return container;
  },

  afterRender: () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        userStore.logout();
        window.location.hash = '#/login';
      });
    }
  }
};

export default Account;
