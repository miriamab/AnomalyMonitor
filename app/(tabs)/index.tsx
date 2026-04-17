// npx expo start

import { View, Text, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/sterne.jpg')} style={styles.backgroundImage} />
      <Text style={styles.title}>SYSTEM STATUS</Text>
      <Text style={styles.subtitle}>ALL SYSTEMS OPERATIONAL</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>No new anomalies detected.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040714', // very dark blue (almost black)
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.3, // slight transparency to keep text readable
    resizeMode: 'cover',
  },
  title: {
    color: '#00d1ff', // neon blue / cyan
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 10,
  },
  subtitle: {
    color: '#435b83', // grey-blue
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#0a0f24',
    borderColor: '#00d1ff',
    borderWidth: 1,
    padding: 30,
    borderRadius: 12,
    shadowColor: '#00d1ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    width: '100%',
    alignItems: 'center',
  },
  cardText: {
    color: '#e0e0e0', // light grey
    fontSize: 16,
    letterSpacing: 1,
  },
});

