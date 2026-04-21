// npx expo start

import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAnomalies } from '../../context/AnomalyContext';

// The main landing screen of the app
export default function HomeScreen() {
  const { anomalies, starCount } = useAnomalies(); // Load star score from context

  return (
    // ScrollView allows the page to scroll if content gets too long
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.imageContainer}>
        {/* Header background image */}
        <Image source={require('../../assets/stars.jpg')} style={styles.headerImage} />
      </View>
      
      <View style={styles.textContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.appName}>NASA ANOMALY MONITOR</Text>
          
          {/* Displays the total amount of stars the user caught */}
          <View style={styles.starCounterContainer}>
            <Ionicons name="star" size={16} color="#00d1ff" />
            <Text style={styles.starCounterText}>{starCount}</Text>
          </View>
        </View>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>
          Review the mission status, recent activity, and the most important anomaly alerts in one place.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040714', // very dark blue (almost black)
  },
  contentContainer: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 350,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  starCounterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0f24',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#435b83',
  },
  starCounterText: {
    color: '#00d1ff',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 6,
  },
  appName: {
    color: '#00d1ff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  title: {
    color: '#ffffff', // changed to white for better hierarchy
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 24,
  },
  subtitle: {
    color: '#a0b0c0', // light grey-blue
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: 0.5,
  },
});

