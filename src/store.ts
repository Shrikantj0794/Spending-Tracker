import { create } from 'zustand';

interface StoreState {
  loggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

export const useStore = create<StoreState>((set) => ({
  loggedIn: localStorage.getItem('loggedIn') === 'true', // Initialize from localStorage
  logIn: () => {
    set({ loggedIn: true });
    localStorage.setItem('loggedIn', 'true'); // Persist to localStorage
  },
  logOut: () => {
    set({ loggedIn: false });
    localStorage.setItem('loggedIn', 'false'); // Persist to localStorage
  },
}));
