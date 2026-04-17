import { View, Text, StyleSheet } from 'react-native';

export default function NewAnomalyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>REPORT NEW</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Initialize scan to report anomaly...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040714',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#00d1ff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#0a0f24',
    borderColor: '#00d1ff',
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  cardText: {
    color: '#435b83',
    fontSize: 16,
    letterSpacing: 1,
  },
});
