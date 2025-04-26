// REACT NATIVE
import { Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// STYLES
import { burgerMenuStyles, globalStyles, editInformationStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIRESTORE DATABASE & FIREBASE AUTHENTICATION
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../configurations/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
// COMPONENTS
import BurgerMenu from "@/components/BurgerMenu";

export default function EditInformation() {
    type StudentInfo = {
        name: string;
        gender: string;
        ID: string;
        department: string;
        course: string;
    };

    // STATES
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state while fetching data
    const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
    const [currentStep, setCurrentStep] = useState(1);

    const [name, setName] = useState("");
    const [ID, setID] = useState("");

    // DROPDOWN: Gender
    const [gender, setGender] = useState("");
    const [genderOpen, setGenderOpen] = useState(false);
    const [genderItems, setGenderItems] = useState([
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Prefer not to say', value: 'Prefer not to say' },
    ]);

    // DROPDOWN: Department
    const [department, setDepartment] = useState("");
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

    // DROPDOWN: Courses
    const [course, setCourse] = useState("");
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

    // Update course items based on selected department
    useEffect(() => {
      if (department) {
        const courses = coursesByDepartment[department] || [];
        setCourseItems(courses.map(course => ({ label: course, value: course })));
      } else {
        setCourseItems([]);
      }
    }, [department]);

    // HANDLES
    const goToDashboard = () => {
        router.replace('/Dashboard');
      }

    const goToEnrollmentForm = () => {
      router.replace('/EnrollmentForm');
    }

    const goToCourseOverview = () => {
        router.replace('/CourseOverview');
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

    const isNextDisabled = () => {
      return !(name && gender && (ID.length === 9) && department && course);
    };

    const pressBackButton = () => {
      router.replace('/Dashboard');
    };

    const pressSaveButton = async () => {
      if (isNextDisabled()) return; // If button is disabled, do nothing

      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No user is logged in");
        return;
      }
    
      const docRef = doc(db, 'users', user.uid, 'profile', 'studentProfile');
    
      try {
        await updateDoc(docRef, {
          name,
          gender,
          ID,
          department,
          course
        });
    
        Alert.alert('Success', 'Information has been edited successfully!');
        router.replace("/Dashboard"); // Return to dashboard
      } catch (error) {
        console.error("Error updating profile:", error);
        Alert.alert("Error", "Failed to update profile");
      }
    };

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
            const data = docSnap.data() as StudentInfo;
            setStudentInfo(data);
            setName(data.name);
            setGender(data.gender);
            setID(data.ID);
            setDepartment(data.department);
            setCourse(data.course);
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
    <View style={[globalStyles.screen, { flex: 1 }]}>
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
      <View style={editInformationStyles.subtitleContainer}>
          <Text style={editInformationStyles.subtitle}>EDIT INFORMATION</Text>
      </View>

      {/* SCREEN 1: EDIT INFORMATION */}
      <View style={editInformationStyles.formContainer}>
        {/* NAME */}
        <View style={[editInformationStyles.inputContainer, { width: 320, height: 50 }]}>
          <Text style={editInformationStyles.sectionLabel}>Full Name</Text>
          <TextInput
            placeholder="Juan de la Cruz"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[editInformationStyles.inputField, { width: 320, height: 50 }]}
            value={name}
            onChangeText={setName}
          />
        </View>
        {/* GENDER */}
        <Text style={[editInformationStyles.sectionLabel, {position: "absolute", top: 82, left: 24 }]}>Gender</Text>
        <DropDownPicker
          open={genderOpen}
          value={gender}
          items={genderItems}
          setOpen={setGenderOpen}
          setValue={setGender}
          setItems={setGenderItems}
          placeholder="Choose Gender"
          style={editInformationStyles.dropdownMenu}
          dropDownContainerStyle={editInformationStyles.dropdownContainer}
          textStyle={editInformationStyles.dropdownText}
          labelStyle={editInformationStyles.dropdownLabel}
          placeholderStyle={editInformationStyles.dropdownPlaceholder}
          listItemLabelStyle={editInformationStyles.dropdownLabel}
          zIndex={999}
        />
        {/* DEPARTMENT */}
        <Text style={[editInformationStyles.sectionLabel, {position: "absolute", top: 160, left: 24 }]}>Department</Text>
        <DropDownPicker
        open={departmentOpen}
        value={department}
        items={departmentItems}
        setOpen={setDepartmentOpen}
        setValue={setDepartment}
        setItems={setDepartmentItems}
        placeholder="Choose Department"
        style={editInformationStyles.dropdownMenu}
        dropDownContainerStyle={editInformationStyles.dropdownContainer}
        textStyle={editInformationStyles.dropdownText}
        labelStyle={editInformationStyles.dropdownLabel}
        placeholderStyle={editInformationStyles.dropdownPlaceholder}
        listItemLabelStyle={editInformationStyles.dropdownLabel}
        zIndex={999}
        />
        {/* COURSE */}
        <Text style={[editInformationStyles.sectionLabel, {position: "absolute", top: 238, left: 24 }]}>Course</Text>
        <DropDownPicker
        open={courseOpen}
        value={course}
        items={courseItems}
        setOpen={setCourseOpen}
        setValue={setCourse}
        setItems={setCourseItems}
        placeholder="Choose course"
        disabled={!department}
        style={editInformationStyles.dropdownMenu}
        dropDownContainerStyle={editInformationStyles.dropdownContainer}
        textStyle={editInformationStyles.dropdownText}
        labelStyle={editInformationStyles.dropdownLabel}
        placeholderStyle={editInformationStyles.dropdownPlaceholder}
        listItemLabelStyle={editInformationStyles.dropdownLabel}
        zIndex={999}
        />
        {/* ID */}
        <View style={[editInformationStyles.inputContainer, { width: 320, height: 50 }]}>
          <Text style={editInformationStyles.sectionLabel}>I.D.</Text>
          <TextInput
            placeholder="2024M0000"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[editInformationStyles.inputField, { width: 320, height: 50 }]}
            value={ID}
            onChangeText={setID}
          />
        </View>
        {/* BOTTOM MARGIN */}
        <View style={[editInformationStyles.bottomMargin, { height: 70 }]}/>
      </View>

      {/* NAVIGATION BUTTONS */}
      <View style={editInformationStyles.buttonContainer}>
        {/* BACK BUTTON */}
        <TouchableOpacity
          style={editInformationStyles.backButton}
          onPress={pressBackButton}
        ><Text style={editInformationStyles.backButtonLabel}>‹</Text>
        </TouchableOpacity>
        {/* NEXT BUTTON */}
        <TouchableOpacity
        onPress={pressSaveButton}
        style={[
        editInformationStyles.nextButton,
        isNextDisabled() && { backgroundColor: "#ccc" }
        ]}><Text style={editInformationStyles.nextButtonLabel}>SAVE</Text>
        </TouchableOpacity>
      </View>
      {/* MENU BURGER BUTTON */}
      <BurgerMenu
      isVisible={isMenuVisible}
      setIsVisible={setIsMenuVisible}
      />
    </View>
  );
}