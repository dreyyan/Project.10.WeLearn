import { Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { globalStyles, loginStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIREBASE
import { auth } from "../../configurations/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // HANDLES
  const handlePressSignUpButton = () => {
    router.replace('/signUp'); // Navigate to the Login page
  }

  const pressLoginButton = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // You must store email and password in state
      const user = userCredential.user;
  
      Alert.alert(
        "Success!",
        "Redirecting to the main page...",
        [
          {
            text: "Continue",
            onPress: () => {
              router.replace('/dashboard');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error: any) {
      console.error("Firebase login error:", error); // Add this for debugging
    
      let message = "An error occurred. Please try again.";
      if (error.code === "auth/user-not-found") {
        message = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email format.";
      }
    
      Alert.alert("Login Failed", message);
    }    
  };

  return (
    <View style={globalStyles.screen}>
      {/* HEADER */}
      <Image
      source={require("../../assets/images/banner-WeLearn.png")}
      style={globalStyles.banner}
      resizeMode="contain"
      />
      {/* PERSONALIZATION: Change StatusBar color */}
      <StatusBar backgroundColor="#1773EA" style="light" />

      {/* TITLE */}
      <View style={loginStyles.titleContainer}>
        <Text style={loginStyles.title}>Welcome to WeLearn!</Text>
        <Text style={loginStyles.subtitle}>"Learn together, grow together."'</Text>
      </View>

      {/* INPUT FORM */}
      <View style={loginStyles.formContainer}>

        {/* INPUT => USERNAME/EMAIL */}
        <View style={loginStyles.inputContainer}>
          <Ionicons name="person-outline" size={20} color={colors.primary} style={globalStyles.icon} />
          <TextInput
            placeholder="Username or Email"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={loginStyles.inputField}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* INPUT => PASSWORD */}
        <View style={loginStyles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.primary} style={globalStyles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={loginStyles.inputField}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

          {/* LOGIN BUTTON */}
          <TouchableOpacity
            style={loginStyles.loginButton}
            onPress={pressLoginButton}
          ><Text style={loginStyles.loginButtonLabel}>LOGIN</Text>
          </TouchableOpacity>

        {/* LINK => CREATE ACCOUNT */}
        <Link href="/signUp" style={loginStyles.createAccountLink}>Create an account</Link>
      </View>
    </View>
  );
}