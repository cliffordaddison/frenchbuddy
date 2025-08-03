import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Lesson, Phrase } from '../data/lessons';

export interface UserProgress {
  completedLessons: string[];
  currentLessonId?: string;
  streak: number;
  totalStudyTime: number; // in minutes
  lastStudyDate?: string;
  vocabularyMastered: string[];
  pronunciationScore: number; // 0-100
  grammarScore: number; // 0-100
  listeningScore: number; // 0-100
  speakingScore: number; // 0-100
  lessonsCompleted: number;
  phrasesMastered: number;
  currentStreak: number;
  averageScore: number;
  lessonsStarted: number;
}

export interface StudySession {
  id: string;
  lessonId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  phrasesPracticed: string[];
  score: number; // 0-100
}

interface AppState {
  // User state
  userProgress: UserProgress;
  currentSession?: StudySession;
  isAuthenticated: boolean;
  
  // UI state
  currentView: 'dashboard' | 'lesson' | 'practice' | 'progress' | 'settings';
  isLoading: boolean;
  error?: string;
  
  // Learning state
  currentLessonId?: string;
  currentLesson?: Lesson;
  currentPhraseIndex: number;
  isPlayingAudio: boolean;
  isRecording: boolean;
  showPronunciation: boolean;
  showTranslation: boolean;
  
  // Actions
  setUserProgress: (progress: Partial<UserProgress>) => void;
  updateUserProgress: (progress: Partial<UserProgress>) => void;
  setCurrentLessonId: (lessonId: string) => void;
  startLesson: (lesson: Lesson) => void;
  completeLesson: (lessonId: string, score: number) => void;
  nextPhrase: () => void;
  previousPhrase: () => void;
  toggleAudio: () => void;
  toggleRecording: () => void;
  togglePronunciation: () => void;
  toggleTranslation: () => void;
  setCurrentView: (view: AppState['currentView']) => void;
  setLoading: (loading: boolean) => void;
  setError: (error?: string) => void;
  resetSession: () => void;
  updateScore: (type: 'pronunciation' | 'grammar' | 'listening' | 'speaking', score: number) => void;
  addVocabularyMastered: (phraseId: string) => void;
  startStudySession: (lessonId: string) => void;
  endStudySession: (score: number) => void;
}

const initialUserProgress: UserProgress = {
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
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      userProgress: initialUserProgress,
      currentView: 'dashboard',
      isLoading: false,
      currentPhraseIndex: 0,
      isPlayingAudio: false,
      isRecording: false,
      showPronunciation: false,
      showTranslation: false,
      isAuthenticated: false,

      // Actions
      setUserProgress: (progress) =>
        set((state) => ({
          userProgress: { ...state.userProgress, ...progress },
        })),

      updateUserProgress: (progress) =>
        set((state) => ({
          userProgress: { ...state.userProgress, ...progress },
        })),

      setCurrentLessonId: (lessonId) =>
        set({ currentLessonId: lessonId }),

      startLesson: (lesson) =>
        set({
          currentLesson: lesson,
          currentLessonId: lesson.id,
          currentPhraseIndex: 0,
          currentView: 'lesson',
          isLoading: false,
        }),

      completeLesson: (lessonId, score) =>
        set((state) => {
          const completedLessons = [...state.userProgress.completedLessons];
          if (!completedLessons.includes(lessonId)) {
            completedLessons.push(lessonId);
          }

          // Update scores based on lesson performance
          const scoreUpdate = {
            pronunciationScore: Math.max(state.userProgress.pronunciationScore, score),
            grammarScore: Math.max(state.userProgress.grammarScore, score),
            listeningScore: Math.max(state.userProgress.listeningScore, score),
            speakingScore: Math.max(state.userProgress.speakingScore, score),
          };

          return {
            userProgress: {
              ...state.userProgress,
              completedLessons,
              lastStudyDate: new Date().toISOString(),
              lessonsCompleted: state.userProgress.lessonsCompleted + 1,
              ...scoreUpdate,
            },
          };
        }),

      nextPhrase: () =>
        set((state) => {
          if (!state.currentLesson) return state;
          const nextIndex = Math.min(
            state.currentPhraseIndex + 1,
            state.currentLesson.phrases.length - 1
          );
          return { currentPhraseIndex: nextIndex };
        }),

      previousPhrase: () =>
        set((state) => {
          const prevIndex = Math.max(state.currentPhraseIndex - 1, 0);
          return { currentPhraseIndex: prevIndex };
        }),

      toggleAudio: () =>
        set((state) => ({ isPlayingAudio: !state.isPlayingAudio })),

      toggleRecording: () =>
        set((state) => ({ isRecording: !state.isRecording })),

      togglePronunciation: () =>
        set((state) => ({ showPronunciation: !state.showPronunciation })),

      toggleTranslation: () =>
        set((state) => ({ showTranslation: !state.showTranslation })),

      setCurrentView: (view) => set({ currentView: view }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      resetSession: () =>
        set({
          currentLesson: undefined,
          currentLessonId: undefined,
          currentPhraseIndex: 0,
          isPlayingAudio: false,
          isRecording: false,
          showPronunciation: false,
          showTranslation: false,
          currentSession: undefined,
        }),

      updateScore: (type, score) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            [`${type}Score`]: Math.max(state.userProgress[`${type}Score`], score),
          },
        })),

      addVocabularyMastered: (phraseId) =>
        set((state) => {
          const vocabularyMastered = [...state.userProgress.vocabularyMastered];
          if (!vocabularyMastered.includes(phraseId)) {
            vocabularyMastered.push(phraseId);
          }
          return {
            userProgress: {
              ...state.userProgress,
              vocabularyMastered,
              phrasesMastered: state.userProgress.phrasesMastered + 1,
            },
          };
        }),

      startStudySession: (lessonId) =>
        set({
          currentSession: {
            id: Date.now().toString(),
            lessonId,
            startTime: new Date(),
            duration: 0,
            phrasesPracticed: [],
            score: 0,
          },
        }),

      endStudySession: (score) =>
        set((state) => {
          if (!state.currentSession) return state;

          const endTime = new Date();
          const duration = Math.round(
            (endTime.getTime() - state.currentSession.startTime.getTime()) / 60000
          );

          const session: StudySession = {
            ...state.currentSession,
            endTime,
            duration,
            score,
          };

          return {
            currentSession: undefined,
            userProgress: {
              ...state.userProgress,
              totalStudyTime: state.userProgress.totalStudyTime + duration,
              lastStudyDate: new Date().toISOString(),
            },
          };
        }),
    }),
    {
      name: 'frenchbuddy-storage',
      partialize: (state) => ({
        userProgress: state.userProgress,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 