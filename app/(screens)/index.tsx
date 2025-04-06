import { Text, View, TextInput } from "react-native";
import { Link } from "expo-router";
import { globalStyles, loginStyles } from "../../styles/styles"

export default function Index() {
  return (
    <View style={globalStyles.screen}>
      {/* HEADER */}
      <Text style={globalStyles.title}>WeLearn</Text>
      <Text style={globalStyles.subtitle}>DEBUGGING MENU</Text>

      <Text style={{fontSize: 60, color: "white"}}>
        <Link href="/(screens)/login">Go to Login</Link>
      </Text>
      <Text style={{fontSize: 60, color: "white"}}>
        <Link href="/(screens)/register">Go to Register</Link>
      </Text>

    </View>
  );
}
