import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useAnomalies } from '../../context/AnomalyContext';

export default function MyAnomaliesScreen() {
  const { anomalies } = useAnomalies();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY ANOMALIES</Text>
      {anomalies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No anomalies reported yet.</Text>
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
                <Text style={styles.itemDescription} numberOfLines={2}>
                  {item.description}
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
    paddingHorizontal: 20,
  },
  title: {
    color: '#00d1ff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 30,
    alignSelf: 'center',
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
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  itemContent: {
    flex: 1,
    padding: 16,
  },
  itemTitle: {
    color: '#00d1ff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  itemDescription: {
    color: '#a0b0c0',
    fontSize: 14,
    lineHeight: 20,
  },
});
