export interface Lesson {
  id: string;
  title: string;
  category: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  phrases: Phrase[];
  grammarPoints: GrammarPoint[];
  vocabulary: VocabularyItem[];
  exercises: Exercise[];
  audioUrl?: string;
  estimatedDuration: number; // in minutes
}

export interface Phrase {
  id: string;
  french: string;
  english: string;
  pronunciation: string;
  context: string;
  usage: string;
  audioUrl?: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  explanation: string;
  examples: string[];
  rules: string[];
}

export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  partOfSpeech: string;
  example: string;
}

export interface Exercise {
  id: string;
  type: 'pronunciation' | 'translation' | 'listening' | 'speaking';
  question: string;
  correctAnswer: string;
  options?: string[];
  audioUrl?: string;
}

// Comprehensive French lessons based on NatuLang structure
export const frenchLessons: Lesson[] = [
  // BEGINNER LEVEL (A1-A2)
  {
    id: 'lesson-1',
    title: 'Je comprends le français... un peu',
    category: 'I speak French, a little',
    level: 'A1',
    estimatedDuration: 15,
    phrases: [
      {
        id: 'phrase-1-1',
        french: 'Je comprends le français... un peu',
        english: 'I understand French... a little',
        pronunciation: 'zhuh kohm-prahn luh frahn-say... uhn puh',
        context: 'When someone asks if you speak French',
        usage: 'Use this when you want to indicate you have basic French knowledge'
      },
      {
        id: 'phrase-1-2',
        french: 'Comment allez-vous monsieur ?',
        english: 'How are you sir?',
        pronunciation: 'koh-mahn tah-lay voo muh-syuh',
        context: 'Formal greeting',
        usage: 'Use with people you don\'t know well or in formal situations'
      },
      {
        id: 'phrase-1-3',
        french: 'Qu\'est-ce que vous faites ?',
        english: 'What do you do?',
        pronunciation: 'kes kuh voo feht',
        context: 'Asking about someone\'s profession',
        usage: 'Formal way to ask about someone\'s job'
      }
    ],
    grammarPoints: [
      {
        id: 'grammar-1-1',
        title: 'Present Tense - Être (To Be)',
        explanation: 'The verb "être" (to be) is one of the most important verbs in French',
        examples: ['Je suis', 'Tu es', 'Il/Elle est', 'Nous sommes', 'Vous êtes', 'Ils/Elles sont'],
        rules: ['Use "être" for identity, location, and characteristics', 'Irregular verb - must be memorized']
      }
    ],
    vocabulary: [
      {
        id: 'vocab-1-1',
        word: 'comprendre',
        translation: 'to understand',
        partOfSpeech: 'verb',
        example: 'Je comprends le français'
      },
      {
        id: 'vocab-1-2',
        word: 'un peu',
        translation: 'a little',
        partOfSpeech: 'adverb',
        example: 'Je parle français un peu'
      }
    ],
    exercises: [
      {
        id: 'exercise-1-1',
        type: 'pronunciation',
        question: 'Pronounce: "Je comprends le français"',
        correctAnswer: 'zhuh kohm-prahn luh frahn-say',
        audioUrl: '/audio/je-comprends.mp3'
      }
    ]
  },
  {
    id: 'lesson-2',
    title: 'Vous étudiez aujourd\'hui ?',
    category: 'I speak French, a little',
    level: 'A1',
    estimatedDuration: 15,
    phrases: [
      {
        id: 'phrase-2-1',
        french: 'Vous étudiez aujourd\'hui ?',
        english: 'Are you studying today?',
        pronunciation: 'voo zay-tood-yay oh-zhoor-dwee',
        context: 'Asking about someone\'s study plans',
        usage: 'Use to ask if someone is studying or learning something'
      },
      {
        id: 'phrase-2-2',
        french: 'Je m\'appelle Pierre',
        english: 'My name is Pierre',
        pronunciation: 'zhuh mah-pell pee-air',
        context: 'Introducing yourself',
        usage: 'Formal way to say your name'
      },
      {
        id: 'phrase-2-3',
        french: 'Je viens de France, mais je travaille ici',
        english: 'I come from France, but I work here',
        pronunciation: 'zhuh vee-ahn duh frahns, may zhuh trah-vay ee-see',
        context: 'Explaining your background',
        usage: 'Use to explain where you\'re from and what you do'
      }
    ],
    grammarPoints: [
      {
        id: 'grammar-2-1',
        title: 'Present Tense - Regular -ER Verbs',
        explanation: 'Most French verbs ending in -er follow a regular pattern',
        examples: ['étudier (to study)', 'travailler (to work)', 'parler (to speak)'],
        rules: ['Remove -er ending and add: -e, -es, -e, -ons, -ez, -ent', 'Je étudie, Tu étudies, Il/Elle étudie']
      }
    ],
    vocabulary: [
      {
        id: 'vocab-2-1',
        word: 'étudier',
        translation: 'to study',
        partOfSpeech: 'verb',
        example: 'Je étudie le français'
      },
      {
        id: 'vocab-2-2',
        word: 'aujourd\'hui',
        translation: 'today',
        partOfSpeech: 'adverb',
        example: 'Je travaille aujourd\'hui'
      }
    ],
    exercises: [
      {
        id: 'exercise-2-1',
        type: 'translation',
        question: 'Translate: "My name is Pierre"',
        correctAnswer: 'Je m\'appelle Pierre',
        options: ['Je m\'appelle Pierre', 'Mon nom est Pierre', 'Je suis Pierre', 'Pierre est mon nom']
      }
    ]
  },
  // INTERMEDIATE LEVEL (B1-B2)
  {
    id: 'lesson-15',
    title: 'Vous avez des projets pour aujourd\'hui ?',
    category: 'Do you have plans?',
    level: 'B1',
    estimatedDuration: 20,
    phrases: [
      {
        id: 'phrase-15-1',
        french: 'Vous avez des projets pour aujourd\'hui ?',
        english: 'Do you have plans for today?',
        pronunciation: 'voo zah-vay day proh-zhay poor oh-zhoor-dwee',
        context: 'Making conversation about daily plans',
        usage: 'Use to ask about someone\'s plans or schedule'
      },
      {
        id: 'phrase-15-2',
        french: 'J\'ai besoin d\'apprendre le français',
        english: 'I need to learn French',
        pronunciation: 'zhay buh-zwahn dah-prahn-dr luh frahn-say',
        context: 'Expressing a need or requirement',
        usage: 'Use "avoir besoin de" to express necessity'
      },
      {
        id: 'phrase-15-3',
        french: 'Je veux un café avec du sucre',
        english: 'I want a coffee with sugar',
        pronunciation: 'zhuh vuh uhn kah-fay ah-vek dew sew-kr',
        context: 'Ordering at a café',
        usage: 'Use "vouloir" to express desire or want'
      }
    ],
    grammarPoints: [
      {
        id: 'grammar-15-1',
        title: 'Avoir besoin de (To need)',
        explanation: 'Use "avoir besoin de" to express necessity or need',
        examples: ['J\'ai besoin de', 'Tu as besoin de', 'Il/Elle a besoin de'],
        rules: ['Followed by infinitive or noun', 'Literally means "to have need of"']
      }
    ],
    vocabulary: [
      {
        id: 'vocab-15-1',
        word: 'projet',
        translation: 'project/plan',
        partOfSpeech: 'noun',
        example: 'J\'ai un projet pour demain'
      },
      {
        id: 'vocab-15-2',
        word: 'besoin',
        translation: 'need',
        partOfSpeech: 'noun',
        example: 'J\'ai besoin d\'aide'
      }
    ],
    exercises: [
      {
        id: 'exercise-15-1',
        type: 'speaking',
        question: 'Say: "I need to learn French"',
        correctAnswer: 'J\'ai besoin d\'apprendre le français',
        audioUrl: '/audio/j-ai-besoin.mp3'
      }
    ]
  },
  // ADVANCED LEVEL (C1-C2)
  {
    id: 'lesson-100',
    title: 'Arrêtez de mentir !',
    category: 'Stop doing that!',
    level: 'C1',
    estimatedDuration: 25,
    phrases: [
      {
        id: 'phrase-100-1',
        french: 'Arrêtez de mentir !',
        english: 'Stop lying!',
        pronunciation: 'ah-reh-tay duh mahn-teer',
        context: 'Expressing frustration or anger',
        usage: 'Use "arrêter de" + infinitive to tell someone to stop doing something'
      },
      {
        id: 'phrase-100-2',
        french: 'Va-t\'en !',
        english: 'Go away!',
        pronunciation: 'vah tahn',
        context: 'Telling someone to leave',
        usage: 'Informal and direct way to tell someone to leave'
      },
      {
        id: 'phrase-100-3',
        french: 'Je ne partirai pas sans mon argent',
        english: 'I won\'t leave without my money',
        pronunciation: 'zhuh nuh pahr-tee-ray pah sahn mohn ahr-zhahn',
        context: 'Expressing determination',
        usage: 'Use future tense to express certainty about future actions'
      }
    ],
    grammarPoints: [
      {
        id: 'grammar-100-1',
        title: 'Future Tense',
        explanation: 'Use future tense to express actions that will happen',
        examples: ['Je partirai', 'Tu partiras', 'Il/Elle partira', 'Nous partirons', 'Vous partirez', 'Ils/Elles partiront'],
        rules: ['Add endings to infinitive: -ai, -as, -a, -ons, -ez, -ont', 'For -er verbs, remove -e before adding endings']
      }
    ],
    vocabulary: [
      {
        id: 'vocab-100-1',
        word: 'mentir',
        translation: 'to lie',
        partOfSpeech: 'verb',
        example: 'Il ne faut pas mentir'
      },
      {
        id: 'vocab-100-2',
        word: 'partir',
        translation: 'to leave',
        partOfSpeech: 'verb',
        example: 'Je vais partir demain'
      }
    ],
    exercises: [
      {
        id: 'exercise-100-1',
        type: 'listening',
        question: 'Listen and repeat: "Arrêtez de mentir !"',
        correctAnswer: 'ah-reh-tay duh mahn-teer',
        audioUrl: '/audio/arretez-de-mentir.mp3'
      }
    ]
  }
];

// Helper functions
export function getLessonsByLevel(level: string): Lesson[] {
  return frenchLessons.filter(lesson => lesson.level === level);
}

export function getLessonById(id: string): Lesson | undefined {
  return frenchLessons.find(lesson => lesson.id === id);
}

export function getRandomLesson(): Lesson {
  const randomIndex = Math.floor(Math.random() * frenchLessons.length);
  return frenchLessons[randomIndex];
}

export function getLessonsByCategory(category: string): Lesson[] {
  return frenchLessons.filter(lesson => lesson.category === category);
}

export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const currentIndex = frenchLessons.findIndex(lesson => lesson.id === currentLessonId);
  if (currentIndex === -1 || currentIndex === frenchLessons.length - 1) {
    return undefined;
  }
  return frenchLessons[currentIndex + 1];
}

export function getPreviousLesson(currentLessonId: string): Lesson | undefined {
  const currentIndex = frenchLessons.findIndex(lesson => lesson.id === currentLessonId);
  if (currentIndex <= 0) {
    return undefined;
  }
  return frenchLessons[currentIndex - 1];
} 