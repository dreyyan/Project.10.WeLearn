import { Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { Link, router } from "expo-router";
import { globalStyles, loginStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  // HANDLES
  const handlePressSignUpButton = () => {
    router.replace('/signUp'); // Navigate to the Login page
  }

  const pressLoginButton = () => {
    Alert.alert(
      "Success",
      "Redirecting to main page...",
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
  }

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
      <View style={globalStyles.titleContainer}>
        <Text style={globalStyles.title}>LOGIN</Text>
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
          />
        </View>

        {/* INPUT => PASSWORD */}
        <View style={loginStyles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.primary} style={globalStyles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={loginStyles.inputField}
          />
        </View>

          {/* CONTINUE BUTTON */}
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