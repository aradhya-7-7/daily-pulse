import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Navbar from './components/Navbar';
import NewsFeed from './components/NewsFeed';
import NewsSummary from './components/NewsSummary';
import StockTicker from './components/StockTicker';
import './App.css';
import Footer from './components/Footer';

function App() {
  const [fontSize, setFontSize] = useState('medium');

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <Router>
      <div className={`app font-${fontSize}`}>
      <div className="stock-ticker-wrapper">
    <StockTicker />
  </div>
        
        <header className="app-header">
          <div className="top-section">
            <div className="font-controls">
              <button onClick={() => setFontSize('small')}>A-</button>
              <button onClick={() => setFontSize('medium')}>A</button>
              <button onClick={() => setFontSize('large')}>A+</button>
            </div>
          </div>
          <h1 className="main-heading">Daily Pulse</h1>
          <Navbar />
        </header>

        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div {...pageTransition} className="content-container">
              <Routes>
                <Route path="/" element={<NewsFeed category="general" />} />
                <Route path="/business" element={<NewsFeed category="business" />} />
                <Route path="/sports" element={<NewsFeed category="sports" />} />
                <Route path="/entertainment" element={<NewsFeed category="entertainment" />} />
                <Route path="/summary" element={<NewsSummary />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
