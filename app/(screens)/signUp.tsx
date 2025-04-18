// REACT NATIVE
import { Text, View, TextInput, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// STYLES
import { globalStyles, signUpStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIREBASE AUTHENTICAITON
import { createUserWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../configurations/firebaseConfig";
// EXPO GOOGLE AUTH SESSION
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
// FIRESTORE DATABASE
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../configurations/firebaseConfig";
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function SignUp() {
  // STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // HANDLES
  const pressBackButton = () => {
    router.replace('/'); // Redirect to login page
  }

  const pressSignUpButton = async () => {
    try {
      // Create the user's account using the provided email and password
      // Returns 'userCredential' object if successful
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Extracts actual user info from 'userCredential'
      const user = userCredential.user;
  
      // Create top-level user document [ CREDENTIALS ]
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        uid: user.uid,
        createdAt: new Date().toISOString()
      });

      // Create student profile subdocument [ INFORMATION ]
      await setDoc(doc(db, "users", user.uid, "profile", "studentProfile"), {
        name: name,
        ID: "",
        course: "",
        department: "",
        email: email,
        courses: [],
        enrolledSubjects: [""],
        isEnrolled: false,
        completedInformation: false,
        type: ""
      });

    // Check if 'completedInformation' is false and redirect accordingly
    const userProfileDoc = await getDoc(doc(db, "users", user.uid, "profile", "studentProfile"));
    // Check if the document exists in the database
    if (userProfileDoc.exists()) {
      // If existing document, retrieve document data
      const userProfileData = userProfileDoc.data();
      // Check if the user's profile is incomplete
      if (userProfileData.completedInformation === false) {
        // If incomplete, redirect to setup information screen
        Alert.alert("Setup Required", "Please complete your profile setup.", [
          {
            text: "Continue",
            onPress: () => router.replace('/setupInformation'),
          },
        ]);
      } else {
        // If profile is complete, redirect to the dashboard
        Alert.alert("Success", "You have signed up!", [
          { text: "Continue", onPress: () => router.replace('/') },
        ]);
      }
    } else {
      // ERROR: Non-existing profile document
      Alert.alert("Error", "An error occurred while fetching your profile information.");
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      // Check for specific error codes and provide user-friendly messages
      switch (error.code) {
        case 'auth/invalid-email': // ERROR: Invalid email
          Alert.alert("Invalid Email", "The email you entered is not valid. Please check and try again.");
          break;
        case 'auth/email-already-in-use': // ERROR: Email already in use
          Alert.alert("Email Already in Use", "This email address is already registered. Please log in or use a different email.");
          break;
        case 'auth/weak-password': // ERROR: Weak password
          Alert.alert("Weak Password", "Your password must be at least 6 characters long. Please choose a stronger password.");
          break;
        default: // Error fallback for unknown Firebase errors
          Alert.alert("Sign Up Error", "An unknown error occurred. Please try again later.");
      }
    } else { // Error fallback for unknown Firebase errors
      Alert.alert("Sign Up Error", "An unexpected error occurred. Please try again later.");
      }
    }
  };

  const pressSignUpWithButton = async () => {
    try {
      // Trigger Google Sign-In prompt
      const result = await promptAsync();
      if (result?.type === 'success') {
        // If the user successfully signs in with Google, extract ID token from the result
        const { id_token } = result.params;

        // Create Firebase credential using the Google ID token
        const credential = GoogleAuthProvider.credential(id_token);

        // Register the user using Firebase with the generated credential
        await signInWithCredential(auth, credential);

        // Display success message and redirect to the dashboard
        Alert.alert("Success", "Signed up with Google!", [
          { text: "Continue", onPress: () => router.replace("/") },
        ]);
      } else {
        // ERROR: Cancelled Google Sign-In
        Alert.alert("Google Sign-In Canceled");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Google Sign-In Error", error.message); // Display error message
      } else { // Error fallback for unknown Google errors
        Alert.alert("Google Sign-In Error", "An unknown error occurred.");
      }
    }
  };

  // Google Sign-in Setup via Google Auth Provider
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '601466500645-48tht9945jgrcpg1epp7auqsegkqc8dh.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri()
  });

  // LISTEN: Check if user successfully signed in to Google
  useEffect(() => {
    if (response?.type === "success") {
      // If response type is 'success' [ successful Google Sign-In ], extract ID token
      const { id_token } = response.params;

      // Create Firebase credential using the Google ID token
      const credential = GoogleAuthProvider.credential(id_token);

      // Sign in the user with the newly created credential
      signInWithCredential(auth, credential)
        .then(() => {
          // Redirect to dashboard
          Alert.alert("Success", "Signed up with Google!", [
            { text: "Continue", onPress: () => router.replace("/") },
          ]);
        })
        .catch((error) => { // Handle errors for Google Sign-In
          Alert.alert("Google Sign-In Error", error.message);
        });
    }
  }, [response]); // 'Effect' depends on 'response' 

  return (
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
      <View style={signUpStyles.titleContainer}>
        <Text style={signUpStyles.title}>Sign Up to WeLearn</Text>
        <Text style={signUpStyles.subtitle}>"Join us on a journey of learning and growth."'</Text>
      </View>

      {/* BACK BUTTON */}
      <TouchableOpacity
        style={signUpStyles.backButton}
        onPress={pressBackButton}
      ><Text style={signUpStyles.backButtonLabel}>‹</Text>
      </TouchableOpacity>

      {/* INPUT FORM */}
      <View style={signUpStyles.formContainer}>
        {/* 1. NAME */}
        <Text style={signUpStyles.label}>Name</Text>
        <View style={signUpStyles.inputContainer}>
          <Ionicons name="person-outline" size={20} color={colors.primary} style={globalStyles.icon} />
          <TextInput
            placeholder="Juan de la Cruz"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={signUpStyles.inputField}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* 2. EMAIL */}
        <Text style={signUpStyles.label}>Email</Text>
        <View style={signUpStyles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color={colors.primary} style={globalStyles.icon} />
          <TextInput
            placeholder="example@email.com"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={signUpStyles.inputField}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* 3. PASSWORD */}
        <Text style={signUpStyles.label}>Password</Text>
        <View style={signUpStyles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.primary} style={globalStyles.icon} />
          <TextInput
            placeholder="********"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={signUpStyles.inputField}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
      </View>

      <View style={signUpStyles.buttonContainer}>
          {/* LOGIN BUTTON */}
          <TouchableOpacity
            style={signUpStyles.signUpButton}
            onPress={pressSignUpButton}
          ><Text style={signUpStyles.signUpButtonLabel}>SIGN UP</Text>
          </TouchableOpacity>

        </View>

        {/* DIVIDER */}
        <Text style={signUpStyles.textDivider}> ------------------   or Sign Up with   ------------------ </Text>

        {/* SIGNUP BUTTON */}
        <TouchableOpacity
          style={signUpStyles.signUpWithButton}
          onPress={pressSignUpWithButton}
        >
        <Image
          source={require("../../assets/images/icon-google.webp")}
          style={{ width: 24, height: 40 }}
          resizeMode="contain"
        />
        </TouchableOpacity>
    </View>
  );
}
