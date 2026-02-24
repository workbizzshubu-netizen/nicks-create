'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StickyFrostedGlassProps {
  children: React.ReactNode;
  className?: string;
}

const StickyFrostedGlass: React.FC<StickyFrostedGlassProps> = ({
  children,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show after scrolling 200px
      const showThreshold = 200;
      // Only hide if we are at the very bottom of a long page
      const hideThreshold = documentHeight > windowHeight + 500 ? documentHeight - windowHeight - 100 : Infinity;

      if (scrollPosition > showThreshold && scrollPosition < hideThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`fixed bottom-0 left-0 right-0 z-[100] h-40 md:h-56 pointer-events-none flex flex-col justify-end ${className}`}
        >
          {/* 
            Premium Frosted Reveal Layer 
            Using a multi-layered approach for the ultimate glass effect
          */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              backdropFilter: 'blur(32px) saturate(180%)',
              WebkitBackdropFilter: 'blur(32px) saturate(180%)',
              background: 'linear-gradient(to top, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
              maskImage: 'linear-gradient(to top, black 40%, rgba(0,0,0,0.8) 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 40%, rgba(0,0,0,0.8) 60%, transparent 100%)',
            }}
          />

          {/* Dark Mode Enhancer */}
          <div className="absolute inset-0 hidden dark:block pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />

          {/* Glowing Top Edge - matching the "light leak" in the reference */}
          <div
            className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50"
            style={{ filter: 'blur(0.5px)' }}
          />

          {/* Content Wrapper */}
          <div className="relative z-20 pb-8 md:pb-12 pointer-events-auto">
            <div className="max-w-6xl mx-auto px-6">
              {children}
            </div>
          </div>

          {/* Base height for stability */}
          <div className="w-full h-4" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyFrostedGlass;