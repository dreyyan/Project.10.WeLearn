// STATES
//   const [yearText, setYearText] = useState("");
//   const [age, setAge] = useState(0);
//   const [middleInitial, setMiddleInitial] = useState("");
// const [isChecked, setIsChecked] = useState(false);
// const [showForm, setShowForm] = useState(true);
//   const handlePressContinueButton = () => {
//     setShowForm(false);
//   }
// COMPONENTS
// import BouncyCheckbox from "react-native-bouncy-checkbox";
// import Slider from '@react-native-community/slider';
// {showForm ? (
//     // FORM #1: PERSONAL INFORMATION
//     <View style={registerStyles.firstFormContainer}>
//     <ScrollView style={registerStyles.form}>
//       {/* 1. FIRST & LAST NAME */}
//       <Text style={globalStyles.label}>First Name</Text>
//       <TextInput placeholder="Juan" placeholderTextColor="rgba(0, 0, 0, 0.2)" style={registerStyles.inputField}/>
//       <Text style={globalStyles.label}>Last Name</Text>
//       <TextInput placeholder="de la Cruz" placeholderTextColor="rgba(0, 0, 0, 0.2)" style={registerStyles.inputField}/>

//       {/* 2. MIDDLE INITIAL */}
//       <Text style={globalStyles.label}>M.I.</Text>
//       <TextInput
//       value={middleInitial}
//       onChangeText={(text) => setMiddleInitial(text.toUpperCase().slice(0, 1))}
//       placeholder={isChecked ? "N/A": "D."}
//       placeholderTextColor={isChecked ? "#000000" : "rgba(0, 0, 0, 0.2)"}
//       style={isChecked ? registerStyles.inputFieldMiddleInitial : registerStyles.inputField}
//       editable={!isChecked}

//       />

//       {/* If checkbox is checked, input for M.I. is disabled */}
//       <BouncyCheckbox
//         size={28}
//         fillColor={colors.primary}
//         unFillColor={colors.accent}
//         text="I don't have a middle initial"
//         innerIconStyle={{ borderWidth: 2 }}
//         textStyle={ globalStyles.checkbox }
//         onPress={(isChecked: boolean) => {
//           setIsChecked(isChecked);
//           if (isChecked) { setMiddleInitial(""); }
//         }}/>

//       {/* 3. AGE */}
//       <Text style={registerStyles.ageLabel}>Age</Text>
//       <Slider
//       style={{ width: "100%", height: 40 }}
//       minimumValue={1}
//       maximumValue={100}
//       step={1}
//       minimumTrackTintColor="#FFFFFF"
//       maximumTrackTintColor="#FFFFFF"
//       thumbTintColor="#FFFFFF"
//       value={age}
//       onValueChange={(value) => {
//         setAge(value)
//         if (value === 1) { setYearText("year"); }
//         else setYearText("years");
//       }}
//     /><Text style={globalStyles.sliderValue}>I am {age} {yearText} old.</Text>
//     </ScrollView>

//     {/* CONTINUE BUTTON */}
//     <TouchableOpacity
//       style={globalStyles.continueButton} // Your custom styles
//       onPress={handlePressContinueButton}
//     >
//       <Text style={registerStyles.continueButtonLabel}>NEXT</Text>
//     </TouchableOpacity>
//   </View>
//   ) : (




// BACK BUTTON
// import { Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
// import tw from "tailwind-react-native-classnames";
// import { Link, router } from "expo-router";
// import { useState } from "react";
// import { globalStyles, loginStyles, registerStyles } from "../../styles/styles"
// import { colors } from "@/styles/colors";
// // COMPONENTS
// import BouncyCheckbox from "react-native-bouncy-checkbox";
// import Slider from '@react-native-community/slider';

// export default function signUp() {
//   // STATES
//   const [isChecked, setIsChecked] = useState(false);
//   const [middleInitial, setMiddleInitial] = useState("");
//   const [showForm, setShowForm] = useState(true);

//   const handlePressBackButton = () => {
//     setShowForm(true);
//   }

//   const handlePressContinueButton = () => {
//     setShowForm(false);
//   }

//   const handleSignUpButton = () => {
//     Alert.alert(
//       "Success",
//       "You have signed up! You may now proceed to the login form.",
//       [
//         {
//           text: "Continue",
//           onPress: () => {
//             router.replace('/login'); // Use push() if you don't want to remove register page from stack
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   }

//   return (
//     <View style={globalStyles.screen}>
//       {/* HEADER */}
//       <View style={globalStyles.titleContainer}>
//         <Text style={globalStyles.title}>WeLearn</Text>
//       </View>
//       <Text style={globalStyles.subtitle}>SIGN UP</Text>
//         // FORM #2: LOGIN CREDENTIALS
//         <View style={registerStyles.secondFormContainer}>
//         <ScrollView style={registerStyles.form}>
//           {/* 4. USERNAME & PASSWORD */}
//           <Text style={globalStyles.label}>Username</Text>
//           <TextInput placeholder="enter username" placeholderTextColor="rgba(0, 0, 0, 0.2)" style={registerStyles.credentialsInputField}/>
//           <Text style={registerStyles.credentialsValidation}>
//           • 5–12 characters{"\n"}
//           • Starts with a letter{"\n"}
//           • Letters and numbers only
//           </Text>
//           <Text style={globalStyles.label}>Password</Text>
//           <TextInput placeholder="enter password" placeholderTextColor="rgba(0, 0, 0, 0.2)" style={registerStyles.inputField}/>
//           <Text style={registerStyles.credentialsValidation}>
//           • At least 1 uppercase{"\n"}
//           • At least 1 lowercase{"\n"}
//           • At least 1 special character
//           </Text>
//         </ScrollView>

//         <View style={registerStyles.buttonContainer}>
//           {/* BACK BUTTON */}
//           <TouchableOpacity
//             style={globalStyles.backButton}
//             onPress={handlePressBackButton}
//           >
//             <Text style={registerStyles.backButtonLabel}>BACK</Text>
//           </TouchableOpacity>
          
//           {/* CONTINUE BUTTON */}
//           <TouchableOpacity
//             style={globalStyles.continueButton}
//             onPress={handleSignUpButton}
//           >
//             <Text style={registerStyles.continueButtonLabel}>SIGN UP</Text>
//           </TouchableOpacity>  
//         </View>
//       </View>
//     </View>
//   );
// }
