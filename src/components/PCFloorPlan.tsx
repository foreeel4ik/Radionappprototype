import { motion } from 'motion/react';
import { Monitor } from 'lucide-react';

export interface PC {
  id: number;
  row: number;
  position: number;
  status: 'available' | 'occupied' | 'selected';
  type: 'standard' | 'pro' | 'vip';
  specs: string;
}

interface PCFloorPlanProps {
  pcs: PC[];
  onSelectPC: (pcId: number) => void;
  selectedPC: number | null;
}

const pcTypeColors = {
  standard: 'border-gray-700',
  pro: 'border-blue-700',
  vip: 'border-purple-700',
};

export function PCFloorPlan({ pcs, onSelectPC, selectedPC }: PCFloorPlanProps) {
  // Group PCs by row
  const rows = pcs.reduce((acc, pc) => {
    if (!acc[pc.row]) acc[pc.row] = [];
    acc[pc.row].push(pc);
    return acc;
  }, {} as Record<number, PC[]>);

  return (
    <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 overflow-x-auto">
      <div className="min-w-max space-y-8">
        {Object.entries(rows)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([rowNum, rowPCs]) => (
            <div key={rowNum} className="space-y-2">
              <div className="text-xs text-gray-500 pl-2">Row {rowNum}</div>
              <div className="flex gap-4">
                {rowPCs
                  .sort((a, b) => a.position - b.position)
                  .map((pc) => {
                    const isSelected = selectedPC === pc.id;
                    const isAvailable = pc.status === 'available';
                    const isOccupied = pc.status === 'occupied';

                    return (
                      <motion.button
                        key={pc.id}
                        onClick={() => isAvailable && onSelectPC(pc.id)}
                        disabled={isOccupied}
                        whileHover={isAvailable ? { scale: 1.05 } : {}}
                        whileTap={isAvailable ? { scale: 0.95 } : {}}
                        className={`relative w-16 h-20 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-blue-500 shadow-lg shadow-blue-500/50'
                            : isOccupied
                            ? 'bg-red-900/20 border-red-900/50 cursor-not-allowed opacity-50'
                            : `bg-gray-900/50 ${pcTypeColors[pc.type]} hover:border-gray-600 cursor-pointer`
                        }`}
                      >
                        {/* Monitor representation */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2">
                          <div className={`w-10 h-6 rounded border ${
                            isSelected
                              ? 'border-blue-400 bg-blue-500/20'
                              : isOccupied
                              ? 'border-red-700 bg-red-900/20'
                              : 'border-gray-700 bg-gray-800'
                          }`}>
                            <Monitor className={`w-3 h-3 mx-auto mt-1 ${
                              isSelected
                                ? 'text-blue-400'
                                : isOccupied
                                ? 'text-red-500'
                                : 'text-gray-600'
                            }`} />
                          </div>
                        </div>

                        {/* Desk */}
                        <div className={`absolute bottom-2 left-1 right-1 h-8 rounded border ${
                          isSelected
                            ? 'border-blue-400 bg-blue-500/10'
                            : isOccupied
                            ? 'border-red-700 bg-red-900/10'
                            : 'border-gray-700 bg-gray-800'
                        }`} />

                        {/* PC number */}
                        <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 text-xs ${
                          isSelected
                            ? 'text-blue-400'
                            : isOccupied
                            ? 'text-red-400'
                            : 'text-gray-500'
                        }`}>
                          #{pc.id}
                        </div>

                        {/* VIP/Pro badge */}
                        {pc.type !== 'standard' && !isOccupied && (
                          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${
                            pc.type === 'vip'
                              ? 'bg-purple-600 text-white'
                              : 'bg-blue-600 text-white'
                          }`}>
                            {pc.type === 'vip' ? 'V' : 'P'}
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
              </div>
            </div>
          ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-800 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-800 border border-gray-700 rounded" />
          <span className="text-gray-400">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-900/20 border border-red-900/50 rounded" />
          <span className="text-gray-400">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-blue-500 rounded" />
          <span className="text-gray-400">Selected</span>
        </div>
      </div>
    </div>
  );
}
