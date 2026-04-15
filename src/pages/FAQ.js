const FAQ = {
  render: async () => {
    const container = document.createElement('div');
    container.className = 'max-w-4xl mx-auto px-6 py-24';
    container.innerHTML = `
      <div class="text-center mb-24">
        <span class="text-primary font-bold text-[10px] tracking-[0.4em] uppercase mb-8 block">FREQUENTLY ASKED</span>
        <h1 class="text-6xl font-display font-light leading-[0.9] tracking-tighter mb-8 italic">THE ARCHIVE GUIDE.</h1>
      </div>

      <div class="space-y-6">
        ${[
          { q: 'How do I access early drops?', a: 'Platinum members receive 12-hour early access to all seasonal collections. You can join the collective by creating an account and achieving Elite status through engagement.' },
          { q: 'What is the "Motion" guarantee?', a: 'Every technical piece in our gallery is performance-tested for extreme conditions. If your gear fails to support your motion, we offer a full archival exchange within 30 days.' },
          { q: 'Do you ship to the Lumina District?', a: 'Yes, we provide expedited architectural delivery to all major technical hubs globally, including the Lumina District and Neo-Nomad sectors.' },
          { q: 'How are sizes calculated?', a: 'We use a proprietary "Kinetic Fit" system. Please refer to our detailed size guide on each product page for precise measurements tailored to high-motion silhouettes.' }
        ].map((item, idx) => `
          <div class="bg-surface-container-low rounded-2xl border border-outline-variant/10 overflow-hidden">
            <details class="group p-8">
              <summary class="flex justify-between items-center cursor-pointer list-none">
                <h4 class="text-lg font-display font-bold uppercase tracking-tight">${item.q}</h4>
                <span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div class="pt-8 text-secondary leading-relaxed">
                ${item.a}
              </div>
            </details>
          </div>
        `).join('')}
      </div>
    `;
    return container;
  }
};

export default FAQ;
