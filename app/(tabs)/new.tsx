import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useAnomalies } from '../../context/AnomalyContext';

export default function NewAnomalyScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  
  const [errors, setErrors] = useState({ name: '', description: '', image: '' });

  const { addAnomaly } = useAnomalies();
  const router = useRouter();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleSave = () => {
    let hasError = false;
    const newErrors = { name: '', description: '', image: '' };

    if (!name.trim()) {
      newErrors.name = 'Please provide a name';
      hasError = true;
    }
    if (!description.trim()) {
      newErrors.description = 'Please provide a description';
      hasError = true;
    }
    if (!image) {
      newErrors.image = 'Please select an image';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    addAnomaly({
      title: name.trim(),
      description: description.trim(),
      imageUri: image,
    });

    // Reset fields
    setName('');
    setDescription('');
    setImage(null);
    setErrors({ name: '', description: '', image: '' });

    // Redirect to "My Anomalies" screen
    router.push('/(tabs)/myanomalies');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.subtitle}>CREATE A REPORT</Text>
      <Text style={styles.title}>New Anomaly</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>NAME</Text>
        <TextInput 
          style={[styles.input, errors.name ? styles.inputError : null]} 
          placeholder="Anomaly name" 
          placeholderTextColor="#435b83"
          value={name}
          onChangeText={(text) => { setName(text); setErrors(prev => ({...prev, name: ''})); }}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput 
          style={[styles.input, styles.textArea, errors.description ? styles.inputError : null]} 
          multiline 
          placeholder="Describe the anomaly" 
          placeholderTextColor="#435b83"
          value={description}
          onChangeText={(text) => { setDescription(text); setErrors(prev => ({...prev, description: ''})); }}
        />
        {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>IMAGE</Text>
        <TouchableOpacity 
          style={[styles.imageBox, errors.image ? styles.imageBoxError : null]} 
          onPress={pickImage}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.selectedImage} />
          ) : (
            <Text style={styles.imageBoxText}>+ Add Image</Text>
          )}
        </TouchableOpacity>
        {errors.image ? <Text style={styles.errorText}>{errors.image}</Text> : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
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
  inputError: {
    borderColor: '#ff4d4d',
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
  imageBoxError: {
    borderColor: '#ff4d4d',
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
  errorText: {
    color: '#ff4d4d',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
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
