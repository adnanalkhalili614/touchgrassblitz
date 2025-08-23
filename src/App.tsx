import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import WhatIfSection from './components/WhatIfSection';
import MissionSection from './components/MissionSection';
import ImpactSection from './components/ImpactSection';
import HowWeMove from './components/HowWeMove';
import GetInvolved from './components/GetInvolved';
import ClosingSection from './components/ClosingSection';

function App() {
  // Smooth scrolling setup
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Handle reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01s');
        document.documentElement.style.setProperty('--transition-duration', '0.01s');
      } else {
        document.documentElement.style.removeProperty('--animation-duration');
        document.documentElement.style.removeProperty('--transition-duration');
      }
    };

    handleReducedMotion({ matches: mediaQuery.matches } as MediaQueryListEvent);
    mediaQuery.addEventListener('change', handleReducedMotion);
    
    return () => mediaQuery.removeEventListener('change', handleReducedMotion);
  }, []);

  return (
    <div className="relative">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero section */}
      <HeroSection />
      
      {/* What If sections */}
      <WhatIfSection 
        type="npcs"
        headline="WHAT IF WE STOPPED BEING NPCs?"
        subtext="We're not meant to be screen-slouched zombies. We're meant to move, breathe, touch, laugh. The NPC era is over."
        sectionNumber={1}
      />
      
      <WhatIfSection 
        type="health"
        headline="WHAT IF HEALTH WAS SIMPLE AGAIN?"
        subtext="Forget diet scams and processed junk. Real health is meat, fruit, water, lifting, sunlight. Not complicated. Not sold to you."
        sectionNumber={2}
      />
      
      <WhatIfSection 
        type="connection"
        headline="WHAT IF WE RECONNECTED?"
        subtext="Disconnection is the disease. Friends, faith, family, brotherhood — that's health. That's truly human."
        sectionNumber={3}
      />
      
      {/* Mission and other sections */}
      <MissionSection />
      <ImpactSection />
      <HowWeMove />
      <GetInvolved />
      <ClosingSection />
    </div>
  );
}

export default App;