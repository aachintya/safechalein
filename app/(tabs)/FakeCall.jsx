import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Modal, Vibration, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Audio from 'expo-av';
import { Camera } from 'lucide-react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const FakeCallScreen = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [callDelay, setCallDelay] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [sound, setSound] = useState();

  const delayOptions = [
    { label: '5 sec', value: 5 },
    { label: '10 sec', value: 10 },
    { label: '1 min', value: 60 },
    { label: '5 min', value: 300 },
  ];

  useEffect(() => {
    const checkAudioAPI = async () => {
      if (Audio.Sound) {
        console.log('Audio API is available');
      } else {
        console.error('Audio API is not available');
      }
    };
    checkAudioAPI();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playRingtone = async () => {
    try {
      const { sound: ringSound } = await Audio.Sound.createAsync(
        require('../../assets/ringtone.mp3'),
        { 
          isLooping: true,
          shouldPlay: true,
        }
      );
      setSound(ringSound);
      await ringSound.playAsync(); // Explicitly start playing the sound
    } catch (error) {
      console.error('Error playing ringtone:', error);
      alert('Failed to play ringtone. Please check your device settings.');
    }
  };

  const startFakeCall = async () => {
    if (!name || !number || !callDelay) {
      alert('Please fill in all details and select a timer');
      return;
    }

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Error setting audio mode:', error);
      alert('Failed to set audio mode. The call may not work as expected.');
    }

    // Schedule the fake call
    setTimeout(async () => {
      try {
        await playRingtone();
        // Start vibration
        Vibration.vibrate([1000, 2000, 1000], true);
        // Show incoming call screen
        setShowIncomingCall(true);
      } catch (error) {
        console.error('Error starting fake call:', error);
        alert('Failed to start the fake call. Please try again.');
      }
    }, callDelay * 1000);
  };

  const handleEndCall = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }
      Vibration.cancel();
      setShowIncomingCall(false);
    } catch (error) {
      console.error('Error ending call:', error);
      alert('Failed to end the call properly. Please restart the app if issues persist.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
         
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Caller Details</Text>
            <Text style={styles.headerSubtitle}>
              Specify time and caller details to schedule a fake call.
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Set up caller image</Text>
            <View style={styles.imageOptions}>
              <TouchableOpacity style={styles.imageOption}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>📷</Text>
                </View>
                <Text style={styles.optionLabel}>Camera</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.imageOption}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>🖼️</Text>
                </View>
                <Text style={styles.optionLabel}>Gallery</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.imageOption}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>👤</Text>
                </View>
                <Text style={styles.optionLabel}>Preset</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Set up a fake caller</Text>
            <View style={styles.formGroup}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.contactIcon}>
                  <Text style={styles.iconText}>👤</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  value={number}
                  onChangeText={setNumber}
                  keyboardType="phone-pad"
                  placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.contactIcon}>
                  <Text style={styles.iconText}>👤</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pre-set timer</Text>
            <View style={styles.timerGrid}>
              {delayOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.timerButton,
                    callDelay === option.value && styles.selectedTimer
                  ]}
                  onPress={() => setCallDelay(option.value)}
                >
                  <Text style={[
                    styles.timerText,
                    callDelay === option.value && styles.selectedTimerText
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.callMeButton}
          onPress={startFakeCall}
        >
          <Text style={styles.callMeButtonText}>Call Me</Text>
        </TouchableOpacity>
      </View>

        {/* Incoming Call Modal */}
        <Modal
        visible={showIncomingCall}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.callCard}>
            <View style={styles.callerInfo}>
              <View style={styles.callerImage}>
                <Text style={styles.callerImageText}>👤</Text>
              </View>
              <Text style={styles.callerName}>{name}</Text>
              <Text style={styles.callerNumber}>{number}</Text>
            </View>
            
            <View style={styles.callActions}>
              <TouchableOpacity 
                style={styles.declineButton}
                onPress={handleEndCall}
              >
                <Text style={styles.declineButtonText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.acceptButton}
                onPress={handleEndCall}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    paddingTop: hp('2%'),
  },
  header: {
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginBottom: hp('1%'),
  },
  backButtonText: {
    fontSize: wp('6%'),
    color: '#333',
  },
  headerTextContainer: {
    gap: hp('0.5%'),
  },
  headerTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: wp('3.5%'),
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('6%'),
  },
  section: {
    marginTop: hp('4%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp('2%'),
  },
  imageOptions: {
    flexDirection: 'row',
    gap: wp('8%'),
  },
  imageOption: {
    alignItems: 'center',
  },
  iconContainer: {
    width: wp('16%'),
    height: wp('16%'),
    backgroundColor: '#f8f8f8',
    borderRadius: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  optionLabel: {
    fontSize: wp('3.5%'),
    color: '#666',
  },
  formGroup: {
    gap: hp('2%'),
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: hp('7%'),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    paddingRight: wp('12%'),
    fontSize: wp('4%'),
    color: '#333',
  },
  contactIcon: {
    position: 'absolute',
    right: wp('4%'),
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  timerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('4%'),
  },
  timerButton: {
    width: wp('42%'),
    paddingVertical: hp('2%'),
    borderRadius: wp('6%'),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  selectedTimer: {
    backgroundColor: '#6B63F6',
    borderColor: '#6B63F6',
  },
  timerText: {
    fontSize: wp('3.8%'),
    color: '#666',
  },
  selectedTimerText: {
    color: '#fff',
  },
  footer: {
    padding: wp('6%'),
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#6B63F6',
    paddingVertical: hp('2%'),
    borderRadius: wp('6%'),
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
  },callMeButton: {
    backgroundColor: '#4CAF50', // Changed to green for "Call Me"
    paddingVertical: hp('2%'),
    borderRadius: wp('6%'),
    alignItems: 'center',
  },
  callMeButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callCard: {
    backgroundColor: '#fff',
    width: wp('90%'),
    borderRadius: wp('5%'),
    padding: wp('6%'),
    alignItems: 'center',
  },
  callerInfo: {
    alignItems: 'center',
    marginBottom: hp('4%'),
  },
  callerImage: {
    width: wp('25%'),
    height: wp('25%'),
    backgroundColor: '#f0f0f0',
    borderRadius: wp('12.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  callerImageText: {
    fontSize: wp('10%'),
  },
  callerName: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  callerNumber: {
    fontSize: wp('4%'),
    color: '#666',
  },
  callActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  declineButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    borderRadius: wp('6%'),
  },
  acceptButton: {
    backgroundColor: '#4CD964',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    borderRadius: wp('6%'),
  },
  declineButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
});
  

export default FakeCallScreen;