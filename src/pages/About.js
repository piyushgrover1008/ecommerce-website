const About = {
  render: async () => {
    const container = document.createElement('div');
    container.className = 'max-w-[1440px] mx-auto px-6 py-24';
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div class="reveal-on-scroll">
          <span class="text-primary font-bold text-[10px] tracking-[0.4em] uppercase mb-8 block">THE KINETIC PHILOSOPHY</span>
          <h1 class="text-6xl md:text-8xl font-display font-light leading-[0.9] tracking-tighter mb-12 italic">
            DEFINING THE <br/>FUTURE OF <br/>MOTION.
          </h1>
          <p class="text-secondary text-xl leading-relaxed max-w-lg mb-12">
            Founded in 2026, Kinetic Gallery represents the intersection of technical excellence and editorial vision. We don't just curate gear; we archive the evolution of urban movement.
          </p>
          <div class="flex gap-12">
            <div>
              <h4 class="text-4xl font-display font-bold">128+</h4>
              <p class="text-[10px] font-bold text-secondary uppercase tracking-widest mt-2">ARCHIVED DROPS</p>
            </div>
            <div>
              <h4 class="text-4xl font-display font-bold">12K</h4>
              <p class="text-[10px] font-bold text-secondary uppercase tracking-widest mt-2">GLOBAL MEMBERS</p>
            </div>
          </div>
        </div>
        <div class="relative reveal-on-scroll delay-200">
          <div class="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp0gy9Hz8tWhYURQ8Zz7JTWkszKBCdRviLvghiKimm4mUdhjX-NZ6MeVXGE7DE_JfPEPyvPto4HQmXNTu5NUcQqNLB5H6XFGspjBG6wKtyIVVEpVv0lvaIAL93csDgq4VYYjnzFXtKB2rD03ZWQFbfU8Kh_lRNL92zUNH73nJFB5wSGtt80qIHuy4rCIKvYyUZOWsLZlWYI_HDApzFTsgY_NHrM-RR2lbUP2fmt7M-1fFOvv0UwnVGoS3L6c7ZquI1uKKiNB4MCoU" class="w-full h-full object-cover">
          </div>
          <div class="absolute -bottom-12 -left-12 bg-on-surface p-12 rounded-2xl text-surface max-w-xs shadow-2xl">
            <p class="text-sm italic leading-relaxed">"The goal is not to be faster, but to move more intentionally."</p>
            <p class="text-[10px] font-bold tracking-widest mt-6 uppercase">— DIRECTOR OF MOTION</p>
          </div>
        </div>
      </div>
    `;
    return container;
  },
  afterRender: () => {
    // Basic reveal animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-staggered-entry');
          entry.target.classList.remove('opacity-0');
        }
      });
    });
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });
  }
};

export default About;
