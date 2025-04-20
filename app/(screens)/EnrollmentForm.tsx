// REACT NATIVE
import { Text, View, TextInput, TouchableOpacity, Alert, Image, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// STYLES
import { dashboardStyles, burgerMenuStyles, globalStyles, enrollmentFormStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIRESTORE DATABASE & FIREBASE AUTHENTICATION
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../configurations/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from "@expo/vector-icons";
import { Modal } from "react-native";
import * as Clipboard from "expo-clipboard";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from "react-native";
// COMPONENTS
import BurgerMenu from "@/components/BurgerMenu";

export default function EnrollmentForm() {
    // TypeScript type, specify structure and type of data for 'StudentInfo'
    type StudentInfo = {
        name: string;
        type: string;
        gender: string;
        ID: string;
        department: string;
        course: string;
        isEnrolled: boolean;
        email: string;
        };

    // STATES
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state while fetching data
    const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);

    // PERSONAL INFORMATION
    const [name, setName] = useState(studentInfo?.name);
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [gender, setGender] = useState(studentInfo?.gender);

      // DROPDOWN: Gender
      const [civilStatus, setCivilStatus] = useState("Single");
      const [civilStatusOpen, setCivilStatusOpen] = useState(false);
      const [civilStatusItems, setCivilStatusItems] = useState([
        { label: 'Single', value: 'Single' },
        { label: 'Married', value: 'Married' },
        { label: 'Legally Separated', value: 'Legally Separated' },
        { label: 'Widowed', value: 'Widowed' },
      ]);

    const [emailAddress, setEmailAddress] = useState(studentInfo?.email);
    const [birthPlace, setBirthPlace] = useState("");
    const [nationality, setNationality] = useState("");
    const [religion, setReligion] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [disability, setDisability] = useState("");
    const [householdMembers, setHouseholdMembers] = useState("");
    const [annualGrossIncome, setAnnualGrossIncome] = useState("");

    // EDUCATION INFORMATION
    const [admissionStatus, setAdmissionStatus] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [yearLevel, setYearLevel] = useState("");
    const [LRN, setLRN] = useState("");
    const [studentType, setStudentType] = useState("");
    
    // ADDRESS INFORMATION
    const [region, setRegion] = useState("");
    const [province, setProvince] = useState("");
    const [municipalityCity, setMunicipalityCity] = useState("");
    const [barangay, setBarangay] = useState("");
    const [ZIPCode, setZIPCode] = useState("");

    // HANDLES: FORM
    const showDatePicker = () => {
      DateTimePickerAndroid.open({
        value: birthday || new Date(),
        onChange: (_, selectedDate) => {
          if (selectedDate) setBirthday(selectedDate);
        },
        mode: 'date',
        is24Hour: true,
      });
    };

    // HANDLES: ROUTING
    const goToDashboard = () => {
      setIsMenuVisible(false);
    }

    const goToEnrollmentForm = () => {
      router.replace('/EnrollmentForm');
    }

    const goToCourses = () => {
        router.replace('/Courses');
    }

    const goToSettings = () => {
        router.replace('/Settings');
    }

    const goToPrivacyAndSupport = () => {
        router.replace('/PrivacyAndSupport');
    }

    const goToLogOut = () => {
        router.replace('/');
    }

    const handleBurgerMenu = () => {
        setIsMenuVisible(true);
    };

    const handleCopy = async () => {
      if (studentInfo?.ID) {
      await Clipboard.setStringAsync(studentInfo.ID);
      }
    }

  // Fetch user data from Firestore
  useEffect(() => {
    // Setup listener for Firebase Authentication
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid, 'profile', 'studentProfile');
        try {
          // Attempt to fetch the user profile data from Firestore
          const docSnap = await getDoc(docRef);

          // If the document exists, store the data in the state
          if (docSnap.exists()) {
            setStudentInfo(docSnap.data() as StudentInfo); // Cast the data as StudentInfo type
          } else { // ERROR: Non-existing document
            Alert.alert('Error', 'User profile data not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          Alert.alert('Error', 'An error occurred while fetching data');
        } finally {
          setLoading(false); // Stop the loading state whether success or fail
        }
      } else {
        Alert.alert('Error', 'No user is logged in');
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Unsubscribe from the auth state listener
  }, []); // Empty dependency array means 'Effect' runs once when the component mounts

  return (
    <View style={globalStyles.screen}>
      {/* HEADER */}
      <Image
      source={require("../../assets/images/banner-WeLearn.png")}
      style={globalStyles.banner}
      resizeMode="contain"
      />
      {/* BURGER MENU ICON */}
      <View style={burgerMenuStyles.burgerMenuContainer}>
        <Ionicons
        name="menu"
        size={44}
        color={colors.accent}
        onPress={handleBurgerMenu}
        style={burgerMenuStyles.burgerMenu}
        />
      </View>

      {/* PERSONALIZATION: Status bar color */}
      <StatusBar backgroundColor="#1773EA" style="light" />
      {/* TITLE */}
      <View style={enrollmentFormStyles.subtitleContainer}>
          <Text style={enrollmentFormStyles.subtitle}>ENROLLMENT FORM</Text>
      </View>

      {/* I. PERSONAL INFORMATION */}
      <Text style={enrollmentFormStyles.sectionTitle}>I. Personal Information</Text>
      <ScrollView style={enrollmentFormStyles.formContainer}>
        {/* NAME */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 324, height: 50 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Full Name</Text>
          <TextInput
            placeholder="Juan de la Cruz"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 324, height: 50 }]}
            value={name}
            onChangeText={setName}
          />
        </View>
        {/* DATE OF BIRTH */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 100, height: 50 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Date of Birth</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              placeholder={new Date().toLocaleDateString()} // Current date
              placeholderTextColor="rgba(0, 0, 0, 0.2)"
              style={[enrollmentFormStyles.inputField, { width: 100, height: 50 }]}
              value={birthday ? birthday.toLocaleDateString() : ''}
              editable={false} // prevents typing manually
              pointerEvents="none"
            />
          </TouchableOpacity>
        </View>
        {/* GENDER */}
        <View style={[enrollmentFormStyles.checkboxContainer, { width: 324, height: 60 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Gender</Text>
          <BouncyCheckbox
          style={enrollmentFormStyles.checkbox}
          useBuiltInState={false}
          isChecked={gender === "M"}
          onPress={() => setGender("M")}
          fillColor={colors.primary}
          unFillColor={colors.accent}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={[enrollmentFormStyles.checkboxText, { fontSize: 14 } ]}
          text="Male"
          />
          <BouncyCheckbox
          style={enrollmentFormStyles.checkbox}
          useBuiltInState={false}
          isChecked={gender === "F"}
          onPress={() => setGender("F")}
          fillColor={colors.primary}
          unFillColor={colors.accent}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={[enrollmentFormStyles.checkboxText, { fontSize: 14 } ]}
          text="Female"
          />
          <BouncyCheckbox
          style={enrollmentFormStyles.checkbox}
          useBuiltInState={false}
          isChecked={gender === "Prefer not to say"}
          onPress={() => setGender("Prefer not to say")}
          fillColor={colors.primary}
          unFillColor={colors.accent}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={[enrollmentFormStyles.checkboxText, { fontSize: 12 } ]}
          text="Prefer not to say"
          />
        </View>
        {/* CIVIL STATUS */}
        <View style={[enrollmentFormStyles.checkboxContainer, { width: 220, height: 80 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Civil Status</Text>
        <DropDownPicker
          open={civilStatusOpen}
          value={civilStatus}
          items={civilStatusItems}
          setOpen={setCivilStatusOpen}
          setValue={setCivilStatus}
          setItems={setCivilStatusItems}
          placeholder="Civil status"
          style={enrollmentFormStyles.dropdownMenu}
          dropDownContainerStyle={enrollmentFormStyles.dropdownContainer}
          textStyle={enrollmentFormStyles.dropdownText}
          labelStyle={enrollmentFormStyles.dropdownLabel}
          placeholderStyle={enrollmentFormStyles.dropdownPlaceholder}
          listItemLabelStyle={enrollmentFormStyles.dropdownLabel}
          zIndex={999}
        />
        </View>
        {/* EMAIL ADDRESS */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 280, height: 50 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Email Address</Text>
          <TextInput
            placeholder="example@gmail.com"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 280, height: 50 }]}
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
        </View>
      </ScrollView>
      {/* MENU BURGER BUTTON */}
      <BurgerMenu
      isVisible={isMenuVisible}
      setIsVisible={setIsMenuVisible}
      />
    </View>
  );
}