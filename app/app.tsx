'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store/useAppStore';
import Dashboard from '@/components/Dashboard';
import LessonView from '@/components/LessonView';
import PracticeView from '@/components/PracticeView';
import ProgressView from '@/components/ProgressView';
import SettingsView from '@/components/SettingsView';

export default function App() {
  const { currentView, setCurrentView, resetSession } = useAppStore();

  useEffect(() => {
    // Reset session when component mounts
    resetSession();
  }, []);

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    resetSession();
  };

  // Render different views based on currentView state
  switch (currentView) {
    case 'lesson':
      return <LessonView onBack={handleBackToDashboard} />;
    case 'practice':
      return <PracticeView onBack={handleBackToDashboard} />;
    case 'progress':
      return <ProgressView onBack={handleBackToDashboard} />;
    case 'settings':
      return <SettingsView onBack={handleBackToDashboard} />;
    default:
      return <Dashboard />;
  }
}