// REACT NATIVE
import { Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { Link, router, useFocusEffect } from "expo-router";
import { useState, useEffect, useCallback } from "react";
// STYLES
import { globalStyles, setupInformationStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIREBASE AUTHENTICATION
import { auth } from "../../configurations/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
// FIRESTORE
import { db } from "../../configurations/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
// CONTEXT
import { useUser, User } from '../../context/UserContext';
import { useAudio } from '../../context/AudioContext';

export default function SetupInformation() {
  // STATES
  const [name, setName] = useState("N/A");
  const [type, setType] = useState("Student");
  const [ID, setID] = useState("");
  const [gender, setGender] = useState(null);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Prefer not to say', value: 'Prefer not to say' },
  ]);
  const [department, setDepartment] = useState(null);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [departmentItems, setDepartmentItems] = useState([
    { label: 'CAS', value: 'CAS' },
    { label: 'CBM', value: 'CBM' },
    { label: 'COC', value: 'COC' },
    { label: 'COD', value: 'COD' },
    { label: 'COE', value: 'COE' },
    { label: 'CICT', value: 'CICT' },
    { label: 'COM', value: 'COM' },
    { label: 'CON', value: 'CON' },
    { label: 'COP', value: 'COP' },
    { label: 'COL', value: 'COL' },
    { label: 'ILS', value: 'ILS' },
  ]);
  const [course, setCourse] = useState(null);
  const [courseOpen, setCourseOpen] = useState(false);
  const [courseItems, setCourseItems] = useState<{ label: string, value: string }[]>([]);
  const coursesByDepartment: { [key: string]: string[] } = {
    CAS:["BA English Language Studies", "BA Foreign Languages", "BA Political Science", "BS Applied Mathematics", "BS Biology", "BS Chemistry"],
    CBM: ["BS Business Administration", "BS Cooperatives Management", "BS Hospitality Management", "BS Tourism Management"],
    COC: ["BA Broadcasting", "BA Journalism", "BS Development Communication"],
    COD: ["Doctor of Dental Medicine"],
    COE: ["Bachelor of Early Childhood Education", "Bachelor of Elementary Education", "Bachelor of Secondary Education", "Bachelor of Special Needs Education"],
    CICT: ["Bachelor of Library and Information Science", "BS Computer Science", "BS Entertainment and Multimedia Computing", "BS  Information Systems", "BS Information Technology"],
    COM: ["Doctor of Medicine"],
    CON: ["BS Nursing"],
    COP: ["Bachelor of Culture and Arts Education", "Bachelor of Performing Arts", "Bachelor of Physical Education", "Bachelor of Science in Exercise and Sports Sciences"],
    COL: ["Juris Doctor(J.D.) Program"],
    ILS: ["Pre-Elementary", "Elementary", "Junior High School", "Senior High School"],
  };
  const [currentStep, setCurrentStep] = useState(1);

  // CONTEXT
  const { setUser } = useUser(); // Use user context
  const { playButtonPressSound, playSuccessSound, playErrorSound } = useAudio(); // Use audio context

  // LISTEN: Update course items based on selected department
  useEffect(() => {
    if (department) {
      const courses = coursesByDepartment[department] || [];
      setCourseItems(courses.map(course => ({ label: course, value: course })));
    } else {
      setCourseItems([]);
    }
  }, [department]);

  // LISTEN: Reset screen when user is signed in/out
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) { // User is signed in
          setCurrentStep(1);
        } else { // User is signed out
          playErrorSound();
          setCurrentStep(1);
          Alert.alert('Error', 'No user is logged in');
        }
      });

      // Clean up on unmount
      return () => unsubscribe();
    }, [])
  );

  // HANDLES
  const isNextDisabled = () => {
    if (currentStep === 3) return !gender;
    if (currentStep === 4) return !(ID.length === 9);
    if (currentStep === 5) return !department;
    if (currentStep === 6) return !course;
    return false;
  };

  const changeTypeSelection = (selectedType: string) => {
    setType(selectedType);
  }

  const updateStudentProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      // Create a reference to the "studentProfile" document
      const userDocRef = doc(db, "users", user.uid, "profile", "studentProfile");
  
      try {
        // Update the document with new information
        await updateDoc(userDocRef, {
          type: type,
          gender: gender,
          ID: ID,
          department: department,
          course: course,
          completedInformation: true
        });
        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile: ", error);
      }
    }
  };

  const pressBackButton = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const pressNextButton = () => {
    if (isNextDisabled()) return; // If button is disabled, do nothing
    playButtonPressSound();

    // Dynamic navigation based on # of screens
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    } else {
      playSuccessSound();
      Alert.alert('Setup Complete', 'You have successfully set up your information!');
      updateStudentProfile(); // Update the profile when finishing the setup
      router.replace("/"); // Navigate to the next screen or complete the setup
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
      {/* PERSONALIZATION: Status bar color */}
      <StatusBar backgroundColor="#1773EA" style="light" />

      {/* SCREEN 1: Let's setup your information! */}
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
            type === "Student"
            ? { backgroundColor: colors.primary }
            : { backgroundColor: colors.white }
            ]}>
          <Text style={[setupInformationStyles.selectButtonLabel,
            type === "Student"
            ? { color: colors.white }
            : { color: colors.primary }]}>Student</Text>
          </TouchableOpacity>

          {/* SELECT => TEACHER */}
          <TouchableOpacity onPress={() => changeTypeSelection("Teacher")}
          style={[setupInformationStyles.selectButton,
            type === "Student"
            ? { backgroundColor: colors.white }
            : { backgroundColor: colors.primary }
            ]}>
          <Text style={[setupInformationStyles.selectButtonLabel,
            type === "Student"
            ? { color: colors.primary }
            : { color: colors.white }]}>Teacher</Text>
          </TouchableOpacity>
        </View>
      </View>
      )}

      {/* SCREEN 3: Gender */}
      {currentStep === 3 && (
      <View style={setupInformationStyles.titleContainer}>
        <Text style={setupInformationStyles.title}>What's your gender?</Text>
        <DropDownPicker
          open={genderOpen}
          value={gender}
          items={genderItems}
          setOpen={setGenderOpen}
          setValue={setGender}
          setItems={setGenderItems}
          placeholder="Choose Gender"
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

      {/* SCREEN 4: I.D. */}
      {currentStep === 4 && (
      <View style={setupInformationStyles.titleContainer}>
        <Text style={setupInformationStyles.title}>Enter your Student/Teacher I.D.</Text>

        <View style={setupInformationStyles.inputContainer}>
          <Ionicons name="card-outline" size={20} color={colors.primary} style={globalStyles.icon} />
          <TextInput
            placeholder="2024M0000"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={setupInformationStyles.inputField}
            value={ID}
            onChangeText={setID}
          />
        </View>
      </View>
      )}

      {/* SCREEN 5: Department */}
      {currentStep === 5 && (
      <View style={setupInformationStyles.titleContainer}>
        <Text style={setupInformationStyles.title}>Select your department:</Text>
        <DropDownPicker
          open={departmentOpen}
          value={department}
          items={departmentItems}
          setOpen={setDepartmentOpen}
          setValue={setDepartment}
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

      {/* SCREEN 6: Course */}
      {currentStep === 6 && (
      <View style={setupInformationStyles.titleContainer}>
        <Text style={setupInformationStyles.title}>Select a {departmentItems.find(item => item.value === department)?.label || ""} course:</Text>
        <DropDownPicker
        open={courseOpen}
        value={course}
        items={courseItems}
        setOpen={setCourseOpen}
        setValue={setCourse}
        setItems={setCourseItems}
        placeholder="Choose course"
        disabled={!department}
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

      {/* SCREEN 7: Personal Information Summary */}
      {currentStep === 7 && (
      <View style={setupInformationStyles.titleContainer}>
        <Text style={setupInformationStyles.title}>Personal Information</Text>
        <View style={setupInformationStyles.cardContainer}>
          <Image
          source={require("../../assets/images/card-banner.png")}
          style={setupInformationStyles.summaryBanner}
          />
          <Image
          source={require("../../assets/images/id-placeholder.png")}
          style={setupInformationStyles.summaryImageSetup}
          resizeMode="contain"
          />
          <Text style={setupInformationStyles.summaryNameLabel}>Name:</Text>
          <Text style={setupInformationStyles.summaryName}>{name}</Text>
          <Text style={setupInformationStyles.summaryGenderLabel}>Gender:</Text>
          <Text style={setupInformationStyles.summaryGender}>{gender}</Text>
          <Text style={setupInformationStyles.summaryTypeLabel}>Type:</Text>
          <Text style={setupInformationStyles.summaryType}>{type}</Text>
          <Text style={setupInformationStyles.summaryID}>{ID}</Text>
          <Text style={setupInformationStyles.summaryDepartment}>{department}</Text>
          <Text style={setupInformationStyles.summaryCourse}>{course}</Text>
        </View>
      </View>
      )}

      {/* SCREEN 8: Complete Profile */}
      {currentStep === 8 && (
      <View style={setupInformationStyles.titleContainer}>
        <Text style={setupInformationStyles.title}>Congratulations! Your profile is now complete!</Text>
        <Image
        source={require("../../assets/images/mascot-1.png")}
        style={setupInformationStyles.vector}
        resizeMode="cover"
        />
      </View>
      )}

      {/* BACK BUTTON */}
      {currentStep >= 1 && (
      <TouchableOpacity
      style={setupInformationStyles.backButton}
      onPress={pressBackButton}>
      <Text style={setupInformationStyles.backButtonLabel}>‹</Text>
      </TouchableOpacity>
      )}

      {/* NEXT BUTTON */}
      <TouchableOpacity
      onPress={pressNextButton}
      disabled={currentStep === 5 && !department || currentStep === 6 && !course}
      style={[
      setupInformationStyles.nextButton,
      isNextDisabled() && { backgroundColor: "#ccc" }
      ]}
    >
        <Text style={setupInformationStyles.nextButtonLabel}>{currentStep < 8 ? "Next" : "Finish"}</Text>
      </TouchableOpacity>
    </View>
  );
}