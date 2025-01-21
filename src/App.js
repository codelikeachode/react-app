import React, { memo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

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
      <Router>
        <div>

        
        <main>
          <AppRoutes />
        </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;