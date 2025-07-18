# PonziXposed - The Fraud Unfolded

**"Play the scam to spot the scam."**  
Learn fraud. Stop fraud. Be financially fearless.

## 🚀 About PonziXposed

PonziXposed is a React Native gamified mobile application that simulates the lifecycle of Ponzi schemes from different perspectives (Founder, Victim, Regulator). Through interactive gameplay, tree/graph-based simulation, and story-driven learning, users can see how these scams grow and collapse — and learn how to avoid them in real life.

## 🎯 Problem Statement

In today's digital age, millions fall prey to fraudulent investment schemes — especially Ponzi and pyramid schemes that promise unrealistic returns. These scams often thrive due to low financial literacy, emotional manipulation, and the inability to visualize their exponential collapse.

## 📱 Key Features

### 🎮 Ponzi Scheme Simulator
- Play as a scam founder, victim, or regulator
- Recruit virtual investors and manage payouts
- Visualize the inevitable collapse in real-time
- Interactive tree visualization showing recruitment structure

### 🚩 Red Flag Detection Game
- Time-based minigames to spot fraud indicators
- Learn to identify terms like "guaranteed returns," "invite-only," etc.
- Score-based system with educational feedback

### 📖 Story Mode
- Real-life inspired, choice-based stories
- Explore schemes like Bernie Madoff, GainBitcoin, SpeakAsia
- Emotionally immersive learning experience

### 📚 Education Center
- Comprehensive glossary: Ponzi vs. Pyramid vs. MLM
- Tips on how to verify legitimate platforms
- Links to SEBI, RBI, and cybercrime reporting portals

### 🏅 Gamification Elements
- Progress tracking and experience points
- Badges: "Red Flag Spotter", "Collapse Survivor", "Financial Detective"
- Achievement system and leaderboards

## 🛠 Tech Stack

- **Frontend**: React Native + Expo
- **State Management**: Zustand
- **Charts & Visualizations**: react-native-svg
- **Animations**: React Native Reanimated
- **Icons**: Lucide React Native
- **Navigation**: Expo Router

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ponzixposed
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📱 App Structure

```
app/
├── (tabs)/           # Main tab navigation
│   ├── home.tsx      # Dashboard with features overview
│   ├── simulator.tsx # Ponzi scheme simulator
│   ├── education.tsx # Learning resources
│   └── profile.tsx   # User progress and settings
├── redflags.tsx      # Red flag detection game
├── story.tsx         # Interactive story mode
└── index.tsx         # Welcome screen

store/
├── ponziStore.ts     # Zustand state management

components/
├── PonziTreeVisualization.tsx # Tree visualization component
```

## 🎮 How to Play

### Simulator Mode
1. Choose your role: Founder, Victim, or Regulator
2. As a founder: Recruit investors and manage the scheme
3. Watch the pyramid structure grow and eventually collapse
4. Learn from the inevitable failure

### Red Flag Game
1. Read investment pitches and scenarios
2. Identify whether they contain red flags
3. Get immediate feedback and explanations
4. Improve your fraud detection skills

### Story Mode
1. Experience real-world fraud cases
2. Make choices as different characters
3. See the consequences of your decisions
4. Learn from historical scam cases

## 🌍 Social Impact

- Promotes financial literacy through simulation
- Helps users visually understand scam structures
- Protects vulnerable populations from digital fraud
- Scalable to vernacular languages for rural outreach
- Potential for integration in school curriculums

## 🔮 Future Scope

- ML-based scam detector using user behavior
- Expand to Crypto & MLM fraud simulations
- Community story submissions
- Partnership with government/banks for verified content
- Multi-language support

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests for any improvements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@ponzixposed.com or join our community discussions.

---

**Remember**: Real investments carry risk, and if something sounds too good to be true, it probably is. Stay informed, stay protected! 🛡️