# FrenchBuddy

A modern, interactive web application to master French from A1 to C2. Built for speaking, listening, and real-world communication, inspired by Pimsleur and Michael Thomas methods.

## Features
- **A1–C2 Level Progression**: Lessons, grammar, and vocabulary for all CEFR levels
- **Speaking & Pronunciation Practice**: Real-time feedback using Web Speech API
- **Spaced Repetition**: Adaptive review scheduling
- **Natural, Dynamic Content**: Not hard-coded, but context-rich and progressive
- **Progress Tracking**: Stats, streaks, achievements, and skill breakdown
- **Customizable Settings**: Audio, reminders, learning goals, and more
- **Export/Import Progress**: Data backup and restore
- **Responsive, Accessible UI**: Mobile-first, beautiful, and fast

## Tech Stack
- **Next.js 14** (appDir, TypeScript)
- **Tailwind CSS** (custom design system)
- **Zustand** (state management, persist)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **React Hot Toast** (notifications)
- **Web Speech API** (speech recognition & synthesis)

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run locally:**
   ```bash
   npm run dev
   ```
3. **Open:** [http://localhost:3000](http://localhost:3000)

## Deployment
- **Vercel Ready**: Just connect your repo and deploy!
- Includes `vercel.json` for custom headers and Next.js build

## Learning Methodology
- **Active, hands-free learning**
- **Spaced repetition** for long-term retention
- **Adaptive content** based on your progress
- **Focus on speaking and listening**
- **Natural grammar and vocabulary introduction**

## Folder Structure
- `app/` — Next.js appDir pages and layout
- `components/` — UI and learning components
- `lib/data/` — Lessons, grammar, vocabulary
- `lib/store/` — Zustand state management

## Browser Support
- Chrome, Edge, Safari (Web Speech API required for full features)

## License
MIT 