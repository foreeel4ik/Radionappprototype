import { motion } from 'motion/react';
import { ArrowLeft, Lock, Star, Zap, Trophy, Wallet } from 'lucide-react';
import type { Screen } from '../App';
import { BottomNav } from './BottomNav';
import { Modal } from './Modal';
import { useState } from 'react';

interface AchievementsScreenProps {
  navigateTo: (screen: Screen) => void;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'secret';
  unlocked: boolean;
  xp: number;
  radionReward?: number;
  unlockedDate?: string;
  progress?: { current: number; total: number };
}

const achievements: Achievement[] = [
  // Common
  { id: 1, name: 'First Timer', description: 'Book your first PC session', icon: '🎮', rarity: 'common', unlocked: true, xp: 50, radionReward: 5, unlockedDate: '2026-01-01' },
  { id: 2, name: 'Early Bird', description: 'Book a session before 10 AM', icon: '🌅', rarity: 'common', unlocked: true, xp: 50, radionReward: 3, unlockedDate: '2026-01-02' },
  { id: 3, name: 'Night Owl', description: 'Play after midnight', icon: '🦉', rarity: 'common', unlocked: true, xp: 50, unlockedDate: '2025-12-28' },
  { id: 4, name: 'Marathon Gamer', description: 'Play for 5 hours straight', icon: '⏰', rarity: 'common', unlocked: false, xp: 50, radionReward: 5, progress: { current: 3, total: 5 } },
  { id: 5, name: 'Social Butterfly', description: 'Visit 3 different PC clubs', icon: '🦋', rarity: 'common', unlocked: false, xp: 50, progress: { current: 2, total: 3 } },
  
  // Rare
  { id: 6, name: 'Speed Demon', description: 'Book 10 sessions in a month', icon: '⚡', rarity: 'rare', unlocked: true, xp: 150, radionReward: 15, unlockedDate: '2025-12-30' },
  { id: 7, name: 'Club Hopper', description: 'Visit all partner clubs', icon: '🎯', rarity: 'rare', unlocked: false, xp: 150, radionReward: 20, progress: { current: 2, total: 5 } },
  { id: 8, name: 'Loyalty Master', description: 'Book 50 total sessions', icon: '💎', rarity: 'rare', unlocked: false, xp: 150, radionReward: 25, progress: { current: 28, total: 50 } },
  { id: 9, name: 'Weekend Warrior', description: 'Play every weekend for a month', icon: '⚔️', rarity: 'rare', unlocked: false, xp: 150, radionReward: 15 },
  
  // Secret
  { id: 10, name: '???', description: 'Secret achievement', icon: '❓', rarity: 'secret', unlocked: false, xp: 300, radionReward: 50 },
  { id: 11, name: '???', description: 'Secret achievement', icon: '❓', rarity: 'secret', unlocked: false, xp: 300, radionReward: 50 },
  { id: 12, name: 'Legendary Gamer', description: 'Reach level 50', icon: '👑', rarity: 'secret', unlocked: false, xp: 500, radionReward: 100, progress: { current: 12, total: 50 } },
];

const rarityColors = {
  common: 'border-gray-800 bg-gray-900/50',
  rare: 'border-purple-500/50 bg-purple-900/20',
  secret: 'border-yellow-500/50 bg-yellow-900/20',
};

const rarityBadges = {
  common: 'bg-gray-700 text-gray-300',
  rare: 'bg-purple-600 text-white',
  secret: 'bg-yellow-600 text-black',
};

export function AchievementsScreen({ navigateTo }: AchievementsScreenProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const totalAchievements = achievements.length;
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progress = (unlockedCount / totalAchievements) * 100;

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-3xl mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Achievements
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Trophy className="w-4 h-4" />
          <span>{unlockedCount} of {totalAchievements} unlocked</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6">
        {/* Progress card */}
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <span>Overall Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg whitespace-nowrap">
            All
          </button>
          <button className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors whitespace-nowrap">
            Common
          </button>
          <button className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors whitespace-nowrap">
            Rare
          </button>
          <button className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors whitespace-nowrap">
            Secret
          </button>
        </div>

        {/* Achievements grid */}
        <div className="grid grid-cols-1 gap-3">
          {achievements.map((achievement, index) => (
            <motion.button
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedAchievement(achievement)}
              className={`p-4 rounded-xl border backdrop-blur-sm relative text-left ${
                rarityColors[achievement.rarity]
              } ${!achievement.unlocked && 'opacity-60'}`}
            >
              {!achievement.unlocked && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-5 h-5 text-gray-600" />
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 ${
                  !achievement.unlocked && achievement.rarity === 'secret' ? 'blur-sm' : ''
                }`}>
                  {achievement.unlocked || achievement.rarity !== 'secret' ? achievement.icon : '🔒'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="truncate">{achievement.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${rarityBadges[achievement.rarity]}`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    {achievement.unlocked || achievement.rarity !== 'secret' 
                      ? achievement.description 
                      : 'Complete hidden requirements to unlock'}
                  </p>
                  
                  {/* Progress bar for locked achievements */}
                  {!achievement.unlocked && achievement.progress && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress.current} / {achievement.progress.total}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${(achievement.progress.current / achievement.progress.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400">+{achievement.xp} XP</span>
                    {achievement.radionReward && (
                      <>
                        <span className="text-gray-600">•</span>
                        <Wallet className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400">+${achievement.radionReward}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {achievement.unlocked && (
                <motion.div
                  className="absolute top-2 right-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Achievement Detail Modal */}
      <Modal
        isOpen={selectedAchievement !== null}
        onClose={() => setSelectedAchievement(null)}
      >
        {selectedAchievement && (
          <div className="text-center space-y-6">
            {/* Large icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className={`w-32 h-32 mx-auto bg-gray-800 rounded-2xl flex items-center justify-center text-6xl ${
                !selectedAchievement.unlocked && selectedAchievement.rarity === 'secret' ? 'blur-md' : ''
              }`}
            >
              {selectedAchievement.unlocked || selectedAchievement.rarity !== 'secret' 
                ? selectedAchievement.icon 
                : '🔒'}
            </motion.div>

            {/* Achievement name */}
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h2 className="text-2xl">{selectedAchievement.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${rarityBadges[selectedAchievement.rarity]}`}>
                  {selectedAchievement.rarity}
                </span>
              </div>
              <p className="text-gray-400">
                {selectedAchievement.unlocked || selectedAchievement.rarity !== 'secret'
                  ? selectedAchievement.description
                  : 'Complete hidden requirements to unlock this achievement'}
              </p>
            </div>

            {/* Progress */}
            {!selectedAchievement.unlocked && selectedAchievement.progress && (
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span>{selectedAchievement.progress.current} / {selectedAchievement.progress.total}</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${(selectedAchievement.progress.current / selectedAchievement.progress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Rewards */}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-3">Rewards</div>
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <div>
                    <div className="text-2xl text-yellow-400">+{selectedAchievement.xp}</div>
                    <div className="text-xs text-gray-400">XP</div>
                  </div>
                </div>
                {selectedAchievement.radionReward && (
                  <div className="flex items-center gap-2">
                    <Wallet className="w-6 h-6 text-blue-400" />
                    <div>
                      <div className="text-2xl text-blue-400">+${selectedAchievement.radionReward}</div>
                      <div className="text-xs text-gray-400">Radion</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Unlock date */}
            {selectedAchievement.unlocked && selectedAchievement.unlockedDate && (
              <div className="text-sm text-gray-500">
                Unlocked on {new Date(selectedAchievement.unlockedDate).toLocaleDateString()}
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Bottom Navigation */}
      <BottomNav 
        currentScreen="achievements" 
        onNavigate={(screen) => navigateTo(screen as Screen)} 
      />
    </div>
  );
}