import { userStore } from '../stores/userStore.js';

const Login = {
  render: async () => {
    const section = document.createElement('section');
    section.className = 'min-h-screen flex flex-col md:flex-row overflow-hidden bg-background';
    section.innerHTML = `
      <!-- Left Side: Editorial Content -->
      <section class="hidden md:flex md:w-7/12 relative overflow-hidden bg-surface-container-low p-16 flex-col justify-between">
        <div class="z-10">
          <span class="text-2xl font-black tracking-tighter text-on-background font-display uppercase">KINETIC</span>
        </div>
        <div class="z-10 max-w-xl">
          <p class="text-[10px] uppercase tracking-widest text-primary mb-4 font-bold">The Kinetic Gallery</p>
          <h1 class="text-5xl lg:text-7xl font-bold tracking-tight text-on-background leading-tight mb-8 font-display italic">
            ELEVATE YOUR <br/>MOTION.
          </h1>
          <div class="flex gap-4">
            <div class="w-12 h-1 bg-primary"></div>
            <p class="text-secondary font-medium text-lg leading-relaxed">
              Access an exclusive archive of curated editorial design and performance gear. Join the global flagship experience.
            </p>
          </div>
        </div>
        <div class="z-10">
          <p class="text-[10px] uppercase tracking-[0.2em] text-secondary/50 font-bold">Established 2026 © Kinetic Collective</p>
        </div>
        <div class="absolute inset-0 z-0">
          <img class="w-full h-full object-cover grayscale brightness-75 scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb_5dbHT88FG_5sKiuiXv-HcgSsULwvbo1v0-EDY5AI5s_qVbCg6Q3mXHLY8DN8-En_ZRJstgK4F-HjGf5_pr1RA4lFXf6fUAde0OeglWDP-1oWegrKeqPCfw5PS6qcSuJRsYLvAhTXk0f_t0k8oa-bE6P8Fxi68v1UKkfP4ztG0134F9bwtJcbfA4WWanN-nig7DZmKc3HnSWQZ8JaJtAMLm-gCT8GzjzaCBNp8zsh3nohu0dqhpQTpz3G7Fe6FV_KtuyO8H3QlM">
          <div class="absolute inset-0 bg-gradient-to-tr from-surface-container-low via-transparent to-transparent"></div>
        </div>
      </section>

      <!-- Right Side: Forms -->
      <section class="flex-1 bg-surface-container-lowest flex flex-col justify-center px-8 md:px-20 lg:px-32 py-20 relative">
        <div class="max-w-md w-full mx-auto">
          <div class="md:hidden mb-12">
            <span class="text-xl font-black tracking-tighter text-on-background font-display uppercase">KINETIC</span>
          </div>
          <div class="mb-10">
            <h2 class="text-3xl font-bold text-on-background tracking-tight mb-2 font-display italic">WELCOME BACK</h2>
            <p class="text-secondary">Sign in to your account or <a href="#/register" class="text-primary font-bold hover:underline underline-offset-4">create a new one</a></p>
          </div>

          <form id="login-form" class="space-y-8">
            <div class="group">
              <label class="block text-[10px] uppercase font-black tracking-widest text-secondary group-focus-within:text-primary transition-colors mb-2">EMAIL ADDRESS</label>
              <input type="email" name="email" placeholder="name@gallery.com" required class="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-on-surface font-body placeholder:text-outline-variant/30 focus:ring-4 focus:ring-primary/10 transition-all">
            </div>
            <div class="group">
              <div class="flex justify-between items-end mb-2">
                <label class="block text-[10px] uppercase font-black tracking-widest text-secondary group-focus-within:text-primary transition-colors">PASSWORD</label>
                <a href="#" class="text-[10px] uppercase font-black tracking-widest text-primary hover:underline underline-offset-2">Forgot?</a>
              </div>
              <input type="password" name="password" placeholder="••••••••" required class="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-on-surface font-body placeholder:text-outline-variant/30 focus:ring-4 focus:ring-primary/10 transition-all">
            </div>
            <div class="flex items-center gap-3">
              <input type="checkbox" id="remember" class="w-5 h-5 rounded-lg border-outline-variant/20 text-primary focus:ring-primary">
              <label for="remember" class="text-sm text-secondary font-medium">Remember this device</label>
            </div>
            <button type="submit" class="w-full py-5 rounded-full bg-primary-gradient text-white font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
              SIGN IN
            </button>
          </form>

          <div class="mt-12 pt-8 border-t border-surface-container-low flex flex-col sm:flex-row gap-6 justify-between items-center">
            <p class="text-[11px] text-secondary uppercase tracking-widest font-bold">New to Kinetic?</p>
            <a href="#/register" class="text-xs uppercase font-black tracking-widest text-on-surface hover:text-primary transition-colors">CREATE ACCOUNT</a>
          </div>
        </div>
      </section>
    `;
    return section;
  },

  afterRender: () => {
    const form = document.getElementById('login-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const email = data.get('email');
        const name = email.split('@')[0].toUpperCase();
        
        userStore.login({ 
          email, 
          name, 
          tier: 'GOLD MEMBER',
          points: 1250 
        });
        
        window.location.hash = '#/account';
      });
    }
  }
};

export default Login;
