import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';

interface ApodData {
  title: string;
  explanation: string;
  url: string;
  date: string;
}

export default function SearchScreen() {
  const [results, setResults] = useState<ApodData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching from NASA APOD API (using count=5 to return multiple records)
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5')
      .then(res => res.json())
      .then(data => {
        // API either returns an array (if count is used) or a single object
        setResults(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching APOD:", error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>EXPLORE RECORDS</Text>
      <Text style={styles.title}>APOD Search</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter anomaly ID or keyword..."
          placeholderTextColor="#435b83"
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00d1ff" />
          <Text style={styles.loadingText}>Fetching Records...</Text>
        </View>
      ) : (
        <ScrollView style={styles.resultsContainer} contentContainerStyle={styles.resultsContent}>
          {results.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: item.url }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>
                  {new Date(item.date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </Text>
                <Text style={styles.cardDescription} numberOfLines={3}>{item.explanation}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040714',
    paddingTop: 60,
    paddingHorizontal: 24,
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
  inputContainer: {
    width: '100%',
    borderColor: '#00d1ff',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#0a0f24',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  input: {
    color: '#00d1ff',
    fontSize: 16,
    letterSpacing: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#00d1ff',
    marginTop: 12,
    fontSize: 16,
    letterSpacing: 1,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#0a0f24',
    borderColor: '#435b83',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    color: '#00d1ff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  cardDate: {
    color: '#a0b0c0',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 12,
  },
  cardDescription: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 22,
  },
});
