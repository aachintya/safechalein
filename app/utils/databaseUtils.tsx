import * as FileSystem from 'expo-file-system';
import { getRecordingsFromFileSystem } from './recordingUtils';

export interface Recording {
  id: string;
  timestamp: number;
  duration: number | null;
  uri: string;
}

const RECORDINGS_METADATA_FILE = FileSystem.documentDirectory + 'recordings_metadata.json';

// Function to save metadata to the file
const saveMetadata = async (recordings: Recording[]): Promise<void> => {
  await FileSystem.writeAsStringAsync(RECORDINGS_METADATA_FILE, JSON.stringify(recordings));
};

// Function to load metadata from the file
const loadMetadata = async (): Promise<Recording[]> => {
  try {
    // Check if the metadata file exists
    const fileInfo = await FileSystem.getInfoAsync(RECORDINGS_METADATA_FILE);
    
    if (!fileInfo.exists) {
      // If the file does not exist, create an empty metadata file and return an empty array
      await FileSystem.writeAsStringAsync(RECORDINGS_METADATA_FILE, JSON.stringify([]));
      return [];
    }

    // If the file exists, read its contents
    const content = await FileSystem.readAsStringAsync(RECORDINGS_METADATA_FILE);
    return JSON.parse(content);
  } catch (error) {
    console.warn('Failed to load metadata, returning empty array', error);
    return [];
  }
};

// Function to save a new recording
export const saveRecording = async (recording: Recording): Promise<void> => {
  try {
    const recordings = await loadMetadata();
    recordings.push(recording);
    await saveMetadata(recordings);
  } catch (error) {
    console.error('Error saving recording:', error);
    throw error;
  }
};

// Function to retrieve recordings from the metadata and the file system
export const getRecordings = async (): Promise<Recording[]> => {
  try {
    const metadata = await loadMetadata();
    const fileUris = await getRecordingsFromFileSystem();
    
    // Filter out recordings that don't have a corresponding file
    return metadata.filter(recording => fileUris.includes(recording.uri));
  } catch (error) {
    console.error('Error getting recordings:', error);
    throw error;
  }
};

// Function to delete a recording
export const deleteRecording = async (id: string): Promise<void> => {
  try {
    const recordings = await loadMetadata();
    const recordingToDelete = recordings.find(r => r.id === id);
    
    if (recordingToDelete) {
      // Delete the file from the file system
      await FileSystem.deleteAsync(recordingToDelete.uri, { idempotent: true });
    }
    
    // Update the metadata to remove the deleted recording
    const updatedRecordings = recordings.filter(recording => recording.id !== id);
    await saveMetadata(updatedRecordings);
  } catch (error) {
    console.error('Error deleting recording:', error);
    throw error;
  }
};