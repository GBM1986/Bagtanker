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
import { Produkter } from './pages/Produkter.jsx';
import { Kager } from './pages/produkter/Kager.jsx';
import { Rundstykker } from './pages/produkter/Rundstykker.jsx';  
import { Baguettes } from './pages/produkter/Baguettes.jsx';      
import { Franskbrod } from './pages/produkter/Franskbrod.jsx';    
import { Rugbrod } from './pages/produkter/Rugbrod.jsx';         
import { Kontakt } from './pages/Kontakt.jsx';
import { ProduktDetails } from './pages/ProduktDetails.jsx';
import { AuthProvider } from './providers/AuthProvider.jsx';
import { ProductList } from './components/ProductList.jsx';

const App = () => {
  return (
    <Router>
      <SupabaseProvider>
        <AuthProvider> 
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/produkter" element={<ProductList />}>
              <Route path=':category_id' element={<ProductList />} />
              {/* <Route path="kager" element={<Kager />} />
              <Route path="rundstykker" element={<Rundstykker />} />
              <Route path="baguettes" element={<Baguettes />} />
              <Route path="franskbrod" element={<Franskbrod />} />
              <Route path="rugbrod" element={<Rugbrod />} /> */}
              {/* <Route path="/produkter/details/:id" element={<ProduktDetails />} /> Keep consistent with link */}
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/kontakt' element={<Kontakt />} />
            <Route path="/nyheder" element={<Nyheder />} />  
            <Route path="/nyheder/:id" element={<Nyheder />} /> 
          </Route>

          <Route element={<SecondaryLayout />}>
            <Route path="/" element={<Frontpage />} />
            
            
          </Route>
        </Routes>
        </AuthProvider>
      </SupabaseProvider>
    </Router>
  );
};

export default App;
