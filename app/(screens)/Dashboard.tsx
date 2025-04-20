// REACT NATIVE
import { Text, View, TextInput, TouchableOpacity, Alert, Image, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// STYLES
import { dashboardStyles, burgerMenuStyles, globalStyles, setupInformationStyles } from "../../styles/styles"
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
import Svg, { Path } from 'react-native-svg';
import Barcode from 'react-native-barcode-svg';

// COMPONENTS
import BurgerMenu from "@/components/BurgerMenu";

export default function dashboard() {
    // TypeScript type, specify structure and type of data for 'StudentInfo'
    type StudentInfo = {
      name: string;
      type: string;
      gender: string;
      ID: string;
      department: string;
      course: string;
      isEnrolled: boolean;
    };

    // STATES
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state while fetching data
    const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);

    // HANDLES
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
    <View style={dashboardStyles.screen}>
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
        <View style={dashboardStyles.subtitleContainer}>
            <Text style={dashboardStyles.subtitle}>DASHBOARD</Text>
        </View>

        {/* STUDENT BARCODE */}
        <View style={dashboardStyles.barcodeContainer}>
          <Barcode value={studentInfo?.ID ?? ''} format="CODE128" />
        </View>
        
        {/* EDIT INFORMATION BUTTON */}
        <TouchableOpacity
        style={dashboardStyles.editInformationButton}
        // onPress={}
        ><Ionicons name="create-outline" size={20} color="#fff" />
        </TouchableOpacity>

        {/* STUDENT INFORMATION CARD */}
        <View style={setupInformationStyles.cardContainer}>
        <Image
            source={require("../../assets/images/card-banner.png")}
            style={setupInformationStyles.summaryBanner}
            />
            <View style={setupInformationStyles.cardImageContainer}>
              <Image
              source={require("../../assets/images/profile-placeholder.jpg")}
              style={setupInformationStyles.cardImage}
              resizeMode="cover"
              />
            </View>
            <Text style={setupInformationStyles.summaryNameLabel}>Name:</Text>
            <Text style={setupInformationStyles.summaryName}>{studentInfo?.name}</Text>
            <Text style={setupInformationStyles.summaryGenderLabel}>Gender:</Text>
            <Text style={setupInformationStyles.summaryGender}>{studentInfo?.gender}</Text>
            <Text style={setupInformationStyles.summaryType}>{studentInfo?.type}</Text>
            <Text style={setupInformationStyles.summaryID}>{studentInfo?.ID}</Text>
            <Text style={setupInformationStyles.summaryDepartment}>{studentInfo?.department}</Text>
            <Text style={setupInformationStyles.summaryCourse}>{studentInfo?.course}</Text>
        </View>

        {/* STATUS AREA */}
        <View style={dashboardStyles.statusContainer}>
        <View style={dashboardStyles.statusLabelContainer}>
          <Text style={dashboardStyles.statusLabel}>STATUS</Text>
        </View>
        <Text style={dashboardStyles.statusText}>{studentInfo?.isEnrolled ? "Enrolled" : "Not yet enrolled"}</Text>
        <Text style={dashboardStyles.statusComment}>{studentInfo?.isEnrolled ? "Congratulations! You are enrolled." : "Please complete the enrollment form."}</Text>
        {/* ENROLLMENT FORM BUTTON */}
        <TouchableOpacity
        style={dashboardStyles.enrollmentFormButton}
        onPress={goToEnrollmentForm}
        ><Text style={dashboardStyles.enrollmentFormButtonLabel}>Go to Enrollment Form</Text>
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