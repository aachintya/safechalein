import React, { useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { UserLocationContext } from '../context/UserLocationcontext';

export default function AppMapview() {
  const { location, errorMsg } = useContext(UserLocationContext);

  // Show loading indicator while fetching location
  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Fetching location...</Text>
      </View>
    );
  }

  // Handle error message
  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>Error: {errorMsg}</Text>
      </View>
    );
  }

  // Map rendering when location is available
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        userLocationAnnotationTitle="Your Location"
      >
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="Your Location"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
