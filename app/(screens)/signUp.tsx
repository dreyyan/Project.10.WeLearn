
import { Text, View, TextInput, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { router } from "expo-router";
import { globalStyles, signUpStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
import { useState, useEffect } from "react";
// FIREBASE AUTHENTICATION
import { createUserWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../configurations/firebaseConfig";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { FirebaseError } from "firebase/app";
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
  // HANDLE: Redirect back to login page
  const pressBackButton = () => {
    router.replace('/');
  }

  // HANDLE: Account Sign Up
  const pressSignUpButton = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // STUDENT CREDENTIALS
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        uid: user.uid,
        createdAt: new Date().toISOString()
      });

      // STUDENT INFORMATION
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

    // Check if completedInformation is false and redirect accordingly
    const userProfileDoc = await getDoc(doc(db, "users", user.uid, "profile", "studentProfile"));
    if (userProfileDoc.exists()) {
      const userProfileData = userProfileDoc.data();
      if (userProfileData.completedInformation === false) {
        // If information is not completed, redirect to setupInformation
        Alert.alert("Setup Required", "Please complete your profile setup.", [
          {
            text: "Continue",
            onPress: () => router.replace('/setupInformation'), // Redirect to setup information
          },
        ]);
      } else {
        // If information is completed, redirect to the main page
        Alert.alert("Success", "You have signed up!", [
          { text: "Continue", onPress: () => router.replace('/') },
        ]);
      }
    } else {
      // Handle the case if profile document does not exist
      Alert.alert("Error", "An error occurred while fetching your profile information.");
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      // Check for specific error codes and provide user-friendly messages
      switch (error.code) {
        case 'auth/invalid-email':
          Alert.alert("Invalid Email", "The email you entered is not valid. Please check and try again.");
          break;
        case 'auth/email-already-in-use':
          Alert.alert("Email Already in Use", "This email address is already registered. Please log in or use a different email.");
          break;
        case 'auth/weak-password':
          Alert.alert("Weak Password", "Your password must be at least 6 characters long. Please choose a stronger password.");
          break;
        default:
          Alert.alert("Sign Up Error", "An unknown error occurred. Please try again later.");
      }
    } else {
      Alert.alert("Sign Up Error", "An unexpected error occurred. Please try again later.");
    }
  }
  };

  // HANDLE: Google Sign-In
  const pressSignUpWithButton = async () => {
    try {
      const result = await promptAsync(); // Trigger Google Sign-In
      if (result?.type === 'success') {
        const { id_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
        Alert.alert("Success", "Signed up with Google!", [
          { text: "Continue", onPress: () => router.replace("/") },
        ]);
      } else {
        Alert.alert("Google Sign-In Canceled");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Google Sign-In Error", error.message);
      } else {
        Alert.alert("Google Sign-In Error", "An unknown error occurred.");
      }
    }
  };

  // Google Sign-in Setup via Google Auth Provider
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '601466500645-48tht9945jgrcpg1epp7auqsegkqc8dh.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri()
  });

  // LISTEN: Successfull Google Sign-In
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Success", "Signed up with Google!", [
            { text: "Continue", onPress: () => router.replace("/") },
          ]);
        })
        .catch((error) => {
          Alert.alert("Google Sign-In Error", error.message);
        });
    }
  }, [response]);

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
            onChangeText={setName} // Update the name state when the user types
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
            onChangeText={setEmail} // Update the name state when the user types
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
            onChangeText={setPassword} // Update the name state when the user types
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

        {/* SIGNUP BUTTONS */}
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
