import { Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Link, router } from "expo-router";
import { globalStyles, loginStyles, registerStyles } from "../../styles/styles"

export default function signUp() {
  // STATES

  // HANDLES
  const handlePressBackButton = () => {
    router.replace('/login'); // Navigate to the Login page
  }

  const handleSignUpButton = () => {
    Alert.alert(
      "Success",
      "You have signed up! You may now proceed to the login form.",
      [
        {
          text: "Continue",
          onPress: () => {
            router.replace('/login'); // Use push() if you don't want to remove register page from stack
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={globalStyles.screen}>
      {/* HEADER */}
      <Text style={globalStyles.title}>WeLearn</Text>
      <Text style={globalStyles.subtitle}>SIGN UP</Text>
        <View style={registerStyles.formContainer}>
        <ScrollView style={registerStyles.form}>
          {/* 4. USERNAME & PASSWORD */}
          <Text style={globalStyles.label}>Username</Text>
          <TextInput placeholder="enter username" placeholderTextColor="rgba(0, 0, 0, 0.2)" style={registerStyles.credentialsInputField}/>
          <Text style={registerStyles.credentialsValidation}>
            • 5–12 characters{"\n"}
            • Starts with a letter{"\n"}
            • Letters and numbers only
          </Text>
          <Text style={globalStyles.label}>Password</Text>
          <TextInput placeholder="enter password" placeholderTextColor="rgba(0, 0, 0, 0.2)" style={registerStyles.inputField}/>
          <Text style={registerStyles.credentialsValidation}>
            • At least 1 uppercase{"\n"}
            • At least 1 lowercase{"\n"}
            • At least 1 special character
          </Text>
        </ScrollView>

        <View style={registerStyles.buttonContainer}>
          {/* BACK BUTTON */}
          <TouchableOpacity
            style={globalStyles.backButton}
            onPress={handlePressBackButton}
          >
            <Text style={registerStyles.backButtonLabel}>BACK</Text>
          </TouchableOpacity>
          
          {/* CONTINUE BUTTON */}
          <TouchableOpacity
            style={globalStyles.continueButton}
            onPress={handleSignUpButton}
          >
            <Text style={registerStyles.continueButtonLabel}>SIGN UP</Text>
          </TouchableOpacity>  
        </View>
      </View>
    </View>
  );
}
