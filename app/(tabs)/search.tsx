import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function SearchScreen() {
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
  },
  input: {
    color: '#00d1ff',
    fontSize: 16,
    letterSpacing: 1,
  },
});
