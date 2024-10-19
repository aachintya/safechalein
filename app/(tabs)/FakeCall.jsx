import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  Alert, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import { Audio } from 'expo-av'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const FakeCall = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [callDelay, setCallDelay] = useState(null);
  const [savedContacts, setSavedContacts] = useState([]);
  const [isCalling, setIsCalling] = useState(false);
  const [sound, setSound] = useState();

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const contacts = await AsyncStorage.getItem('contacts');
        if (contacts) {
          setSavedContacts(JSON.parse(contacts));
        }
      } catch (error) {
        console.error('Failed to load contacts', error);
      }
    };

    loadContacts();
  }, []);

  const handleFakeCall = async () => {
    if (!name || !number) {
      Alert.alert('Error', 'Please enter both name and number');
      return;
    }

    if (callDelay === null) {
      Alert.alert('Error', 'Please select a call delay');
      return;
    }

    Alert.alert('Fake Call Scheduled', `Calling ${name} at ${number} in ${callDelay} seconds...`);
    setIsCalling(true);

    setTimeout(async () => {
      await playRingtone();
      Alert.alert('Fake Call', `Calling ${name} at ${number}...`);
    }, callDelay * 1000);
  };

  const playRingtone = async () => {
    const { sound: ringtoneSound } = await Audio.Sound.createAsync(
      require("./../../assets/ringtone.mp3")
    );
    setSound(ringtoneSound);
    await ringtoneSound.playAsync();
  };

  const endCall = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(undefined);
    }
    setIsCalling(false);
    setName('');
    setNumber('');
    setCallDelay(null);
    Alert.alert('Call Ended', `The call to ${name} has been ended.`);
  };

  const saveContact = async () => {
    if (!name || !number) {
      Alert.alert('Error', 'Please enter both name and number');
      return;
    }

    const newContact = { name, number };
    const updatedContacts = [...savedContacts, newContact];

    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
      setSavedContacts(updatedContacts);
      Alert.alert('Success', 'Contact saved successfully');
    } catch (error) {
      console.error('Failed to save contact', error);
    }
  };

  const selectContact = (contact) => {
    setName(contact.name);
    setNumber(contact.number);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Fake Calls</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={number}
        onChangeText={setNumber}
        keyboardType="phone-pad"
      />

      <Text style={styles.optionTitle}>Select Call Delay:</Text>
      <View style={styles.optionsContainer}>
        {[30, 60, 300, 600].map((delay) => (
          <TouchableOpacity
            key={delay}
            style={[styles.optionButton, callDelay === delay && styles.selectedOption]}
            onPress={() => setCallDelay(delay)}
          >
            <Text style={styles.optionText}>{`${delay === 30 ? '30 Seconds' : `${delay / 60} Minutes`}`}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Schedule Fake Call" onPress={handleFakeCall} color="#007BFF" />
      <Button title="Save Contact" onPress={saveContact} color="#28A745" />

      {isCalling && (
        <Button title="End Call" onPress={endCall} color="#FF0000" />
      )}

      <Text style={styles.savedContactsTitle}>Saved Contacts:</Text>
      <FlatList
        data={savedContacts}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectContact(item)} style={styles.contactItem}>
            <Text style={styles.contactText}>{`${item.name} - ${item.number}`}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.number}
      />
    </View>
  );
};

export default FakeCall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  optionTitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  selectedOption: {
    backgroundColor: '#007BFF',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  savedContactsTitle: {
    fontSize: 20,
    marginVertical: 10,
    color: '#333',
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactText: {
    fontSize: 16,
  },
});
