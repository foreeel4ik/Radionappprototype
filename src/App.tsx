import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreens } from './components/OnboardingScreens';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { ClubPage } from './components/ClubPage';
import { ProfileScreen } from './components/ProfileScreen';
import { BalanceScreen } from './components/BalanceScreen';
import { AchievementsScreen } from './components/AchievementsScreen';
import { EventsScreen } from './components/EventsScreen';

export type Screen = 
  | 'splash' 
  | 'onboarding' 
  | 'login' 
  | 'home' 
  | 'club' 
  | 'profile' 
  | 'balance' 
  | 'achievements'
  | 'events';

export interface Club {
  id: number;
  name: string;
  rating: number;
  availablePCs: number;
  totalPCs: number;
  distance: string;
  image: string;
  hourlyRate: number;
  address: string;
  hasEvent?: boolean;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const navigateTo = (screen: Screen, club?: Club) => {
    if (club) setSelectedClub(club);
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {currentScreen === 'splash' && <SplashScreen onComplete={() => navigateTo('onboarding')} />}
      {currentScreen === 'onboarding' && <OnboardingScreens onComplete={() => navigateTo('login')} />}
      {currentScreen === 'login' && <LoginScreen onLogin={() => navigateTo('home')} />}
      {currentScreen === 'home' && <HomeScreen navigateTo={navigateTo} />}
      {currentScreen === 'club' && selectedClub && <ClubPage club={selectedClub} navigateTo={navigateTo} />}
      {currentScreen === 'profile' && <ProfileScreen navigateTo={navigateTo} />}
      {currentScreen === 'balance' && <BalanceScreen navigateTo={navigateTo} />}
      {currentScreen === 'achievements' && <AchievementsScreen navigateTo={navigateTo} />}
      {currentScreen === 'events' && <EventsScreen navigateTo={navigateTo} />}
    </div>
  );
}

export default App;