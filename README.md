# 🇫🇷 FrenchBuddy - Complete French Learning Web Application

A comprehensive, interactive French language learning web application designed to help users master French from A1 to C2 levels. Built with modern web technologies and inspired by proven language learning methods like Pimsleur and Michael Thomas.

## ✨ Features

### 🎯 **Comprehensive Learning Path**
- **A1 to C2 Levels**: Complete curriculum covering all CEFR levels
- **Progressive Difficulty**: Natural progression from beginner to mastery
- **Adaptive Learning**: Content adjusts to user's current level and progress

### 🗣️ **Interactive Learning Experience**
- **Pronunciation Practice**: Real-time speech recognition and feedback
- **Audio Pronunciation**: Native French pronunciation with adjustable speed
- **Grammar Explanations**: Detailed grammar points with examples and rules
- **Contextual Learning**: Phrases with usage examples and cultural context

### 📊 **Progress Tracking**
- **Detailed Statistics**: Track study time, completed lessons, and scores
- **Skill Assessment**: Separate tracking for pronunciation, grammar, listening, and speaking
- **Achievement System**: Unlock badges and milestones as you progress
- **Study Streaks**: Maintain motivation with daily study tracking

### 🎨 **Modern User Interface**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Animations**: Smooth transitions and engaging interactions
- **Intuitive Navigation**: Easy-to-use interface with clear progress indicators
- **Accessibility**: Designed with accessibility in mind

### 🔧 **Customizable Settings**
- **Learning Preferences**: Adjust pronunciation speed, audio settings, and hints
- **Study Goals**: Set daily study targets and reminders
- **Data Management**: Export and import progress data
- **Level Selection**: Choose your starting level and adjust as needed

## 🚀 Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand for persistent state
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **Notifications**: React Hot Toast for user feedback
- **Speech Recognition**: Web Speech API for pronunciation practice
- **Text-to-Speech**: Web Speech Synthesis for audio pronunciation

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frenchbuddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Learning Methodology

FrenchBuddy incorporates proven language learning techniques:

### **Spaced Repetition**
- Intelligent review scheduling based on user performance
- Vocabulary mastery tracking with automatic repetition

### **Active Learning**
- Interactive pronunciation practice with real-time feedback
- Speaking exercises that encourage active participation
- Contextual phrase usage with real-world examples

### **Natural Progression**
- Grammar introduced gradually through practical examples
- Vocabulary building through thematic lessons
- Cultural context and usage scenarios

### **Adaptive Content**
- Lessons adjust to user's current level
- Personalized recommendations based on progress
- Flexible difficulty settings

## 📚 Lesson Structure

Each lesson includes:

- **Phrases**: Essential French expressions with translations
- **Pronunciation**: Phonetic guides and audio pronunciation
- **Context**: When and how to use each phrase
- **Grammar Points**: Relevant grammar explanations
- **Practice Exercises**: Interactive learning activities
- **Progress Tracking**: Detailed performance metrics

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for main actions and branding
- **French**: Red tones for pronunciation and speaking features
- **Success**: Green for achievements and progress
- **Warning**: Yellow for hints and tips
- **Error**: Red for corrections and mistakes

### Typography
- **Font**: Inter for clean, modern readability
- **Hierarchy**: Clear typographic scale for content organization
- **Accessibility**: High contrast ratios and readable font sizes

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for custom configuration:

```env
NEXT_PUBLIC_APP_NAME=FrenchBuddy
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Customization
- **Lesson Content**: Modify `lib/data/lessons.ts` to add custom lessons
- **Styling**: Update `tailwind.config.js` for theme customization
- **Features**: Extend components in `components/` directory

## 📱 Browser Support

- **Chrome**: 90+ (Full support)
- **Firefox**: 88+ (Full support)
- **Safari**: 14+ (Full support)
- **Edge**: 90+ (Full support)

**Note**: Speech recognition features require HTTPS in production.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure build settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. **Deploy** with automatic HTTPS

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by proven language learning methods (Pimsleur, Michael Thomas)
- Built with modern web technologies for optimal user experience
- Designed for accessibility and inclusive learning

## 📞 Support

For support, questions, or feature requests:
- Create an issue in the GitHub repository
- Contact the development team

---

**🇫🇷 Start your French learning journey with FrenchBuddy today!** 