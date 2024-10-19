import React, { useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { UserLocationContext } from '../context/UserLocationcontext';
import { NativeScreenNavigationContainer } from 'react-native-screens';

export default function AppMapview() {
  const { location, errorMsg } = useContext(UserLocationContext);

  // Default region (UP, India)
  const defaultRegion = {
    latitude: 26.8467, // Latitude for Lucknow, UP
    longitude: 80.9462, // Longitude for Lucknow, UP
    latitudeDelta: 2.0,
    longitudeDelta: 2.0,
  };

  // Show loading indicator while fetching location
  if (!location && !errorMsg) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <View style={styles.container}>
      <MapView
        style={styles.map}
        region={location
          ? {
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }
          : defaultRegion // Fallback to UP, India
        }
        userLocationAnnotationTitle="Your Location"
        showsUserLocation={!!location}
      >
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Your Location"
          />
        )}
      </MapView>
    </View>
      </View>
    );
  }

  // Map rendering with user location if available, otherwise show UP, India
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '90%',
    marginTop: 20,

  },
});


// export default function AppMapview() {
//     const { location, errorMsg } = useContext(UserLocationContext);
  
//     // Default region (UP, India)
//     const defaultRegion = {
//       latitude: 26.8467, // Latitude for Lucknow, UP
//       longitude: 80.9462, // Longitude for Lucknow, UP
//       latitudeDelta: 2.0,
//       longitudeDelta: 2.0,
//     };
  
//     // Show loading indicator while fetching location
//     if (!location && !errorMsg) {
//       return (
//         <View style={styles.container}>
//           <ActivityIndicator size="large" color="#0000ff" />
//           <Text>Fetching location...</Text>
//         </View>
//       );
//     }
  
//     // Show error message if there's an error
//     if (errorMsg) {
//       return (
//         <View style={styles.container}>
//           <Text style={styles.errorText}>{errorMsg}</Text>
//         </View>
//       );
//     }
  
//     // Map rendering with user location if available, otherwise show UP, India
//     return (
//       <View style={styles.container}>
//         <MapView
//           style={styles.map}
//           region={location
//             ? {
//                 latitude: location.latitude,
//                 longitude: location.longitude,
//                 latitudeDelta: 0.005,
//                 longitudeDelta: 0.005,
//               }
//             : defaultRegion // Fallback to UP, India
//           }
//           userLocationAnnotationTitle="Your Location"
//           showsUserLocation={true}
//         >
//           {location && (
//             <Marker
//               coordinate={{ latitude: location.latitude, longitude: location.longitude }}
//               title="Your Location"
//             />
//           )}
//         </MapView>
//       </View>
//     );
//   }
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     map: {
//       width: '100%',
//       height: '100%', // Adjusting to full height
//     },
//     errorText: {
//       color: 'red',
//       margin: 10,
//     },
//   });
  