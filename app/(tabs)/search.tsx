import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DATABASE SEARCH</Text>
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
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: '#00d1ff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 30,
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
