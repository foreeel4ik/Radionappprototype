import { motion } from 'motion/react';
import { Calendar, Zap, Trophy, Clock, Users, Gift } from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface EventsScreenProps {
  navigateTo: (screen: Screen) => void;
}

const activeEvents = [
  {
    id: 1,
    title: 'Double XP Weekend',
    description: 'Earn 2x XP on all sessions',
    startTime: '2026-01-03 00:00',
    endTime: '2026-01-05 23:59',
    type: 'xp',
    reward: '2x XP',
    participants: 1243,
  },
  {
    id: 2,
    title: 'Night Owl Tournament',
    description: 'CS2 tournament - midnight sessions',
    startTime: '2026-01-04 22:00',
    endTime: '2026-01-05 04:00',
    type: 'tournament',
    reward: '$500 prize pool',
    participants: 64,
  },
  {
    id: 3,
    title: 'New Player Bonus',
    description: 'First booking gets 50% off',
    startTime: '2026-01-01 00:00',
    endTime: '2026-01-31 23:59',
    type: 'discount',
    reward: '50% off',
    participants: 892,
  },
];

const upcomingEvents = [
  {
    id: 4,
    title: 'Happy Hour',
    description: 'Premium PCs at standard price',
    startTime: '2026-01-06 14:00',
    endTime: '2026-01-06 18:00',
    type: 'discount',
    reward: 'Free upgrade',
  },
  {
    id: 5,
    title: 'Loyalty Streak Challenge',
    description: 'Book 7 days in a row for bonus',
    startTime: '2026-01-10 00:00',
    endTime: '2026-01-17 23:59',
    type: 'challenge',
    reward: '$25 bonus',
  },
];

const eventTypeColors = {
  xp: 'from-yellow-600 to-orange-600',
  tournament: 'from-purple-600 to-pink-600',
  discount: 'from-green-600 to-emerald-600',
  challenge: 'from-blue-600 to-cyan-600',
};

const eventTypeIcons = {
  xp: Zap,
  tournament: Trophy,
  discount: Gift,
  challenge: Users,
};

export function EventsScreen({ navigateTo }: EventsScreenProps) {
  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-3xl mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Events & Bonuses
        </h1>
        <p className="text-gray-400">Participate and earn rewards</p>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6">
        {/* Active Events */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h2 className="text-xl">Active Now</h2>
          </div>
          
          <div className="space-y-3">
            {activeEvents.map((event, index) => {
              const IconComponent = eventTypeIcons[event.type as keyof typeof eventTypeIcons];
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm"
                >
                  {/* Gradient background */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${eventTypeColors[event.type as keyof typeof eventTypeColors]} opacity-10 blur-3xl`} />
                  
                  <div className="relative p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${eventTypeColors[event.type as keyof typeof eventTypeColors]} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-400 mb-3">
                          {event.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>Ends {new Date(event.endTime).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-blue-400">
                            <Users className="w-4 h-4" />
                            <span>{event.participants}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <div className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${eventTypeColors[event.type as keyof typeof eventTypeColors]}`}>
                          {event.reward}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-xl mb-4">Coming Soon</h2>
          
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => {
              const IconComponent = eventTypeIcons[event.type as keyof typeof eventTypeIcons];
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (activeEvents.length + index) * 0.1 }}
                  className="p-4 rounded-2xl border border-gray-800 bg-gray-900/30 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-gray-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Starts {new Date(event.startTime).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <div className="px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-400">
                        {event.reward}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* My Active Bonuses */}
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-2xl p-4">
          <h3 className="mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            My Active Bonuses
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Double XP Weekend</span>
              <span className="text-sm text-blue-400">Active</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">5-session streak bonus</span>
              <span className="text-sm text-green-400">+10% XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        currentScreen="events" 
        onNavigate={(screen) => navigateTo(screen as Screen)} 
      />
    </div>
  );
}
