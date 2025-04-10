import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { globalStyles, loginStyles } from "../../styles/styles"
import { Link, router } from "expo-router";

export default function Login() {
  // HANDLES
  const handlePressSignUpButton = () => {
    router.replace('/signUp'); // Navigate to the Login page
  }

  const handlePressLoginButton = () => {
    Alert.alert(
      "Success",
      "Redirecting to main page...",
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
        <Text style={globalStyles.subtitle}>LOGIN</Text>
      <View style={globalStyles.div}>
        {/* INPUT FIELD [USERNAME & PASSWORD] */}
        <Text style={loginStyles.usernameLabel}>Username</Text>
        <TextInput placeholder="Username" placeholderTextColor="rgba(0, 0, 0, 0.2)" style={loginStyles.inputField}/>
        <Text style={globalStyles.label}>Password</Text>
        <TextInput placeholder="Password" placeholderTextColor="rgba(0, 0, 0, 0.2)" style={loginStyles.inputField}/>

        <Text style={loginStyles.noAccountLabel}>     Don't have an account?  <Link href="/signUp" style={loginStyles.signUpLink}>Sign Up</Link></Text>

        <View style={loginStyles.buttonContainer}>
          {/* CONTINUE BUTTON */}
          <TouchableOpacity
            style={globalStyles.continueButton}
            onPress={handlePressLoginButton}
          >
            <Text style={loginStyles.loginButtonLabel}>LOGIN  ➜</Text>
          </TouchableOpacity>  
        </View>
      </View>
    </View>
  );
}