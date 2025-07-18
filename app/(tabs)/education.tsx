import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const EducationScreen = () => {
  const [selectedTab, setSelectedTab] = useState<'glossary' | 'tips' | 'resources'>('glossary');

  const glossaryItems = [
    {
      term: 'Ponzi Scheme',
      definition: 'A fraudulent investment operation that pays returns to existing investors using capital from new investors, rather than from legitimate business operations.',
      example: 'Bernie Madoff\'s investment scandal was one of the largest Ponzi schemes in history.',
    },
    {
      term: 'Pyramid Scheme',
      definition: 'A business model that recruits members via a promise of payments for enrolling others into the scheme, rather than supplying investments or sale of products.',
      example: 'Multi-level marketing schemes that focus more on recruitment than product sales.',
    },
    {
      term: 'MLM (Multi-Level Marketing)',
      definition: 'A legitimate business strategy where revenue is generated from a non-salaried workforce selling products, but can become illegal if it focuses primarily on recruitment.',
      example: 'Companies like Amway and Tupperware use MLM models legally.',
    },
    {
      term: 'Red Flags',
      definition: 'Warning signs that indicate a potential scam or fraudulent investment opportunity.',
      example: 'Guaranteed high returns, pressure to recruit others, lack of transparency.',
    },
  ];

  const tips = [
    {
      title: 'Verify Before You Invest',
      description: 'Always check if the company is registered with SEBI, RBI, or other regulatory bodies.',
      icon: 'verified',
    },
    {
      title: 'Too Good to Be True',
      description: 'If returns seem unrealistically high with no risk, it\'s likely a scam.',
      icon: 'warning',
    },
    {
      title: 'Pressure Tactics',
      description: 'Legitimate investments don\'t require immediate decisions or high-pressure sales.',
      icon: 'timer',
    },
    {
      title: 'Transparency Matters',
      description: 'Real businesses provide clear information about their operations and financials.',
      icon: 'visibility',
    },
    {
      title: 'Recruitment Focus',
      description: 'Be wary of schemes that emphasize recruiting others over actual products or services.',
      icon: 'people',
    },
    {
      title: 'Documentation',
      description: 'Always get proper documentation and receipts for any investment.',
      icon: 'description',
    },
  ];

  const resources = [
    {
      title: 'SEBI Investor Portal',
      description: 'Securities and Exchange Board of India - Official investor protection portal',
      url: 'https://www.sebi.gov.in',
      icon: 'account-balance',
    },
    {
      title: 'RBI Consumer Education',
      description: 'Reserve Bank of India - Banking and financial awareness',
      url: 'https://www.rbi.org.in',
      icon: 'account-balance',
    },
    {
      title: 'Cybercrime Reporting',
      description: 'Report financial fraud and cybercrime to authorities',
      url: 'https://cybercrime.gov.in',
      icon: 'security',
    },
    {
      title: 'PFMS Scholarship',
      description: 'Public Financial Management System - Government schemes verification',
      url: 'https://pfms.nic.in',
      icon: 'school',
    },
  ];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const renderGlossary = () => (
    <View>
      {glossaryItems.map((item, index) => (
        <View key={index} style={styles.glossaryCard}>
          <Text style={styles.glossaryTerm}>{item.term}</Text>
          <Text style={styles.glossaryDefinition}>{item.definition}</Text>
          <View style={styles.exampleContainer}>
            <MaterialIcons name="lightbulb" size={16} color="#ffd93d" />
            <Text style={styles.glossaryExample}>{item.example}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderTips = () => (
    <View>
      {tips.map((tip, index) => (
        <View key={index} style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <MaterialIcons name={tip.icon as any} size={24} color="#4ecdc4" />
            <Text style={styles.tipTitle}>{tip.title}</Text>
          </View>
          <Text style={styles.tipDescription}>{tip.description}</Text>
        </View>
      ))}
    </View>
  );

  const renderResources = () => (
    <View>
      {resources.map((resource, index) => (
        <TouchableOpacity
          key={index}
          style={styles.resourceCard}
          onPress={() => handleLinkPress(resource.url)}
          activeOpacity={0.8}
        >
          <View style={styles.resourceHeader}>
            <MaterialIcons name={resource.icon as any} size={24} color="#45b7d1" />
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceDescription}>{resource.description}</Text>
            </View>
            <MaterialIcons name="open-in-new" size={20} color="#b8b8b8" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Education Center</Text>
          <Text style={styles.subtitle}>Learn to protect yourself from fraud</Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'glossary' && styles.activeTab]}
            onPress={() => setSelectedTab('glossary')}
          >
            <MaterialIcons 
              name="menu-book" 
              size={20} 
              color={selectedTab === 'glossary' ? 'white' : '#b8b8b8'} 
            />
            <Text style={[
              styles.tabText,
              selectedTab === 'glossary' && styles.activeTabText
            ]}>
              Glossary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === 'tips' && styles.activeTab]}
            onPress={() => setSelectedTab('tips')}
          >
            <MaterialIcons 
              name="lightbulb" 
              size={20} 
              color={selectedTab === 'tips' ? 'white' : '#b8b8b8'} 
            />
            <Text style={[
              styles.tabText,
              selectedTab === 'tips' && styles.activeTabText
            ]}>
              Tips
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === 'resources' && styles.activeTab]}
            onPress={() => setSelectedTab('resources')}
          >
            <MaterialIcons 
              name="link" 
              size={20} 
              color={selectedTab === 'resources' ? 'white' : '#b8b8b8'} 
            />
            <Text style={[
              styles.tabText,
              selectedTab === 'resources' && styles.activeTabText
            ]}>
              Resources
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedTab === 'glossary' && renderGlossary()}
          {selectedTab === 'tips' && renderTips()}
          {selectedTab === 'resources' && renderResources()}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#b8b8b8',
    marginTop: 8,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#ff6b6b',
  },
  tabText: {
    color: '#b8b8b8',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  glossaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  glossaryTerm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4ecdc4',
    marginBottom: 10,
  },
  glossaryDefinition: {
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
    marginBottom: 15,
  },
  exampleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 217, 61, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  glossaryExample: {
    fontSize: 13,
    color: '#b8b8b8',
    fontStyle: 'italic',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  tipCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 12,
  },
  tipDescription: {
    fontSize: 14,
    color: '#b8b8b8',
    lineHeight: 20,
  },
  resourceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceContent: {
    flex: 1,
    marginLeft: 15,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#b8b8b8',
    lineHeight: 18,
  },
});

export default EducationScreen;