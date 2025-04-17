import { Text, View, TextInput, TouchableOpacity, Alert, Image, TouchableWithoutFeedback } from "react-native";
import { dashboardStyles, burgerMenuStyles, globalStyles } from "../../styles/styles"
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from "expo-clipboard";
import { Feather } from "@expo/vector-icons";
import { Modal } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// FIRESTORE DATABASE
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configurations/firebaseConfig";
import { auth } from "../../configurations/firebaseConfig"; // Import Firebase Auth to get the current user

export default function dashboard() {
    // STATES
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [userData, setUserData] = useState<any>(null); // State to store user data
    const [loading, setLoading] = useState(true); // Loading state while fetching data

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
      await Clipboard.setStringAsync("117591120149");
    const studentID = "117591120149";
    };


    // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid); // Reference to Firestore user document
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data()); // Set user data from Firestore
          } else {
            Alert.alert('Error', 'User data not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          Alert.alert('Error', 'An error occurred while fetching data');
        } finally {
          setLoading(false); // Stop loading after fetching data
        }
      } else {
        Alert.alert('Error', 'No user is logged in');
        setLoading(false);
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, []);

  if (loading) {
    return (
      <View style={dashboardStyles.screen}>
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
    <View style={dashboardStyles.screen}>
        <View style={dashboardStyles.titleContainer}>
            <Text style={dashboardStyles.title}>WeLearn</Text>
            <Ionicons
            name="menu"
            size={40}
            color="#FFFFFF"
            onPress={handleBurgerMenu}
            style={dashboardStyles.burgerMenu}
            />
        </View>
        
        <View style={dashboardStyles.subtitleContainer}>
            <Text style={dashboardStyles.subtitle}>DASHBOARD</Text>
        </View>

        <View style={dashboardStyles.studentInformationContainer}>
            <View style={dashboardStyles.studentInformationFirstColumn}>
                <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Full Name: </Text>
                <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Student ID: </Text>
                <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Department: </Text>
                <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Course: </Text>
                <Text style={dashboardStyles.studentInformationFirstColumnLabel}>Status: </Text>
            </View>
            <View style={dashboardStyles.studentInformationSecondColumn}>
                <Text style={dashboardStyles.studentInformationSecondColumnLabel}>Adrian Dominic L. Tan</Text>
                <View style={dashboardStyles.idRow}>
                    <Text style={dashboardStyles.studentInformationSecondColumnLabel}>117591120149</Text>
                    <TouchableOpacity
                    style={dashboardStyles.copyContainer}
                    onPress={handleCopy}
                    ><Feather name="copy" size={14} color="#1773EA" /></TouchableOpacity>
                </View>
                <Text style={dashboardStyles.studentInformationSecondColumnLabel}>CICT</Text>
                <Text style={dashboardStyles.studentInformationSecondColumnLabel}>BSCS</Text>
                <Text style={dashboardStyles.studentInformationSecondColumnLabel}>Enrolled</Text>
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