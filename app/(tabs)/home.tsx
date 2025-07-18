import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const features = [
    {
      id: 1,
      title: 'Ponzi Simulator',
      description: 'Experience how Ponzi schemes work from the inside',
      icon: 'psychology',
      color: '#ff6b6b',
      route: '/simulator',
    },
    {
      id: 2,
      title: 'Red Flag Game',
      description: 'Test your ability to spot fraud indicators',
      icon: 'flag',
      color: '#4ecdc4',
      route: '/redflags',
    },
    {
      id: 3,
      title: 'Story Mode',
      description: 'Learn through real-world case studies',
      icon: 'menu-book',
      color: '#45b7d1',
      route: '/story',
    },
    {
      id: 4,
      title: 'Education Center',
      description: 'Comprehensive fraud awareness resources',
      icon: 'school',
      color: '#96ceb4',
      route: '/(tabs)/education',
    },
  ];

  const stats = [
    { label: 'Schemes Exposed', value: '50+', icon: 'visibility' },
    { label: 'Users Protected', value: '10K+', icon: 'security' },
    { label: 'Success Rate', value: '95%', icon: 'trending-up' },
  ];

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Welcome back!</Text>
              <Text style={styles.subtitle}>Ready to expose some fraud?</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <MaterialIcons name="notifications" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Impact Statistics</Text>
            <View style={styles.statsRow}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <MaterialIcons name={stat.icon as any} size={24} color="#4ecdc4" />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Explore Features</Text>
            <View style={styles.featuresGrid}>
              {features.map((feature) => (
                <TouchableOpacity
                  key={feature.id}
                  style={styles.featureCard}
                  onPress={() => router.push(feature.route as any)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[feature.color, `${feature.color}CC`]}
                    style={styles.featureGradient}
                  >
                    <MaterialIcons 
                      name={feature.icon as any} 
                      size={32} 
                      color="white" 
                    />
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>
                      {feature.description}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.sectionTitle}>Daily Tip</Text>
            <View style={styles.tipCard}>
              <MaterialIcons name="lightbulb" size={24} color="#ffd93d" />
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Red Flag Alert!</Text>
                <Text style={styles.tipText}>
                  If someone promises "guaranteed returns" with no risk, it's likely a scam. 
                  Real investments always carry some level of risk.
                </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#b8b8b8',
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#b8b8b8',
    textAlign: 'center',
    marginTop: 4,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 50) / 2,
    height: 160,
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featureGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 16,
  },
  tipsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  tipCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipContent: {
    flex: 1,
    marginLeft: 15,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#b8b8b8',
    lineHeight: 20,
  },
});

export default HomeScreen;