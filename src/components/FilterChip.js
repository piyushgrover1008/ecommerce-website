const FilterChip = {
  render: ({ label, value, selected = false, id = '' }) => {
    return `
      <button 
        data-value="${value}"
        id="${id}"
        class="group relative px-4 py-2 rounded-full border transition-all duration-300 ${
          selected 
            ? 'bg-primary border-primary text-white shadow-lg' 
            : 'bg-secondary-container border-transparent text-secondary hover:border-secondary/20'
        }"
      >
        <span class="text-[10px] font-bold uppercase tracking-widest">${label}</span>
      </button>
    `;
  }
};

export default FilterChip;
