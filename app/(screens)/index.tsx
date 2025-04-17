import { Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { Link, router } from "expo-router";
import { useState, useEffect } from "react";
import { globalStyles, loginStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIREBASE
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../configurations/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";  // Import Firestore functions
import { FirebaseError } from "firebase/app";
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // HANDLES
  const handlePressSignUpButton = () => {
    router.replace('/signUp'); // Navigate to the Login page
  }

  const pressLoginButton = async () => {
    try {
      // Sign in the user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Check if the user profile exists in Firestore
      const userProfileDoc = await getDoc(doc(db, "users", user.uid, "profile", "studentProfile"));
      if (userProfileDoc.exists()) {
        const userProfileData = userProfileDoc.data();
        console.log("Fetched Profile Data:", userProfileData); // Log the fetched profile data
  
        // If the profile is incomplete, redirect to setupInformation
        if (userProfileData.completedInformation === false) {
          Alert.alert("Setup Required", "Please complete your profile setup.", [
            {
              text: "Continue",
              onPress: () => router.replace('/setupInformation'), // Redirect to setup information
            },
          ]);
        } else {
          // If profile is complete, redirect to the dashboard
          Alert.alert("Success", "You are logged in!", [
            { text: "Continue", onPress: () => router.replace('/') }, // Redirect to the dashboard
          ]);
        }
      } else {
        // Handle the case if profile document does not exist
        Alert.alert("Error", "An error occurred while fetching your profile information.");
      }
    } catch (error) {
      console.error("Login Error: ", error); // Log the error to console for debugging
  
      if (error instanceof FirebaseError) {
        // Check for specific error codes and provide user-friendly messages
        switch (error.code) {
          case 'auth/invalid-email':
            Alert.alert("Invalid Email", "The email you entered is not valid. Please check and try again.");
            break;
          case 'auth/user-not-found':
            Alert.alert("User Not Found", "No user found with this email. Please check and try again.");
            break;
          case 'auth/wrong-password':
            Alert.alert("Incorrect Password", "The password you entered is incorrect. Please try again.");
            break;
          default:
            Alert.alert("Login Error", "An unknown error occurred. Please try again later.");
        }
      } else {
        Alert.alert("Login Error", "An unexpected error occurred. Please try again later.");
      }
    }
  };

    // Check if the user is logged in on app start
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsLoading(false); // Stop loading
        if (user) {
          // Check user profile and redirect accordingly
          const userProfileDoc = getDoc(doc(db, "users", user.uid, "profile", "studentProfile"));
          userProfileDoc.then((userProfile) => {
            if (userProfile.exists()) {
              const userProfileData = userProfile.data();
              if (userProfileData.completedInformation === false) {
                router.replace('/setupInformation');
              } else {
                router.replace('/');
              }
            } else {
              router.replace('/setupInformation'); // No profile, go to setup
            }
          });
        } else {
          setIsLoading(false); // If no user, stop loading and stay on login screen
        }
      });
  
      return unsubscribe; // Cleanup on unmount
    }, []);
  
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