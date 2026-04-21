import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAnomalies } from '../context/AnomalyContext';

// Get screen width and height to calculate boundaries for floating elements
const { width, height } = Dimensions.get('window');

// Star data properties, defining exactly how each spawned star behaves
interface StarData {
  id: string;
  startX: number;
  wobbleAmount: number;
  size: number;
  duration: number;
}

// Single visual star element that animates and can be caught
const StarElement = ({ star, onCatch }: { star: StarData; onCatch: (id: string) => void }) => {
  // Setup Animated values to handle location and fade state
  const translateY = useRef(new Animated.Value(-50)).current; 
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1) Drift downwards VERY slowly across the screen from top to bottom
    Animated.timing(translateY, {
      toValue: height + 50,
      duration: star.duration,
      easing: Easing.linear, // Smooth steady speed vertically
      useNativeDriver: false, // Must be false for touchable animated views to work cleanly
    }).start();

    // 2) Sway side to side organically to simulate floating in space
    Animated.loop(
      Animated.sequence([
        // Float to one side
        Animated.timing(translateX, {
          toValue: star.wobbleAmount,
          duration: 3000,
          easing: Easing.inOut(Easing.sin), // Ease to smooth out the turning point
          useNativeDriver: false,
        }),
        // Float to the other side
        Animated.timing(translateX, {
          toValue: -star.wobbleAmount,
          duration: 3000,
          easing: Easing.inOut(Easing.sin), 
          useNativeDriver: false,
        }),
      ])
    ).start();

    // 3) Fade in gently right when spawned, stay faded, and fade out at the very end
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.4, // Keep it subtle and faint so it acts as background decor
        duration: 2000,
        useNativeDriver: false,
      }),
      // Hold state before disappearing
      Animated.delay(star.duration - 4000), 
      // Finally disappear seamlessly
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
        onPress={() => onCatch(star.id)} // Triggers when the user successfully taps it
        // Huge hitSlop and padding ensures it's incredibly easy to tap even while moving
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        style={{ padding: 20 }}
      >
        <Ionicons name="star" size={star.size} color="#00d1ff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

// Manager component that spawns multiple stars at intervals across the screen
export default function FloatingStars() {
  const [stars, setStars] = useState<StarData[]>([]);
  const { incrementStarCount } = useAnomalies();

  useEffect(() => {
    // Attempt spawning less often: checks every 5 seconds
    const intervalId = setInterval(() => {
      // 25% chance of spawning out of those 5 seconds to keep stars visibly rare
      if (Math.random() < 0.25) {
        const id = Math.random().toString(36).substring(7); // Create short unique Id string
        
        // Setup customized configuration for each new random star
        const newStar: StarData = {
          id,
          // Spawn somewhere randomly across screen width, staying away from very edges
          startX: Math.random() * (width - 60) + 30,
          size: Math.floor(Math.random() * 12) + 12, 
          // Super slow drift: taking randomly between 20 to 30 seconds to reach bottom
          duration: Math.floor(Math.random() * 10000) + 20000, 
          // Determines roughly how wide the star freely floats side to side
          wobbleAmount: Math.floor(Math.random() * 60) + 30, 
        };

        setStars((prev) => [...prev, newStar]);

        // Self cleanup so that unseen stars don't sit in state taking up memory
        setTimeout(() => {
          setStars((prev) => prev.filter((s) => s.id !== id));
        }, newStar.duration);
      }
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup interval when screen is totally unmounted
  }, []);

  // When a star is clicked by the user
  const handleCatch = (id: string) => {
    incrementStarCount(); // Grant user the point
    setStars((prev) => prev.filter((s) => s.id !== id)); // Remove star instantaneously from screen
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