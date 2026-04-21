import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useAnomalies } from '../../context/AnomalyContext';

export default function MyAnomaliesScreen() {
  const { anomalies } = useAnomalies();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>ASSIGNED TO YOU</Text>
      <Text style={styles.title}>My Anomalies</Text>
      {anomalies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No anomalies</Text>
        </View>
      ) : (
        <FlatList
          data={anomalies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              {item.imageUri && (
                <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
              )}
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemDate}>
                  {new Date(item.date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
          )}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#a0b0c0',
    fontSize: 16,
    letterSpacing: 1,
  },
  listItem: {
    backgroundColor: '#0a0f24',
    borderColor: '#435b83',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 160,
  },
  itemContent: {
    padding: 16,
  },
  itemTitle: {
    color: '#00d1ff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  itemDescription: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 6,
  },
  itemDate: {
    color: '#a0b0c0',
    fontSize: 12,
    letterSpacing: 1,
  },
});
