import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { getRecordingsFromFileSystem } from '../utils/recordingUtils';

interface RecordingItem {
  id: string;
  type: 'audio' | 'location';
  timestamp: string;
  uri: string;
}

const History: React.FC = () => {
  const [recordings, setRecordings] = useState<RecordingItem[]>([]);

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      const files = await getRecordingsFromFileSystem(); // Get all recordings from the file system

      const recordingItems: RecordingItem[] = files.map(file => {
        const [type, timestamp] = file.split('_');
        return {
          id: file,
          type: type as 'audio' | 'location',
          timestamp: timestamp.split('.')[0], // Remove file extension
          uri: `${FileSystem.documentDirectory}SafeRecordings/${file}`
        };
      });

      setRecordings(recordingItems.sort((a, b) => b.timestamp.localeCompare(a.timestamp)));
    } catch (error) {
      console.error('Failed to load recordings', error);
      Alert.alert('Error', 'Failed to load recordings');
    }
  };

  const handleRecordingPress = (item: RecordingItem) => {
    Alert.alert('Recording Details', `Type: ${item.type}\nTimestamp: ${item.timestamp}\nURI: ${item.uri}`);
  };

  const renderRecordingItem = ({ item }: { item: RecordingItem }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleRecordingPress(item)}>
      <Ionicons 
        name={item.type === 'audio' ? 'mic' : 'location'} 
        size={24} 
        color="black" 
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemType}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>
        <Text style={styles.itemTimestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recording History</Text>
      <FlatList
        data={recordings}
        renderItem={renderRecordingItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No recordings found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTimestamp: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#666',
  },
});

export default History;
