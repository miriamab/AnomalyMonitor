import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function NewAnomalyScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.subtitle}>CREATE A REPORT</Text>
      <Text style={styles.title}>New Anomaly</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>NAME</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Anomaly name" 
          placeholderTextColor="#435b83" 
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          multiline 
          placeholder="Describe the anomaly" 
          placeholderTextColor="#435b83" 
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>IMAGE</Text>
        <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.selectedImage} />
          ) : (
            <Text style={styles.imageBoxText}>+ Add Image</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Anomaly</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040714',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
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
    marginBottom: 32,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    color: '#a0b0c0',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0a0f24',
    borderWidth: 1,
    borderColor: '#1a274c',
    borderRadius: 8,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  imageBox: {
    backgroundColor: '#0a0f24',
    borderColor: '#00d1ff',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBoxText: {
    color: '#00d1ff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#00d1ff',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#040714',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
