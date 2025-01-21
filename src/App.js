import React, { memo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/Theme';
import { AnimatePresence } from 'framer-motion';

// Shared Components
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

// Home Components
import Hero from './components/home/Hero';

const HomePage = memo(() => (
  <>
  <Hero />
  </>
));

const AppRoutes = memo(() => {
  const location = useLocation();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </AnimatePresence>
  );
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <div>
          <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;