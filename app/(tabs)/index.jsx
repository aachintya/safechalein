import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppMapview from './../Mapview';

const HomeScreen = () => {
  return (
    <>
      <StatusBar backgroundColor="#ccc" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require("../../assets/images/logo-3.png")} style={styles.logo} />
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
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: hp('8%'),
    width: '100%',
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  
   
  },
  headerText: {
    color: '#fff',
    fontSize: wp('6%'),
    fontWeight: 'bold',
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