import { useEffect, useState } from "react";

const STORAGE_KEY = "super_app_state";

const defaultState = {
  user: null,
  selectedCategories: [],
  notes: "This is how I am going to learn\nMERN Stack in next 3 months.",
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...defaultState, ...saved } : defaultState;
  } catch {
    return defaultState;
  }
}

export function useStore() {
  const [appState, setAppState] = useState(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }, [appState]);

  const setUser = (user) => {
    setAppState((state) => ({ ...state, user }));
  };

  const setCategories = (selectedCategories) => {
    setAppState((state) => ({ ...state, selectedCategories }));
  };

  const setNotes = (notes) => {
    setAppState((state) => ({ ...state, notes }));
  };

  return {
    ...appState,
    setUser,
    setCategories,
    setNotes,
  };
}
