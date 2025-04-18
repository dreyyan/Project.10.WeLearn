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

export default function dashboard() {
    // TypeScript type, specify structure and type of data for 'StudentInfo'
    type StudentInfo = {
      name: string;
      studentId: string;
      department: string;
      course: string;
      status: string;
    };

    // STATES
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state while fetching data
    const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);

    // HANDLES
    const goToStudentProfile = () => {
        setIsMenuVisible(false);
    }

    const goToCourses = () => {
        router.replace('/courses');
    }

    const goToSettings = () => {
        router.replace('/settings');
    }

    const goToPrivacyAndSettings = () => {
        router.replace('/privacyAndSettings');
    }

    const goToLogOut = () => {
        router.replace('/');
    }

    const handleBurgerMenu = () => {
        setIsMenuVisible(true);
    };

    const handleCopy = async () => {
      if (studentInfo?.studentId) {
        await Clipboard.setStringAsync(studentInfo.studentId);
        Alert.alert("Copied!", `Student ID ${studentInfo.studentId} copied to clipboard.`);
      }
    };
    
    // Fetch user data from Firestore
    useEffect(() => {
      // Setup listener for Firebase Authentication
      // Triggers everytime the user's login state changes
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        // If user is logged in, get a reference to their Firestore document using their UID
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          try {
            // Attempt to fetch the user data from Firestore
            const docSnap = await getDoc(docRef);

            // If the document exists, store the data in the state
            if (docSnap.exists()) {
              setStudentInfo(docSnap.data() as StudentInfo); // Cast the data as StudentInfo type
            } else { // ERROR: Non-existing document
              Alert.alert('Error', 'User data not found');
            }
          } catch (error) {
            // If an error occurs while fetching the data, log the error and show an alert
            console.error('Error fetching user data:', error);
            Alert.alert('Error', 'An error occurred while fetching data');
          } finally {
            setLoading(false); // Stop the loading state whether success or fail
          }
        } else { // ERROR: No user is logged in
          Alert.alert('Error', 'No user is logged in');
          setLoading(false);
        }
      });
      // Clean up the listener when the component unmounts or changes
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

        {/* STUDENT PICTURE */}
        <Image
        source={require("../../assets/images/profile-placeholder.jpg")}
        style={dashboardStyles.studentPicture}
        resizeMode="cover"
        />

        {/* STUDENT INFORMATION */}
        <View style={dashboardStyles.studentInformationContainer}>
          {/* FIRST COLUMN */}
          <View style={dashboardStyles.studentInformationFirstColumn}>
              <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Full Name: </Text>
              <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Student ID: </Text>
              <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Department: </Text>
              <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Course: </Text>
              <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Status: </Text>
          </View>
          {/* SECOND COLUMN */}
          <View style={dashboardStyles.studentInformationSecondColumn}>
              <Text style={dashboardStyles.studentInformationSecondColumnLabel}>{studentInfo?.name}</Text>
              {/* COPY FEATURE */}
              <View style={dashboardStyles.idRow}>
                  <Text style={dashboardStyles.studentInformationSecondColumnLabel}>{studentInfo?.studentId}</Text>
                  <TouchableOpacity
                  style={dashboardStyles.copyContainer}
                  onPress={handleCopy}
                  ><Feather name="copy" size={16} color="#1773EA" /></TouchableOpacity>
              </View>
              <Text style={dashboardStyles.studentInformationSecondColumnLabel}>{studentInfo?.department}</Text>
              <Text style={dashboardStyles.studentInformationSecondColumnLabel}>{studentInfo?.course}</Text>
              <Text style={dashboardStyles.studentInformationSecondColumnLabel}>{studentInfo?.status}</Text>
          </View>
        </View>

        {/* EDIT INFORMATION BUTTON */}
        <TouchableOpacity
        style={dashboardStyles.editInformationButton}
        // onPress={}
        ><Text style={dashboardStyles.editInformationButtonLabel}>Edit Information</Text>
        </TouchableOpacity>

        {/* VIEW SCHEDULE BUTTON */}
        <TouchableOpacity
        style={dashboardStyles.editInformationButton}
        // onPress={}
        ><Text style={dashboardStyles.editInformationButtonLabel}>View Schedule</Text>
        </TouchableOpacity>

        {/* MENU BURGER BUTTON */}
        <Modal
        animationType="fade"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => setIsMenuVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setIsMenuVisible(false)}>
                <View style={burgerMenuStyles.modalOverlay}>
                  <TouchableWithoutFeedback>
                    <View style={burgerMenuStyles.menuContainer}>
                      {/* STUDENT PICTURE /W NAME & SECTION */}
                      <View style={burgerMenuStyles.profile}>
                      <Text style={burgerMenuStyles.profileTitle}>MENU</Text>
                        <Image
                        source={require("../../assets/images/profile-placeholder.jpg")}
                        style={burgerMenuStyles.studentPicture}
                        resizeMode="cover"
                        />
                        <Text style={burgerMenuStyles.studentName}>Adrian Dominic L. Tan</Text>
                        <Text style={burgerMenuStyles.studentSection}>BSCS 1-A</Text>
                      </View>

                      {/* NAVIGATION */}
                      <TouchableOpacity style={burgerMenuStyles.menuItem} onPress={goToStudentProfile}>
                        <Text style={burgerMenuStyles.menuItemText}>Student Profile</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={burgerMenuStyles.menuItem} onPress={goToCourses}>
                        <Text style={burgerMenuStyles.menuItemText}>Courses</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={burgerMenuStyles.menuItem} onPress={goToSettings}>
                        <Text style={burgerMenuStyles.menuItemText}>Settings</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={burgerMenuStyles.menuItem} onPress={goToPrivacyAndSettings}>
                        <Text style={burgerMenuStyles.menuItemText}>Privacy & Support</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={burgerMenuStyles.menuItem} onPress={goToLogOut}>
                        <Text style={burgerMenuStyles.menuItemText}>Log Out</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    </View>
  );
}