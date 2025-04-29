import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
// CONTEXT
import UserProvider from '../../context/UserContext';
import { AudioProvider } from '../../context/AudioContext';

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
    <UserProvider>
      <AudioProvider>
        <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true, // Allow swipe gestures (iOS swipe-back)
        }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="SignUp"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="SetupInformation"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="Dashboard"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="QR"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="EditInformation"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="EnrollmentForm"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="Departments"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="CourseOverview"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="PrivacyAndSupport"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        </Stack>
      </AudioProvider>
    </UserProvider>
  );
}
