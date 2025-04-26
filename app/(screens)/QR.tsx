// REACT NATIVE
import { Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// STYLES
import { burgerMenuStyles, globalStyles, QRCodeStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIRESTORE DATABASE & FIREBASE AUTHENTICATION
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../configurations/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import QRCode from 'react-native-qrcode-svg';
import Barcode from 'react-native-barcode-svg';
// COMPONENTS
import BurgerMenu from "@/components/BurgerMenu";

export default function QR() {
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
    const [name, setName] = useState("");
    const [ID, setID] = useState("");

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
            setName(data.name);
            setID(data.ID);
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
      <View style={[QRCodeStyles.screen, { flex: 1 }]}>
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

      {/* QR Code */}
      <Image
        source={require("../../assets/images/frame-qr.png")}
        style={QRCodeStyles.QRCodeFrame}
        />
      <View style={QRCodeStyles.QRCode}>
        <QRCode value="2024M1207" size={200}/>
      </View>

      <View style={QRCodeStyles.detailsContainer}>
        <Text style={QRCodeStyles.QRName}>{name}</Text>
        <Text style={QRCodeStyles.QRID}>{ID}</Text>
      </View>
      
      {/* NAVIGATION BUTTONS */}
      <View style={QRCodeStyles.buttonContainer}>
        {/* BACK BUTTON */}
        <TouchableOpacity
          style={QRCodeStyles.backButton}
          onPress={pressBackButton}
        ><Text style={QRCodeStyles.backButtonLabel}>‹</Text>
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