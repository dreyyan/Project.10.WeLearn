// REACT NATIVE
import { Text, View, TextInput, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// STYLES
import { globalStyles, signUpStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIREBASE AUTHENTICAITON
import { createUserWithEmailAndPassword, signInWithCredential, GoogleAuthProvider, signOut } from "firebase/auth";
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
import { Audio } from 'expo-av';
// CONTEXT
import { useUser, User } from '../../context/UserContext';
import { useAudio } from '../../context/AudioContext';

export default function SignUp() {
  // STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // CONTEXT
  const { setUser } = useUser(); // Use user context
  const { playButtonPressSound, playPopupSound, playSuccessSound, playErrorSound } = useAudio(); // Use audio context

  // SETUP: Google Sign-in via Google Auth Provider
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

  // HANDLES
  const pressBackButton = () => {
    router.replace('/'); // Redirect to login page
  }

  const pressSignUpButton = async () => {
    playButtonPressSound();

    try {
      // Ensure the user is signed out before attempting to sign up again
      await signOut(auth);

      /* NAME VALIDATION */
      // ERROR: Empty name
      if (!name) {
        playErrorSound();
        Alert.alert("Name Required", "Please enter a valid name to continue.");
        return;
      }

      // ERROR: Out-of-range name length
      if (name.length < 2 || name.length > 50) {
        playErrorSound();
        Alert.alert("Invalid Name", "Name must be between 2 and 50 characters.");
        return;
      }

      // ERROR: Invalid characters
      const nameRegex = /^[A-Za-z\s-]+$/;
      if (!nameRegex.test(name)) {
        playErrorSound();
        Alert.alert("Invalid Name", "Name must contain only letters, spaces, or hyphens.");
        return;
      }

      /* EMAIL VALIDATION */
      // ERROR: Empty email
      if (!email) {
        playErrorSound();
        Alert.alert("Email Required", "Please enter a valid email to continue.");
        return;
      }

      // ERROR: Invalid characters
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        playErrorSound();
        Alert.alert("Invalid Email", "Please enter a valid email address in the format: example@domain.com");
        return;
      }

      /* PASSWORD VALIDATION */
      // ERROR: Empty password
      if (!password) {
        playErrorSound();
        Alert.alert("Password Required", "Please enter a password to continue.");
        return;
      }
      
      // ERROR: Out-of-range password length
      if (password.length < 8 || password.length > 20) {
        playErrorSound();
        Alert.alert("Invalid Password", "Password must be between 8 and 20 characters.");
        return;
      }

      // ERROR: No uppercase letter
      if (!/[A-Z]/.test(password)) {
        playErrorSound();
        Alert.alert("Invalid Password", "Password must contain at least one uppercase letter.");
        return;
      }

      // ERROR: No lowercase letter
      if (!/[a-z]/.test(password)) {
        playErrorSound();
        Alert.alert("Invalid Password", "Password must contain at least one lowercase letter.");
        return;
      }

      // ERROR: No alphanumeric
      if (!/[0-9]/.test(password)) {
        playErrorSound();
        Alert.alert("Invalid Password", "Password must contain at least one number.");
        return;
      }

      // ERROR: No special character
      if (!/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)) {
        playErrorSound();
        Alert.alert("Invalid Password", "Password must contain at least one special character.");
        return;
      }

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
        type: "student",
        gender: "",
        ID: "",
        department: "",
        course: "",
        enrolledSubjects: [""],
        isEnrolled: false,
        completedInformation: false,
        profileImage: "../../assets/images/profile-placeholder.jpg",
      });

      // Set the user in the context
      setUser({
        uid: user.uid,
        email: email,
        type: "student",
        gender: "",
        ID: "",
        department: "",
        course: "",
      });

      // Check if 'completedInformation' is false and redirect accordingly
      const userProfileDoc = await getDoc(doc(db, "users", user.uid, "profile", "studentProfile"));

      // Check if the document exists in the database
      if (userProfileDoc.exists()) {
        // If existing document, retrieve document data
        const userProfileData = userProfileDoc.data();
        // Check if the user's profile is incomplete
        if (userProfileData.completedInformation === false) {
          playPopupSound();
          // If incomplete, redirect to setup information screen
          Alert.alert("Setup Required", "Please complete your profile setup.", [
            {
              text: "Continue",
              onPress: () => router.replace('/SetupInformation'),
            },
          ]);
        } else {
          playSuccessSound();
          // If profile is complete, redirect to the dashboard
          Alert.alert("Success", "You have signed up!", [
            { text: "Continue", onPress: () => router.replace('/') },
          ]);
        }
      } else {
        playErrorSound();
        // ERROR: Non-existing profile document
        Alert.alert("Error", "An error occurred while fetching your profile information.");
      }
    } catch (error) {
      playErrorSound();
      console.error(error); // Log the full error object to see what went wrong
      if (error instanceof FirebaseError) {
        // Check for specific error codes and provide user-friendly messages
        switch (error.code) {
          case 'auth/invalid-email': // ERROR: Invalid email
            Alert.alert("Invalid Email", "The email you entered is not valid. Please check and try again.");
            break;
          case 'auth/email-already-in-use': // ERROR: Email already in use
            Alert.alert("Email Already in Use", "This email address is already registered. Please log in or use a different email.");
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

        playSuccessSound();
        // Display success message and redirect to the dashboard
        Alert.alert("Success", "Signed up with Google!", [
          { text: "Continue", onPress: () => router.replace("/") },
        ]);
      } else {
        playErrorSound();
        // ERROR: Cancelled Google Sign-In
        Alert.alert("Google Sign-In Canceled");
      }
    } catch (error) {
      playErrorSound();
      if (error instanceof Error) {
        Alert.alert("Google Sign-In Error", error.message); // Display error message
      } else { // Error fallback for unknown Google errors
        Alert.alert("Google Sign-In Error", "An unknown error occurred.");
      }
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
