// REACT NATIVE
import { Text, View, TextInput, TouchableOpacity, Alert, Image, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// STYLES
import { dashboardStyles, burgerMenuStyles, globalStyles } from "../../styles/styles"
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
        <View style={dashboardStyles.subtitleContainer}>
            <Text style={dashboardStyles.subtitle}>Enrollment Form</Text>
        </View>

        <View style={dashboardStyles.studentInformationContainer}>
          {/* FIRST COLUMN */}
          <View style={dashboardStyles.studentInformationFirstColumn}>
              <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Full Name: </Text>
              <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Type: </Text>
              <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Gender: </Text>
              <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Student ID: </Text>
              <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Department: </Text>
              <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Course: </Text>
              <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Status: </Text>
          </View>
          {/* SECOND COLUMN */}
          <View style={dashboardStyles.studentInformationSecondColumn}>
              <Text style={dashboardStyles.studentInformationSecondColumnLabel}>{studentInfo?.name}</Text>
              <Text style={dashboardStyles.studentInformationSecondColumnLabel}>{studentInfo?.type}</Text>
              <Text style={dashboardStyles.studentInformationSecondColumnLabel}>{studentInfo?.gender}</Text>
              {/* COPY FEATURE */}
              <View style={dashboardStyles.idRow}>
                  <Text style={dashboardStyles.studentInformationSecondColumnLabel}>{studentInfo?.ID}</Text>
                  <TouchableOpacity
                  style={dashboardStyles.copyContainer}
                  onPress={handleCopy}
                  ><Feather name="copy" size={16} color="#1773EA" /></TouchableOpacity>
              </View>
              <Text style={dashboardStyles.studentInformationSecondColumnLabel}>{studentInfo?.department}</Text>
              <Text style={dashboardStyles.studentInformationSecondColumnLabel}>{studentInfo?.course}</Text>
              <Text style={dashboardStyles.studentInformationSecondColumnLabel}>{studentInfo?.isEnrolled ? "Enrolled" : "Not yet enrolled"}</Text>
          </View>
        </View>
    </View>
  );
}