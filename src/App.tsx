import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Prevent scroll during loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  const handleLoadComplete = () => {
    setLoading(false);
    // Small delay before showing content
    setTimeout(() => setReady(true), 100);
  };

  return (
    <>
      {loading && <Loader onComplete={handleLoadComplete} />}
      <CustomCursor />
      
      <div style={{ visibility: ready ? 'visible' : 'hidden' }}>
        <Navigation />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <About />
          <Testimonials />
          <Pricing />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
