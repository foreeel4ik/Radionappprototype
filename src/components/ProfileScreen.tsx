import { motion } from 'motion/react';
import { Zap, Award, Calendar, Flame, TrendingUp, Star } from 'lucide-react';
import type { Screen } from '../App';
import { BottomNav } from './BottomNav';

interface ProfileScreenProps {
  navigateTo: (screen: Screen) => void;
}

const ranks = [
  { name: 'Bronze', min: 0, max: 10, color: 'from-orange-700 to-orange-900' },
  { name: 'Silver', min: 10, max: 20, color: 'from-gray-400 to-gray-600' },
  { name: 'Gold', min: 20, max: 35, color: 'from-yellow-400 to-yellow-600' },
  { name: 'Neon', min: 35, max: 50, color: 'from-blue-400 to-purple-500' },
  { name: 'Void', min: 50, max: Infinity, color: 'from-purple-600 to-black' },
];

const weeklyStats = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 3 },
  { day: 'Wed', hours: 0 },
  { day: 'Thu', hours: 4 },
  { day: 'Fri', hours: 5 },
  { day: 'Sat', hours: 0 },
  { day: 'Sun', hours: 0 },
];

const recentAchievements = [
  { id: 1, name: 'First Timer', icon: '🎮', rarity: 'common' },
  { id: 2, name: 'Speed Demon', icon: '⚡', rarity: 'rare' },
  { id: 3, name: 'Night Owl', icon: '🦉', rarity: 'common' },
];

export function ProfileScreen({ navigateTo }: ProfileScreenProps) {
  const level = 12;
  const currentXP = 2450;
  const nextLevelXP = 3000;
  const xpProgress = (currentXP / nextLevelXP) * 100;
  
  const currentRank = ranks.find(r => level >= r.min && level < r.max) || ranks[0];
  const nextRank = ranks.find(r => r.min > level);
  
  const playStreak = 5;
  const reputationScore = 4.8;
  const totalSessions = 47;
  const totalHours = 142;

  const maxWeeklyHours = Math.max(...weeklyStats.map(s => s.hours));

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-3xl mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Profile
        </h1>
      </div>

      {/* Profile content */}
      <div className="px-6 space-y-6">
        {/* Avatar & User info */}
        <div className="text-center relative">
          {/* Rank badge background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentRank.color} opacity-5 rounded-2xl blur-3xl`} />
          
          <motion.div
            className="relative inline-block mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`w-24 h-24 bg-gradient-to-br ${currentRank.color} rounded-full flex items-center justify-center text-3xl border-4 border-gray-900`}>
              👤
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center border-2 border-black">
              <span className="text-sm">{level}</span>
            </div>
          </motion.div>
          <h2 className="text-xl mb-1">CyberGamer</h2>
          <p className="text-gray-400 mb-2">@cybergamer_pro</p>
          
          {/* Rank */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${currentRank.color}`}>
            <Star className="w-4 h-4" />
            <span>{currentRank.name} Rank</span>
          </div>
        </div>

        {/* XP Progress */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Level {level}</span>
            </div>
            <span className="text-sm text-gray-400">
              {currentXP} / {nextLevelXP} XP
            </span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-400">
              {nextLevelXP - currentXP} XP to level {level + 1}
            </p>
            {nextRank && (
              <p className="text-xs text-blue-400">
                {nextRank.min - level} levels to {nextRank.name}
              </p>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-gray-400">Play Streak</span>
            </div>
            <div className="text-2xl text-orange-400">{playStreak} days</div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-400">Reputation</span>
            </div>
            <div className="text-2xl text-yellow-400">{reputationScore}</div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Sessions</span>
            </div>
            <div className="text-2xl text-blue-400">{totalSessions}</div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">Total Hours</span>
            </div>
            <div className="text-2xl text-purple-400">{totalHours}h</div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div>
          <h3 className="mb-4">Weekly Activity</h3>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-end justify-between gap-2 h-32">
              {weeklyStats.map((stat) => (
                <div key={stat.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex-1 w-full flex items-end">
                    <div
                      className={`w-full rounded-t transition-all ${
                        stat.hours > 0
                          ? 'bg-gradient-to-t from-blue-500 to-purple-500'
                          : 'bg-gray-800'
                      }`}
                      style={{ height: `${(stat.hours / maxWeeklyHours) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400">{stat.day}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-400 text-center">
              14 hours this week
            </div>
          </div>
        </div>

        {/* Radion Balance */}
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400 mb-1">Radion Balance</div>
              <div className="text-2xl">$125.00</div>
            </div>
            <button
              onClick={() => navigateTo('balance')}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all"
            >
              Top Up
            </button>
          </div>
        </div>

        {/* Recent Achievements */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3>Recent Achievements</h3>
            <button
              onClick={() => navigateTo('achievements')}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="space-y-2">
            {recentAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border backdrop-blur-sm ${
                  achievement.rarity === 'rare'
                    ? 'bg-purple-900/20 border-purple-500/50'
                    : 'bg-gray-900/50 border-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span>{achievement.name}</span>
                      {achievement.rarity === 'rare' && (
                        <Star className="w-4 h-4 text-purple-400 fill-current" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400 capitalize">
                      {achievement.rarity}
                    </div>
                  </div>
                  <Award className="w-5 h-5 text-gray-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievement Progress Bars */}
        <div>
          <h3 className="mb-4">Progress to Next Achievements</h3>
          <div className="space-y-3">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Marathon Gamer</span>
                <span className="text-xs text-gray-400">3/5 hours</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: '60%' }} />
              </div>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Social Butterfly</span>
                <span className="text-xs text-gray-400">2/3 clubs</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: '66%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3 pt-4">
          <button className="w-full py-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gray-700 transition-all backdrop-blur-sm">
            Edit Profile
          </button>
          <button className="w-full py-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gray-700 transition-all backdrop-blur-sm">
            Settings
          </button>
          <button className="w-full py-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gray-700 transition-all backdrop-blur-sm text-red-400">
            Sign Out
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        currentScreen="profile" 
        onNavigate={(screen) => navigateTo(screen as Screen)} 
      />
    </div>
  );
}
