import { motion } from 'motion/react';
import { MapPin, Star, Monitor, Plus, User, Trophy, Wallet, Zap } from 'lucide-react';
import type { Screen, Club } from '../App';
import { BottomNav } from './BottomNav';

interface HomeScreenProps {
  navigateTo: (screen: Screen, club?: Club) => void;
}

const clubs: Club[] = [
  {
    id: 1,
    name: 'CyberArena Pro',
    rating: 4.8,
    availablePCs: 12,
    totalPCs: 20,
    distance: '0.5 km',
    image: 'https://images.unsplash.com/photo-1617507171089-6cb9aa5add36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwYyUyMHNldHVwJTIwbmVvbnxlbnwxfHx8fDE3NjczNjYwODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hourlyRate: 5,
    address: '123 Gaming Street',
    hasEvent: true,
  },
  {
    id: 2,
    name: 'NeonGaming Hub',
    rating: 4.9,
    availablePCs: 8,
    totalPCs: 15,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1726442116417-de02f3116eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwcm9vbXxlbnwxfHx8fDE3NjczNjYwODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hourlyRate: 6,
    address: '456 Cyber Avenue',
    hasEvent: false,
  },
  {
    id: 3,
    name: 'GameZone Elite',
    rating: 4.7,
    availablePCs: 5,
    totalPCs: 25,
    distance: '2.0 km',
    image: 'https://images.unsplash.com/photo-1758410473607-e78a23fd6e57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlciUyMGNhZmUlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjczNjYwODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hourlyRate: 4.5,
    address: '789 Digital Boulevard',
    hasEvent: false,
  },
];

export function HomeScreen({ navigateTo }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              RADION
            </h1>
            <p className="text-gray-400 mt-1">Find your gaming spot</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigateTo('balance')}
              className="p-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-blue-500 transition-colors backdrop-blur-sm"
            >
              <Wallet className="w-5 h-5 text-blue-400" />
            </button>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>Nearby PC Clubs</span>
        </div>
      </div>

      {/* Active Bonus Banner */}
      <div className="px-6 mb-6">
        <motion.div
          className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/50 rounded-xl p-4 backdrop-blur-sm"
          animate={{
            boxShadow: [
              '0 0 20px rgba(234, 179, 8, 0.2)',
              '0 0 30px rgba(234, 179, 8, 0.4)',
              '0 0 20px rgba(234, 179, 8, 0.2)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-yellow-400" />
            <div className="flex-1">
              <div className="text-sm mb-1">Double XP Weekend Active!</div>
              <div className="text-xs text-gray-400">Earn 2x XP on all sessions</div>
            </div>
            <button
              onClick={() => navigateTo('events')}
              className="text-sm text-yellow-400 hover:text-yellow-300"
            >
              View
            </button>
          </div>
        </motion.div>
      </div>

      {/* Clubs list */}
      <div className="px-6 space-y-4">
        {clubs.map((club, index) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigateTo('club', club)}
            className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-blue-500 transition-all cursor-pointer relative"
          >
            {/* Event badge */}
            {club.hasEvent && (
              <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                <span>Event</span>
              </div>
            )}
            
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={club.image}
                alt={club.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              
              {/* Distance badge */}
              <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-sm">
                <MapPin className="w-3 h-3 inline mr-1" />
                {club.distance}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg mb-1">{club.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{club.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-blue-400">${club.hourlyRate}/hr</div>
                </div>
              </div>

              {/* Available PCs */}
              <div className="flex items-center gap-2 text-sm">
                <Monitor className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">
                  {club.availablePCs} of {club.totalPCs} PCs available
                </span>
                <div className="flex-1 bg-gray-800 rounded-full h-2 ml-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                    style={{ width: `${(club.availablePCs / club.totalPCs) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        currentScreen="home" 
        onNavigate={(screen) => navigateTo(screen as Screen)} 
      />
    </div>
  );
}