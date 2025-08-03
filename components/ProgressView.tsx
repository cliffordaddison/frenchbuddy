'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft,
  Trophy,
  TrendingUp,
  Clock,
  Target,
  Star,
  Award,
  Calendar,
  BookOpen,
  Mic,
  Headphones,
  PenTool,
  BarChart3,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { frenchLessons } from '@/lib/data/lessons';
import { AnimatePresence } from 'framer-motion';

interface ProgressViewProps {
  onBack: () => void;
}

export default function ProgressView({ onBack }: ProgressViewProps) {
  const { userProgress } = useAppStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'achievements' | 'vocabulary'>('overview');

  const getProgressByDifficulty = () => {
    const difficultyRanges = [
      { name: 'Beginner', min: 1, max: 3 },
      { name: 'Elementary', min: 4, max: 5 },
      { name: 'Intermediate', min: 6, max: 7 },
      { name: 'Advanced', min: 8, max: 10 }
    ];
    
    return difficultyRanges.map(range => {
      const totalLessons = frenchLessons.filter(l => l.difficulty >= range.min && l.difficulty <= range.max).length;
      const completedLessons = userProgress.completedLessons.filter(
        id => {
          const lesson = frenchLessons.find(l => l.id === id);
          return lesson && lesson.difficulty >= range.min && lesson.difficulty <= range.max;
        }
      ).length;
      return {
        level: range.name,
        completed: completedLessons,
        total: totalLessons,
        percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
      };
    });
  };

  const getAverageScore = () => {
    const scores = [
      userProgress.pronunciationScore,
      userProgress.grammarScore,
      userProgress.listeningScore,
      userProgress.speakingScore
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const getStudyStreak = () => {
    // This would be calculated based on actual study dates
    return userProgress.streak;
  };

  const getAchievements = () => {
    const achievements = [];
    
    if (userProgress.totalStudyTime >= 60) {
      achievements.push({
        id: 'first-hour',
        title: 'First Hour',
        description: 'Studied for 1 hour',
        icon: Clock,
        unlocked: true
      });
    }
    
    if (userProgress.completedLessons.length >= 5) {
      achievements.push({
        id: 'lesson-master',
        title: 'Lesson Master',
        description: 'Completed 5 lessons',
        icon: BookOpen,
        unlocked: true
      });
    }
    
    if (getAverageScore() >= 80) {
      achievements.push({
        id: 'high-achiever',
        title: 'High Achiever',
        description: 'Achieved 80% average score',
        icon: Star,
        unlocked: true
      });
    }
    
    if (userProgress.streak >= 7) {
      achievements.push({
        id: 'week-warrior',
        title: 'Week Warrior',
        description: '7-day study streak',
        icon: TrendingUp,
        unlocked: true
      });
    }
    
    return achievements;
  };

  const getVocabularyStats = () => {
    const masteredCount = userProgress.vocabularyMastered.length;
    const totalPhrases = frenchLessons.reduce((acc, lesson) => acc + lesson.phrases.length, 0);
    const percentage = totalPhrases > 0 ? Math.round((masteredCount / totalPhrases) * 100) : 0;
    
    return {
      mastered: masteredCount,
      total: totalPhrases,
      percentage
    };
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
            <h1 className="text-3xl font-bold text-gray-800">Your Progress</h1>
            <p className="text-gray-600">Track your learning journey</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span className="text-lg font-semibold text-yellow-600">
              {getAchievements().length} Achievements
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'skills', label: 'Skills', icon: Target },
            { id: 'achievements', label: 'Achievements', icon: Award },
            { id: 'vocabulary', label: 'Vocabulary', icon: BookOpen }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Overall Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="card text-center">
                    <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Total Study Time</h3>
                    <p className="text-2xl font-bold text-blue-600">{userProgress.totalStudyTime}m</p>
                  </div>
                  
                  <div className="card text-center">
                    <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Lessons Completed</h3>
                    <p className="text-2xl font-bold text-green-600">{userProgress.completedLessons.length}</p>
                  </div>
                  
                  <div className="card text-center">
                    <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Study Streak</h3>
                    <p className="text-2xl font-bold text-purple-600">{getStudyStreak()} days</p>
                  </div>
                  
                  <div className="card text-center">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Average Score</h3>
                    <p className="text-2xl font-bold text-yellow-600">{getAverageScore()}%</p>
                  </div>
                </div>

                {/* Progress by Level */}
                <div className="card">
                  <h2 className="text-xl font-semibold mb-6">Progress by Level</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getProgressByDifficulty().map((level) => (
                      <div key={level.level} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{level.level}</span>
                          <span className="text-sm text-gray-600">
                            {level.completed}/{level.total}
                          </span>
                        </div>
                        <div className="progress-bar">
                          <motion.div
                            className="progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${level.percentage}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                          {level.percentage}% complete
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="card">
                  <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {userProgress.lastStudyDate && (
                      <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Last study session</p>
                          <p className="text-sm text-gray-600">
                            {new Date(userProgress.lastStudyDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Vocabulary mastered</p>
                        <p className="text-sm text-gray-600">
                          {userProgress.vocabularyMastered.length} phrases
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-8">
                {/* Skill Scores */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card">
                    <div className="flex items-center mb-4">
                      <Mic className="w-6 h-6 text-french-500 mr-3" />
                      <h3 className="text-lg font-semibold">Pronunciation</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Score</span>
                        <span className="font-medium">{userProgress.pronunciationScore}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill bg-french-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${userProgress.pronunciationScore}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center mb-4">
                      <PenTool className="w-6 h-6 text-blue-500 mr-3" />
                      <h3 className="text-lg font-semibold">Grammar</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Score</span>
                        <span className="font-medium">{userProgress.grammarScore}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill bg-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${userProgress.grammarScore}%` }}
                          transition={{ duration: 1, delay: 0.1 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center mb-4">
                      <Headphones className="w-6 h-6 text-green-500 mr-3" />
                      <h3 className="text-lg font-semibold">Listening</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Score</span>
                        <span className="font-medium">{userProgress.listeningScore}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill bg-green-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${userProgress.listeningScore}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center mb-4">
                      <Mic className="w-6 h-6 text-purple-500 mr-3" />
                      <h3 className="text-lg font-semibold">Speaking</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Score</span>
                        <span className="font-medium">{userProgress.speakingScore}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill bg-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${userProgress.speakingScore}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skill Recommendations */}
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                  <div className="space-y-3">
                    {userProgress.pronunciationScore < 70 && (
                      <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <Mic className="w-5 h-5 text-yellow-500" />
                        <p className="text-sm">Practice pronunciation more to improve your speaking skills</p>
                      </div>
                    )}
                    
                    {userProgress.grammarScore < 70 && (
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <PenTool className="w-5 h-5 text-blue-500" />
                        <p className="text-sm">Focus on grammar lessons to improve your accuracy</p>
                      </div>
                    )}
                    
                    {userProgress.listeningScore < 70 && (
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <Headphones className="w-5 h-5 text-green-500" />
                        <p className="text-sm">Listen to more French audio to improve comprehension</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getAchievements().map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`card text-center ${
                        achievement.unlocked ? 'border-green-200 bg-green-50' : 'border-gray-200'
                      }`}
                    >
                      <achievement.icon className={`w-12 h-12 mx-auto mb-3 ${
                        achievement.unlocked ? 'text-green-500' : 'text-gray-400'
                      }`} />
                      <h3 className={`text-lg font-semibold mb-2 ${
                        achievement.unlocked ? 'text-green-800' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${
                        achievement.unlocked ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                      {achievement.unlocked && (
                        <div className="mt-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'vocabulary' && (
              <div className="space-y-8">
                {/* Vocabulary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="card text-center">
                    <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Mastered</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {getVocabularyStats().mastered}
                    </p>
                  </div>
                  
                  <div className="card text-center">
                    <Target className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Total Available</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {getVocabularyStats().total}
                    </p>
                  </div>
                  
                  <div className="card text-center">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Completion</h3>
                    <p className="text-2xl font-bold text-yellow-600">
                      {getVocabularyStats().percentage}%
                    </p>
                  </div>
                </div>

                {/* Vocabulary Progress */}
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Vocabulary Progress</h3>
                  <div className="progress-bar mb-4">
                    <motion.div
                      className="progress-fill bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${getVocabularyStats().percentage}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    {getVocabularyStats().mastered} out of {getVocabularyStats().total} phrases mastered
                  </p>
                </div>

                {/* Mastered Vocabulary List */}
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Recently Mastered</h3>
                  <div className="space-y-2">
                    {userProgress.vocabularyMastered.slice(-10).map((phraseId, index) => {
                      const lesson = frenchLessons.find(l => 
                        l.phrases.some(p => p.id === phraseId)
                      );
                      const phrase = lesson?.phrases.find(p => p.id === phraseId);
                      
                      return phrase ? (
                        <div key={phraseId} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div>
                            <p className="font-medium">{phrase.french}</p>
                            <p className="text-sm text-gray-600">{phrase.english}</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 