import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  Alert, 
  TouchableOpacity 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const FakeCall = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleFakeCall = () => {
    Alert.alert('Fake Call', `Calling ${name} at ${number}...`);
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

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timePicker}>
        <Text style={styles.timePickerText}>
          {`Set Call Time: ${time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setTime(selectedDate);
            }
          }}
        />
      )}

      <Button title="Schedule Fake Call" onPress={handleFakeCall} color="#007BFF" />
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
  timePicker: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  timePickerText: {
    fontSize: 18,
    color: '#333',
  },
});
