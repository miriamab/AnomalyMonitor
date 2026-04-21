import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAnomalies } from '../context/AnomalyContext';

const { width, height } = Dimensions.get('window');

interface StarData {
  id: string;
  startX: number;
  wobbleAmount: number;
  size: number;
  duration: number;
}

const StarElement = ({ star, onCatch }: { star: StarData; onCatch: (id: string) => void }) => {
  const translateY = useRef(new Animated.Value(-50)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1) Drift downwards VERY slowly
    Animated.timing(translateY, {
      toValue: height + 50,
      duration: star.duration,
      easing: Easing.linear,
      useNativeDriver: false, // setting to false makes moving views reliably touchable in RN
    }).start();

    // 2) Sway side to side organically to look like floating
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: star.wobbleAmount,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
        Animated.timing(translateX, {
          toValue: -star.wobbleAmount,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
      ])
    ).start();

    // 3) Fade in, stay faded, and fade out at the very end
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.4, // Keep it subtle and faint
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.delay(star.duration - 4000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [star.duration, star.wobbleAmount, opacity, translateY, translateX]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: star.startX,
        // Combine vertical drift and horizontal sway
        transform: [{ translateY }, { translateX: Animated.add(new Animated.Value(0), translateX) }],
        opacity,
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onCatch(star.id)}
        // Huge hitSlop and padding ensures it's incredibly easy to tap even while moving
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        style={{ padding: 20 }}
      >
        <Ionicons name="star" size={star.size} color="#00d1ff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function FloatingStars() {
  const [stars, setStars] = useState<StarData[]>([]);
  const { incrementStarCount } = useAnomalies();

  useEffect(() => {
    // Attempt less often: every 5 seconds
    const intervalId = setInterval(() => {
      // 25% chance of spawning to keep stars very rare
      if (Math.random() < 0.25) {
        const id = Math.random().toString(36).substring(7);
        const newStar: StarData = {
          id,
          // spawn somewhere not too close to the screen edges
          startX: Math.random() * (width - 60) + 30,
          size: Math.floor(Math.random() * 12) + 12, 
          // Super slow drift: 20 to 30 seconds to reach the bottom!
          duration: Math.floor(Math.random() * 10000) + 20000, 
          // Determines how wide the star floats side to side
          wobbleAmount: Math.floor(Math.random() * 60) + 30, 
        };

        setStars((prev) => [...prev, newStar]);

        setTimeout(() => {
          setStars((prev) => prev.filter((s) => s.id !== id));
        }, newStar.duration);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCatch = (id: string) => {
    incrementStarCount();
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