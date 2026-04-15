class UserStore {
  constructor() {
    this.user = this.loadFromStorage();
  }

  loadFromStorage() {
    const saved = localStorage.getItem('kinetic_user');
    return saved ? JSON.parse(saved) : null;
  }

  saveToStorage() {
    localStorage.setItem('kinetic_user', JSON.stringify(this.user));
  }

  login(userData) {
    this.user = userData;
    this.saveToStorage();
  }

  logout() {
    this.user = null;
    localStorage.removeItem('kinetic_user');
  }

  get isLoggedIn() {
    return !!this.user;
  }
}

export const userStore = new UserStore();
