// UserLocationcontext.js
import React, { createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const UserLocationContext = createContext();

export const UserLocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
  
      const userLocation = await Location.getCurrentPositionAsync({});
      console.log('Fetched location:', userLocation.coords);
      setLocation(userLocation.coords);
    };
  
    fetchLocation();
  }, []);
  

  return (
    <UserLocationContext.Provider value={{ location }}>
      {children}
    </UserLocationContext.Provider>
  );
};
