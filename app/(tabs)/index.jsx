import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppMapview from './../Mapview';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const handleSOSPress = () => {
    Alert.alert('SOS', 'Are you sure you want to send an SOS?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => console.log('SOS button pressed'),
      },
    ]);
  };

  return (
    <>
      <StatusBar backgroundColor="#ccc" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Ionicons name="menu" size={wp('6%')} color="#6b63f6"  />
            <Image source={require("../../assets/images/logo-3.png")} style={styles.logo} />
            <Ionicons name="notifications" size={wp('6%')} color="#6b63f6" style={styles.notificationIcon} />
          </View>
          <View style={styles.content}>
            <AppMapview />
          </View>
          <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
            <Text style={styles.sosButtonText}>SOS</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    height: hp('8%'),
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  
  },
  headerText: {
    color: '#fff',
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
  notificationIcon: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  logo: {
    width: wp('25%'),
    height: wp('25%'),
    resizeMode: 'contain',
  },
  sosButton: {
    position: 'absolute',
    right: wp('5%'),
    bottom: hp('3%'),
    backgroundColor: '#DB2B39',
    borderRadius: wp('10%'),
    width: wp('20%'),
    height: wp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sosButtonText: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
});
