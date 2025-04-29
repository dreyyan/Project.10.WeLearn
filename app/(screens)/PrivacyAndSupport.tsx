// REACT NATIVE
import { Text, View, Alert, Image } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// STYLES
import { burgerMenuStyles, globalStyles, privacyAndSupportStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIRESTORE DATABASE & FIREBASE AUTHENTICATION
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../configurations/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
// COMPONENTS
import BurgerMenu from "@/components/BurgerMenu";

export default function PrivacyAndSupport() {
    type StudentInfo = {
        name: string;
        gender: string;
        ID: string;
        department: string;
        course: string;
    };

    // STATES
    const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
    const [loading, setLoading] = useState(true); // Loading state while fetching data
    const [isMenuVisible, setIsMenuVisible] = useState(false);
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

    const goToPrivacyAndSupport = () => {
        router.replace('/PrivacyAndSupport');
    }

    const goToLogOut = () => {
        router.replace('/');
    }

    const handleBurgerMenu = () => {
        setIsMenuVisible(true);
    };

    const pressBackButton = () => {
      router.replace('/Dashboard');
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
            setDepartment(data.department);
          } else { // ERROR: Non-existing document
            Alert.alert('Error', 'User profile data not found');
          }
        } catch (error) {
          // console.error('Error fetching user data:', error);
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
        <View style={privacyAndSupportStyles.subtitleContainer}>
            <Text style={privacyAndSupportStyles.subtitle}>PRIVACY & SUPPORT</Text>
        </View>
        <View style={privacyAndSupportStyles.container}>
        <Text style={privacyAndSupportStyles.sectionTitle}>
          Privacy Policy
        </Text>
        <Text style={privacyAndSupportStyles.sectionText}>
          At WeLearn, your privacy is our priority. We are committed to ensuring that your personal information remains confidential and secure. We only collect data that is necessary for your use of the platform, such as your name, email address, and academic details. This data is encrypted and securely stored in compliance with data protection regulations. We do not sell, rent, or share your personal data with any third party without your explicit consent. By using our services, you agree to our practices outlined in this policy.
        </Text>

        <Text style={privacyAndSupportStyles.sectionTitle}>
          Data Usage
        </Text>
        <Text style={privacyAndSupportStyles.sectionText}>
          The information we collect is used solely to personalize your experience, enhance learning features, and provide relevant educational resources. We may analyze usage patterns to improve app performance and suggest new tools or content that may benefit you. You always have the right to request access to your data, update incorrect information, or request the deletion of your account. Transparency and user control are central to how WeLearn handles your data.
        </Text>

        <Text style={privacyAndSupportStyles.sectionTitle}>
          Support
        </Text>
        <Text style={privacyAndSupportStyles.sectionText}>
          Our support team is here to assist you with any concerns or technical issues you may encounter while using WeLearn. Whether you're having trouble accessing your courses, need help with registration, or have questions about your account, we’re ready to help. You can contact us anytime at support@welearn.app. For quick answers to common questions, visit our official FAQ page at welearn.app/faq. We strive to respond to all inquiries within 24 hours.
        </Text>
        </View>
        {/* MENU BURGER BUTTON */}
        <BurgerMenu
        isVisible={isMenuVisible}
        setIsVisible={setIsMenuVisible}
        />
    </View>
  );
}