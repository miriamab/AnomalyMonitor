// npx expo start

import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/sterne.jpg')} style={styles.headerImage} />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.appName}>NASA ANOMALY MONITOR</Text>
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
  appName: {
    color: '#00d1ff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 16,
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

