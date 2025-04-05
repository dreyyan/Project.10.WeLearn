import { Text, View, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Link } from "expo-router";
import { globalStyles, loginStyles } from "../../styles/styles"

export default function Login() {
  return (
    <View style={globalStyles.screen}>
      {/* HEADER */}
      <Text style={globalStyles.title}>WeLearn</Text>
      <Text style={globalStyles.subtitle}>LOGIN</Text>

      {/* INPUT FIELD [USERNAME & PASSWORD] */}
      <Text style={globalStyles.label}>Username</Text>
      <TextInput placeholder="Username" style={loginStyles.inputField}/>
      <Text style={globalStyles.label}>Password</Text>
      <TextInput placeholder="Password" style={loginStyles.inputField}/>

      <Text style={{fontSize: 60, color: "white"}}>
        <Link href="/_screens/register">Go to Register</Link>
      </Text>
    </View>
  );
}
