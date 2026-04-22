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
    container.innerHTML = `
      <div class="flex flex-col lg:flex-row gap-16">
        <!-- Sidebar Navigation -->
        <aside class="w-full lg:w-64 space-y-12">
          <div class="px-2">
            <h2 class="text-2xl font-headline font-bold tracking-tight mb-2">WELCOME BACK,</h2>
            <p class="text-primary font-bold text-xs tracking-widest uppercase">${name}</p>
            <p class="text-secondary text-[10px] mt-1 font-medium tracking-wider">VERIFIED MEMBER</p>
          </div>

          <nav class="flex flex-col gap-2">
            <a href="#/account" class="flex items-center gap-4 p-4 bg-surface-container-lowest text-primary shadow-sm rounded-xl text-xs font-bold tracking-widest transition-all">
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
            <a href="#/account/payments" class="flex items-center gap-4 p-4 hover:bg-surface-container-low rounded-xl text-xs font-bold tracking-widest transition-all text-secondary">
              <span class="material-symbols-outlined text-[20px]">payments</span>
              PAYMENTS
            </a>
            <a href="#/account/settings" class="flex items-center gap-4 p-4 hover:bg-surface-container-low rounded-xl text-xs font-bold tracking-widest transition-all text-secondary">
              <span class="material-symbols-outlined text-[20px]">settings</span>
              SETTINGS
            </a>
            <button id="logout-btn" class="flex items-center gap-4 p-4 hover:bg-error/5 hover:text-error rounded-xl text-xs font-bold tracking-widest transition-all text-secondary mt-8 w-full text-left">
              <span class="material-symbols-outlined text-[20px]">logout</span>
              LOGOUT
            </button>
          </nav>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1">
          <header class="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h1 class="text-4xl lg:text-5xl font-headline font-black tracking-tight text-on-surface uppercase">Account Overview</h1>
              <p class="text-secondary mt-2 font-body">Manage your profile, orders, and kinetic preferences.</p>
            </div>
            <div class="flex gap-4">
              <button class="bg-surface-container-low text-on-surface px-6 py-3 rounded-full font-label text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-all active:scale-95">
                SUPPORT
              </button>
              <a href="#/shop" class="bg-primary-gradient text-white px-8 py-3 rounded-full font-label text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20">
                SHOP COLLECTION
              </a>
            </div>
          </header>

          <div class="grid grid-cols-12 gap-8">
            <!-- Bento Section: Membership Stats -->
            <section class="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient flex flex-col justify-between min-h-[180px] border border-outline-variant/10">
                <span class="text-[10px] uppercase tracking-widest text-secondary font-bold">LOYALTY TIER</span>
                <div class="mt-4">
                  <h3 class="text-3xl font-headline font-black text-primary">${tier.split(' ')[0]}</h3>
                  <p class="text-[10px] text-secondary mt-1 uppercase font-medium">NEXT TIER AT 5,000 PTS</p>
                </div>
              </div>
              <div class="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient flex flex-col justify-between min-h-[180px] border border-outline-variant/10">
                <span class="text-[10px] uppercase tracking-widest text-secondary font-bold">KINETIC POINTS</span>
                <div class="mt-4">
                  <h3 class="text-3xl font-headline font-black text-on-surface">${points.toLocaleString()}</h3>
                  <p class="text-[10px] text-secondary mt-1 uppercase font-medium">AVAILABLE FOR REDEMPTION</p>
                </div>
              </div>
              <div class="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient flex flex-col justify-between min-h-[180px] border border-outline-variant/10 bg-gradient-to-br from-surface-container-lowest to-surface-container-low">
                <span class="text-[10px] uppercase tracking-widest text-secondary font-bold">MEMBER SINCE</span>
                <div class="mt-4">
                  <h3 class="text-3xl font-headline font-black text-on-surface">OCT '22</h3>
                  <p class="text-[10px] text-secondary mt-1 uppercase font-medium">2.4 YEARS ACTIVE</p>
                </div>
              </div>

              <!-- Recent Shipments -->
              <div class="col-span-12 mt-4">
                <div class="flex justify-between items-end mb-8">
                  <h2 class="text-2xl font-headline font-bold uppercase tracking-tight">Recent Shipments</h2>
                  <a href="#/account/orders" class="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline underline-offset-8 decoration-2 transition-all">VIEW ALL ARCHIVE</a>
                </div>
                <div class="space-y-4">
                  <!-- Order 1 -->
                  <div class="bg-surface-container-low rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center group hover:bg-surface-container-high transition-all border border-outline-variant/5">
                    <div class="w-24 h-24 bg-surface-container-lowest rounded-xl overflow-hidden flex-shrink-0">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm3kB2X4BaEVvkrqxMxgp5BALkbWrCo9wHRQ7Hi4GZGoWdQ3IgkiyIrxEtIIML9IJ7Tpuqs7Kmq5x_0rdZWrqJQzsgHZ2GYvq4E-7qps-cshF1J0fqDywSCm6VccG-CheKUZ_AeAKVwLYlIIctu4h-EQ6r5mV24Ekme-HYZWInBEUq4hMV-eSL26eMGTIZRiUuIIK9Vje0D_NIVSmojUGUMlvU-fcQG1ibwqoZDt9rTD8SbsM5heu0s_WEVupn5dZsbyNE5dccNRA" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="flex-grow">
                      <div class="flex justify-between mb-2">
                        <span class="text-[10px] font-bold uppercase tracking-widest text-primary">IN TRANSIT</span>
                        <span class="text-[10px] font-bold text-secondary uppercase">EST. APRIL 24</span>
                      </div>
                      <h4 class="text-lg font-headline font-bold uppercase">KINETIC ZOOM X-11 "ELECTRIC"</h4>
                      <p class="text-[10px] text-secondary font-bold uppercase mt-1">ORDER #K-90283 • $240.00</p>
                    </div>
                    <div class="flex gap-2">
                      <button class="bg-surface-container-highest text-on-surface px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest transition-transform hover:scale-105 active:scale-95">TRACK</button>
                      <button class="bg-on-surface text-surface px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest transition-transform hover:scale-105 active:scale-95">DETAILS</button>
                    </div>
                  </div>
                  <!-- Order 2 -->
                  <div class="bg-surface-container-low rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center group hover:bg-surface-container-high transition-all border border-outline-variant/5">
                    <div class="w-24 h-24 bg-surface-container-lowest rounded-xl overflow-hidden flex-shrink-0">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEYzHK2I3M_KFHb4vAsweAK--SVwdvfZabjypYTSoxjmTA6szMAaLdk7fif0lLaRATdkBS6M2PuStL2VDAH3wWT0XMSnM1j20uUnWch8xyaJ3pXEF37_LLeGJ-iOIITqCmWC6Efy5h2_PE8EOtmE2BTN5YDbr6-9xbj2MqHdBn6feI94ZcxJkQkcRuJrF309lSXIUFZrdSOj7q4zH504UM9prbC3zj1mGNIK971hTeM7jjNC2fhZK_D7jRH8QMcNbSusZmGoJLDUM" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="flex-grow">
                      <div class="flex justify-between mb-2">
                        <span class="text-[10px] font-bold uppercase tracking-widest text-secondary">DELIVERED</span>
                        <span class="text-[10px] font-bold text-secondary uppercase">MARCH 28, 2026</span>
                      </div>
                      <h4 class="text-lg font-headline font-bold uppercase">PRECISION SHELL II — OBSIDIAN</h4>
                      <p class="text-[10px] text-secondary font-bold uppercase mt-1">ORDER #K-88122 • $415.00</p>
                    </div>
                    <div class="flex gap-2">
                      <button class="bg-surface-container-highest text-on-surface px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest transition-transform hover:scale-105 active:scale-95">REORDER</button>
                      <button class="bg-on-surface text-surface px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest transition-transform hover:scale-105 active:scale-95">DETAILS</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Profile Sidebar (Asymmetric) -->
            <aside class="col-span-12 lg:col-span-4 space-y-8">
              <div class="bg-surface-container-lowest rounded-2xl p-10 shadow-ambient border border-outline-variant/10 sticky top-24">
                <div class="flex flex-col items-center text-center">
                  <div class="relative mb-8">
                    <div class="w-32 h-32 rounded-full overflow-hidden bg-surface-container-low border-4 border-surface-container-lowest shadow-xl transition-all duration-700 grayscale hover:grayscale-0">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUJpehtc4vusuBKaTyFFCbnKxKZDRfdMogLiUSfx_u2GIsEwY6e2HhwUW6wFMMj-6IgFYJcIEHioyoF1Efb1k2SmCIdJzH-fl7bO3aJq4gF3CQhlNOuMHPt0GqOoz29oHEzf6WH_cG1sOaYfBqbu9dOJHkSHOo4bhM3LkEgy367nKY0_wRhqQCy6xWQ_1ByuUe4-jmOH1hQI8YJOF-eOGsUBsOkZw0RnQpgcTSntaY2hYzIk0sTwbRHGO43dBwRueWjb44J7Ne5HU" class="w-full h-full object-cover">
                    </div>
                    <div class="absolute bottom-1 right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-surface-container-lowest">
                      <span class="material-symbols-outlined text-white text-[14px]">verified</span>
                    </div>
                  </div>
                  <h2 class="text-2xl font-headline font-bold uppercase tracking-tight">${name}</h2>
                  <p class="text-secondary text-sm font-medium lowercase tracking-wide mt-1">${email}</p>
                </div>

                <div class="mt-12 space-y-8">
                  <div>
                    <div class="flex justify-between items-center mb-4">
                      <span class="text-[10px] uppercase tracking-[0.2em] font-black text-secondary">DEFAULT SHIPPING</span>
                      <button class="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline underline-offset-4">EDIT</button>
                    </div>
                    <p class="text-sm font-bold uppercase leading-relaxed tracking-wide">
                      4820 LUMINA DISTRICT, FLOOR 12<br/>
                      SAN FRANCISCO, CA 94105<br/>
                      UNITED STATES
                    </p>
                  </div>

                  <div class="pt-8 border-t border-surface-container flex flex-col gap-3">
                    <button class="flex items-center justify-between w-full p-4 rounded-xl hover:bg-surface-container-low transition-colors group">
                      <div class="flex items-center gap-4">
                        <span class="material-symbols-outlined text-secondary" data-icon="notifications">notifications</span>
                        <span class="text-xs font-bold uppercase tracking-widest">NOTIFICATIONS</span>
                      </div>
                      <span class="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                    <button class="flex items-center justify-between w-full p-4 rounded-xl hover:bg-surface-container-low transition-colors group">
                      <div class="flex items-center gap-4">
                        <span class="material-symbols-outlined text-secondary" data-icon="security">security</span>
                        <span class="text-xs font-bold uppercase tracking-widest">SECURITY & PRIVACY</span>
                      </div>
                      <span class="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <!-- Upsell Section -->
          <section class="mt-16">
            <div class="relative bg-on-background rounded-[40px] overflow-hidden min-h-[400px] flex items-center p-8 md:p-16 lg:p-24 group">
              <div class="absolute inset-0 opacity-40">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4412KCWWj0xYT3-BkdqC9vwbH60frXosyZGnvD2pA6TFyaH8Td3vY2TfCDNaLlFcVide0wH-JUu_EmxVdYYy7UQElJi2hPNlYBlJEwk-NzqQ3klKKsT978vVmbsRUYE_PQ3Nlmxq8xr3D5Mc14cAEwNPK1n1L6a6V_UovEEuOs8XPWyD2pFD4FxFF643AvuuaaTxuIlhPLO1860rc0lwvKEeAdCt0_dLvQdmEVoGB154XYQaGC20C8OFHgOD2ptupoGiVi6UaMxc" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000">
              </div>
              <div class="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
              <div class="relative z-10 max-w-xl">
                <span class="inline-block bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-8 shadow-lg shadow-primary/30">EXCLUSIVE EARLY ACCESS</span>
                <h2 class="text-5xl lg:text-6xl font-headline font-black text-white leading-[1.1] mb-8 italic uppercase tracking-tighter">
                  THE AERO-LINE <br/>ARCHIVE DROPS <br/>TOMORROW.
                </h2>
                <p class="text-white/60 font-body text-xl leading-relaxed mb-10">
                  As a ${tier.split(' ')[0]} member, you have a 12-hour head start on the rarest drops of the season.
                </p>
                <a href="#/shop" class="inline-block bg-white text-on-background px-12 py-5 rounded-full font-label text-xs uppercase font-black tracking-[0.2em] hover:bg-primary hover:text-white transition-all active:scale-95 shadow-2xl">
                  VIEW COLLECTION
                </a>
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
