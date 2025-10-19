import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Networkings from './Pages/Networkings';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

// Initialize Google Analytics
const GA_MEASUREMENT_ID = 'G-ZG5RFF82QJ';

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    ReactGA.send({ 
      hitType: 'pageview', 
      page: location.pathname + location.search 
    });
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    // Initialize GA on app mount
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, []);

  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/networkings" element={<Networkings />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;