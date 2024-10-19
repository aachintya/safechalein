import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Image, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/user/login', {
        
        email:email,
        password:password,
      });
      console.log(response.data);
      setSuccessMessage('logged in  successfully!'); 
      setErrorMessage(''); 
      router.replace("(tabs)"); 
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data.message || 'An error occurred during login.'); 
      setSuccessMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
         

          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subtitle}>Welcome back to the app</Text>
            </View>
           
            <View style={styles.formContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="hello@example.com"
                value={email}
                onChangeText={setemail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <View style={styles.passwordContainer}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="••••••••••••"
                value={password}
                onChangeText={setpassword}
                secureTextEntry
              />

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setKeepSignedIn(!keepSignedIn)}
              >
                <View style={[styles.checkbox, keepSignedIn && styles.checked]} />
                <Text style={styles.checkboxLabel}>Keep me signed in</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin(onPress)}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <Text style={styles.orText}>or sign in with</Text>

              <TouchableOpacity style={styles.googleButton}>
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.createAccount} onPress={() => router.push("signup")}>
            <Text style={styles.createAccountText}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  time: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
  },
  titleContainer: {
    marginTop: hp('5%'),
    marginBottom: hp('5%'),
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#666',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logoBox: {
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    width: wp('50%'),
    height: wp('50%'),
    marginBottom: hp('2.5%'),
  },
  label: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    padding: wp('3%'),
    marginBottom: hp('2%'),
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPassword: {
    color: '#6B63F6',
    fontSize: wp('3.5%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  checkbox: {
    width: wp('5%'),
    height: wp('5%'),
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: wp('2%'),
    borderRadius: wp('1%'),
  },
  checked: {
    backgroundColor: '#6B63F6',
  },
  checkboxLabel: {
    fontSize: wp('4%'),
  },
  loginButton: {
    backgroundColor: '#6B63F6',
    padding: wp('3%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  loginButtonText: {
    color: 'white',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: hp('2%'),
  },
  googleButton: {
    backgroundColor: '#f0f0f0',
    padding: wp('3%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  googleButtonText: {
    fontSize: wp('4%'),
  },
  footer: {
    padding: hp('2%'),
    alignItems: 'center',
  },
  createAccountText: {
    color: '#6B63F6',
    fontSize: wp('4%'),
  },
});

export default LoginPage;