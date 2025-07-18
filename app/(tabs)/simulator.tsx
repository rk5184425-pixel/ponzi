import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { PonziTreeVisualization } from '../../src/components/PonziTreeVisualization';
import { usePonziStore } from '../../src/store/ponziStore';

const { width } = Dimensions.get('window');

const SimulatorScreen = () => {
  const {
    investors,
    totalInvested,
    totalPaidOut,
    currentRound,
    isCollapsed,
    addInvestors,
    resetSimulation,
    autoRun,
    setAutoRun
  } = usePonziStore();

  const [selectedRole, setSelectedRole] = useState<'founder' | 'victim' | 'regulator'>('founder');
  const collapseAnimation = useSharedValue(0);

  useEffect(() => {
    if (isCollapsed) {
      collapseAnimation.value = withTiming(1, { duration: 1000 });
    } else {
      collapseAnimation.value = withTiming(0, { duration: 500 });
    }
  }, [isCollapsed]);

  const collapseStyle = useAnimatedStyle(() => {
    return {
      opacity: collapseAnimation.value,
      transform: [{ scale: 0.8 + (collapseAnimation.value * 0.2) }],
    };
  });

  const handleAddInvestors = (count: number) => {
    if (isCollapsed) {
      Alert.alert('Scheme Collapsed!', 'The Ponzi scheme has already collapsed. Reset to start again.');
      return;
    }
    addInvestors(count);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Simulation',
      'Are you sure you want to reset the simulation?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', onPress: resetSimulation, style: 'destructive' },
      ]
    );
  };

  const getRoleDescription = () => {
    switch (selectedRole) {
      case 'founder':
        return 'You are the scheme founder. Recruit investors and manage payouts.';
      case 'victim':
        return 'You are an investor. Make decisions about investing and recruiting.';
      case 'regulator':
        return 'You are investigating this scheme. Look for red flags and evidence.';
      default:
        return '';
    }
  };

  const deficit = totalInvested - totalPaidOut;
  const peopleInProfit = investors.filter(inv => inv.netProfit > 0).length;
  const peopleInLoss = investors.filter(inv => inv.netProfit < 0).length;

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Ponzi Simulator</Text>
            <Text style={styles.subtitle}>Experience the rise and fall</Text>
          </View>

          {/* Role Selection */}
          <View style={styles.roleContainer}>
            <Text style={styles.sectionTitle}>Choose Your Role</Text>
            <View style={styles.roleButtons}>
              {(['founder', 'victim', 'regulator'] as const).map((role) => (
                <TouchableOpacity
                  key={role}
                  style={[
                    styles.roleButton,
                    selectedRole === role && styles.roleButtonActive
                  ]}
                  onPress={() => setSelectedRole(role)}
                >
                  <Text style={[
                    styles.roleButtonText,
                    selectedRole === role && styles.roleButtonTextActive
                  ]}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.roleDescription}>{getRoleDescription()}</Text>
          </View>

          {/* Simulation Stats */}
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Simulation Status</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <MaterialIcons name="people" size={24} color="#4ecdc4" />
                <Text style={styles.statValue}>{investors.length}</Text>
                <Text style={styles.statLabel}>Total Investors</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialIcons name="attach-money" size={24} color="#45b7d1" />
                <Text style={styles.statValue}>₹{totalInvested.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Total Invested</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialIcons name="trending-down" size={24} color="#ff6b6b" />
                <Text style={styles.statValue}>₹{deficit.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Money Owed</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialIcons name="timeline" size={24} color="#96ceb4" />
                <Text style={styles.statValue}>{currentRound}</Text>
                <Text style={styles.statLabel}>Round</Text>
              </View>
            </View>
          </View>

          {/* Control Panel */}
          {selectedRole === 'founder' && (
            <View style={styles.controlPanel}>
              <Text style={styles.sectionTitle}>Scheme Controls</Text>
              <View style={styles.controlButtons}>
                <TouchableOpacity
                  style={[styles.controlButton, { backgroundColor: '#4ecdc4' }]}
                  onPress={() => handleAddInvestors(1)}
                  disabled={isCollapsed}
                >
                  <MaterialIcons name="person-add" size={20} color="white" />
                  <Text style={styles.controlButtonText}>Add 1 Investor</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.controlButton, { backgroundColor: '#45b7d1' }]}
                  onPress={() => handleAddInvestors(3)}
                  disabled={isCollapsed}
                >
                  <MaterialIcons name="group-add" size={20} color="white" />
                  <Text style={styles.controlButtonText}>Add 3 Investors</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlButton, { backgroundColor: autoRun ? '#ff6b6b' : '#96ceb4' }]}
                  onPress={() => setAutoRun(!autoRun)}
                  disabled={isCollapsed}
                >
                  <MaterialIcons name={autoRun ? "pause" : "play-arrow"} size={20} color="white" />
                  <Text style={styles.controlButtonText}>
                    {autoRun ? 'Stop Auto' : 'Auto Run'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlButton, { backgroundColor: '#ff6b6b' }]}
                  onPress={handleReset}
                >
                  <MaterialIcons name="refresh" size={20} color="white" />
                  <Text style={styles.controlButtonText}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Tree Visualization */}
          <View style={styles.visualizationContainer}>
            <Text style={styles.sectionTitle}>Pyramid Structure</Text>
            <PonziTreeVisualization investors={investors} isCollapsed={isCollapsed} />
          </View>

          {/* Collapse Alert */}
          {isCollapsed && (
            <Animated.View style={[styles.collapseAlert, collapseStyle]}>
              <MaterialIcons name="warning" size={32} color="#ff6b6b" />
              <Text style={styles.collapseTitle}>SCHEME COLLAPSED!</Text>
              <Text style={styles.collapseText}>
                • New investors stopped joining{'\n'}
                • No money left to pay existing investors{'\n'}
                • {peopleInLoss} people lost their money{'\n'}
                • Only {peopleInProfit} early investors made profit{'\n'}
                • ₹{deficit.toLocaleString()} in losses cannot be recovered
              </Text>
            </Animated.View>
          )}

          {/* Educational Insights */}
          <View style={styles.insightsContainer}>
            <Text style={styles.sectionTitle}>Key Insights</Text>
            <View style={styles.insightCard}>
              <MaterialIcons name="trending-up" size={24} color="#ffd93d" />
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Unsustainable Growth</Text>
                <Text style={styles.insightText}>
                  Ponzi schemes require exponential growth. Each round needs more investors than the last.
                </Text>
              </View>
            </View>
            <View style={styles.insightCard}>
              <MaterialIcons name="people" size={24} color="#ff6b6b" />
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Most People Lose</Text>
                <Text style={styles.insightText}>
                  Only early investors profit. The majority of participants lose their money.
                </Text>
              </View>
            </View>
            <View style={styles.insightCard}>
              <MaterialIcons name="flash-on" size={24} color="#4ecdc4" />
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Inevitable Collapse</Text>
                <Text style={styles.insightText}>
                  All Ponzi schemes eventually collapse when new investors stop joining.
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
  roleContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#ff6b6b',
  },
  roleButtonText: {
    color: '#b8b8b8',
    fontSize: 14,
    fontWeight: '600',
  },
  roleButtonTextActive: {
    color: 'white',
  },
  roleDescription: {
    fontSize: 14,
    color: '#b8b8b8',
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 50) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 18,
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
  controlPanel: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  controlButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  controlButton: {
    width: (width - 50) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  visualizationContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  collapseAlert: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderColor: '#ff6b6b',
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  collapseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginTop: 10,
    marginBottom: 15,
  },
  collapseText: {
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
    textAlign: 'left',
  },
  insightsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  insightCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  insightContent: {
    flex: 1,
    marginLeft: 15,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#b8b8b8',
    lineHeight: 20,
  },
});

export default SimulatorScreen;