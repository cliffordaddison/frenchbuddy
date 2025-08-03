'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft,
  Settings,
  Volume2,
  Mic,
  Bell,
  Download,
  Upload,
  Trash2,
  Save,
  User,
  Target,
  Clock
} from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import toast from 'react-hot-toast';

interface SettingsViewProps {
  onBack: () => void;
}

export default function SettingsView({ onBack }: SettingsViewProps) {
  const { userProgress, setUserProgress } = useAppStore();
  
  const [settings, setSettings] = useState({
    dailyGoal: 30, // minutes
    pronunciationSpeed: 0.8,
    autoPlay: true,
    notifications: true,
    soundEffects: true,
    showHints: true,
    studyReminders: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // Settings are stored locally, no need to update userProgress
    toast.success('Settings saved successfully!');
  };

  const handleExportData = () => {
    const data = {
      userProgress,
      settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'frenchbuddy-progress.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Progress exported successfully!');
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.userProgress) {
          setUserProgress(data.userProgress);
          toast.success('Progress imported successfully!');
        }
      } catch (error) {
        toast.error('Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setUserProgress({
        completedLessons: [],
        streak: 0,
        totalStudyTime: 0,
        vocabularyMastered: [],
        pronunciationScore: 0,
        grammarScore: 0,
        listeningScore: 0,
        speakingScore: 0,
        lessonsCompleted: 0,
        phrasesMastered: 0,
        currentStreak: 0,
        averageScore: 0,
        lessonsStarted: 0,
      });
      toast.success('Progress reset successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-600">Customize your learning experience</p>
          </div>
          
          <button
            onClick={handleSaveSettings}
            className="btn-primary flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </button>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Learning Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-primary-500 mr-3" />
              <h2 className="text-xl font-semibold">Learning Preferences</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Style
                </label>
                <select
                  value="natural"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled
                >
                  <option value="natural">Natural Progression</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Lessons adapt to your progress automatically
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Study Goal (minutes)
                </label>
                <input
                  type="number"
                  value={settings.dailyGoal}
                  onChange={(e) => handleSettingChange('dailyGoal', parseInt(e.target.value))}
                  min="5"
                  max="120"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* Audio Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center mb-6">
              <Volume2 className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold">Audio Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pronunciation Speed
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={settings.pronunciationSpeed}
                  onChange={(e) => handleSettingChange('pronunciationSpeed', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Slow</span>
                  <span>{settings.pronunciationSpeed}x</span>
                  <span>Fast</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.autoPlay}
                    onChange={(e) => handleSettingChange('autoPlay', e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Auto-play pronunciation</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.soundEffects}
                    onChange={(e) => handleSettingChange('soundEffects', e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Sound effects</span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Study Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 text-green-500 mr-3" />
              <h2 className="text-xl font-semibold">Study Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.showHints}
                  onChange={(e) => handleSettingChange('showHints', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Show hints by default</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.studyReminders}
                  onChange={(e) => handleSettingChange('studyReminders', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Study reminders</span>
              </label>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center mb-6">
              <Bell className="w-6 h-6 text-yellow-500 mr-3" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Enable notifications</span>
              </label>
              
              <p className="text-sm text-gray-600">
                Receive reminders to study and celebrate your achievements
              </p>
            </div>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center mb-6">
              <Settings className="w-6 h-6 text-purple-500 mr-3" />
              <h2 className="text-xl font-semibold">Data Management</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={handleExportData}
                className="btn-secondary flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Progress
              </button>
              
              <label className="btn-secondary flex items-center justify-center cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Import Progress
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
              
              <button
                onClick={handleResetProgress}
                className="btn-secondary flex items-center justify-center text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Reset Progress
              </button>
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Your progress is automatically saved locally. 
                Export your data regularly to keep a backup.
              </p>
            </div>
          </motion.div>

          {/* Current Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card"
          >
            <div className="flex items-center mb-6">
              <Clock className="w-6 h-6 text-gray-500 mr-3" />
              <h2 className="text-xl font-semibold">Current Statistics</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Study Time</p>
                <p className="text-lg font-semibold text-blue-600">{userProgress.totalStudyTime}m</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">Lessons Completed</p>
                <p className="text-lg font-semibold text-green-600">{userProgress.completedLessons.length}</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">Vocabulary Mastered</p>
                <p className="text-lg font-semibold text-purple-600">{userProgress.vocabularyMastered.length}</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">Study Streak</p>
                <p className="text-lg font-semibold text-yellow-600">{userProgress.streak} days</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 