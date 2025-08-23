import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, MapPin } from 'lucide-react';

const ImpactSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    students: 0,
    campuses: 0,
    chance: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('[data-section="5"]');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate counters
      const studentsTarget = 15000;
      const campusesTarget = 50;
      const chanceTarget = 100;

      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);

        setCounters({
          students: Math.floor(studentsTarget * easeOutQuad),
          campuses: Math.floor(campusesTarget * easeOutQuad),
          chance: Math.floor(chanceTarget * easeOutQuad)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setCounters({
            students: studentsTarget,
            campuses: campusesTarget,
            chance: chanceTarget
          });
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section 
      data-section="5" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-blue-50 to-white"
    >
      {/* Background Clouds */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-16 w-32 h-16 bg-white/60 rounded-full animate-float" />
        <div className="absolute top-32 right-20 w-40 h-20 bg-white/40 rounded-full animate-float-reverse" />
        <div className="absolute bottom-32 left-32 w-24 h-12 bg-white/50 rounded-full animate-float" />
        
        {/* Growing grass at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-12">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className={`absolute bottom-0 w-2 bg-green-400/30 rounded-t-full transition-all duration-1000 ${
                isVisible ? 'animate-grow' : 'h-0'
              }`}
              style={{ 
                left: `${(i + 1) * 6.67}%`,
                height: Math.random() * 32 + 16,
                animationDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className={`space-y-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          {/* Headline */}
          <div className="space-y-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
              WE'RE ALREADY
              <br />
              <span className="text-green-600">GROWING</span>
            </h2>
            
            <div className="w-32 h-3 bg-green-500 mx-auto rounded-full animate-pulse" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Students Counter */}
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 border-green-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">
                {counters.students.toLocaleString()}+
              </div>
              <p className="text-lg font-medium text-gray-700">students unplugged</p>
              
              {/* Ripple effect */}
              <div className={`absolute inset-0 rounded-3xl border-2 border-green-300 opacity-0 ${
                isVisible ? 'animate-ping' : ''
              }`} />
            </div>

            {/* Campuses Counter */}
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 border-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">
                {counters.campuses}+
              </div>
              <p className="text-lg font-medium text-gray-700">campuses in rebellion</p>
              
              <div className={`absolute inset-0 rounded-3xl border-2 border-blue-300 opacity-0 ${
                isVisible ? 'animate-ping' : ''
              }`} style={{ animationDelay: '0.2s' }} />
            </div>

            {/* Chance Counter */}
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 border-yellow-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <TrendingUp className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">
                {counters.chance}%
              </div>
              <p className="text-lg font-medium text-gray-700">chance you need sunlight</p>
              <p className="text-sm text-gray-500 mt-2 font-caveat">(tongue-in-cheek stat)</p>
              
              <div className={`absolute inset-0 rounded-3xl border-2 border-yellow-300 opacity-0 ${
                isVisible ? 'animate-ping' : ''
              }`} style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;