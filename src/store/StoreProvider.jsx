import { createContext, useContext } from "react";
import { persist } from "zustand/middleware";
import create from "zustand";
import storeConfigurations from "./StoreConfigurations";

const createStore = ([storeName, storeConfig]) => {
  const { config } = storeConfig;

  let store = persist(config, {
    name: storeName,
    getStorage: () => sessionStorage,
  });

  // store = devtools(store, { name: storeName });

  return create(store);
};

const reducer = (prev, curr) => ({
  ...prev,
  [curr[0]]: createStore(curr),
});

const initStores = () => {
  const storeValues = Object.entries(storeConfigurations);
  return storeValues.reduce(reducer, {});
};

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const zustandStores = initStores();

  return (
    <StoreContext.Provider value={zustandStores}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (storeName, selectorFn, eqFn) => {
  const stores = useContext(StoreContext);
  const store = stores[storeName];
  return store(selectorFn, eqFn);
};
