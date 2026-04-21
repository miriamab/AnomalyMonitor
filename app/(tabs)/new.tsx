import { View, Text, StyleSheet } from 'react-native';

export default function NewAnomalyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>CREATE A REPORT</Text>
      <Text style={styles.title}>New Anomaly</Text>
      
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
    padding: 24,
    paddingTop: 60, // extra padding for the top
  },
  subtitle: {
    color: '#00d1ff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 0,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 24,
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
    marginTop: 20,
  },
  cardText: {
    color: '#435b83',
    fontSize: 16,
    letterSpacing: 1,
  },
});
