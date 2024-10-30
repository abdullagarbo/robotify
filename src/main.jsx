import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RoboContextProvider from './store/Context.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoboContextProvider>
      <App />
    </RoboContextProvider>
  </StrictMode>
);
