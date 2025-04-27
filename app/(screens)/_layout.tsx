import { Tabs } from "expo-router";
import CustomTabBar from "../../components/customTabBar"
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Lklavika-Light": require("../../assets/fonts/Klavika-Light.ttf"),
    "Lklavika-Medium": require("../../assets/fonts/Klavika-Medium.ttf"),
    "Lklavika": require("../../assets/fonts/Klavika-Regular.ttf"),
    "Lklavika-Bold": require("../../assets/fonts/Klavika-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#5BC82F" />
      </View>
    );
  }

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home"
        }}
      />
      <Tabs.Screen
        name="SignUp"
        options={{
          tabBarLabel: "Sign Up"
        }}
      />
    </Tabs>
  );
}
