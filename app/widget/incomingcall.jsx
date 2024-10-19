import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

const IncomingCallScreen = ({ caller, onAccept, onDecline }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#2b2b2b']}
        style={styles.gradient}
      >
        <View style={styles.callerInfo}>
          {caller.image ? (
            <Image source={{ uri: caller.image }} style={styles.callerImage} />
          ) : (
            <View style={styles.callerImagePlaceholder}>
              <Text style={styles.callerImageText}>{caller.name.charAt(0)}</Text>
            </View>
          )}
          <Text style={styles.callerName}>{caller.name}</Text>
          <Text style={styles.callerNumber}>{caller.number}</Text>
          <Text style={styles.callStatus}>Incoming call</Text>
        </View>
        <View style={styles.callActions}>
          <TouchableOpacity style={styles.actionButton} onPress={onDecline}>
            <LinearGradient
              colors={['#ff4444', '#cc0000']}
              style={[styles.actionIcon, styles.declineIcon]}
            >
              <Text style={styles.actionIconText}>✕</Text>
            </LinearGradient>
            <Text style={styles.actionText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onAccept}>
            <LinearGradient
              colors={['#00C853', '#009624']}
              style={[styles.actionIcon, styles.acceptIcon]}
            >
              <Text style={styles.actionIconText}>✓</Text>
            </LinearGradient>
            <Text style={styles.actionText}>Accept</Text>
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
    marginBottom: hp('2%'),
  },
  callerImageText: {
    fontSize: wp('20%'),
    color: '#ffffff',
  },
  callerName: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: hp('1%'),
  },
  callerNumber: {
    fontSize: wp('5%'),
    color: '#ffffff',
    marginBottom: hp('2%'),
  },
  callStatus: {
    fontSize: wp('4%'),
    color: '#ffffff',
    opacity: 0.8,
  },
  callActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: hp('10%'),
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  declineIcon: {
    backgroundColor: '#ff4444',
  },
  acceptIcon: {
    backgroundColor: '#00C853',
  },
  actionIconText: {
    fontSize: wp('10%'),
    color: '#ffffff',
  },
  actionText: {
    fontSize: wp('4%'),
    color: '#ffffff',
  },
});

export default IncomingCallScreen;