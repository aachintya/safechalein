import { router } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Animated } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const carouselData = [
  {
    id: '1',
    image: require("../assets/images/logo-3.png"),
    title: 'Your Safety, Our Priority',
    subtitle: "Stay Protected with Every Step You Take.",
  },
  {
    id: '2',
    image: require("../assets/images/1.png"),
    title: 'Instant Alerts, Immediate Actiloon',
    subtitle: 'Get Help in Real-Time, Wherever You Are.',
  },
  {
    id: '3',
    image: require("../assets/images/2.png"),
    title: '"Navigate Safely, Live Fearlessly',
    subtitle: 'Empowering You to Travel with Confidence and Security.',
  },
];

const LoginPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const renderCarouselItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * wp('100%'),
      index * wp('100%'),
      (index + 1) * wp('100%'),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.carouselItem, { transform: [{ scale }] }]}>
        <Image source={ item.image} style={styles.carouselImage} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </Animated.View>
    );
  };

  const renderDotIndicator = () => {
    return (
      <View style={styles.dotContainer}>
        {carouselData.map((_, index) => {
          const width = scrollX.interpolate({
            inputRange: [
              (index - 1) * wp('100%'),
              index * wp('100%'),
              (index + 1) * wp('100%'),
            ],
            outputRange: [wp('2%'), wp('4%'), wp('2%')],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { width },
                index === currentIndex ? styles.activeDot : null,
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={carouselData}
        renderItem={renderCarouselItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / wp('100%')
          );
          setCurrentIndex(newIndex);
        }}
      />

      {renderDotIndicator()}
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push("(tabs)")}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Text style={styles.createAccountText}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: hp('5%'),
    paddingHorizontal: wp('5%'),
  },
  time: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  carouselItem: {
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    width: wp('50%'),
    height: wp('50%'),
    marginBottom: hp('2.5%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('1.5%'),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#666',
    marginBottom: hp('2.5%'),
    paddingHorizontal: wp('10%'),
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2.5%'),
  },
  dot: {
    height: wp('2%'),
    borderRadius: wp('1%'),
    backgroundColor: '#ccc',
    marginHorizontal: wp('1%'),
  },
  activeDot: {
    backgroundColor: '#6b63f6',
  },
  footer: {
    padding: wp('5%'),
  },
  loginButton: {
    backgroundColor: '#6b63f6',
    paddingVertical: hp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  loginButtonText: {
    color: 'white',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  createAccountText: {
    color: 'black',
    fontSize: wp('4%'),
    textAlign: 'center',
  },
});

export default LoginPage;