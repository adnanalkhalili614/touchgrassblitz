import React, { useState } from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  onClick, 
  className = "bg-grass-500 hover:bg-sky-400 text-white px-8 py-3 font-inter font-bold"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl
        ${className}
      `}
    >
      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>

      {/* Grass Animation */}
      <div className={`absolute bottom-0 left-0 right-0 h-2 transition-all duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex justify-center space-x-1 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="w-0.5 bg-grass-400 rounded-t-full animate-sprout"
              style={{ 
                height: Math.random() * 6 + 3,
                animationDelay: `${i * 50}ms`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className={`absolute inset-0 bg-white/10 rounded-full transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
      
      {/* Sunlight particle effect on click */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className={`absolute inset-0 bg-sunlight-400/20 rounded-full transform scale-0 transition-transform duration-300 ${
          isHovered ? 'animate-ping' : ''
        }`} />
      </div>
    </button>
  );
};

export default AnimatedButton;