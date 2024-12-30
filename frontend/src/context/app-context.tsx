import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../utils/api-clients";

type AppContext = {
  isLogged: boolean;
  role: number;
  updateRole: (role: number) => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [role, setRole] = useState(-1);
  const { isError } = useQuery("validateToken", apiClient.validateToken, {});
  useEffect(() => {
    if (!isError) {
      setRole(0);
    }
  }, [isError]);

  const updateRole = (role: number) => {
    setRole(role);
  };

  return (
    <AppContext.Provider value={{ isLogged: !isError, role, updateRole }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context as AppContext;
};
