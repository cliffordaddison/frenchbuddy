export interface Lesson {
  id: string;
  title: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: 'greetings' | 'basics' | 'conversation' | 'grammar' | 'vocabulary' | 'pronunciation' | 'culture';
  difficulty: number; // 1-10
  duration: number; // minutes
  phrases: Phrase[];
  grammarPoints?: GrammarPoint[];
  vocabulary?: VocabularyItem[];
  exercises?: Exercise[];
  audioUrl?: string;
}

export interface Phrase {
  id: string;
  french: string;
  english: string;
  pronunciation: string;
  audioUrl?: string;
  context?: string;
  usage?: string[];
}

export interface GrammarPoint {
  id: string;
  title: string;
  explanation: string;
  examples: string[];
  rules: string[];
}

export interface VocabularyItem {
  french: string;
  english: string;
  partOfSpeech: string;
  example: string;
  audioUrl?: string;
}

export interface Exercise {
  id: string;
  type: 'translation' | 'pronunciation' | 'grammar' | 'listening' | 'speaking';
  question: string;
  correctAnswer: string;
  options?: string[];
  audioUrl?: string;
}

export const frenchLessons: Lesson[] = [
  // A1 Level - Beginner
  {
    id: 'a1-greetings',
    title: 'Basic Greetings',
    level: 'A1',
    category: 'greetings',
    difficulty: 1,
    duration: 15,
    phrases: [
      {
        id: 'bonjour',
        french: 'Bonjour',
        english: 'Hello / Good morning',
        pronunciation: 'bohn-ZHOOR',
        context: 'Used during the day until evening',
        usage: ['Greeting someone in the morning', 'Formal greeting']
      },
      {
        id: 'salut',
        french: 'Salut',
        english: 'Hi / Hello',
        pronunciation: 'sah-LOO',
        context: 'Informal greeting',
        usage: ['Greeting friends', 'Casual conversation']
      },
      {
        id: 'au-revoir',
        french: 'Au revoir',
        english: 'Goodbye',
        pronunciation: 'oh ruh-VWAHR',
        context: 'Standard goodbye',
        usage: ['Leaving a conversation', 'Ending a meeting']
      },
      {
        id: 'merci',
        french: 'Merci',
        english: 'Thank you',
        pronunciation: 'mehr-SEE',
        context: 'Expressing gratitude',
        usage: ['After receiving help', 'When someone does something for you']
      },
      {
        id: 's-il-vous-plait',
        french: "S'il vous plaît",
        english: 'Please',
        pronunciation: 'seel voo PLEH',
        context: 'Polite request',
        usage: ['Asking for something politely', 'Making requests']
      }
    ],
    grammarPoints: [
      {
        id: 'formal-vs-informal',
        title: 'Formal vs Informal',
        explanation: 'In French, you use different greetings depending on the formality of the situation.',
        examples: ['Bonjour (formal) vs Salut (informal)', 'Au revoir (formal) vs Salut (informal)'],
        rules: ['Use "vous" for formal situations', 'Use "tu" for informal situations']
      }
    ]
  },
  {
    id: 'a1-introductions',
    title: 'Introducing Yourself',
    level: 'A1',
    category: 'basics',
    difficulty: 2,
    duration: 20,
    phrases: [
      {
        id: 'je-m-appelle',
        french: 'Je m\'appelle [Name]',
        english: 'My name is [Name]',
        pronunciation: 'zhuh mah-PELL',
        context: 'Introducing yourself',
        usage: ['Meeting new people', 'Formal introductions']
      },
      {
        id: 'comment-allez-vous',
        french: 'Comment allez-vous ?',
        english: 'How are you? (formal)',
        pronunciation: 'koh-MAHN tah-lay VOO',
        context: 'Asking about someone\'s well-being formally',
        usage: ['Meeting someone for the first time', 'Professional settings']
      },
      {
        id: 'comment-vas-tu',
        french: 'Comment vas-tu ?',
        english: 'How are you? (informal)',
        pronunciation: 'koh-MAHN vah TOO',
        context: 'Asking about someone\'s well-being informally',
        usage: ['Talking to friends', 'Casual conversations']
      },
      {
        id: 'tres-bien',
        french: 'Très bien',
        english: 'Very well',
        pronunciation: 'treh bee-EN',
        context: 'Responding positively to "How are you?"',
        usage: ['When you\'re feeling good', 'Positive response']
      },
      {
        id: 'enchanté',
        french: 'Enchanté(e)',
        english: 'Nice to meet you',
        pronunciation: 'ahn-shahn-TAY',
        context: 'After being introduced to someone',
        usage: ['After meeting someone new', 'Polite response to introduction']
      }
    ],
    grammarPoints: [
      {
        id: 'je-pronoun',
        title: 'The Pronoun "Je"',
        explanation: '"Je" means "I" in French and is used to talk about yourself.',
        examples: ['Je m\'appelle Marie', 'Je suis étudiant'],
        rules: ['Always capitalize "Je"', 'Use "Je" before verbs']
      }
    ]
  },
  {
    id: 'a1-numbers',
    title: 'Numbers 1-20',
    level: 'A1',
    category: 'basics',
    difficulty: 2,
    duration: 25,
    phrases: [
      {
        id: 'un',
        french: 'Un',
        english: 'One',
        pronunciation: 'uhn',
        context: 'Counting or specifying quantity',
        usage: ['Counting objects', 'Specifying quantity']
      },
      {
        id: 'deux',
        french: 'Deux',
        english: 'Two',
        pronunciation: 'duh',
        context: 'Counting or specifying quantity',
        usage: ['Counting objects', 'Specifying quantity']
      },
      {
        id: 'trois',
        french: 'Trois',
        english: 'Three',
        pronunciation: 'twah',
        context: 'Counting or specifying quantity',
        usage: ['Counting objects', 'Specifying quantity']
      }
    ],
    vocabulary: [
      {
        french: 'zéro',
        english: 'zero',
        partOfSpeech: 'number',
        example: 'Il y a zéro problème'
      },
      {
        french: 'dix',
        english: 'ten',
        partOfSpeech: 'number',
        example: 'J\'ai dix euros'
      },
      {
        french: 'vingt',
        english: 'twenty',
        partOfSpeech: 'number',
        example: 'J\'ai vingt ans'
      }
    ]
  },
  
  // A2 Level - Elementary
  {
    id: 'a2-daily-routine',
    title: 'Daily Routine',
    level: 'A2',
    category: 'conversation',
    difficulty: 3,
    duration: 30,
    phrases: [
      {
        id: 'je-me-leve',
        french: 'Je me lève à sept heures',
        english: 'I get up at seven o\'clock',
        pronunciation: 'zhuh muh LEV ah set UHR',
        context: 'Describing morning routine',
        usage: ['Talking about your schedule', 'Describing daily activities']
      },
      {
        id: 'je-vais-au-travail',
        french: 'Je vais au travail',
        english: 'I go to work',
        pronunciation: 'zhuh vay oh trah-VAY',
        context: 'Describing daily activities',
        usage: ['Talking about work routine', 'Describing daily schedule']
      },
      {
        id: 'je-mange',
        french: 'Je mange le petit déjeuner',
        english: 'I eat breakfast',
        pronunciation: 'zhuh MAHNZH luh puh-TEE day-zhuh-NAY',
        context: 'Describing meals',
        usage: ['Talking about eating habits', 'Describing daily routine']
      }
    ],
    grammarPoints: [
      {
        id: 'reflexive-verbs',
        title: 'Reflexive Verbs',
        explanation: 'Reflexive verbs are used when the subject and object are the same person.',
        examples: ['Je me lève', 'Je me couche', 'Je me lave'],
        rules: ['Use "me" before the verb', 'The verb agrees with the subject']
      }
    ]
  },
  
  // B1 Level - Intermediate
  {
    id: 'b1-travel',
    title: 'Travel and Transportation',
    level: 'B1',
    category: 'conversation',
    difficulty: 5,
    duration: 35,
    phrases: [
      {
        id: 'je-voudrais-reserver',
        french: 'Je voudrais réserver une chambre',
        english: 'I would like to book a room',
        pronunciation: 'zhuh voo-DREH ray-zair-VAY oon SHAHMBR',
        context: 'Making hotel reservations',
        usage: ['Booking accommodation', 'Making travel arrangements']
      },
      {
        id: 'ou-est-la-gare',
        french: 'Où est la gare ?',
        english: 'Where is the train station?',
        pronunciation: 'oo ay lah GAHR',
        context: 'Asking for directions',
        usage: ['Finding transportation', 'Getting directions']
      },
      {
        id: 'combien-coute',
        french: 'Combien ça coûte ?',
        english: 'How much does it cost?',
        pronunciation: 'kohm-BEE-EN sah KOOT',
        context: 'Asking about prices',
        usage: ['Shopping', 'Inquiring about costs']
      }
    ],
    grammarPoints: [
      {
        id: 'conditional-tense',
        title: 'The Conditional Tense',
        explanation: 'The conditional is used to express polite requests or hypothetical situations.',
        examples: ['Je voudrais', 'J\'aimerais', 'Je pourrais'],
        rules: ['Use the conditional for polite requests', 'Formed with the future stem + imperfect endings']
      }
    ]
  },
  
  // B2 Level - Upper Intermediate
  {
    id: 'b2-business',
    title: 'Business French',
    level: 'B2',
    category: 'conversation',
    difficulty: 7,
    duration: 40,
    phrases: [
      {
        id: 'je-vous-presente',
        french: 'Je vous présente notre équipe',
        english: 'Let me introduce you to our team',
        pronunciation: 'zhuh voo pray-ZAHNT noh-TR ay-KEEP',
        context: 'Professional introductions',
        usage: ['Business meetings', 'Introducing colleagues']
      },
      {
        id: 'nous-avons-discute',
        french: 'Nous avons discuté de ce projet',
        english: 'We discussed this project',
        pronunciation: 'noo zah-VOHN dee-skew-TAY duh suh proh-ZHAY',
        context: 'Business discussions',
        usage: ['Work meetings', 'Project updates']
      }
    ],
    grammarPoints: [
      {
        id: 'subjunctive',
        title: 'The Subjunctive Mood',
        explanation: 'The subjunctive is used to express doubt, possibility, or necessity.',
        examples: ['Il faut que je parte', 'Je veux que vous veniez'],
        rules: ['Used after certain expressions', 'Expresses subjectivity or doubt']
      }
    ]
  },
  
  // C1 Level - Advanced
  {
    id: 'c1-literature',
    title: 'French Literature and Culture',
    level: 'C1',
    category: 'culture',
    difficulty: 8,
    duration: 45,
    phrases: [
      {
        id: 'cette-oeuvre',
        french: 'Cette œuvre représente un tournant dans la littérature française',
        english: 'This work represents a turning point in French literature',
        pronunciation: 'set UH-vruh ray-pray-ZAHNT uhn toor-NAHN dahn lah lee-tay-rah-TEWR frahn-SEZ',
        context: 'Academic discussion of literature',
        usage: ['Literary analysis', 'Cultural discussions']
      },
      {
        id: 'l-auteur-exprime',
        french: 'L\'auteur exprime sa vision du monde à travers ses personnages',
        english: 'The author expresses his vision of the world through his characters',
        pronunciation: 'loh-TEUR eks-PREEM sah vee-ZYOHN dew MOHND ah trah-VERS say pair-soh-NAZH',
        context: 'Literary analysis',
        usage: ['Book discussions', 'Literary criticism']
      }
    ],
    grammarPoints: [
      {
        id: 'complex-sentences',
        title: 'Complex Sentence Structures',
        explanation: 'Advanced French uses complex sentence structures with multiple clauses.',
        examples: ['Bien que je sois fatigué, je continue à travailler'],
        rules: ['Use subjunctive in subordinate clauses', 'Maintain agreement throughout']
      }
    ]
  },
  
  // C2 Level - Mastery
  {
    id: 'c2-philosophy',
    title: 'Philosophy and Abstract Concepts',
    level: 'C2',
    category: 'culture',
    difficulty: 10,
    duration: 50,
    phrases: [
      {
        id: 'la-nature',
        french: 'La nature de l\'existence humaine suscite des interrogations profondes',
        english: 'The nature of human existence raises profound questions',
        pronunciation: 'lah nah-TEWR duh layg-zee-STAHNS ew-MEN soo-SEET day zehn-tehr-oh-gah-SYOHN proh-FOHND',
        context: 'Philosophical discussion',
        usage: ['Academic writing', 'Philosophical debates']
      },
      {
        id: 'l-essence',
        french: 'L\'essence même de la conscience reste un mystère',
        english: 'The very essence of consciousness remains a mystery',
        pronunciation: 'lay-SAHNS MEM duh lah kohn-SYAHNS rest uhn mees-TAIR',
        context: 'Abstract philosophical discussion',
        usage: ['Philosophical texts', 'Academic discourse']
      }
    ],
    grammarPoints: [
      {
        id: 'nuanced-expressions',
        title: 'Nuanced Expressions',
        explanation: 'C2 level French uses highly nuanced expressions and complex grammatical structures.',
        examples: ['Il va sans dire que', 'Cela va de soi'],
        rules: ['Mastery of all tenses and moods', 'Ability to express subtle nuances']
      }
    ]
  }
];

export const getLessonsByLevel = (level: string): Lesson[] => {
  return frenchLessons.filter(lesson => lesson.level === level);
};

export const getLessonById = (id: string): Lesson | undefined => {
  return frenchLessons.find(lesson => lesson.id === id);
};

export const getRandomLesson = (level?: string): Lesson => {
  const lessons = level ? getLessonsByLevel(level) : frenchLessons;
  const randomIndex = Math.floor(Math.random() * lessons.length);
  return lessons[randomIndex];
}; 