import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const pulseAnimation = useSharedValue(0);
  const fadeAnimation = useSharedValue(0);

  useEffect(() => {
    pulseAnimation.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1,
      true
    );
    
    fadeAnimation.value = withTiming(1, { duration: 1500 });
  }, []);

  const pulseStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnimation.value, [0, 1], [1, 1.1]);
    return {
      transform: [{ scale }],
    };
  });

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnimation.value,
    };
  });

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <Animated.View style={[styles.content, fadeStyle]}>
        <Animated.View style={[styles.logoContainer, pulseStyle]}>
          <MaterialIcons name="warning" size={80} color="#ff6b6b" />
          <Text style={styles.title}>PonziXposed</Text>
          <Text style={styles.subtitle}>The Fraud Unfolded</Text>
        </Animated.View>

        <View style={styles.sloganContainer}>
          <Text style={styles.slogan}>"Play the scam to spot the scam"</Text>
          <Text style={styles.description}>
            Learn fraud. Stop fraud. Be financially fearless.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <MaterialIcons name="psychology" size={24} color="#4ecdc4" />
            <Text style={styles.featureText}>Interactive Simulation</Text>
          </View>
          <View style={styles.feature}>
            <MaterialIcons name="visibility" size={24} color="#45b7d1" />
            <Text style={styles.featureText}>Visual Learning</Text>
          </View>
          <View style={styles.feature}>
            <MaterialIcons name="security" size={24} color="#96ceb4" />
            <Text style={styles.featureText}>Fraud Protection</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('/(tabs)')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#ff6b6b', '#ee5a52']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Start Learning</Text>
            <MaterialIcons name="arrow-forward" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#b8b8b8',
    marginTop: 8,
    textAlign: 'center',
  },
  sloganContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slogan: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4ecdc4',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#b8b8b8',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 15,
    fontWeight: '500',
  },
  startButton: {
    width: width * 0.8,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
});