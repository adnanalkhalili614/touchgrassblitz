import React, { useEffect, useState } from 'react';
import { Sprout, Megaphone, Users2, Handshake } from 'lucide-react';

const HowWeMove: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('[data-section="6"]');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const movements = [
    {
      icon: <Sprout className="w-8 h-8" />,
      title: 'Campus Delegates',
      description: 'Seeds planted everywhere',
      color: 'green'
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: 'Culture Drops',
      description: 'Memes and videos that actually heal',
      color: 'blue'
    },
    {
      icon: <Users2 className="w-8 h-8" />,
      title: 'Mass Gatherings',
      description: 'Flash mobs, rallies, and National Mall events',
      color: 'yellow'
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: 'Allies & Partners',
      description: 'The real ones backing the mission',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'text-green-600 border-green-200 hover:border-green-400 hover:shadow-green-100';
      case 'blue':
        return 'text-blue-600 border-blue-200 hover:border-blue-400 hover:shadow-blue-100';
      case 'yellow':
        return 'text-yellow-600 border-yellow-200 hover:border-yellow-400 hover:shadow-yellow-100';
      case 'purple':
        return 'text-purple-600 border-purple-200 hover:border-purple-400 hover:shadow-purple-100';
      default:
        return 'text-gray-600 border-gray-200 hover:border-gray-400';
    }
  };

  return (
    <section 
      data-section="6" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-200 via-green-100 to-green-200"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating doodles */}
        <svg className="absolute top-16 left-16 w-16 h-16 text-white/20 animate-float" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        
        <div className="absolute top-32 right-24 w-12 h-12 bg-yellow-300/20 rounded-full animate-bounce-slow" />
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-blue-300/20 rounded-full animate-bounce" />
        
        {/* Growing grass elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bottom-0 w-3 bg-green-500/30 rounded-t-full animate-sway"
              style={{ 
                left: `${i * 8.33}%`,
                height: Math.random() * 32 + 16,
                animationDelay: `${i * 200}ms`
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
              HOW WE
              <br />
              <span className="text-green-600">MOVE</span>
            </h2>
            
            <div className="w-24 h-3 bg-green-500 mx-auto rounded-full animate-pulse" />
          </div>

          {/* Movement Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movements.map((movement, index) => (
              <div
                key={index}
                className={`group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${getColorClasses(movement.color)}`}
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-white/50 rounded-full group-hover:scale-110 transition-transform duration-300">
                    {React.cloneElement(movement.icon, { className: `w-8 h-8 ${getColorClasses(movement.color).split(' ')[0]}` })}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {movement.title}
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {movement.description}
                  </p>
                </div>

                {/* Hover grass effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400/0 via-green-400/50 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Animated doodle on hover */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Bottom Message */}
          <div className="pt-8">
            <p className="text-xl text-gray-700 font-caveat font-semibold">
              Every movement starts with a single step outside
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeMove;