// REACT NATIVE
import { Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
// STYLES
import { globalStyles, loginStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIREBASE
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../configurations/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
// CONTEXT
import UserProvider from '../../context/UserContext';

export default function Login() {
  // STATES
  const [email, setEmail] = useState("ADT07299270@gmail.com");
  const [password, setPassword] = useState("123456");
  const [isLoading, setIsLoading] = useState(true);

  // HANDLES
  const pressLoginButton = async () => {
    try {
      // Log in the user with provided email and password
      // Returns 'userCredential' object if successful
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Extracts actual user info from 'userCredential'
      const user = userCredential.user;
  
      // Attempt to fetch the student profile from Firestore at the specified path
      const userProfileDoc = await getDoc(doc(db, "users", user.uid, "profile", "studentProfile"));
      // Check if the document exists in the database
      if (userProfileDoc.exists()) {
        // If existing document, retrieve document data and log for debugging
        const userProfileData = userProfileDoc.data();
        console.log("Fetched Profile Data:", userProfileData); // Logging
  
        // Check if the user's profile is incomplete
        if (userProfileData.completedInformation === false) {
          // If incomplete, redirect to setup information screen
          Alert.alert("Setup Required", "Please complete your profile setup.", [
            {
              text: "Continue",
              onPress: () => router.replace('/SetupInformation'),
            },
          ]);
        } else {
          router.replace('/Dashboard')
          // If profile is complete, redirect to the dashboard
          // Alert.alert("Success", "You are logged in!", [
          //   { text: "Continue", onPress: () => router.replace('/Dashboard') },
          // ]);
        }
      } else {
        // ERROR: Non-existing profile document
        Alert.alert("New User", "Please complete your profile setup.");
      }
    } catch (error) {
      // If profile does not exist, log the error
      console.error("Login Error: ", error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email': // ERROR: Invalid Email
            Alert.alert("Invalid Email", "The email you entered is not valid. Please check and try again.");
            break;
          case 'auth/user-not-found': // ERROR: Non-existing User
            Alert.alert("User Not Found", "No user found with this email. Please check and try again.");
            break;
          case 'auth/wrong-password': // ERROR: Wrong password
            Alert.alert("Incorrect Password", "The password you entered is incorrect. Please try again.");
            break;
          default: // Error fallback for unknown Firebase errors
            Alert.alert("Login Error", "An unknown error occurred. Please try again later.");
        }
      } else {
        // Error fallback for unknown Firebase errors
        Alert.alert("Login Error", "An unexpected error occurred. Please try again later.");
      }
    }
  };

    // LISTEN: Stay on latest screen
    useEffect(() => {
      // Setup listener for Firebase Authentication
      // Triggers everytime the user's login state changes
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsLoading(false); // Stop loading once Firebase returns a result

        // If user is logged in, check their profile and decide where to send it
        if (user) {
          // Check user profile and redirect accordingly
          // Create a promise to fetch the Firestore document at the specified path
          const userProfileDoc = getDoc(doc(db, "users", user.uid, "profile", "studentProfile"));
          // Get the actual document result
          userProfileDoc.then((userProfile) => {
            if (userProfile.exists()) {
              // If document exists, extract actual data
              const userProfileData = userProfile.data();
              if (userProfileData.completedInformation === false) {
              // If user has incomplete profile, redirect to setup information
                router.replace('/SetupInformation');
              } else {
                // If user has complete profile, redirect to dashboard
                router.replace('/');
              }
            } else {
              // If document doesn't exist, redirect to setup information
              router.replace('/SetupInformation');
            }
          });
        } else {
          // If no user, stop loading and stay on login screen
          setIsLoading(false);
        }
      });
  
      return unsubscribe; // Cleanup on unmount, stops listening for auth changes to prevent memory leaks
    }, []);
  
  return (
    <UserProvider>
        <View style={globalStyles.screen}>
        {/* HEADER */}
        <Image
        source={require("../../assets/images/banner-WeLearn.png")}
        style={globalStyles.banner}
        resizeMode="contain"
        />
        {/* PERSONALIZATION: Status bar color */}
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
          <Link href="/SignUp" style={loginStyles.createAccountLink}>Create an account</Link>
        </View>
      </View>
    </UserProvider>
  );
}