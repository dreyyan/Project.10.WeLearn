// REACT NATIVE
import { Text, View, TextInput, TouchableOpacity, Alert, Image, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// STYLES
import { burgerMenuStyles } from "../styles/styles"
import { colors } from "@/styles/colors";
// FIRESTORE DATABASE & FIREBASE AUTHENTICATION
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../configurations/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth";
// LIBRARY COMPONENTS
import { Modal } from "react-native";

const BurgerMenu = ({ isVisible, setIsVisible }: { isVisible: boolean; setIsVisible: (visible: boolean) => void; }) => {
    // STATE
    const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
    const [loading, setLoading] = useState(true); // Loading state while fetching data
    
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

    // NAVIGATION FUNCTIONS (same as before)
    const goToDashboard = () => router.replace('/Dashboard');
    const goToEnrollmentForm = () => router.replace('/EnrollmentForm');
    const goToCourses = () => router.replace('/Courses');
    const goToSettings = () => router.replace('/Settings');
    const goToPrivacyAndSupport = () => router.replace('/PrivacyAndSupport');
    const goToLogOut = () => router.replace('/');

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
            <View style={burgerMenuStyles.modalOverlay}>
                <TouchableWithoutFeedback>
                <View style={burgerMenuStyles.menuContainer}>
                    {/* PROFILE INFO */}
                    <View style={burgerMenuStyles.profile}>
                    <Text style={burgerMenuStyles.profileTitle}>MENU</Text>
                    <Image
                        source={require("../assets/images/profile-placeholder.jpg")}
                        style={burgerMenuStyles.studentPicture}
                        resizeMode="cover"
                    />
                    <Text style={burgerMenuStyles.studentName}>Adrian Dominic L. Tan</Text>
                    <Text style={burgerMenuStyles.studentDepartment}>{studentInfo?.department}</Text>
                    <Text style={burgerMenuStyles.studentCourse}>{studentInfo?.course}</Text>
                    </View>

                    {/* MENU ITEMS */}
                    <TouchableOpacity style={burgerMenuStyles.menuItem} onPress={goToDashboard}>
                    <Text style={burgerMenuStyles.menuItemText}>Dashboard</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={burgerMenuStyles.menuItem} onPress={goToEnrollmentForm}>
                    <Text style={burgerMenuStyles.menuItemText}>Enrollment Form</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={burgerMenuStyles.menuItem} onPress={goToCourses}>
                    <Text style={burgerMenuStyles.menuItemText}>Courses</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={burgerMenuStyles.menuItem} onPress={goToSettings}>
                    <Text style={burgerMenuStyles.menuItemText}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={burgerMenuStyles.menuItem} onPress={goToPrivacyAndSupport}>
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
    );
};

export default BurgerMenu;