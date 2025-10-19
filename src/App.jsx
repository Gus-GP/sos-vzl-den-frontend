import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Networkings from './Pages/Networkings';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
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
