import { View, Text, StyleSheet, FlatList } from 'react-native';

const MOCK_DATA = [
  { id: '1', title: 'Sector 7 Disturbance' },
  { id: '2', title: 'Thermal Fluctuation' },
];

export default function MyAnomaliesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY ANOMALIES</Text>
      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
        style={{ width: '100%' }}
      />
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
    letterSpacing: 3,
    marginBottom: 30,
  },
  listItem: {
    backgroundColor: '#0a0f24',
    borderColor: '#435b83',
    borderWidth: 1,
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  itemText: {
    color: '#00d1ff',
    fontSize: 16,
    letterSpacing: 1.2,
  },
});
