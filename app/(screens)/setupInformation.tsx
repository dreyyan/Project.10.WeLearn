import { Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { globalStyles, setupInformationStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIREBASE
import { auth } from "../../configurations/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SetupInformation() {
  // STATES
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ID, setID] = useState("");
  const [typeSelected, setTypeSelected] = useState("Student");

  const [course, setCourse] = useState("");
  const [type, setType] = useState("");
  const [enrolledSubjects, setEnrolledSubjects] = useState<string[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [completedInformation, setCompletedInformation] = useState(false);

  // DROPDOWN: Department
  const [open, setOpen] = useState(false);
  const [departmentValue, setDepartmentValue] = useState(null);
  const [departmentItems, setDepartmentItems] = useState([
    { label: 'College of Arts and Sciences', value: 'CAS' },
    { label: 'College of Business & Management', value: 'CBM' },
    { label: 'College of Communication', value: 'COC' },
    { label: 'College of Dentistry', value: 'COD' },
    { label: 'College of Education', value: 'COE' },
    { label: 'College of Information & Communications Technology', value: 'CICT' },
    { label: 'College of Medicine', value: 'COM' },
    { label: 'College of Nursing', value: 'CON' },
    { label: 'College of PESCAR', value: 'COP' },
    { label: 'College of Law', value: 'COL' },
    { label: 'Integrated Laboratory School', value: 'ILS' },
  ]);

  // HANDLES
  const changeTypeSelection = (selectedType: string) => {
    setTypeSelected(selectedType);
  }

  const pressNextButton = () => {
    if (currentStep < 10) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to the next screen or complete the setup
      router.replace("/dashboard"); // Example of redirection
    }
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

      {/* SCREEN 1: Let's setup your information */}
      {currentStep === 1 && (
      <View style={setupInformationStyles.titleContainer}>
        <Text style={setupInformationStyles.title}>Let's setup your information!</Text>
        <Image
        source={require("../../assets/images/mascot-1.png")}
        style={setupInformationStyles.vector}
        resizeMode="cover"
        />
      </View>
      )}

      {/* SCREEN 2: Student or Teacher */}
      {currentStep === 2 && (
      <View style={setupInformationStyles.titleContainer}>
        <Text style={setupInformationStyles.title}>Are you a student or teacher?</Text>
        <View style={setupInformationStyles.imageContainer}>
          <Image
          source={require("../../assets/images/vector-1.png")}
          style={setupInformationStyles.vector}
          resizeMode="cover"
          />
          <Image
          source={require("../../assets/images/vector-2.png")}
          style={setupInformationStyles.vector}
          resizeMode="cover"
          />
        </View>
        <View style={setupInformationStyles.screen2ButtonContainer}>

          {/* SELECT => STUDENT */}
          <TouchableOpacity onPress={() => changeTypeSelection("Student")}
          style={[setupInformationStyles.selectButton,
            typeSelected === "Student"
            ? { backgroundColor: colors.primary }
            : { backgroundColor: colors.white }
            ]}>
          <Text style={[setupInformationStyles.selectButtonLabel,
            typeSelected === "Student"
            ? { color: colors.white }
            : { color: colors.primary }]}>Student</Text>
          </TouchableOpacity>

          {/* SELECT => TEACHER */}
          <TouchableOpacity onPress={() => changeTypeSelection("Teacher")}
          style={[setupInformationStyles.selectButton,
            typeSelected === "Student"
            ? { backgroundColor: colors.white }
            : { backgroundColor: colors.primary }
            ]}>
          <Text style={[setupInformationStyles.selectButtonLabel,
            typeSelected === "Student"
            ? { color: colors.primary }
            : { color: colors.white }]}>Teacher</Text>
          </TouchableOpacity>
        </View>
      </View>
      )}

      {/* SCREEN 3: ID */}
      {currentStep === 3 && (
      <View style={setupInformationStyles.titleContainer}>
        <Text style={setupInformationStyles.title}>Enter your Student/Teacher I.D.</Text>

        <View style={setupInformationStyles.inputContainer}>
          <Ionicons name="card-outline" size={20} color={colors.primary} style={globalStyles.icon} />
          <TextInput
            placeholder="117590000000"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={setupInformationStyles.inputField}
            value={email}
            onChangeText={setID}
          />
        </View>
      </View>
      )}

      {/* SCREEN 4: Department */}
      {currentStep === 4 && (
      <View style={setupInformationStyles.titleContainer}>
        <Text style={setupInformationStyles.title}>Select your Department</Text>
        <DropDownPicker
          open={open}
          value={departmentValue}
          items={departmentItems}
          setOpen={setOpen}
          setValue={setDepartmentValue}
          setItems={setDepartmentItems}
          placeholder="Choose Department"
          style={setupInformationStyles.dropdownMenu}
          dropDownContainerStyle={setupInformationStyles.dropdownContainer}
          textStyle={setupInformationStyles.dropdownText}
          labelStyle={setupInformationStyles.dropdownLabel}
          placeholderStyle={setupInformationStyles.dropdownPlaceholder}
          listItemLabelStyle={setupInformationStyles.dropdownLabel}
          zIndex={999}
        />
      </View>
      )}

      {/* NEXT BUTTON */}
      <TouchableOpacity style={setupInformationStyles.nextButton} onPress={pressNextButton}>
        <Text style={setupInformationStyles.nextButtonLabel}>{currentStep < 10 ? "Next" : "Finish"}</Text>
      </TouchableOpacity>
    </View>
  );
}