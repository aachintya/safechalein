import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
       
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up to get started</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Harshit Kumar"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />

              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="hello@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

           
              <TouchableOpacity style={styles.signupButton} onPress={() => router.replace("(tabs)")}>
                <Text style={styles.signupButtonText}>Create Account</Text>
              </TouchableOpacity>

              <Text style={styles.orText}>or sign up with</Text>

              <TouchableOpacity style={styles.googleButton}>
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.footer} onPress={() => router.back()}>
          <Text style={styles.footerText}>Already have an account? </Text>
            <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
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
  },
  label: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    marginTop: hp('2%'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    padding: wp('3%'),
    marginBottom: hp('2%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  checkbox: {
    marginVertical: hp('2%'),
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
    fontSize: wp('3.5%'),
    flex: 1,
    flexWrap: 'wrap',
  },
  signupButton: {
    backgroundColor: '#6B63F6',
    padding: wp('3%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  signupButtonText: {
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp('2%'),
  },
  footerText: {
    fontSize: wp('4%'),
    color: '#666',
  },
  loginText: {
    color: '#6B63F6',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});

export default SignupPage;