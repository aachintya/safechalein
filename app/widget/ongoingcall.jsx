import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

const OngoingCallScreen = ({ caller, onEndCall, onToggleMute, onToggleSpeaker, isMuted, isSpeakerOn }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
      >
        <View style={styles.callerInfo}>
          {caller.image ? (
            <Image source={{ uri: caller.image }} style={styles.callerImage} />
          ) : (
            <View style={styles.callerImagePlaceholder}>
              <Text style={styles.callerImagePlaceholderText}>{caller.name.charAt(0)}</Text>
            </View>
          )}
          <Text style={styles.callerName}>{caller.name}</Text>
          <Text style={styles.callStatus}>Ongoing call</Text>
        </View>
        <View style={styles.ongoingButtonContainer}>
          <TouchableOpacity style={styles.circleButton} onPress={onToggleMute}>
            <Text style={styles.buttonIcon}>{isMuted ? '🔇' : '🎤'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton} onPress={onToggleSpeaker}>
            <Text style={styles.buttonIcon}>{isSpeakerOn ? '🔊' : '🔈'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.circleButton, styles.endCallButton]} onPress={onEndCall}>
            <Text style={styles.buttonIcon}>📞</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hp('4%'),
  },
  callerInfo: {
    alignItems: 'center',
    marginTop: hp('10%'),
  },
  callerImage: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('20%'),
    marginBottom: hp('2%'),
  },
  callerImagePlaceholder: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('20%'),
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callerImagePlaceholderText: {
    fontSize: wp('15%'),
    color: '#ffffff',
  },
  callerName: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: hp('1%'),
  },
  callStatus: {
    fontSize: wp('4%'),
    color: '#ffffff',
    opacity: 0.8,
  },
  ongoingButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: hp('5%'),
  },
  circleButton: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    backgroundColor: '#ff3b30',
  },
  buttonIcon: {
    fontSize: wp('8%'),
    color: '#ffffff',
  },
});

export default OngoingCallScreen;