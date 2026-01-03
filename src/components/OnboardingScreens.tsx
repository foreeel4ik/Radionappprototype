import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, Zap, Wallet } from 'lucide-react';

interface OnboardingScreensProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Monitor,
    title: 'Book PCs in PC Clubs',
    description: 'Find and reserve gaming PCs at the best clubs near you',
  },
  {
    icon: Zap,
    title: 'Play More, Earn More',
    description: 'Gain XP and unlock exclusive bonuses as you play',
  },
  {
    icon: Wallet,
    title: 'One Balance Everywhere',
    description: 'Use your Radion balance across all partner PC clubs',
  },
];

export function OnboardingScreens({ onComplete }: OnboardingScreensProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Skip button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleSkip}
          className="text-gray-400 hover:text-white transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-md"
          >
            {/* Icon with glow */}
            <motion.div
              className="mb-12 flex justify-center"
              animate={{
                filter: [
                  'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
                  'drop-shadow(0 0 40px rgba(59, 130, 246, 0.8))',
                  'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {(() => {
                const IconComponent = slides[currentSlide].icon;
                return <IconComponent className="w-24 h-24 text-blue-500" />;
              })()}
            </motion.div>

            <h2 className="text-3xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-400 text-lg">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom section */}
      <div className="p-8 space-y-6">
        {/* Dots indicator */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-blue-500'
                  : 'w-2 bg-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/50"
        >
          {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
        </button>
      </div>
    </div>
  );
}