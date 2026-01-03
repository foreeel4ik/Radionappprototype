import { Home, Calendar, Trophy, User } from 'lucide-react';

interface BottomNavProps {
  currentScreen: 'home' | 'events' | 'achievements' | 'profile';
  onNavigate: (screen: 'home' | 'events' | 'achievements' | 'profile') => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'events' as const, icon: Calendar, label: 'Events' },
    { id: 'achievements' as const, icon: Trophy, label: 'Achievements' },
    { id: 'profile' as const, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800 z-40">
      <div className="flex items-center justify-around px-4 py-3 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors relative"
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl" />
              )}
              <item.icon
                className={`w-6 h-6 relative z-10 ${
                  isActive ? 'text-blue-400' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs relative z-10 ${
                  isActive ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
