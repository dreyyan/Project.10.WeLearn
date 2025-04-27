// REACT NATIVE
import { Text, View, TextInput, TouchableOpacity, Alert, Image, TouchableWithoutFeedback, BackHandler } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// STYLES
import { dashboardStyles, burgerMenuStyles, globalStyles, setupInformationStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIRESTORE DATABASE & FIREBASE AUTHENTICATION
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../configurations/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from 'expo-image-picker';
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
      isEnrolled: false;
    };

    // STATES
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state while fetching data
    const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const storage = getStorage(); // Initialize storage

    const [name, setName] = useState("N/A");
    const [type, setType] = useState("Student");
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

    const goToPrivacyAndSupport = () => {
        router.replace('/PrivacyAndSupport');
    }

    const goToLogOut = () => {
        router.replace('/');
    }

    const handleBurgerMenu = () => {
        setIsMenuVisible(true);
    };

    const goToQRCode = () => {
      router.replace('/QR');
    }

    const goToEditInformation = () => {
      router.replace('/EditInformation');
    }

    const handleCopy = async () => {
      if (studentInfo?.ID) {
        await Clipboard.setStringAsync(studentInfo.ID);
      }
    };

    const uploadProfileImage = async (uri: string) => {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
    
        const user = auth.currentUser;
        if (!user) {
          alert('No user logged in');
          return;
        }
    
        const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);
        await uploadBytes(storageRef, blob);
    
        const downloadURL = await getDownloadURL(storageRef);
    
        // Update Firestore profile document
        const docRef = doc(db, 'users', user.uid, 'profile', 'studentProfile');
        await updateDoc(docRef, {
          profileImage: downloadURL,
        });
    
        setProfileImage(downloadURL); // Set in state so it updates UI immediately
        alert('Profile image updated successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    };

  // Function to edit profile picture
  const editProfilePicture = () => {
    Alert.alert('Choose an option', 'Select a picture', [
      { text: 'Take Photo', onPress: takePhoto },
      { text: 'Choose from Gallery', onPress: selectImage },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,  // enables cropping
      aspect: [1, 1],       // square crop
      quality: 1,
      base64: true,
    });
  
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,  // enables cropping
      aspect: [1, 1],       // square crop
      quality: 1,
      base64: true,
    });
  
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
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
            // Alert.alert('Error', 'User profile data not found');
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

  useEffect(() => {
    const backAction = () => {
      // Return true to block the back button
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  
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

        {/* STUDENT INFORMATION CARD */}
        <View style={setupInformationStyles.cardContainer}>
          <Image
          source={require("../../assets/images/card-banner.png")}
          style={setupInformationStyles.summaryBanner}
          />

          {/* STUDENT PROFILE PICTURE */}
          <TouchableOpacity
          onPress={editProfilePicture}
          style={setupInformationStyles.imageButton}
          >
          <Image
          source={profileImage ? { uri: profileImage } : require("../../assets/images/id-placeholder.png")}
          style={setupInformationStyles.cardImage}
          resizeMode="cover"
          />
          </TouchableOpacity>

          {/* CARD INFORMATION */}
          <Text style={setupInformationStyles.summaryNameLabel}>NAME</Text>
          <Text style={setupInformationStyles.summaryName}>{studentInfo?.name}</Text>
          <Text style={setupInformationStyles.summaryGenderLabel}>GENDER</Text>
          <Text style={setupInformationStyles.summaryGender}>{studentInfo?.gender}</Text>
          <Text style={setupInformationStyles.summaryTypeLabel}>TYPE</Text>
          <Text style={setupInformationStyles.summaryType}>{studentInfo?.type}</Text>
          <Text style={setupInformationStyles.summaryID}>[ {studentInfo?.ID} ]</Text>
          <Text style={setupInformationStyles.summaryDepartment}>{studentInfo?.department}</Text>
          <Text style={setupInformationStyles.summaryCourse}>{studentInfo?.course}</Text>
        </View>

        <View style={dashboardStyles.buttonContainer}>
        {/* QR CODE BUTTON */}
        <TouchableOpacity
        style={dashboardStyles.QRCodeButton}
        onPress={goToQRCode}
        ><Ionicons name="qr-code" size={20} color="#fff" />
        </TouchableOpacity>

        {/* EDIT INFORMATION BUTTON */}
        <TouchableOpacity
        style={dashboardStyles.editInformationButton}
        onPress={goToEditInformation}
        ><Ionicons name="create-outline" size={20} color="#fff" />
        </TouchableOpacity>
        </View>
        
        {/* STATUS AREA */}
        <View style={dashboardStyles.statusContainer}>
        <View style={dashboardStyles.statusLabelContainer}>
          <Text style={dashboardStyles.statusLabel}>STATUS</Text>
        </View>
        <Text style={dashboardStyles.statusText}>{studentInfo?.isEnrolled ? "Enrolled" : "Not Enrolled"}</Text>
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