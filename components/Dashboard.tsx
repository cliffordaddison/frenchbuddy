'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Mic, 
  BarChart3, 
  Settings, 
  Play, 
  Target, 
  Clock, 
  Trophy,
  Star,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { frenchLessons, getLessonsByCategory, getRecommendedLessons } from '@/lib/data/lessons';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { 
    setCurrentView, 
    setCurrentLessonId, 
    userProgress, 
    updateUserProgress 
  } = useAppStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = Array.from(new Set(frenchLessons.map(lesson => lesson.category)));

  // Filter lessons based on selection
  const filteredLessons = frenchLessons.filter(lesson => {
    const categoryMatch = selectedCategory === 'all' || lesson.category === selectedCategory;
    return categoryMatch;
  });

  // Get recommended lessons based on user progress
  const recommendedLessons = getRecommendedLessons(userProgress);

  const handleStartLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setCurrentView('lesson');
    updateUserProgress({ lessonsStarted: 1 });
    toast.success('Starting lesson...');
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return 'bg-green-100 text-green-800';
    if (difficulty <= 6) return 'bg-yellow-100 text-yellow-800';
    if (difficulty <= 8) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return 'Beginner';
    if (difficulty <= 4) return 'Elementary';
    if (difficulty <= 6) return 'Intermediate';
    if (difficulty <= 8) return 'Advanced';
    return 'Expert';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      'I speak French, a little': BookOpen,
      'Do you have plans?': Calendar,
      'Can you help me?': Users,
      'Friends & family': Users,
      'Asking for directions': Target,
      'Daily stories': BookOpen,
      'What are you doing?': Play,
      'It was yesterday': Clock,
      'It will be fun': Star,
      'What were you doing?': Clock,
      'I must do it!': Target,
      'We\'ve been there': TrendingUp,
      'Stop doing that!': Target,
      'If I won the lottery': Trophy,
      'I would have done it': Clock,
      'I hope you have done that': Star,
      'Daily stories II': BookOpen,
      'Daily stories III': BookOpen,
      'Daily stories IV': BookOpen,
      'Daily stories V': BookOpen,
      'Daily stories VI': BookOpen,
      'Daily stories VII': BookOpen
    };
    return icons[category] || BookOpen;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🇫🇷 FrenchBuddy
          </h1>
          <p className="text-gray-600 text-lg">
            Learn French naturally through conversation and practice
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Study Time</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userProgress.totalStudyTime || 0}h
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lessons Completed</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userProgress.lessonsCompleted || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userProgress.currentStreak || 0} days
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userProgress.averageScore || 0}%
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentView('lesson')}
            className="flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <BookOpen size={24} />
            <span className="font-semibold">Start Lesson</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentView('practice')}
            className="flex items-center justify-center gap-3 p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          >
            <Mic size={24} />
            <span className="font-semibold">Practice Speaking</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentView('progress')}
            className="flex items-center justify-center gap-3 p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
          >
            <BarChart3 size={24} />
            <span className="font-semibold">View Progress</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentView('settings')}
            className="flex items-center justify-center gap-3 p-4 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
          >
            <Settings size={24} />
            <span className="font-semibold">Settings</span>
          </motion.button>
        </div>

        {/* Recommended Lessons */}
        {recommendedLessons.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Recommended for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedLessons.map((lesson, index) => {
                const CategoryIcon = getCategoryIcon(lesson.category);
                
                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <CategoryIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                          {getDifficultyLabel(lesson.difficulty)}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {lesson.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-4">
                        {lesson.category}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <BookOpen size={16} />
                          {lesson.phrases.length} phrases
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {lesson.estimatedDuration}m
                        </span>
                      </div>

                      <button
                        onClick={() => handleStartLesson(lesson.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <Play size={16} />
                        Start Lesson
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Browse by Category</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* All Lessons */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            All Lessons ({filteredLessons.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson, index) => {
              const CategoryIcon = getCategoryIcon(lesson.category);
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <CategoryIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                        {getDifficultyLabel(lesson.difficulty)}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {lesson.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {lesson.category}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <BookOpen size={16} />
                        {lesson.phrases.length} phrases
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {lesson.estimatedDuration}m
                      </span>
                    </div>

                    <button
                      onClick={() => handleStartLesson(lesson.id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Play size={16} />
                      Start Lesson
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredLessons.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No lessons match your current filters.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 