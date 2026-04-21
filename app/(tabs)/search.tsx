import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, ActivityIndicator, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface ApodData {
  title: string;
  explanation: string;
  url: string;
  date: string;
}

const MOCK_APOD: ApodData = {
  title: '[PLACEHOLDER] Andromeda Galaxy',
  explanation: 'This is a placeholder entry because the NASA API rate limit was reached. You can use this dummy data to continue formatting and designing the UI. The Andromeda Galaxy (M31) is the closest large spiral galaxy to our Milky Way.',
  url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/NGC_4414_%28NASA-med%29.jpg/800px-NGC_4414_%28NASA-med%29.jpg',
  date: '2026-04-21'
};

export default function SearchScreen() {
  const [results, setResults] = useState<ApodData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return 'YYYY-MM-DD';
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  };

  const fetchApodData = async (url: string) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (data.error || data.code) {
          Alert.alert('NASA API Limit Reached', 'Displaying placeholder data to continue design work.');
          setResults([MOCK_APOD]);
        } else {
          setResults(Array.isArray(data) ? data : [data]);
        }
      } catch (parseError) {
        console.error("Parse Error. Response text:", text);
        Alert.alert('API Error', 'Rate limit exceeded. Displaying placeholder data.');
        setResults([MOCK_APOD]);
      }
    } catch (error) {
      console.error("Error fetching APOD:", error);
      Alert.alert('Network Error', 'Could not connect. Displaying placeholder data.');
      setResults([MOCK_APOD]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch of 5 random records
    fetchApodData('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5');
  }, []);

  const handleSearch = () => {
    if (!fromDate || !toDate) {
      // Fallback to fetching 5 random records if no dates are provided
      fetchApodData('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5');
      return;
    }
    const startStr = formatDate(fromDate);
    const endStr = formatDate(toDate);
    
    // Using start_date and end_date for filtering
    const searchUrl = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${startStr}&end_date=${endStr}`;
    fetchApodData(searchUrl);
  };

  const onFromDateChange = (event: any, selectedDate?: Date) => {
    setShowFromPicker(Platform.OS === 'ios');
    if (selectedDate) setFromDate(selectedDate);
  };

  const onToDateChange = (event: any, selectedDate?: Date) => {
    setShowToPicker(Platform.OS === 'ios');
    if (selectedDate) setToDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>EXPLORE RECORDS</Text>
      <Text style={styles.title}>APOD Search</Text>
      
      <View style={styles.filterContainer}>
        <View style={styles.dateInputsRow}>
          <View style={styles.dateInputWrapper}>
            <Text style={styles.label}>FROM</Text>
            <TouchableOpacity 
              style={styles.dateInput} 
              onPress={() => { setShowFromPicker(true); setShowToPicker(false); }}
            >
              <Text style={[styles.dateText, !fromDate && styles.datePlaceholder]}>
                {formatDate(fromDate)}
              </Text>
            </TouchableOpacity>
            {showFromPicker && (
              <DateTimePicker
                value={fromDate || new Date()}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={onFromDateChange}
                themeVariant="dark"
              />
            )}
          </View>
          <View style={styles.dateInputWrapper}>
            <Text style={styles.label}>TO</Text>
            <TouchableOpacity 
              style={styles.dateInput} 
              onPress={() => { setShowToPicker(true); setShowFromPicker(false); }}
            >
              <Text style={[styles.dateText, !toDate && styles.datePlaceholder]}>
                {formatDate(toDate)}
              </Text>
            </TouchableOpacity>
            {showToPicker && (
              <DateTimePicker
                value={toDate || new Date()}
                mode="date"
                display="default"
                maximumDate={new Date()}
                minimumDate={fromDate || undefined}
                onChange={onToDateChange}
                themeVariant="dark"
              />
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
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
                <Text style={styles.cardDate}>
                  {new Date(item.date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </Text>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>{item.explanation}</Text>
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
  filterContainer: {
    marginBottom: 20,
  },
  dateInputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateInputWrapper: {
    flex: 0.48,
  },
  label: {
    color: '#a0b0c0',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  dateInput: {
    borderColor: '#00d1ff',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#0a0f24',
    paddingHorizontal: 15,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
  datePlaceholder: {
    color: '#435b83',
  },
  searchButton: {
    backgroundColor: '#00d1ff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#040714',
    fontSize: 16,
    fontWeight: 'bold',
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
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 120,
  },
  cardImage: {
    width: 110,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  cardDate: {
    color: '#a0b0c0',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: '#00d1ff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
  },
  cardDescription: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 18,
  },
});
