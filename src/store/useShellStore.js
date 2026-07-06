import { useCallback, useSyncExternalStore } from "react";

const state = {
  collapsed: false,
  mobileOpen: false,
  menuQuery: "",
};

const listeners = new Set();

const emit = () => listeners.forEach((listener) => listener());

const setState = (next) => {
  Object.assign(state, typeof next === "function" ? next(state) : next);
  emit();
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => state;

export const useShellStore = () => {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    ...snapshot,
    setCollapsed: useCallback((collapsed) => setState({ collapsed }), []),
    toggleCollapsed: useCallback(() => setState((current) => ({ collapsed: !current.collapsed })), []),
    setMobileOpen: useCallback((mobileOpen) => setState({ mobileOpen }), []),
    setMenuQuery: useCallback((menuQuery) => setState({ menuQuery }), []),
  };
};
