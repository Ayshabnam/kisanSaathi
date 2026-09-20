/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { SellProduceView } from './components/SellProduceView';
import { MyCropsView } from './components/MyCropsView';
import { EarningsView } from './components/EarningsView';
import { ProfileView } from './components/ProfileView';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { NotificationModal } from './components/NotificationModal';
import { OnboardingModal } from './components/OnboardingModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[#F3F6F3] text-[#1E2922] flex flex-col antialiased font-sans">
      {/* Top Header */}
      <Header />

      {/* Main Tab Views */}
      <main className="flex-1 w-full max-w-md mx-auto">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'sell' && <SellProduceView />}
        {activeTab === 'crops' && <MyCropsView />}
        {activeTab === 'earnings' && <EarningsView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Persistent Bottom Navigation & Voice Floating Button */}
      <BottomNav />

      {/* Overlays / Modals */}
      <VoiceAssistantModal />
      <NotificationModal />
      <OnboardingModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
