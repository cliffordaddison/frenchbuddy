'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Mic, 
  Volume2, 
  ChevronLeft, 
  ChevronRight,
  Check,
  X,
  Eye,
  EyeOff,
  BookOpen,
  Target,
  Clock
} from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { Phrase, GrammarPoint } from '@/lib/data/lessons';
import toast from 'react-hot-toast';

interface LessonViewProps {
  onBack: () => void;
}

export default function LessonView({ onBack }: LessonViewProps) {
  const {
    currentLesson,
    currentPhraseIndex,
    isPlayingAudio,
    isRecording,
    showPronunciation,
    showTranslation,
    nextPhrase,
    previousPhrase,
    toggleAudio,
    toggleRecording,
    togglePronunciation,
    toggleTranslation,
    completeLesson,
    addVocabularyMastered,
    startStudySession,
    endStudySession,
    userProgress
  } = useAppStore();

  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);
  const [showGrammar, setShowGrammar] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (currentLesson && currentLesson.phrases[currentPhraseIndex]) {
      setCurrentPhrase(currentLesson.phrases[currentPhraseIndex]);
    }
  }, [currentLesson, currentPhraseIndex]);

  useEffect(() => {
    if (currentLesson) {
      startStudySession(currentLesson.id);
    }
  }, [currentLesson]);

  const handleNext = () => {
    if (currentPhrase) {
      addVocabularyMastered(currentPhrase.id);
    }
    nextPhrase();
    setUserInput('');
    setIsCorrect(null);
  };

  const handlePrevious = () => {
    previousPhrase();
    setUserInput('');
    setIsCorrect(null);
  };

  const handleCompleteLesson = () => {
    const score = Math.round(
      (userProgress.vocabularyMastered.length / (currentLesson?.phrases.length || 1)) * 100
    );
    completeLesson(currentLesson?.id || '', score);
    endStudySession(score);
    toast.success(`Lesson completed! Score: ${score}%`);
    onBack();
  };

  const handlePracticeCheck = () => {
    if (!currentPhrase) return;
    
    const userAnswer = userInput.toLowerCase().trim();
    const correctAnswer = currentPhrase.french.toLowerCase().trim();
    const isAnswerCorrect = userAnswer === correctAnswer;
    
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      toast.success('Correct! Well done!');
      addVocabularyMastered(currentPhrase.id);
    } else {
      toast.error('Try again!');
    }
  };

  const speakPhrase = () => {
    if (!currentPhrase) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentPhrase.french);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (!currentLesson || !currentPhrase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No lesson selected</p>
          <button onClick={onBack} className="btn-primary mt-4">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentPhraseIndex + 1) / currentLesson.phrases.length) * 100;

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
            <h1 className="text-2xl font-bold text-gray-800">{currentLesson.title}</h1>
            <p className="text-gray-600">
              {currentPhraseIndex + 1} of {currentLesson.phrases.length} phrases
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`level-badge level-${currentLesson.level.toLowerCase()}`}>
              {currentLesson.level}
            </span>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {currentLesson.duration}m
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Phrase Display */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentPhrase.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {currentPhrase.french}
                </h2>
                
                <div className="flex justify-center space-x-4 mb-6">
                  <button
                    onClick={speakPhrase}
                    className="pronunciation-btn"
                    title="Listen to pronunciation"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={togglePronunciation}
                    className="btn-secondary"
                    title="Show pronunciation guide"
                  >
                    {showPronunciation ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  
                  <button
                    onClick={toggleTranslation}
                    className="btn-secondary"
                    title="Show translation"
                  >
                    {showTranslation ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {showPronunciation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4"
                    >
                      <p className="text-lg text-gray-600 font-mono">
                        {currentPhrase.pronunciation}
                      </p>
                    </motion.div>
                  )}

                  {showTranslation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4"
                    >
                      <p className="text-lg text-gray-600 italic">
                        {currentPhrase.english}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {currentPhrase.context && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Context:</strong> {currentPhrase.context}
                    </p>
                  </div>
                )}

                {currentPhrase.usage && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-800 mb-2">
                      <strong>Usage:</strong>
                    </p>
                    <ul className="text-sm text-green-700 space-y-1">
                      {currentPhrase.usage.map((usage, index) => (
                        <li key={index}>• {usage}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Practice Mode */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Practice</h3>
                  <button
                    onClick={() => setPracticeMode(!practiceMode)}
                    className="btn-secondary"
                  >
                    {practiceMode ? 'Hide Practice' : 'Show Practice'}
                  </button>
                </div>

                {practiceMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                  >
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type the French phrase..."
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && handlePracticeCheck()}
                      />
                      <button
                        onClick={handlePracticeCheck}
                        className="btn-primary"
                      >
                        Check
                      </button>
                    </div>

                    {isCorrect !== null && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-3 rounded-lg flex items-center ${
                          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {isCorrect ? (
                          <Check className="w-5 h-5 mr-2" />
                        ) : (
                          <X className="w-5 h-5 mr-2" />
                        )}
                        {isCorrect ? 'Correct!' : 'Try again'}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Navigation */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentPhraseIndex === 0}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPhraseIndex === currentLesson.phrases.length - 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Grammar Points */}
            {currentLesson.grammarPoints && currentLesson.grammarPoints.length > 0 && (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Grammar</h3>
                  <button
                    onClick={() => setShowGrammar(!showGrammar)}
                    className="btn-secondary"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>

                {showGrammar && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                  >
                    {currentLesson.grammarPoints.map((grammar, index) => (
                      <div key={index} className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">
                          {grammar.title}
                        </h4>
                        <p className="text-sm text-yellow-700 mb-3">
                          {grammar.explanation}
                        </p>
                        {grammar.examples.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-yellow-800 mb-1">Examples:</p>
                            <ul className="text-sm text-yellow-700 space-y-1">
                              {grammar.examples.map((example, idx) => (
                                <li key={idx}>• {example}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {grammar.rules.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-yellow-800 mb-1">Rules:</p>
                            <ul className="text-sm text-yellow-700 space-y-1">
                              {grammar.rules.map((rule, idx) => (
                                <li key={idx}>• {rule}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}

            {/* Lesson Info */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Lesson Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className="font-medium">{currentLesson.difficulty}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize">{currentLesson.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{currentLesson.duration} minutes</span>
                </div>
              </div>
            </div>

            {/* Complete Lesson */}
            {currentPhraseIndex === currentLesson.phrases.length - 1 && (
              <div className="card bg-green-50 border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4">
                  🎉 Lesson Complete!
                </h3>
                <button
                  onClick={handleCompleteLesson}
                  className="btn-primary w-full bg-green-600 hover:bg-green-700"
                >
                  Complete Lesson
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 