const Privacy = {
  render: async () => {
    const container = document.createElement('div');
    container.className = 'max-w-4xl mx-auto px-6 py-24';
    container.innerHTML = `
      <h1 class="text-4xl font-display font-bold tracking-tight mb-16 italic">PRIVACY ARCHIVE</h1>
      <div class="prose prose-on-surface space-y-12">
        <section>
          <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-primary">01 DATA COLLECTION</h4>
          <p class="text-secondary leading-relaxed">
            At Kinetic Gallery, we respect the integrity of your digital footprint. We only collect data necessary to facilitate your motion and curations within our archive.
          </p>
        </section>
        <section>
          <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-primary">02 SECURITY PROTOCOLS</h4>
          <p class="text-secondary leading-relaxed">
            All transaction sequences are encrypted via architectural-grade security layers. Your kinetic preferences are yours alone.
          </p>
        </section>
        <section>
          <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-primary">03 THIRD-PARTY MOTION</h4>
          <p class="text-secondary leading-relaxed">
            We never trade or sell your personal data to sectoral entities outside the Kinetic Collective.
          </p>
        </section>
      </div>
      <div class="mt-24 pt-12 border-t border-outline-variant/10 text-center">
        <p class="text-[10px] font-bold text-secondary uppercase tracking-widest italic">LAST UPDATED: APRIL 2026</p>
      </div>
    `;
    return container;
  }
};

export default Privacy;
