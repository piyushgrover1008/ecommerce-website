const NotFound = {
  render: async () => {
    const section = document.createElement('section');
    section.className = 'min-h-screen flex flex-col items-center justify-center p-8 text-center';
    section.innerHTML = `
      <h1 class="text-9xl font-display font-bold text-outline-variant mb-4">404</h1>
      <h2 class="text-2xl font-display mb-6">ARCHIVED BEYOND REACH</h2>
      <p class="text-secondary mb-8">The page you're searching for does not exist in the current gallery.</p>
      <a href="#/" class="ghost-border text-on-surface px-8 py-3 rounded-full font-medium transition-all hover:bg-surface-container-low">
        Back to Home
      </a>
    `;
    return section;
  }
};

export default NotFound;
