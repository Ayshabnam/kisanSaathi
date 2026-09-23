/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { ComparePricesView } from './components/ComparePricesView';
import { ForecastView } from './components/ForecastView';
import { HistoryView } from './components/HistoryView';
import { ProfileView } from './components/ProfileView';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { NotificationModal } from './components/NotificationModal';
import { OnboardingModal } from './components/OnboardingModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF6EE] text-[#26201A] flex flex-col antialiased font-sans">
      {/* Top Header with App name, language dropdown & voice trigger */}
      <Header onOpenNotifications={() => setShowNotificationModal(true)} />

      {/* Responsive Layout: Sidebar on Desktop, Content in Center */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'compare' && <ComparePricesView />}
            {activeTab === 'forecast' && <ForecastView />}
            {activeTab === 'history' && <HistoryView />}
            {activeTab === 'profile' && <ProfileView />}
          </div>
        </main>
      </div>

      {/* Mobile Persistent Bottom Navigation */}
      <BottomNav />

      {/* Overlays / Modals */}
      <VoiceAssistantModal />
      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
      />
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
