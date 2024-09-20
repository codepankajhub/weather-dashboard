import React from 'react';
import Dashboard from './components/Dashboard';
import { TemperatureProvider } from './context/TemperatureContext';
import './App.css'; // Add custom styles for your app if needed

const App: React.FC = () => {
  return (
    <TemperatureProvider>
      <div className="App">
        <Dashboard />
      </div>
    </TemperatureProvider>
  );
};

export default App;
