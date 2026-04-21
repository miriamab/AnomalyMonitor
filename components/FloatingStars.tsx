import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAnomalies } from '../context/AnomalyContext';

const { width, height } = Dimensions.get('window');

interface StarData {
  id: string;
  startX: number;
  size: number;
  duration: number;
}

const StarElement = ({ star, onCatch }: { star: StarData; onCatch: (id: string) => void }) => {
  const translateY = useRef(new Animated.Value(-50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in initially, drift downwards across the screen, then fade out at the bottom
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: height + 50,
        duration: star.duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5, // Not too obvious according to requirements
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.delay(star.duration - 3000), // maintain opacity while drifting
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [star.duration, opacity, translateY]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: star.startX,
        transform: [{ translateY }],
        opacity,
      }}
    >
      <TouchableOpacity
        activeOpacity={1} // Don't show generic opacity feedback to keep it magical
        onPress={() => onCatch(star.id)}
        // Making the hitSlop larger than the star itself so users can actually catch it
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        style={{ padding: 10 }}
      >
        <Ionicons name="sparkles" size={star.size} color="#00d1ff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function FloatingStars() {
  const [stars, setStars] = useState<StarData[]>([]);
  const { incrementStarCount } = useAnomalies();

  useEffect(() => {
    // Attempt to spawn a star every 3 seconds (but randomized)
    const intervalId = setInterval(() => {
      // 40% chance of spawning to keep it "occasional" and subtle
      if (Math.random() < 0.4) {
        const id = Math.random().toString(36).substring(7);
        const newStar: StarData = {
          id,
          startX: Math.random() * (width - 40),
          size: Math.floor(Math.random() * 12) + 12, // Between 12 and 24
          duration: Math.floor(Math.random() * 5000) + 7000, // Very slow drift: 7-12 seconds
        };

        setStars((prev) => [...prev, newStar]);

        // Cleanup the star from memory after its duration completes
        setTimeout(() => {
          setStars((prev) => prev.filter((s) => s.id !== id));
        }, newStar.duration);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCatch = (id: string) => {
    incrementStarCount();
    // Instantly remove the star when caught!
    setStars((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      {stars.map((star) => (
        <StarElement key={star.id} star={star} onCatch={handleCatch} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999, // Ensure stars float above everything safely
    elevation: 10,
  },
});