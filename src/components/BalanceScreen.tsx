import { motion } from 'motion/react';
import { ArrowLeft, Plus, ArrowDownLeft, ArrowUpRight, MapPin } from 'lucide-react';
import type { Screen } from '../App';
import { Modal } from './Modal';
import { useState } from 'react';

interface BalanceScreenProps {
  navigateTo: (screen: Screen) => void;
}

interface Transaction {
  id: number;
  type: 'spend' | 'topup' | 'reward';
  club?: string;
  amount: number;
  date: string;
  time: string;
  reason?: string;
  pcNumber?: number;
  duration?: number;
}

const topUpAmounts = [10, 25, 50, 100];

const transactions: Transaction[] = [
  { id: 1, type: 'spend', club: 'CyberArena Pro', amount: 15, date: '2026-01-01', time: '14:30', pcNumber: 7, duration: 3 },
  { id: 2, type: 'topup', amount: 50, date: '2025-12-30', time: '10:15' },
  { id: 3, type: 'spend', club: 'NeonGaming Hub', amount: 18, date: '2025-12-28', time: '16:45', pcNumber: 3, duration: 3 },
  { id: 4, type: 'reward', amount: 5, date: '2025-12-28', time: '16:45', reason: 'Level Up Bonus' },
  { id: 5, type: 'spend', club: 'GameZone Elite', amount: 9, date: '2025-12-25', time: '12:00', pcNumber: 12, duration: 2 },
];

const partnerClubs = [
  { id: 1, name: 'CyberArena Pro', logo: '🎮' },
  { id: 2, name: 'NeonGaming Hub', logo: '⚡' },
  { id: 3, name: 'GameZone Elite', logo: '🎯' },
  { id: 4, name: 'PixelPalace', logo: '🎨' },
];

export function BalanceScreen({ navigateTo }: BalanceScreenProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-800">
        <button
          onClick={() => navigateTo('home')}
          className="p-2 -ml-2 hover:bg-gray-900 rounded-lg transition-colors mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl">Radion Balance</h1>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Balance card */}
        <motion.div
          className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="text-sm opacity-90 mb-2">Available Balance</div>
            <div className="text-4xl mb-4">$125.00</div>
            <div className="text-sm opacity-75">Valid at all partner PC clubs</div>
          </div>
        </motion.div>

        {/* Balance Info */}
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-xl p-4">
          <h3 className="mb-2 flex items-center gap-2">
            <span>💡</span>
            <span>How it works</span>
          </h3>
          <p className="text-sm text-gray-400">
            Top up your Radion balance once and use it at any partner PC club. 
            No need to carry cash or pay at each location separately.
          </p>
        </div>

        {/* Top up section */}
        <div>
          <h2 className="text-lg mb-4">Quick Top Up</h2>
          <div className="grid grid-cols-4 gap-3 mb-3">
            {topUpAmounts.map((amount) => (
              <button
                key={amount}
                className="py-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-blue-500 transition-all backdrop-blur-sm"
              >
                <div className="text-lg">${amount}</div>
              </button>
            ))}
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Custom Amount</span>
          </button>
        </div>

        {/* Partner clubs */}
        <div>
          <h2 className="text-lg mb-4">Use Your Balance At</h2>
          <div className="grid grid-cols-2 gap-3">
            {partnerClubs.map((club) => (
              <div
                key={club.id}
                className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-xl">
                    {club.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{club.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction history */}
        <div>
          <h2 className="text-lg mb-4">Transaction History</h2>
          <div className="space-y-2">
            {transactions.map((transaction, index) => (
              <motion.button
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedTransaction(transaction)}
                className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm hover:border-gray-700 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'spend'
                        ? 'bg-red-900/30'
                        : transaction.type === 'topup'
                        ? 'bg-green-900/30'
                        : 'bg-blue-900/30'
                    }`}
                  >
                    {transaction.type === 'spend' ? (
                      <ArrowUpRight className="w-5 h-5 text-red-400" />
                    ) : transaction.type === 'topup' ? (
                      <ArrowDownLeft className="w-5 h-5 text-green-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span>
                        {transaction.type === 'spend'
                          ? transaction.club
                          : transaction.type === 'topup'
                          ? 'Top Up'
                          : transaction.reason}
                      </span>
                      <span
                        className={
                          transaction.type === 'spend'
                            ? 'text-red-400'
                            : 'text-green-400'
                        }
                      >
                        {transaction.type === 'spend' ? '-' : '+'}${transaction.amount}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {transaction.date} at {transaction.time}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      <Modal
        isOpen={selectedTransaction !== null}
        onClose={() => setSelectedTransaction(null)}
        title="Transaction Details"
      >
        {selectedTransaction && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  selectedTransaction.type === 'spend'
                    ? 'bg-red-900/30'
                    : selectedTransaction.type === 'topup'
                    ? 'bg-green-900/30'
                    : 'bg-blue-900/30'
                }`}
              >
                {selectedTransaction.type === 'spend' ? (
                  <ArrowUpRight className="w-8 h-8 text-red-400" />
                ) : selectedTransaction.type === 'topup' ? (
                  <ArrowDownLeft className="w-8 h-8 text-green-400" />
                ) : (
                  <Plus className="w-8 h-8 text-blue-400" />
                )}
              </div>
              <div
                className={`text-3xl mb-2 ${
                  selectedTransaction.type === 'spend' ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {selectedTransaction.type === 'spend' ? '-' : '+'}${selectedTransaction.amount}
              </div>
              <div className="text-gray-400">
                {selectedTransaction.type === 'spend'
                  ? 'Session Payment'
                  : selectedTransaction.type === 'topup'
                  ? 'Balance Top Up'
                  : 'Reward'}
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 space-y-3 border border-gray-700">
              {selectedTransaction.club && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Club</span>
                  <span>{selectedTransaction.club}</span>
                </div>
              )}
              {selectedTransaction.pcNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-400">PC</span>
                  <span>#{selectedTransaction.pcNumber}</span>
                </div>
              )}
              {selectedTransaction.duration && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span>{selectedTransaction.duration}h</span>
                </div>
              )}
              {selectedTransaction.reason && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Reason</span>
                  <span>{selectedTransaction.reason}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-gray-700">
                <span className="text-gray-400">Date</span>
                <span>{selectedTransaction.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Time</span>
                <span>{selectedTransaction.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Transaction ID</span>
                <span className="text-xs text-gray-500">TXN{selectedTransaction.id}2026</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}