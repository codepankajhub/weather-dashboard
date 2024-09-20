import React, { createContext, useContext, useState } from 'react';

interface TemperatureContextType {
  isCelsius: boolean;
  toggleTemperatureUnit: () => void;
}

const TemperatureContext = createContext<TemperatureContextType | undefined>(undefined);

export const TemperatureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius(prev => !prev);
  };

  return (
    <TemperatureContext.Provider value={{ isCelsius, toggleTemperatureUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};

export const useTemperatureContext = () => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error('useTemperatureContext must be used within a TemperatureProvider');
  }
  return context;
};
