import React, { useEffect, useState } from 'react';
import { Sprout, Handshake, ArrowRight } from 'lucide-react';

const GetInvolved: React.FC = () => {
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

    const element = document.querySelector('[data-section="7"]');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const paths = [
    {
      icon: <Sprout className="w-8 h-8" />,
      title: 'Become a Delegate',
      description: 'Lead the movement on your campus',
      action: 'Plant Seeds',
      color: 'green'
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: 'Partner With Us',
      description: 'Join forces for maximum impact',
      action: 'Collaborate',
      color: 'blue'
    },
    {
      icon: <ArrowRight className="w-8 h-8" />,
      title: 'Join the Movement',
      description: 'Start your journey to freedom',
      action: 'Break Free',
      color: 'yellow'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          card: 'border-green-200 hover:border-green-400 hover:shadow-green-100',
          icon: 'text-green-600 bg-green-50',
          button: 'bg-green-500 hover:bg-green-600'
        };
      case 'blue':
        return {
          card: 'border-blue-200 hover:border-blue-400 hover:shadow-blue-100',
          icon: 'text-blue-600 bg-blue-50',
          button: 'bg-blue-500 hover:bg-blue-600'
        };
      case 'yellow':
        return {
          card: 'border-yellow-200 hover:border-yellow-400 hover:shadow-yellow-100',
          icon: 'text-yellow-600 bg-yellow-50',
          button: 'bg-yellow-500 hover:bg-yellow-600'
        };
      default:
        return {
          card: 'border-gray-200 hover:border-gray-400',
          icon: 'text-gray-600 bg-gray-50',
          button: 'bg-gray-500 hover:bg-gray-600'
        };
    }
  };

  return (
    <section 
      data-section="7" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 via-blue-50 to-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-green-200/30 rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-12 h-12 bg-blue-200/30 rounded-full animate-bounce-slow" />
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-yellow-200/20 rounded-full animate-float-reverse" />
        
        {/* Sun rays */}
        <svg className="absolute top-16 right-16 w-20 h-20 text-yellow-300/30 animate-spin-slow" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" fill="currentColor"/>
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2"/>
        </svg>

        {/* Grass at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-12">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bottom-0 w-4 bg-green-400/40 rounded-t-full animate-sway"
              style={{ 
                left: `${i * 10}%`,
                height: Math.random() * 24 + 12,
                animationDelay: `${i * 300}ms`
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
              TOUCH GRASS
              <br />
              <span className="text-green-600">YOUR WAY</span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
              Choose your path to freedom. Every journey starts with a single step outside.
            </p>
          </div>

          {/* Path Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paths.map((path, index) => {
              const colors = getColorClasses(path.color);
              return (
                <div
                  key={index}
                  className={`group bg-white/90 backdrop-blur-sm p-8 rounded-3xl border-2 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl ${colors.card}`}
                  style={{ 
                    animationDelay: `${index * 300}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
                  }}
                >
                  {/* Icon */}
                  <div className="mb-8 flex justify-center">
                    <div className={`p-6 rounded-2xl group-hover:scale-110 transition-transform duration-300 ${colors.icon}`}>
                      {React.cloneElement(path.icon, { className: 'w-8 h-8' })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black text-gray-900">
                      {path.title}
                    </h3>
                    <p className="text-gray-600 font-medium leading-relaxed">
                      {path.description}
                    </p>
                    
                    {/* CTA Button */}
                    <button className={`w-full ${colors.button} text-white py-3 px-6 font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}>
                      {path.action}
                    </button>
                  </div>

                  {/* Grass effect on hover */}
                  <div className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-3xl">
                    <div className="h-2 bg-gradient-to-r from-green-400/0 via-green-400/60 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="h-1 bg-gradient-to-r from-green-500/0 via-green-500/80 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                  </div>

                  {/* Floating particle on hover */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400/80 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;