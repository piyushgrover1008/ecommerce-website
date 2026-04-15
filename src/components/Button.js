const Button = {
  render: ({ label, variant = 'primary', icon = null, className = '', id = '', disabled = false, loading = false }) => {
    const baseStyles = "relative overflow-hidden font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
    const variants = {
      primary: "bg-primary-gradient text-white rounded-full px-8 py-4 shadow-lg hover:shadow-primary/20",
      secondary: "bg-secondary-container text-on-surface rounded-full px-8 py-4 hover:bg-secondary/10",
      ghost: "text-on-surface underline decoration-2 underline-offset-8 hover:text-primary hover:decoration-primary px-2 py-2",
      outline: "border border-on-surface/20 rounded-full px-8 py-4 hover:border-primary hover:text-primary"
    };

    return `
      <button 
        id="${id}"
        ${disabled ? 'disabled' : ''}
        class="${baseStyles} ${variants[variant]} ${className}"
      >
        ${loading ? `
          <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        ` : ''}
        ${icon && !loading ? `<span class="material-symbols-outlined text-[20px]">${icon}</span>` : ''}
        <span class="${loading ? 'opacity-50' : ''} uppercase tracking-widest text-xs">${label}</span>
      </button>
    `;
  }
};

export default Button;
