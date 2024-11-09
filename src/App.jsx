import React from 'react';
import Header from './Header.jsx';
import HeroSection from './HeroSection.jsx';
import Partners from './Partners.jsx';
import Footer from './Footer.jsx';
import Testimony from './Test.jsx'
import IntegrationsSection from './IntegrationsSection.jsx'

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <Partners />
      <IntegrationsSection/>
      <Testimony/>
      <Footer />
    </div>
  );
}

export default App;
