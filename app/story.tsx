import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface StoryChoice {
  id: number;
  text: string;
  consequence: string;
  isGoodChoice: boolean;
}

interface StoryScene {
  id: number;
  title: string;
  description: string;
  choices: StoryChoice[];
}

interface Story {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  scenes: StoryScene[];
  basedOn: string;
}

const stories: Story[] = [
  {
    id: 1,
    title: "The Bernie Madoff Scandal",
    description: "Experience the largest Ponzi scheme in history through the eyes of different stakeholders.",
    difficulty: "Advanced",
    estimatedTime: "15-20 min",
    basedOn: "Bernie Madoff Investment Securities LLC",
    scenes: [
      {
        id: 1,
        title: "The Exclusive Invitation",
        description: "You receive an invitation to invest with Bernie Madoff's exclusive fund. Friends say he's been delivering consistent 10-12% returns for decades, even during market downturns.",
        choices: [
          {
            id: 1,
            text: "Invest immediately - these returns are amazing!",
            consequence: "You invest $100,000. Initially, you receive steady returns and feel confident.",
            isGoodChoice: false
          },
          {
            id: 2,
            text: "Ask for detailed information about the investment strategy",
            consequence: "Madoff's team gives vague answers about 'split-strike conversion strategy' but no real details.",
            isGoodChoice: true
          },
          {
            id: 3,
            text: "Research the fund's regulatory filings and auditor",
            consequence: "You discover the auditor is a tiny firm with only 3 employees for a $65 billion fund - major red flag!",
            isGoodChoice: true
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "The GainBitcoin Trap",
    description: "Navigate through India's infamous cryptocurrency Ponzi scheme that defrauded thousands.",
    difficulty: "Intermediate",
    estimatedTime: "10-15 min",
    basedOn: "GainBitcoin & GB Miners scam",
    scenes: [
      {
        id: 1,
        title: "The Bitcoin Mining Promise",
        description: "A friend shows you GainBitcoin's website promising 10% monthly returns through Bitcoin mining. They claim to have mining farms and show pictures of equipment.",
        choices: [
          {
            id: 1,
            text: "Invest ₹50,000 immediately - Bitcoin is the future!",
            consequence: "You receive returns for 3 months, then payments suddenly stop.",
            isGoodChoice: false
          },
          {
            id: 2,
            text: "Ask to visit their mining facility",
            consequence: "They make excuses and say the facility is 'confidential' for security reasons.",
            isGoodChoice: true
          },
          {
            id: 3,
            text: "Check if they're registered with financial authorities",
            consequence: "You find no registration with SEBI or RBI - they're operating illegally!",
            isGoodChoice: true
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "The SpeakAsia Survey Scam",
    description: "Uncover how a simple survey company became one of India's largest pyramid schemes.",
    difficulty: "Beginner",
    estimatedTime: "8-12 min",
    basedOn: "SpeakAsia Online Pvt Ltd",
    scenes: [
      {
        id: 1,
        title: "Easy Money from Surveys",
        description: "Your neighbor earned ₹15,000 last month just by filling surveys on SpeakAsia. They say you can earn ₹1,000 per week by answering simple questions, plus bonuses for referring others.",
        choices: [
          {
            id: 1,
            text: "Sign up and pay the ₹11,000 registration fee",
            consequence: "You complete surveys but realize most income comes from recruiting others, not surveys.",
            isGoodChoice: false
          },
          {
            id: 2,
            text: "Ask why you need to pay to work for them",
            consequence: "They claim it's for 'training materials' but can't explain why surveys require payment.",
            isGoodChoice: true
          },
          {
            id: 3,
            text: "Research who's buying these survey results",
            consequence: "You can't find any major companies using SpeakAsia's survey data - suspicious!",
            isGoodChoice: true
          }
        ]
      }
    ]
  }
];

const StoryMode = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [storyProgress, setStoryProgress] = useState<{
    choices: number[];
    score: number;
  }>({ choices: [], score: 0 });

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
    setCurrentScene(0);
    setStoryProgress({ choices: [], score: 0 });
  };

  const handleChoiceSelect = (choice: StoryChoice) => {
    const newChoices = [...storyProgress.choices, choice.id];
    const newScore = storyProgress.score + (choice.isGoodChoice ? 1 : 0);
    
    setStoryProgress({
      choices: newChoices,
      score: newScore
    });

    // For now, just show the consequence and end the story
    // In a full implementation, this would continue to the next scene
    setTimeout(() => {
      setSelectedStory(null);
      setCurrentScene(0);
      setStoryProgress({ choices: [], score: 0 });
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4ecdc4';
      case 'Intermediate': return '#ffd93d';
      case 'Advanced': return '#ff6b6b';
      default: return '#b8b8b8';
    }
  };

  if (selectedStory) {
    const currentSceneData = selectedStory.scenes[currentScene];
    
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          {/* Story Header */}
          <View style={styles.storyHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedStory(null)}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.storyInfo}>
              <Text style={styles.storyTitle}>{selectedStory.title}</Text>
              <Text style={styles.sceneTitle}>{currentSceneData.title}</Text>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentScene + 1) / selectedStory.scenes.length) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              Scene {currentScene + 1} of {selectedStory.scenes.length}
            </Text>
          </View>

          <ScrollView style={styles.storyContent}>
            {/* Scene Description */}
            <View style={styles.sceneCard}>
              <Text style={styles.sceneDescription}>
                {currentSceneData.description}
              </Text>
            </View>

            {/* Choices */}
            <View style={styles.choicesContainer}>
              <Text style={styles.choicesTitle}>What do you do?</Text>
              {currentSceneData.choices.map((choice, index) => (
                <TouchableOpacity
                  key={choice.id}
                  style={styles.choiceButton}
                  onPress={() => handleChoiceSelect(choice)}
                  activeOpacity={0.8}
                >
                  <View style={styles.choiceContent}>
                    <View style={styles.choiceNumber}>
                      <Text style={styles.choiceNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.choiceText}>{choice.text}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Educational Note */}
            <View style={styles.educationalNote}>
              <MaterialIcons name="lightbulb" size={20} color="#ffd93d" />
              <Text style={styles.educationalText}>
                Think carefully about each choice. In real life, these decisions can have serious financial consequences.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Story Mode</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Introduction */}
          <View style={styles.introContainer}>
            <MaterialIcons name="menu-book" size={48} color="#4ecdc4" />
            <Text style={styles.introTitle}>Learn Through Real Stories</Text>
            <Text style={styles.introDescription}>
              Experience real-world fraud cases through interactive storytelling. 
              Make choices and see the consequences of different decisions.
            </Text>
          </View>

          {/* Stories List */}
          <View style={styles.storiesContainer}>
            <Text style={styles.sectionTitle}>Available Stories</Text>
            {stories.map((story) => (
              <TouchableOpacity
                key={story.id}
                style={styles.storyCard}
                onPress={() => handleStorySelect(story)}
                activeOpacity={0.8}
              >
                <View style={styles.storyCardHeader}>
                  <View style={styles.storyCardInfo}>
                    <Text style={styles.storyCardTitle}>{story.title}</Text>
                    <Text style={styles.storyCardDescription}>
                      {story.description}
                    </Text>
                  </View>
                  <MaterialIcons name="play-arrow" size={32} color="#4ecdc4" />
                </View>

                <View style={styles.storyCardFooter}>
                  <View style={styles.storyMeta}>
                    <View style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(story.difficulty) }
                    ]}>
                      <Text style={styles.difficultyText}>{story.difficulty}</Text>
                    </View>
                    <View style={styles.timeContainer}>
                      <MaterialIcons name="schedule" size={16} color="#b8b8b8" />
                      <Text style={styles.timeText}>{story.estimatedTime}</Text>
                    </View>
                  </View>
                  <Text style={styles.basedOnText}>
                    Based on: {story.basedOn}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Coming Soon */}
          <View style={styles.comingSoonContainer}>
            <Text style={styles.sectionTitle}>Coming Soon</Text>
            <View style={styles.comingSoonCard}>
              <MaterialIcons name="construction" size={32} color="#ffd93d" />
              <Text style={styles.comingSoonTitle}>More Stories</Text>
              <Text style={styles.comingSoonDescription}>
                We're working on more interactive stories covering different types of financial fraud:
              </Text>
              <View style={styles.upcomingList}>
                <Text style={styles.upcomingItem}>• Cryptocurrency Scams</Text>
                <Text style={styles.upcomingItem}>• MLM Schemes</Text>
                <Text style={styles.upcomingItem}>• Investment App Frauds</Text>
                <Text style={styles.upcomingItem}>• Romance Scams</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  introContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
    marginBottom: 10,
  },
  introDescription: {
    fontSize: 16,
    color: '#b8b8b8',
    textAlign: 'center',
    lineHeight: 22,
  },
  storiesContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  storyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  storyCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  storyCardInfo: {
    flex: 1,
    marginRight: 15,
  },
  storyCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  storyCardDescription: {
    fontSize: 14,
    color: '#b8b8b8',
    lineHeight: 20,
  },
  storyCardFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 15,
  },
  storyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#b8b8b8',
    marginLeft: 4,
  },
  basedOnText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  comingSoonContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  comingSoonCard: {
    backgroundColor: 'rgba(255, 217, 61, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 217, 61, 0.2)',
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  comingSoonDescription: {
    fontSize: 14,
    color: '#b8b8b8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
  },
  upcomingList: {
    alignSelf: 'stretch',
  },
  upcomingItem: {
    fontSize: 14,
    color: '#b8b8b8',
    marginBottom: 4,
  },
  // Story Playing Styles
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  storyInfo: {
    flex: 1,
    marginLeft: 15,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4ecdc4',
  },
  sceneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 2,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ecdc4',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#b8b8b8',
    textAlign: 'center',
  },
  storyContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sceneCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  sceneDescription: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
  },
  choicesContainer: {
    marginBottom: 30,
  },
  choicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  choiceButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  choiceContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  choiceNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4ecdc4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  choiceNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  choiceText: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
  },
  educationalNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 217, 61, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
  },
  educationalText: {
    flex: 1,
    fontSize: 14,
    color: '#b8b8b8',
    lineHeight: 20,
    marginLeft: 10,
  },
});

export default StoryMode;