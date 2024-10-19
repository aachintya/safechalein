import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const RECORDINGS_DIRECTORY = `${FileSystem.documentDirectory}SafeRecordings/`;
let recording: Audio.Recording | null = null;

const ensureDirectoryExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(RECORDINGS_DIRECTORY);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(RECORDINGS_DIRECTORY, { intermediates: true });
  }
};

export const startRecording = async (): Promise<void> => {
  try {
    await ensureDirectoryExists(); // Ensure the directory exists
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording: newRecording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    recording = newRecording;
  } catch (error) {
    console.error('Failed to start recording', error);
    throw error;
  }
};

export const stopRecording = async (): Promise<{ uri: string; duration: number | null }> => {
  if (!recording) {
    throw new Error('No active recording');
  }

  try {
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); // Get the URI of the saved recording
    if (!uri) {
      throw new Error('Failed to get recording URI');
    }

    return { uri, duration: null }; // Return the URI to be saved elsewhere
  } catch (error) {
    console.error('Failed to stop recording', error);
    throw error;
  }
};

export const getRecordingsFromFileSystem = async (): Promise<string[]> => {
  try {
    await ensureDirectoryExists(); // Ensure the directory exists
    return await FileSystem.readDirectoryAsync(RECORDINGS_DIRECTORY); // Return all files in the directory
  } catch (error) {
    console.error('Failed to read recordings directory', error);
    throw error;
  }
};
