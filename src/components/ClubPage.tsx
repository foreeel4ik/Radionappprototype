import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, MapPin, Clock, Cpu, MonitorCheck, Wifi, Zap } from 'lucide-react';
import type { Screen, Club } from '../App';
import { PCFloorPlan, PC } from './PCFloorPlan';
import { BottomSheet } from './Modal';

interface ClubPageProps {
  club: Club;
  navigateTo: (screen: Screen, club?: Club) => void;
}

const pcs: PC[] = [
  // Row 1
  { id: 1, row: 1, position: 1, status: 'available', type: 'standard', specs: 'RTX 4070 • i7-13700K' },
  { id: 2, row: 1, position: 2, status: 'occupied', type: 'standard', specs: 'RTX 4070 • i7-13700K' },
  { id: 3, row: 1, position: 3, status: 'available', type: 'pro', specs: 'RTX 4080 • i9-13900K' },
  { id: 4, row: 1, position: 4, status: 'available', type: 'pro', specs: 'RTX 4080 • i9-13900K' },
  // Row 2
  { id: 5, row: 2, position: 1, status: 'available', type: 'standard', specs: 'RTX 4070 • i7-13700K' },
  { id: 6, row: 2, position: 2, status: 'available', type: 'standard', specs: 'RTX 4070 • i7-13700K' },
  { id: 7, row: 2, position: 3, status: 'occupied', type: 'pro', specs: 'RTX 4080 • i9-13900K' },
  { id: 8, row: 2, position: 4, status: 'available', type: 'pro', specs: 'RTX 4080 • i9-13900K' },
  // Row 3
  { id: 9, row: 3, position: 1, status: 'available', type: 'vip', specs: 'RTX 4090 • i9-14900K' },
  { id: 10, row: 3, position: 2, status: 'available', type: 'vip', specs: 'RTX 4090 • i9-14900K' },
  { id: 11, row: 3, position: 3, status: 'available', type: 'vip', specs: 'RTX 4090 • i9-14900K' },
  { id: 12, row: 3, position: 4, status: 'occupied', type: 'vip', specs: 'RTX 4090 • i9-14900K' },
];

const pcZones = [
  { type: 'Standard', price: 4.5, specs: 'RTX 4070 • i7-13700K • 144Hz', color: 'gray' },
  { type: 'Pro', price: 6, specs: 'RTX 4080 • i9-13900K • 240Hz', color: 'blue' },
  { type: 'VIP', price: 8, specs: 'RTX 4090 • i9-14900K • 360Hz', color: 'purple' },
];

const timeSlots = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
];

const peakHours = [
  { hour: '10:00', load: 20 },
  { hour: '12:00', load: 45 },
  { hour: '14:00', load: 70 },
  { hour: '16:00', load: 85 },
  { hour: '18:00', load: 95 },
  { hour: '20:00', load: 90 },
  { hour: '22:00', load: 65 },
  { hour: '00:00', load: 30 },
];

export function ClubPage({ club, navigateTo }: ClubPageProps) {
  const [selectedPC, setSelectedPC] = useState<number | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(3);

  const handlePCSelect = (pcId: number) => {
    setSelectedPC(pcId);
    setIsBookingOpen(true);
  };

  const handleBooking = () => {
    setIsBookingOpen(false);
    // Navigate to confirmation or back to home
    navigateTo('home');
  };

  const selectedPCData = pcs.find(pc => pc.id === selectedPC);
  const pcZone = pcZones.find(zone => zone.type.toLowerCase() === selectedPCData?.type);

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header image */}
      <div className="relative h-64">
        <img
          src={club.image}
          alt={club.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Back button */}
        <button
          onClick={() => navigateTo('home')}
          className="absolute top-6 left-6 p-3 bg-black/70 backdrop-blur-sm rounded-xl"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Club name */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl mb-2">{club.name}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span>{club.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{club.distance}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* PC Zones */}
        <div>
          <h2 className="text-xl mb-4">PC Zones</h2>
          <div className="space-y-3">
            {pcZones.map((zone) => (
              <div
                key={zone.type}
                className={`p-4 rounded-xl border backdrop-blur-sm ${
                  zone.color === 'purple'
                    ? 'bg-purple-900/10 border-purple-700/50'
                    : zone.color === 'blue'
                    ? 'bg-blue-900/10 border-blue-700/50'
                    : 'bg-gray-900/50 border-gray-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      zone.color === 'purple'
                        ? 'bg-purple-500'
                        : zone.color === 'blue'
                        ? 'bg-blue-500'
                        : 'bg-gray-500'
                    }`} />
                    <span className="font-medium">{zone.type}</span>
                  </div>
                  <span className="text-blue-400">${zone.price}/hr</span>
                </div>
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  {zone.specs}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live PC Layout */}
        <div>
          <h2 className="text-xl mb-4">Live PC Status</h2>
          <PCFloorPlan 
            pcs={pcs} 
            onSelectPC={handlePCSelect}
            selectedPC={selectedPC}
          />
        </div>

        {/* Peak Hours */}
        <div>
          <h2 className="text-xl mb-4">Peak Hours</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
            <div className="space-y-2">
              {peakHours.map((peak) => (
                <div key={peak.hour} className="flex items-center gap-3">
                  <span className="text-sm text-gray-400 w-16">{peak.hour}</span>
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        peak.load > 80
                          ? 'bg-gradient-to-r from-red-500 to-red-600'
                          : peak.load > 50
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500'
                      }`}
                      style={{ width: `${peak.load}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-12">{peak.load}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h2 className="text-xl mb-4">Amenities</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm flex items-center gap-3">
              <Wifi className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-sm">High-Speed WiFi</div>
                <div className="text-xs text-gray-400">1Gbps</div>
              </div>
            </div>
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm flex items-center gap-3">
              <MonitorCheck className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-sm">Gaming Gear</div>
                <div className="text-xs text-gray-400">Razer</div>
              </div>
            </div>
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-sm">24/7 Open</div>
                <div className="text-xs text-gray-400">Always</div>
              </div>
            </div>
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm flex items-center gap-3">
              <Clock className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-sm">Food & Drinks</div>
                <div className="text-xs text-gray-400">Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Club Rules */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
          <h3 className="mb-3">Club Rules</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• No outside food or drinks</li>
            <li>• Respect other players and staff</li>
            <li>• Report any technical issues immediately</li>
            <li>• Sessions end automatically at booked time</li>
          </ul>
        </div>
      </div>

      {/* Booking Bottom Sheet */}
      <BottomSheet
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedPC(null);
        }}
        title={`Book PC #${selectedPC}`}
      >
        <div className="space-y-6">
          {/* PC Info */}
          {selectedPCData && pcZone && (
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">PC #{selectedPC}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  pcZone.color === 'purple'
                    ? 'bg-purple-600'
                    : pcZone.color === 'blue'
                    ? 'bg-blue-600'
                    : 'bg-gray-600'
                }`}>
                  {pcZone.type}
                </span>
              </div>
              <div className="text-sm text-gray-400">{selectedPCData.specs}</div>
              <div className="text-blue-400 mt-2">${pcZone.price}/hr</div>
            </div>
          )}

          {/* Time Selection */}
          <div>
            <h3 className="mb-3">Start Time</h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-xl border transition-all ${
                    selectedTime === time
                      ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500'
                      : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <h3 className="mb-3">Duration</h3>
            <div className="grid grid-cols-3 gap-3">
              {[1, 3, 5].map((hours) => (
                <button
                  key={hours}
                  onClick={() => setSelectedDuration(hours)}
                  className={`p-4 rounded-xl border transition-all ${
                    selectedDuration === hours
                      ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500'
                      : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div>{hours}h</div>
                  <div className="text-sm text-gray-400 mt-1">
                    ${(pcZone?.price || club.hourlyRate) * hours}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleBooking}
            disabled={!selectedTime}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Booking - ${(pcZone?.price || club.hourlyRate) * selectedDuration}
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
