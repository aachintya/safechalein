import { StyleSheet, Text, View ,SafeAreaView} from 'react-native';
import React from 'react';

// import AppMapview from './../Mapview';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safe Chalein</Text>
      </View>
      {/* <View style={styles.content}>
        <AppMapview  />
      </View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    
  },
  header: {
    height: 60,
    width: '100%',
    marginTop:30 ,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  
});