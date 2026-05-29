import React from 'react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import HowItWorks from './components/sections/HowItWorks';
import Problem from './components/sections/Problem';
import WhyKara from './components/sections/WhyKara';
import TargetCreators from './components/sections/TargetCreators';
import Team from './components/sections/Team';
import { Vision, CTA } from './components/sections/VisionCTA';

export default function App() {
  return (
    <div>
      <Navbar />

      <main>
        <Hero />
        <Problem />
        <Services />
        <HowItWorks />
        <WhyKara />
        <TargetCreators />
        <Vision />
        <Team />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

