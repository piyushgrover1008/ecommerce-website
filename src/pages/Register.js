import { userStore } from '../stores/userStore.js';

const Register = {
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
            JOIN THE <br/>COLLECTIVE.
          </h1>
          <div class="flex gap-4">
            <div class="w-12 h-1 bg-primary"></div>
            <p class="text-secondary font-medium text-lg leading-relaxed">
              Create an account to track your curations, save your favorites, and get exclusive access to seasonal drops.
            </p>
          </div>
        </div>
        <div class="z-10">
          <p class="text-[10px] uppercase tracking-[0.2em] text-secondary/50 font-bold">Established 2026 © Kinetic Collective</p>
        </div>
        <div class="absolute inset-0 z-0">
          <img class="w-full h-full object-cover grayscale brightness-75 scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUJpehtc4vusuBKaTyFFCbnKxKZDRfdMogLiUSfx_u2GIsEwY6e2HhwUW6wFMMj-6IgFYJcIEHioyoF1Efb1k2SmCIdJzH-fl7bO3aJq4gF3CQhlNOuMHPt0GqOoz29oHEzf6WH_cG1sOaYfBqbu9dOJHkSHOo4bhM3LkEgy367nKY0_wRhqQCy6xWQ_1ByuUe4-jmOH1hQI8YJOF-eOGsUBsOkZw0RnQpgcTSntaY2hYzIk0sTwbRHGO43dBwRueWjb44J7Ne5HU">
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
            <h2 class="text-3xl font-bold text-on-background tracking-tight mb-2 font-display italic">CREATE ACCOUNT</h2>
            <p class="text-secondary">Already a member? <a href="#/login" class="text-primary font-bold hover:underline underline-offset-4">Sign in here</a></p>
          </div>

          <form id="register-form" class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div class="group">
                <label class="block text-[10px] uppercase font-black tracking-widest text-secondary group-focus-within:text-primary transition-colors mb-2">FIRST NAME</label>
                <input type="text" name="firstName" placeholder="ELENA" required class="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-on-surface font-body placeholder:text-outline-variant/30 focus:ring-4 focus:ring-primary/10 transition-all uppercase">
              </div>
              <div class="group">
                <label class="block text-[10px] uppercase font-black tracking-widest text-secondary group-focus-within:text-primary transition-colors mb-2">LAST NAME</label>
                <input type="text" name="lastName" placeholder="VANCE" required class="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-on-surface font-body placeholder:text-outline-variant/30 focus:ring-4 focus:ring-primary/10 transition-all uppercase">
              </div>
            </div>
            <div class="group">
              <label class="block text-[10px] uppercase font-black tracking-widest text-secondary group-focus-within:text-primary transition-colors mb-2">EMAIL ADDRESS</label>
              <input type="email" name="email" placeholder="name@gallery.com" required class="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-on-surface font-body placeholder:text-outline-variant/30 focus:ring-4 focus:ring-primary/10 transition-all">
            </div>
            <div class="group">
              <label class="block text-[10px] uppercase font-black tracking-widest text-secondary group-focus-within:text-primary transition-colors mb-2">PASSWORD</label>
              <input type="password" name="password" placeholder="••••••••" required class="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-on-surface font-body placeholder:text-outline-variant/30 focus:ring-4 focus:ring-primary/10 transition-all">
            </div>
            <div class="flex items-start gap-3 mt-4">
              <input type="checkbox" id="terms" required class="w-5 h-5 rounded-lg border-outline-variant/20 text-primary focus:ring-primary mt-0.5">
              <label for="terms" class="text-xs text-secondary leading-relaxed">
                I agree to the <a href="#/privacy" class="underline underline-offset-2 hover:text-primary">Privacy Policy</a> and <a href="#/terms" class="underline underline-offset-2 hover:text-primary">Terms of Selection</a>.
              </label>
            </div>
            <button type="submit" class="w-full py-5 rounded-full bg-primary-gradient text-white font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-4">
              JOIN COLLECTIVE
            </button>
          </form>

          <div class="mt-12 pt-8 border-t border-surface-container-low flex flex-col sm:flex-row gap-6 justify-between items-center">
            <p class="text-[11px] text-secondary uppercase tracking-widest font-bold">Member already?</p>
            <a href="#/login" class="text-xs uppercase font-black tracking-widest text-on-surface hover:text-primary transition-colors">SIGN IN</a>
          </div>
        </div>
      </section>
    `;
    return section;
  },

  afterRender: () => {
    const form = document.getElementById('register-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const email = data.get('email');
        const firstName = data.get('firstName').toUpperCase();
        
        userStore.login({ 
          email, 
          name: firstName, 
          tier: 'NEW MEMBER',
          points: 0 
        });
        
        window.location.hash = '#/account';
      });
    }
  }
};

export default Register;
