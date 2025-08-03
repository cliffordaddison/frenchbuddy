'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Volume2, Play, Pause, ArrowRight, ArrowLeft, BookOpen, Mic, Check, X } from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { getLessonById, getNextLesson, getPreviousLesson } from '@/lib/data/lessons';
import toast from 'react-hot-toast';

interface LessonViewProps {
  onBack: () => void;
}

export default function LessonView({ onBack }: LessonViewProps) {
  const { currentLessonId, setCurrentLessonId, updateUserProgress } = useAppStore();
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const lesson = getLessonById(currentLessonId || 'lesson-1');
  const currentPhrase = lesson?.phrases[currentPhraseIndex];

  // Initialize speech synthesis with French voice
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Set French voice
      const voices = speechSynthesis.getVoices();
      const frenchVoice = voices.find(voice => 
        voice.lang.includes('fr') || voice.lang.includes('FR')
      );
      if (frenchVoice) {
        speechSynthesis.onvoiceschanged = () => {
          const updatedVoices = speechSynthesis.getVoices();
          const updatedFrenchVoice = updatedVoices.find(voice => 
            voice.lang.includes('fr') || voice.lang.includes('FR')
          );
          if (updatedFrenchVoice) {
            // Store French voice for use
            (window as any).frenchVoice = updatedFrenchVoice;
          }
        };
      }
    }
  }, []);

  const speakFrench = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8; // Slightly slower for clarity
      
      // Use French voice if available
      const frenchVoice = (window as any).frenchVoice;
      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => {
        setIsPlaying(false);
        toast.error('Audio playback failed');
      };

      speechSynthesis.speak(utterance);
    }
  };

  const handleNextPhrase = () => {
    if (lesson && currentPhraseIndex < lesson.phrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
      setShowTranslation(false);
      setShowPronunciation(false);
      setPracticeMode(false);
      setUserInput('');
      setIsCorrect(null);
    }
  };

  const handlePreviousPhrase = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(currentPhraseIndex - 1);
      setShowTranslation(false);
      setShowPronunciation(false);
      setPracticeMode(false);
      setUserInput('');
      setIsCorrect(null);
    }
  };

  const handlePracticeCheck = () => {
    if (!currentPhrase) return;
    
    const userAnswer = userInput.trim().toLowerCase();
    const correctAnswer = currentPhrase.french.toLowerCase();
    
    // Simple similarity check (can be improved with more sophisticated algorithms)
    const similarity = calculateSimilarity(userAnswer, correctAnswer);
    const isAnswerCorrect = similarity > 0.7;
    
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      toast.success('Excellent! Correct pronunciation!');
      updateUserProgress({
        lessonsCompleted: 1,
        phrasesMastered: 1,
        pronunciationScore: 10
      });
    } else {
      toast.error('Try again. Listen to the pronunciation and repeat.');
    }
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  if (!lesson || !currentPhrase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ChevronLeft size={20} />
            Back to Dashboard
          </button>
          <div className="text-center text-gray-500">Lesson not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Dashboard
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">{lesson.title}</h1>
            <p className="text-gray-600">{lesson.category}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Difficulty {lesson.difficulty}
              </span>
              <span className="text-sm text-gray-500">
                {currentPhraseIndex + 1} of {lesson.phrases.length}
              </span>
            </div>
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Main Content */}
        <motion.div
          key={currentPhraseIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          {/* French Phrase */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {currentPhrase.french}
            </h2>
            
            {/* Pronunciation Guide */}
            {showPronunciation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4"
              >
                <p className="text-lg text-yellow-800 font-mono">
                  {currentPhrase.pronunciation}
                </p>
              </motion.div>
            )}

            {/* Audio Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => speakFrench(currentPhrase.french)}
                disabled={isPlaying}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Volume2 size={20} />}
                {isPlaying ? 'Playing...' : 'Listen'}
              </button>
              
              <button
                onClick={() => setShowPronunciation(!showPronunciation)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <BookOpen size={20} />
                {showPronunciation ? 'Hide' : 'Show'} Pronunciation
              </button>
            </div>

            {/* Translation Toggle */}
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              {showTranslation ? 'Hide' : 'Show'} Translation
            </button>
            
            {showTranslation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 bg-gray-50 rounded-lg"
              >
                <p className="text-lg text-gray-700">{currentPhrase.english}</p>
              </motion.div>
            )}
          </div>

          {/* Context and Usage */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Context</h3>
              <p className="text-blue-700">{currentPhrase.context}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Usage</h3>
              <p className="text-green-700">{currentPhrase.usage}</p>
            </div>
          </div>

          {/* Practice Mode */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Practice</h3>
              <button
                onClick={() => setPracticeMode(!practiceMode)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Mic size={20} />
                {practiceMode ? 'Exit Practice' : 'Start Practice'}
              </button>
            </div>

            {practiceMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-purple-50 rounded-lg p-6"
              >
                <p className="text-purple-800 mb-4">
                  Listen to the pronunciation and try to repeat it correctly:
                </p>
                
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => speakFrench(currentPhrase.french)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Play size={16} />
                    Listen Again
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type what you hear..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePracticeCheck}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check size={20} />
                      Check
                    </button>
                    
                    {isCorrect !== null && (
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? <Check size={16} /> : <X size={16} />}
                        {isCorrect ? 'Correct!' : 'Try again'}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousPhrase}
            disabled={currentPhraseIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft size={20} />
            Previous
          </button>

          <div className="flex items-center gap-4">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentPhraseIndex + 1) / lesson.phrases.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">
              {currentPhraseIndex + 1} / {lesson.phrases.length}
            </span>
          </div>

          <button
            onClick={handleNextPhrase}
            disabled={currentPhraseIndex === lesson.phrases.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
} 