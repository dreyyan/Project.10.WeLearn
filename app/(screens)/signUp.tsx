
import { Text, View, TextInput, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { router } from "expo-router";
import { globalStyles, signUpStyles } from "../../styles/styles"
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { FirebaseError } from "firebase/app"; // Import FirebaseError type

export default function SignUp() {
  // STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // From Google Cloud: Client ID for Web
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '601466500645-48tht9945jgrcpg1epp7auqsegkqc8dh.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri()
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Success", "Signed up with Google!", [
            { text: "Continue", onPress: () => router.replace("/login") },
          ]);
        })
        .catch((error) => {
          Alert.alert("Google Sign-In Error", error.message);
        });
    }
  }, [response]);

  // HANDLES
  const handlePressBackButton = () => {
    router.replace('/login'); // Navigate to the Login page
  }

  const handlePressSignUpButton = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "You have signed up!", [
        { text: "Continue", onPress: () => router.replace('/login') },
      ]);
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

  // Google Sign-In handler
  const handlePressSignUpWithButton = async () => {
    try {
      const result = await promptAsync(); // Trigger Google Sign-In
      if (result?.type === 'success') {
        const { id_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
        Alert.alert("Success", "Signed up with Google!", [
          { text: "Continue", onPress: () => router.replace("/login") },
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

  return (
    <View style={globalStyles.screen}>
      {/* HEADER */}
      <Text style={globalStyles.title}>WeLearn</Text>
      <Text style={globalStyles.subtitle}>SIGN UP</Text>

        <View style={signUpStyles.formContainer}>
        <ScrollView style={signUpStyles.form} scrollEnabled={false}>
          {/* 1. NAME */}
          <Text style={globalStyles.label}>Name</Text>
          <TextInput
            placeholder="Juan de la Cruz"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={signUpStyles.credentialsInputField}
            value={name}
            onChangeText={setName} // Update the name state when the user types
          />
          {/* 2. EMAIL */}
          <Text style={globalStyles.label}>Email</Text>
          <TextInput
            placeholder="example@email.com"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={signUpStyles.credentialsInputField}
            value={email}
            onChangeText={setEmail} // Update the email state when the user types
          />
          {/* 3. PASSWORD */}
          <Text style={globalStyles.label}>Password</Text>
          <TextInput
            placeholder="Enter password"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={signUpStyles.inputField}
            secureTextEntry={true} // Hide password input
            value={password}
            onChangeText={setPassword} // Update the password state when the user types
          />
          <Text style={signUpStyles.credentialsValidation}>
            • At least 1 uppercase{"\n"}
            • At least 1 lowercase{"\n"}
            • At least 6 characters
          </Text>
        </ScrollView>

        <View style={signUpStyles.buttonContainer}>
          {/* BACK BUTTON */}
          <TouchableOpacity
            style={globalStyles.backButton}
            onPress={handlePressBackButton}
          >
            <Text style={signUpStyles.backButtonLabel}>BACK</Text>
          </TouchableOpacity>
          
          {/* CONTINUE BUTTON */}
          <TouchableOpacity
            style={globalStyles.continueButton}
            onPress={handlePressSignUpButton}
          >
            <Text style={signUpStyles.continueButtonLabel}>SIGN UP</Text>
          </TouchableOpacity>

        </View>

        {/* DIVIDER */}
        <Text style={signUpStyles.textDivider}>or Sign up with</Text>

        {/* SIGNUP BUTTONS */}
        <TouchableOpacity
          style={signUpStyles.signUpWithButton}
          onPress={handlePressSignUpWithButton}
        >
        <Image
          source={require("../../assets/images/icon-google.webp")}
          style={{ width: 24, height: 40 }}
          resizeMode="contain"
        />
        </TouchableOpacity>
      </View>
    </View>
  );
}
