const Contact = {
  render: async () => {
    const container = document.createElement('div');
    container.className = 'max-w-[1440px] mx-auto px-6 py-24';
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-24">
        <div class="lg:col-span-5">
          <span class="text-primary font-bold text-[10px] tracking-[0.4em] uppercase mb-8 block">CONNECT WITH US</span>
          <h1 class="text-6xl font-display font-light leading-[0.9] tracking-tighter mb-12 italic">
            START THE <br/>CONVERSATION.
          </h1>
          <div class="space-y-12">
            <div>
              <h4 class="text-[10px] font-bold tracking-[0.2em] text-secondary uppercase mb-4">GLOBAL HEADQUARTERS</h4>
              <p class="text-lg font-bold">4820 Lumina District, Floor 12<br/>San Francisco, CA 94105</p>
            </div>
            <div>
              <h4 class="text-[10px] font-bold tracking-[0.2em] text-secondary uppercase mb-4">GENERAL INQUIRIES</h4>
              <p class="text-lg font-bold">gallery@kinetic.design</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7 bg-surface-container-low p-12 rounded-3xl border border-outline-variant/10">
          <form class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">FULL NAME</label>
                <input type="text" class="w-full bg-surface-container-lowest border-none rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="ELENA VANCE">
              </div>
              <div class="space-y-4">
                <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">EMAIL ADDRESS</label>
                <input type="email" class="w-full bg-surface-container-lowest border-none rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="EMAIL@GALLERY.COM">
              </div>
            </div>
            <div class="space-y-4">
              <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">MESSAGE</label>
              <textarea class="w-full bg-surface-container-lowest border-none rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 transition-all outline-none h-48 resize-none" placeholder="HOW CAN WE ASSIST YOUR MOTION?"></textarea>
            </div>
            <button class="bg-primary-gradient text-white px-12 py-5 rounded-full font-bold text-xs tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
              SEND INQUIRY
            </button>
          </form>
        </div>
      </div>
    `;
    return container;
  }
};

export default Contact;
