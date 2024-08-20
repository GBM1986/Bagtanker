import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SupabaseProvider } from './providers/SupabaseProvider.jsx';
import { Frontpage } from './pages/Frontpage.jsx';
import { Login } from './pages/Login.jsx';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import MainLayout from './layout/Mainlayout.jsx';
import SecondaryLayout from './layout/SecondaryLayout.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Nyheder } from './pages/Nyheder.jsx';


const App = () => {
  return (
    <Router>
      <SupabaseProvider>        
          <Routes>
          <Route element={<MainLayout />}>
            <Route path='/kontakt' element={<Login />} />
          </Route>

          <Route element={<SecondaryLayout />}>
            <Route path="/" element={<Frontpage />} />
            <Route path="/nyheder" element={<Nyheder />} />  
          </Route>
          </Routes>
      </SupabaseProvider>
    </Router>
  );
};

export default App;
