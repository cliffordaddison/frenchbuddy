'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  ChevronLeft,
  RefreshCw,
  Check,
  X,
  Target,
  TrendingUp,
  Star
} from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { frenchLessons, getRandomLesson } from '@/lib/data/lessons';
import toast from 'react-hot-toast';

interface PracticeViewProps {
  onBack: () => void;
}

export default function PracticeView({ onBack }: PracticeViewProps) {
  const { userProgress, updateScore, addVocabularyMastered } = useAppStore();
  
  const [currentPhrase, setCurrentPhrase] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'fr-FR';
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setTranscript(transcript);
          checkAccuracy(transcript);
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          toast.error('Speech recognition error. Please try again.');
          setIsRecording(false);
        };
        
        recognition.onend = () => {
          setIsRecording(false);
        };
        
        setRecognition(recognition);
        recognitionRef.current = recognition;
      } else {
        toast.error('Speech recognition not supported in this browser.');
      }
    }
  }, []);

  useEffect(() => {
    loadNewPhrase();
  }, []);

  const loadNewPhrase = () => {
    const lesson = getRandomLesson();
    const randomPhrase = lesson.phrases[Math.floor(Math.random() * lesson.phrases.length)];
    setCurrentPhrase(randomPhrase);
    setTranscript('');
    setAccuracy(null);
    setShowHint(false);
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
      setTranscript('');
      setAccuracy(null);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const checkAccuracy = (userSpeech: string) => {
    if (!currentPhrase) return;
    
    const userWords = userSpeech.toLowerCase().trim().split(' ');
    const correctWords = currentPhrase.french.toLowerCase().trim().split(' ');
    
    let correctCount = 0;
    let totalWords = Math.max(userWords.length, correctWords.length);
    
    userWords.forEach((word, index) => {
      if (correctWords[index] && word === correctWords[index]) {
        correctCount++;
      }
    });
    
    const accuracyScore = Math.round((correctCount / totalWords) * 100);
    setAccuracy(accuracyScore);
    setAttempts(prev => prev + 1);
    
    if (accuracyScore >= 80) {
      toast.success('Excellent pronunciation!');
      addVocabularyMastered(currentPhrase.id);
      updateScore('speaking', accuracyScore);
      setScore(prev => prev + accuracyScore);
    } else if (accuracyScore >= 60) {
      toast.success('Good effort! Keep practicing.');
      updateScore('speaking', accuracyScore);
      setScore(prev => prev + accuracyScore);
    } else {
      toast.error('Try again. Listen to the pronunciation first.');
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

  const calculateLevenshteinDistance = (str1: string, str2: string) => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  if (!currentPhrase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading practice phrase...</p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-800">Speaking Practice</h1>
            <p className="text-gray-600">Improve your French pronunciation</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Score</p>
              <p className="text-xl font-bold text-primary-600">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Attempts</p>
              <p className="text-xl font-bold text-green-600">{attempts}</p>
            </div>
          </div>
        </div>

        {/* Main Practice Area */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentPhrase.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card text-center"
          >
            {/* Target Phrase */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
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
                  onClick={() => setShowHint(!showHint)}
                  className="btn-secondary"
                  title="Show hint"
                >
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
              </div>

              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-yellow-50 p-4 rounded-lg mb-4"
                >
                  <p className="text-sm text-yellow-800">
                    <strong>Hint:</strong> {currentPhrase.english}
                  </p>
                  <p className="text-sm text-yellow-700 font-mono mt-2">
                    Pronunciation: {currentPhrase.pronunciation}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Recording Section */}
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`speech-btn ${
                    isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary-500 hover:bg-primary-600'
                  }`}
                  disabled={!recognition}
                >
                  {isRecording ? (
                    <MicOff className="w-8 h-8" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">
                {isRecording 
                  ? 'Listening... Speak now!' 
                  : 'Click the microphone to start recording'
                }
              </p>

              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-100 p-4 rounded-lg mb-4"
                >
                  <p className="text-sm text-gray-600 mb-2">You said:</p>
                  <p className="text-lg font-medium text-gray-800">{transcript}</p>
                </motion.div>
              )}

              {accuracy !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-lg flex items-center justify-center ${
                    accuracy >= 80 ? 'bg-green-100 text-green-800' :
                    accuracy >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {accuracy >= 80 ? (
                    <Check className="w-6 h-6 mr-2" />
                  ) : (
                    <X className="w-6 h-6 mr-2" />
                  )}
                  <span className="text-lg font-semibold">
                    Accuracy: {accuracy}%
                  </span>
                </motion.div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                How to practice:
              </h3>
              <ol className="text-sm text-blue-700 space-y-2 text-left max-w-md mx-auto">
                <li>1. Listen to the pronunciation first</li>
                <li>2. Click the microphone button to start recording</li>
                <li>3. Speak the French phrase clearly</li>
                <li>4. Click the microphone again to stop recording</li>
                <li>5. Check your accuracy and try again if needed</li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={loadNewPhrase}
                className="btn-secondary flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Phrase
              </button>
              
              <button
                onClick={speakPhrase}
                className="btn-primary flex items-center"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Listen Again
              </button>
            </div>
          </motion.div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="card text-center">
              <Target className="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-1">Speaking Score</h3>
              <p className="text-2xl font-bold text-primary-600">
                {userProgress.speakingScore}%
              </p>
            </div>
            
            <div className="card text-center">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-1">Session Score</h3>
              <p className="text-2xl font-bold text-green-600">{score}</p>
            </div>
            
            <div className="card text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-1">Total Attempts</h3>
              <p className="text-2xl font-bold text-yellow-600">{attempts}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 