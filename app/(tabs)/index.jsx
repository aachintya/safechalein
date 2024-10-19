import React from 'react';
import { StyleSheet, View, SafeAreaView, Image, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppMapview from './../Mapview';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
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
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ccc',
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    height: hp('8%'),
    width: '100%',
    backgroundColor: '#ccc',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap:wp('2%'),
    paddingHorizontal: wp('3%'),
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
});
