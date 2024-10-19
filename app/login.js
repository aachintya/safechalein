import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Add your login logic here
    console.log("Login attempted with:", username, password);
    Alert.alert("Login", "Login attempted with: " + username + " " + password);
    // If login is successful, navigate to the main app
  };

  return (
    <LinearGradient colors={["#545677", "#5296A5"]} style={styles.gradient}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ffffff80"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ffffff80"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgotPassword} onPress={() => Alert.alert("Coming Soon!")}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPassword} onPress={() => Alert.alert("Coming Soon")}>
        <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: wp("5%"),
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: hp("0%"),
  },
  logo: {
    width: wp("60%"),
    height: wp("60%"),
  },
  inputContainer: {
    width: "100%",
    marginBottom: hp("2.5%"),
  },
  input: {
    height: hp("6%"),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: hp("3%"),
    marginBottom: hp("2%"),
    paddingHorizontal: wp("5%"),
    fontSize: wp("4%"),
    color: "#ffffff",
  },
  loginButton: {
    backgroundColor: "#CE96A6",
    borderRadius: hp("3%"),
    height: hp("6%"),
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: wp("4.5%"),
    fontWeight: "bold",
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: hp("2%"),
  },
  forgotPasswordText: {
    color: "#ffffff",
    fontSize: wp("3.5%"),
  },
  signupText: {
    color: "#ffffff",
    fontSize: wp("3.5%"),
    marginBottom: hp("2%"),
  },
});
