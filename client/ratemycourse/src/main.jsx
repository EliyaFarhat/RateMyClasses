import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './CSS Files/index.css';
import App from './App.jsx';
import { AuthProvider } from './AuthContext.jsx'; // Import AuthProvider
import './CSS Files/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap App with AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
