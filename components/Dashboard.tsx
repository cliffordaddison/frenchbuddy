'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Mic, 
  Headphones, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Play,
  Target,
  Clock,
  Star
} from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { frenchLessons, getLessonsByLevel } from '@/lib/data/lessons';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { 
    userProgress, 
    setCurrentView, 
    startLesson,
    setUserProgress 
  } = useAppStore();
  
  const [recommendedLessons, setRecommendedLessons] = useState<any[]>([]);

  useEffect(() => {
    // Get recommended lessons based on user's level and progress
    const userLevel = userProgress.level;
    const completedLessons = userProgress.completedLessons;
    
    const availableLessons = getLessonsByLevel(userLevel).filter(
      lesson => !completedLessons.includes(lesson.id)
    );
    
    setRecommendedLessons(availableLessons.slice(0, 3));
  }, [userProgress]);

  const handleStartLesson = (lesson: any) => {
    startLesson(lesson);
    toast.success(`Starting ${lesson.title}!`);
  };

  const handleLevelChange = (newLevel: string) => {
    setUserProgress({ level: newLevel as any });
    toast.success(`Level changed to ${newLevel}`);
  };

  const getProgressPercentage = () => {
    const totalLessons = frenchLessons.filter(l => l.level === userProgress.level).length;
    const completedCount = userProgress.completedLessons.filter(
      id => frenchLessons.find(l => l.id === id)?.level === userProgress.level
    ).length;
    return Math.round((completedCount / totalLessons) * 100);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🇫🇷 FrenchBuddy
          </h1>
          <p className="text-lg text-gray-600">
            Master French from A1 to C2 with interactive lessons
          </p>
        </motion.div>

        {/* User Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Level</p>
                <p className="text-2xl font-bold text-primary-600">{userProgress.level}</p>
              </div>
              <Target className="w-8 h-8 text-primary-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Study Streak</p>
                <p className="text-2xl font-bold text-green-600">{userProgress.streak} days</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Study Time</p>
                <p className="text-2xl font-bold text-blue-600">{userProgress.totalStudyTime}m</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-purple-600">{getAverageScore()}%</p>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </motion.div>

        {/* Progress Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Level {userProgress.level} Progress</span>
              <span className="text-sm font-medium">{getProgressPercentage()}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Pronunciation</p>
              <p className="text-lg font-semibold text-french-600">{userProgress.pronunciationScore}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Grammar</p>
              <p className="text-lg font-semibold text-blue-600">{userProgress.grammarScore}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Listening</p>
              <p className="text-lg font-semibold text-green-600">{userProgress.listeningScore}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Speaking</p>
              <p className="text-lg font-semibold text-purple-600">{userProgress.speakingScore}%</p>
            </div>
          </div>
        </motion.div>

        {/* Level Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Choose Your Level</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level) => (
              <button
                key={level}
                onClick={() => handleLevelChange(level)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  userProgress.level === level
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg font-bold">{level}</div>
                  <div className="text-xs text-gray-600">
                    {level === 'A1' && 'Beginner'}
                    {level === 'A2' && 'Elementary'}
                    {level === 'B1' && 'Intermediate'}
                    {level === 'B2' && 'Upper Intermediate'}
                    {level === 'C1' && 'Advanced'}
                    {level === 'C2' && 'Mastery'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recommended Lessons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="lesson-card"
                onClick={() => handleStartLesson(lesson)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`level-badge level-${lesson.level.toLowerCase()}`}>
                    {lesson.level}
                  </span>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {lesson.duration}m
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {lesson.phrases.length} phrases • Difficulty: {lesson.difficulty}/10
                </p>
                <button className="btn-primary w-full flex items-center justify-center">
                  <Play className="w-4 h-4 mr-2" />
                  Start Lesson
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <button
            onClick={() => setCurrentView('practice')}
            className="card hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="text-center">
              <Mic className="w-12 h-12 text-primary-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Speaking Practice</h3>
              <p className="text-sm text-gray-600">Improve your pronunciation</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('progress')}
            className="card hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="text-center">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Progress</h3>
              <p className="text-sm text-gray-600">Track your learning journey</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('lesson')}
            className="card hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">All Lessons</h3>
              <p className="text-sm text-gray-600">Browse all available lessons</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('settings')}
            className="card hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="text-center">
              <Calendar className="w-12 h-12 text-purple-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Settings</h3>
              <p className="text-sm text-gray-600">Customize your experience</p>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
} 