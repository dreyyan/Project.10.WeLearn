import { Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Link } from "expo-router";
import { useState } from "react";
import { globalStyles, loginStyles, registerStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// COMPONENTS
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Slider from '@react-native-community/slider';

export default function Register() {
  // STATES
  const [isChecked, setIsChecked] = useState(false);
  const [middleInitial, setMiddleInitial] = useState("");
  const [yearText, setYearText] = useState("");
  const [age, setAge] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    
  }

  return (
    <View style={globalStyles.screen}>
      {/* HEADER */}
      <Text style={globalStyles.title}>WeLearn</Text>
      <Text style={globalStyles.subtitle}>REGISTER</Text>

      {/* PERSONAL INFORMATION */}
      <View style={registerStyles.formContainer}>
        <ScrollView style={registerStyles.form}>
          {/* 1. FIRST & LAST NAME */}
          <Text style={globalStyles.label}>First Name</Text>
          <TextInput placeholder="Juan" placeholderTextColor="rgba(0, 0, 0, 0.2)" style={registerStyles.inputField}/>
          <Text style={globalStyles.label}>Last Name</Text>
          <TextInput placeholder="de la Cruz" placeholderTextColor="rgba(0, 0, 0, 0.2)" style={registerStyles.inputField}/>

          {/* 2. MIDDLE INITIAL */}
          <Text style={globalStyles.label}>M.I.</Text>
          <TextInput
          value={middleInitial}
          onChangeText={(text) => setMiddleInitial(text.toUpperCase().slice(0, 1))}
          placeholder={isChecked ? "N/A": "D."}
          placeholderTextColor={isChecked ? "#000000" : "rgba(0, 0, 0, 0.2)"}
          style={isChecked ? registerStyles.inputFieldMiddleInitial : registerStyles.inputField}
          editable={!isChecked}

          />

          {/* If checkbox is checked, input for M.I. is disabled */}
          <BouncyCheckbox
            size={28}
            fillColor="#5BC82F"
            unFillColor="#FFFFFF"
            text="I don't have a middle initial"
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={ globalStyles.checkbox }
            onPress={(isChecked: boolean) => {
              setIsChecked(isChecked);
              if (isChecked) { setMiddleInitial(""); }
            }}/>

          {/* 3. AGE */}
          <Text style={registerStyles.ageLabel}>Age</Text>
          <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={1}
          maximumValue={100}
          step={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#FFFFFF"
          value={age}
          onValueChange={(value) => {
            setAge(value)
            if (value === 1) { setYearText("year"); }
            else setYearText("years");
          }}
        /><Text style={globalStyles.sliderValue}>I am {age} {yearText} old.</Text>
        </ScrollView>

        <TouchableOpacity
          style={globalStyles.button} // Your custom styles
          onPress={handlePress}
        >
          <Text style={registerStyles.continueButtonLabel}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
