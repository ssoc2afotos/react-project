import { useStore } from "./StoreProvider";

export const useAuthStore = (selectorFn, eqFn) =>
  useStore("AuthStore", selectorFn, eqFn);
