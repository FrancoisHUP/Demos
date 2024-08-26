"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Create the context
interface ModelContextType {
  model: string;
  setModel: (model: string) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

// Create a provider component
export const ModelProvider = ({ children }: { children: ReactNode }) => {
  const [model, setModel] = useState<string>("Gpt-4o-mini");

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
};
