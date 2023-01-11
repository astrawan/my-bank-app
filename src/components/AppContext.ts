import React from 'react';

type AppContextValue = {
  footerVisible?: boolean;
  setFooterVisibility?: (visibility: boolean) => void;
};

const AppContext = React.createContext<AppContextValue>({
  footerVisible: true,
  setFooterVisibility: () => {},
});

export const AppContextProvider = AppContext.Provider;

export function useAppContext() {
  return React.useContext(AppContext);
}
