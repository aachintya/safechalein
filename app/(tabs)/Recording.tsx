import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { startRecording, stopRecording } from '../utils/recordingUtils';
import { saveRecording, getRecordings, Recording as RecordingType } from '../utils/databaseUtils';

type RootStackParamList = {
  Recording: undefined;
  History: undefined;
};

type RecordingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Recording'>;

const Recording: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingsCount, setRecordingsCount] = useState(0);
  const navigation = useNavigation<RecordingScreenNavigationProp>();

  useEffect(() => {
    loadRecordingsCount();
  }, []);

  const loadRecordingsCount = async () => {
    try {
      const recordings = await getRecordings();
      setRecordingsCount(recordings.length);
    } catch (error) {
      console.error('Error loading recordings count:', error);
      Alert.alert('Error', 'Failed to load recordings count');
    }
  };

  const toggleRecording = async () => {
    try {
      if (isRecording) {
        const recordingData = await stopRecording();
        setIsRecording(false);
        const newRecording: RecordingType = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          duration: recordingData.duration,
          uri: recordingData.uri,
        };
        await saveRecording(newRecording);
        await loadRecordingsCount();
      } else {
        await startRecording();
        setIsRecording(true);
      }
    } catch (error) {
      console.error('Error toggling recording:', error);
      Alert.alert('Error', isRecording ? 'Failed to stop recording' : 'Failed to start recording');
      setIsRecording(false);
    }
  };

  const navigateToHistory = () => {
    navigation.navigate('History');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/logo-3.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Ionicons name="menu" size={24} color="black" />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentTitle}>Anonymous Recording</Text>
        <Text style={styles.contentSubtitle}>
          Anonymously record audio and location without notifying others.
        </Text>

        <TouchableOpacity style={styles.historyButton} onPress={navigateToHistory}>
          <View style={styles.historyButtonContent}>
            <Ionicons name="mic" size={24} color="black" />
            <View style={styles.historyTextContainer}>
              <Text style={styles.historyText}>Recordings</Text>
              <Text style={styles.historySubtext}>{recordingsCount} saved</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.recordingButton, isRecording && styles.stopRecordingButton]}
          onPress={toggleRecording}
        >
          <Ionicons name={isRecording ? "stop" : "mic"} size={24} color="white" />
          <Text style={styles.recordingButtonText}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 80,
    height: 100,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  historyButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTextContainer: {
    marginLeft: 16,
  },
  historyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  historySubtext: {
    fontSize: 14,
    color: '#666',
  },
  camera: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  recordingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5296A5',
    padding: 16,
    borderRadius: 24,
    marginTop: 'auto',
  },
  stopRecordingButton: {
    backgroundColor: '#4CAF50',
  },
  recordingButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default Recording;