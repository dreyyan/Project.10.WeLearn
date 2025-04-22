// REACT NATIVE
import { Text, View, TextInput, TouchableOpacity, Alert, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// STYLES
import { dashboardStyles, burgerMenuStyles, globalStyles, enrollmentFormStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIRESTORE DATABASE & FIREBASE AUTHENTICATION
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../configurations/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from "expo-clipboard";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from 'expo-document-picker';
// COMPONENTS
import BurgerMenu from "@/components/BurgerMenu";

export default function EnrollmentForm() {
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
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedFiles, setSelectedFiles] = useState<{ name: string; uri: string; type: string }[]>([]);
    const [certified, setCertified] = useState(false);

    // PERSONAL INFORMATION
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
    const [gender, setGender] = useState("");
    // Civil Status
    const [civilStatus, setCivilStatus] = useState("");
    const [civilStatusOpen, setCivilStatusOpen] = useState(false);
    const [civilStatusItems, setCivilStatusItems] = useState([
      { label: 'Single', value: 'Single' },
      { label: 'Married', value: 'Married' },
      { label: 'Legally Separated', value: 'Legally Separated' },
      { label: 'Widowed', value: 'Widowed' },
    ]);
    const [emailAddress, setEmailAddress] = useState("");
    const [birthPlace, setBirthPlace] = useState("");
    const [nationality, setNationality] = useState("");
    // Religion
    const [religion, setReligion] = useState("");
    const [religionOpen, setReligionOpen] = useState(false);
    const [religionItems, setReligionItems] = useState([
      { label: 'Roman Catholic', value: 'Roman Catholic' },
      { label: 'Iglesia ni Cristo', value: 'Iglesia ni Cristo' },
      { label: 'Jehovah\'s Witness', value: 'Jehovah\'s Witness' },
      { label: 'Seventh Day Adventist', value: 'Seventh Day Adventist' },
      { label: 'Born Again Christian', value: 'Born Again Christian' },
      { label: 'Buddhism', value: 'Buddhism' },
      { label: 'Muslim', value: 'Muslim' },
      { label: 'Christian', value: 'Christian' },
      { label: 'Islam', value: 'Islam' },
      { label: 'Protestant', value: 'Protestant' },
      { label: 'Aglipay', value: 'Aglipay' },
      { label: 'Methodist', value: 'Methodist' },
      { label: 'Baptist', value: 'Baptist' },
      { label: 'None', value: 'None' },
      { label: 'Evangelical Christian', value: 'Evangelical Christian' },
      { label: 'Philippine Independent Church', value: 'Philippine Independent Church' },
      { label: 'Latter Day Saints', value: 'Latter Day Saints' },
      { label: 'Pentecost', value: 'Pentecost' },
      { label: 'TWCM', value: 'TWCM' },
      { label: 'Hindu', value: 'Hindu' },
      { label: 'Mormons', value: 'Mormons' },
      { label: 'Conservative Baptist', value: 'Conservative Baptist' },
      { label: 'UCCP', value: 'UCCP' },
      { label: 'Iglesia ng Diyos', value: 'Iglesia ng Diyos' },
      { label: 'Orthodox', value: 'Orthodox' }
    ]);
    const [mobileNumber, setMobileNumber] = useState("");
    // Disability
    const [disability, setDisability] = useState("");
    const [disabilityOpen, setDisabilityOpen] = useState(false);
    const [disabilityItems, setDisabilityItems] = useState([
      { label: 'None', value: 'None' },
      { label: 'Communication Disability', value: 'Communication Disability' },
      { label: 'Orthopedic Disability', value: 'Orthopedic Disability' },
      { label: 'Visual Disability', value: 'Visual Disability' },
      { label: 'Other', value: 'Other' },
    ]);
    const [householdMembers, setHouseholdMembers] = useState("");
    // Annual Gross Income
    const [annualGrossIncome, setAnnualGrossIncome] = useState("");
    const [annualGrossIncomeOpen, setAnnualGrossIncomeOpen] = useState(false);
    const [annualGrossIncomeItems, setAnnualGrossIncomeItems] = useState([
      { label: 'Below ₱131,484.00', value: 'Below ₱131,484.00' },
      { label: '₱131,484.00 - ₱262,969.00', value: '₱131,484.00 - ₱262,969.00' },
      { label: '₱262,969.00 - ₱525,936.00', value: '₱262,969.00 - ₱525,936.00' },
      { label: '₱525,936.00 - ₱920,388.00', value: '₱525,936.00 - ₱920,388.00' },
      { label: '₱920,388.00 - ₱1,577,808.00', value: '₱920,388.00 - ₱1,577,808.00' },
      { label: '₱1,577,808.00 - ₱2,629,680.00', value: '₱1,577,808.00 - ₱2,629,680.00' },
      { label: 'Above ₱2,629,680.00', value: 'Above ₱2,629,680.00' },
    ]);

    // EDUCATION INFORMATION
    // Student Type
    const [studentType, setStudentType] = useState("");
    const [studentTypeOpen, setStudentTypeOpen] = useState(false);
    const [studentTypeItems, setStudentTypeItems] = useState([
      { label: 'Local', value: 'Local' },
      { label: 'Foreign Single Citizenship', value: 'Foreign Single Citizenship' },
      { label: 'Foreign Dual Citizenship', value: 'Foreign Dual Citizenship' },
    ]);
    // Admission Status
    const [admissionStatus, setAdmissionStatus] = useState("");
    const [admissionStatusOpen, setAdmissionStatusOpen] = useState(false);
    const [admissionStatusItems, setAdmissionStatusItems] = useState([
      { label: 'New', value: 'New' },
      { label: 'Transferee', value: 'Transferee' },
      { label: 'Returnee', value: 'Returnee' },
      { label: 'Old', value: 'Old' },
      { label: 'Graduated', value: 'Graduated' },
      { label: 'Cross Enrollee', value: 'Cross Enrollee' },
      { label: 'Second Degree', value: 'Second Degree' },
      { label: 'Alumni', value: 'Alumni' },
      { label: 'Shiftee', value: 'Shiftee' },
    ]);
    // Education Level
    const [educationLevel, setEducationLevel] = useState("");
    const [educationLevelOpen, setEducationLevelOpen] = useState(false);
    const [educationLevelItems, setEducationLevelItems] = useState([
      { label: 'Primary Education', value: 'Primary Education' },
      { label: 'Secondary Education', value: 'Secondary Education' },
      { label: 'Tertiary Education', value: 'Tertiary Education' },
      { label: 'Postgraduate Education', value: 'Postgraduate Education' },
      { label: 'Alternative Learning System(ALS)', value: 'Alternative Learning System(ALS)' },
    ]);
    // Year Level
    const [yearLevel, setYearLevel] = useState("");
    const [yearLevelOpen, setYearLevelOpen] = useState(false);
    const [yearLevelItems, setYearLevelItems] = useState([
      { label: 'First Year', value: 'First Year' },
      { label: 'Second Year', value: 'Second Year' },
      { label: 'Third Year', value: 'Third Year' },
      { label: 'Fourth Year', value: 'Fourth Year' },
    ]);
    const [LRN, setLRN] = useState("");
    const [ID, setID] = useState("");
    // ADDRESS INFORMATION
    const [region, setRegion] = useState("");
    const [regionOpen, setRegionOpen] = useState(false);
    const [regionItems, setRegionItems] = useState([
      { label: 'Region I', value: 'Region I' },
      { label: 'Region II', value: 'Region II' },
      { label: 'Region III', value: 'Region III' },
      { label: 'Region IV-A', value: 'Region IV-A' },
      { label: 'MIMAROPA', value: 'MIMAROPA' },
      { label: 'Region V', value: 'Region V' },
      { label: 'NCR', value: 'NCR' },
      { label: 'CAR', value: 'CAR' },
      { label: 'Region VI', value: 'Region VI' },
      { label: 'Region VII', value: 'Region VII' },
      { label: 'Region VIII', value: 'Region VIII' },
      { label: 'Region IX', value: 'Region IX' },
      { label: 'Region X', value: 'Region X' },
      { label: 'Region XI', value: 'Region XI' },
      { label: 'Region XII', value: 'Region XII' },
      { label: 'CARAGA', value: 'CARAGA' },
      { label: 'BARMM', value: 'BARMM' },
    ])
    const [province, setProvince] = useState("");
    const [municipalityCity, setMunicipalityCity] = useState("");
    const [barangay, setBarangay] = useState("");
    const [ZIPCode, setZIPCode] = useState("");

    // HANDLES: FORM
    const showDatePicker = () => {
      DateTimePickerAndroid.open({
        value: dateOfBirth || new Date(),
        onChange: (_, selectedDate) => {
          if (selectedDate) setDateOfBirth(selectedDate);
        },
        mode: 'date',
        is24Hour: true,
      });
    };

    const uploadFile = async () => {
      if (selectedFiles.length >= 4) {
        Alert.alert('Upload Limit Reached', 'You can only upload a maximum of 4 files.');
        return;
      }
  
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: true,
      });
  
      if (result.assets && result.assets.length > 0) {
        const newFiles = result.assets.map((file) => ({
          name: file.name,
          uri: file.uri,
          type: file.mimeType || 'application/octet-stream',
        }));
  
        // Combine old + new, max 4
        const updatedFiles = [...selectedFiles, ...newFiles].slice(0, 4);
        setSelectedFiles(updatedFiles);
  
        // Optional: upload immediately
        const formData = new FormData();
        updatedFiles.forEach((file) => {
          formData.append('files', {
            uri: file.uri,
            name: file.name,
            type: file.type,
          } as any);
        });
  
        try {
          const response = await fetch('https://your-server.com/upload', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          const data = await response.text();
          console.log('Upload response:', data);
        } catch (error) {
          console.error('Upload error:', error);
        }
      }
    };
    
    const removeFile = (index: number) => {
      const updatedFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(updatedFiles);
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

    const isNextDisabled = () => {
      if (currentStep === 1) {
        return (!name || !dateOfBirth || !civilStatus || !gender);
      } else if (currentStep === 2) {
        return (!emailAddress || !nationality || !birthPlace || !((mobileNumber.length === 11) &&  mobileNumber.slice(0, 2) === "09") || !householdMembers);
      } else if (currentStep === 3) {
        return (!religion || !disability || !annualGrossIncome);
      } else if (currentStep === 4) {
        return (!region || !province || !municipalityCity || !barangay || !(ZIPCode.length === 4));
      } else if (currentStep === 5) {
        return (!studentType || !admissionStatus || !educationLevel || !yearLevel || !(ID.length === 9) || !(LRN.length === 12));
      } else if (currentStep === 6) {
        return ((selectedFiles.length === 0));
      } else if (currentStep === 7) return !certified;
      return false;
    };

    const submitForm = async () => {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No user is logged in");
        return;
      }
    
      const docRef = doc(db, 'users', user.uid, 'profile', 'enrollmentForm');
    
      try {
        await setDoc(docRef, {
          name,
          dateOfBirth,
          civilStatus,
          gender,
    
          emailAddress,
          nationality,
          birthPlace,
          mobileNumber,
          householdMembers,
    
          religion,
          disability,
          annualGrossIncome,
    
          region,
          province,
          municipalityCity,
          barangay,
          ZIPCode,
    
          studentType,
          admissionStatus,
          educationLevel,
          yearLevel,
          ID,
          LRN,
    
          selectedFiles, // only if this is a string[] or File[] with URLs

          submittedAt: new Date() // optional: timestamp
        });
    
        Alert.alert("Success", "Form submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        Alert.alert("Error", "Failed to submit form");
      }
    };
    

    const pressBackButton = () => {
      if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const pressNextButton = () => {
      if (isNextDisabled()) return; // If button is disabled, do nothing
  
      // Dynamic navigation based on # of screens
      if (currentStep < 7) {
        setCurrentStep(currentStep + 1);
      } else {
        // Upload enrollment form to the database
        submitForm();
        router.replace("/Dashboard"); // Return to dashboard
        setCurrentStep(1);
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
            const data = docSnap.data() as StudentInfo;
            setStudentInfo(data);
            setName(data.name);
            setGender(data.gender);
            setID(data.ID);
            setEmailAddress(user.email || "");
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
      <View style={enrollmentFormStyles.subtitleContainer}>
          <Text style={enrollmentFormStyles.subtitle}>ENROLLMENT FORM</Text>
      </View>

      {/* SCREEN 1: PERSONAL INFORMATION */}
      {currentStep === 1 && (
      <View style={enrollmentFormStyles.formContainer}>
        <Text style={enrollmentFormStyles.sectionTitle}>I. Personal Information</Text>
        {/* NAME */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 320, height: 50 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Full Name</Text>
          <TextInput
            placeholder="Juan de la Cruz"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 320, height: 50 }]}
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
              value={dateOfBirth ? dateOfBirth.toLocaleDateString() : ''}
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
          isChecked={gender === "Male"}
          onPress={() => setGender("Male")}
          fillColor={colors.primary}
          unFillColor={colors.accent}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={[enrollmentFormStyles.checkboxText, { fontSize: 14 } ]}
          text="Male"
          />
          <BouncyCheckbox
          style={enrollmentFormStyles.checkbox}
          useBuiltInState={false}
          isChecked={gender === "Female"}
          onPress={() => setGender("Female")}
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
        <View style={[enrollmentFormStyles.checkboxContainer, { width: 200, height: 80, position: "absolute", top: 127, left: 140 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Civil Status</Text>
          <DropDownPicker
            placeholder="Select civil status..."
            open={civilStatusOpen}
            value={civilStatus}
            items={civilStatusItems}
            setOpen={setCivilStatusOpen}
            setValue={setCivilStatus}
            setItems={setCivilStatusItems}
            style={enrollmentFormStyles.dropdownMenu}
            dropDownContainerStyle={enrollmentFormStyles.dropdownContainer}
            textStyle={enrollmentFormStyles.dropdownText}
            labelStyle={enrollmentFormStyles.dropdownLabel}
            placeholderStyle={enrollmentFormStyles.dropdownPlaceholder}
            listItemLabelStyle={enrollmentFormStyles.dropdownLabel}
            zIndex={999}
          />
        </View>
        {/* BOTTOM MARGIN */}
        <View style={[enrollmentFormStyles.bottomMargin, { height: 244 }]}/>
      </View>
      )}

    {/* SCREEN 2: PERSONAL INFORMATION */}
    {currentStep === 2 && (
      <View style={enrollmentFormStyles.formContainer}>
        <Text style={enrollmentFormStyles.sectionTitle}>I. Personal Information</Text>
        {/* EMAIL ADDRESS */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 320, height: 50 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Email Address</Text>
          <TextInput
            placeholder="email@example.com"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 320, height: 50 }]}
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
        </View>
        {/* BIRTHPLACE */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 190, height: 50, position: "absolute", top: 126, left: 150 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Birthplace</Text>
          <TextInput
            placeholder="Iloilo, Iloilo City"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 190, height: 50 }]}
            value={birthPlace}
            onChangeText={setBirthPlace}
          />
        </View>
        {/* NATIONALITY */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 110, height: 50 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Nationality</Text>
          <TextInput
            placeholder="Filipino"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 110, height: 50 }]}
            value={nationality}
            onChangeText={setNationality}
          />
        </View>
        {/* MOBILE NUMBER */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 130, height: 50 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Mobile Number</Text>
          <TextInput
            placeholder="09000000000"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 130, height: 50 }]}
            value={mobileNumber}
            keyboardType="numeric" // Set to numeric keypad
            onChangeText={(text) => { // Removes non-numeric characters
              const numericText = text.replace(/[^0-9]/g, '');
              setMobileNumber(numericText);
            }}
          />
        </View>
        {/* # of HOUSEHOLD MEMBERS */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 170, height: 50, position: "absolute", top: 208, left: 170 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}># of Household Members</Text>
          <TextInput
            placeholder="3"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 170, height: 50 }]}
            value={householdMembers}
            keyboardType="numeric" // Set to numeric keypad
            onChangeText={(text) => { // Removes non-numeric characters
              const numericText = text.replace(/[^0-9]/g, '');
              setHouseholdMembers(numericText);
            }}
          />
        </View>
        {/* BOTTOM MARGIN */}
        <View style={[enrollmentFormStyles.bottomMargin, { height: 222 }]}/>
      </View>
      )}

      {/* SCREEN 2: PERSONAL INFORMATION */}
      {currentStep === 3 && (
      <View style={enrollmentFormStyles.formContainer}>
        <Text style={enrollmentFormStyles.sectionTitle}>I. Personal Information</Text>
        {/* RELIGION */}
        <View style={[enrollmentFormStyles.checkboxContainer, { width: 240, height: 80 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Religion</Text>
          <DropDownPicker
            placeholder="Select religion..."
            open={religionOpen}
            value={religion}
            items={religionItems}
            setOpen={setReligionOpen}
            setValue={setReligion}
            setItems={setReligionItems}
            style={[enrollmentFormStyles.dropdownMenu, { width: 320 }]}
            dropDownContainerStyle={[enrollmentFormStyles.dropdownContainer, { width: 320 }]}
            textStyle={enrollmentFormStyles.dropdownText}
            labelStyle={enrollmentFormStyles.dropdownLabel}
            placeholderStyle={enrollmentFormStyles.dropdownPlaceholder}
            listItemLabelStyle={enrollmentFormStyles.dropdownLabel}
            zIndex={999}
          />
        </View>
        {/* DISABILITY */}
        <View style={[enrollmentFormStyles.checkboxContainer, { width: 220, height: 80 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Disability</Text>
          <DropDownPicker
            placeholder="Select disability..."
            open={disabilityOpen}
            value={disability}
            items={disabilityItems}
            setOpen={setDisabilityOpen}
            setValue={setDisability}
            setItems={setDisabilityItems}
            style={[enrollmentFormStyles.dropdownMenu, { width: 320 }]}
            dropDownContainerStyle={[enrollmentFormStyles.dropdownContainer, { width: 320 }]}
            textStyle={enrollmentFormStyles.dropdownText}
            labelStyle={enrollmentFormStyles.dropdownLabel}
            placeholderStyle={enrollmentFormStyles.dropdownPlaceholder}
            listItemLabelStyle={enrollmentFormStyles.dropdownLabel}
            zIndex={999}
          />
        </View>
        {/* ANNUAL GROSS INCOME */}
        <View style={[enrollmentFormStyles.checkboxContainer, { width: 270, height: 80 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Annual Gross Income</Text>
          <DropDownPicker
            placeholder="Select annual gross income..."
            open={annualGrossIncomeOpen}
            value={annualGrossIncome}
            items={annualGrossIncomeItems}
            setOpen={setAnnualGrossIncomeOpen}
            setValue={setAnnualGrossIncome}
            setItems={setAnnualGrossIncomeItems}
            style={[enrollmentFormStyles.dropdownMenu, { width: 320 }]}
            dropDownContainerStyle={[enrollmentFormStyles.dropdownContainer, { width: 320 }]}
            textStyle={enrollmentFormStyles.dropdownText}
            labelStyle={enrollmentFormStyles.dropdownLabel}
            placeholderStyle={enrollmentFormStyles.dropdownPlaceholder}
            listItemLabelStyle={enrollmentFormStyles.dropdownLabel}
            zIndex={999}
          />
        </View>
        {/* BOTTOM MARGIN */}
        <View style={[enrollmentFormStyles.bottomMargin, { height: 228 }]}/>
      </View>
      )}

      {/* SCREEN 4: ADDRESS INFORMATION */}
      {currentStep === 4 && (
      <View style={enrollmentFormStyles.formContainer}>
        <Text style={enrollmentFormStyles.sectionTitle}>II. Address Information</Text>
        {/* REGION */}
        <View style={[enrollmentFormStyles.checkboxContainer, { width: 270, height: 80 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Region</Text>
          <DropDownPicker
            placeholder="Select region..."
            open={regionOpen}
            value={region}
            items={regionItems}
            setOpen={setRegionOpen}
            setValue={setRegion}
            setItems={setRegionItems}
            style={[enrollmentFormStyles.dropdownMenu, { width: 320 }]}
            dropDownContainerStyle={[enrollmentFormStyles.dropdownContainer, { width: 320 }]}
            textStyle={enrollmentFormStyles.dropdownText}
            labelStyle={enrollmentFormStyles.dropdownLabel}
            placeholderStyle={enrollmentFormStyles.dropdownPlaceholder}
            listItemLabelStyle={enrollmentFormStyles.dropdownLabel}
            zIndex={999}
          />
        </View>        
        {/* PROVINCE */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 150, height: 50 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Province</Text>
          <TextInput
            placeholder="Iloilo"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 150, height: 50 }]}
            value={province}
            onChangeText={setProvince}
          />
        </View>
        {/* MUNICIPALITY/CITY */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 146, height: 50, position: "absolute", top: 124, left: 192 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Municipality/City</Text>
          <TextInput
            placeholder="Iloilo City"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 146, height: 50 }]}
            value={municipalityCity}
            onChangeText={setMunicipalityCity}
          />
        </View>
        {/* BARANGAY */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 170, height: 50 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Barangay</Text>
          <TextInput
            placeholder="Brgy. Magsaysay"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 170, height: 50 }]}
            value={barangay}
            onChangeText={setBarangay}
          />
        </View>
        {/* ZIP CODE */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 126, height: 50, position: "absolute", top: 206, left: 212 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>ZIP Code</Text>
          <TextInput
            placeholder="5000"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 126, height: 50 }]}
            value={ZIPCode}
            keyboardType="numeric" // Set to numeric keypad
            onChangeText={(text) => { // Removes non-numeric characters
              const numericText = text.replace(/[^0-9]/g, '');
              setZIPCode(numericText);
            }}
          />
        </View>
        {/* BOTTOM MARGIN */}
        <View style={[enrollmentFormStyles.bottomMargin, { height: 224 }]}/>
      </View>
      )}

      {/* SCREEN 5: EDUCATION INFORMATION */}
      {currentStep === 5 && (
      <View style={enrollmentFormStyles.formContainer}>
        <Text style={enrollmentFormStyles.sectionTitle}>III. Education Information</Text>
        {/* STUDENT TYPE */}
        <View style={[enrollmentFormStyles.checkboxContainer, { width: 270, height: 80 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Student Type</Text>
          <DropDownPicker
            placeholder="Select student type..."
            open={studentTypeOpen}
            value={studentType}
            items={studentTypeItems}
            setOpen={setStudentTypeOpen}
            setValue={setStudentType}
            setItems={setStudentTypeItems}
            style={[enrollmentFormStyles.dropdownMenu, { width: 320 }]}
            dropDownContainerStyle={[enrollmentFormStyles.dropdownContainer, { width: 320 }]}
            textStyle={enrollmentFormStyles.dropdownText}
            labelStyle={enrollmentFormStyles.dropdownLabel}
            placeholderStyle={enrollmentFormStyles.dropdownPlaceholder}
            listItemLabelStyle={enrollmentFormStyles.dropdownLabel}
            zIndex={999}
          />
        </View>
        {/* ADMISSION STATUS */}
        <View style={[enrollmentFormStyles.checkboxContainer, { width: 270, height: 80 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Admission Status</Text>
          <DropDownPicker
            placeholder="Select status..."
            open={admissionStatusOpen}
            value={admissionStatus}
            items={admissionStatusItems}
            setOpen={setAdmissionStatusOpen}
            setValue={setAdmissionStatus}
            setItems={setAdmissionStatusItems}
            style={[enrollmentFormStyles.dropdownMenu, { width: 180 }]}
            dropDownContainerStyle={[enrollmentFormStyles.dropdownContainer, { width: 180 }]}
            textStyle={enrollmentFormStyles.dropdownText}
            labelStyle={enrollmentFormStyles.dropdownLabel}
            placeholderStyle={enrollmentFormStyles.dropdownPlaceholder}
            listItemLabelStyle={enrollmentFormStyles.dropdownLabel}
            zIndex={999}
          />
        </View>
        {/* EDUCATION LEVEL */}
        <View style={[enrollmentFormStyles.checkboxContainer, { width: 270, height: 80 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Education Level</Text>
          <DropDownPicker
            placeholder="Select education level..."
            open={educationLevelOpen}
            value={educationLevel}
            items={educationLevelItems}
            setOpen={setEducationLevelOpen}
            setValue={setEducationLevel}
            setItems={setEducationLevelItems}
            style={[enrollmentFormStyles.dropdownMenu, { width: 320 }]}
            dropDownContainerStyle={[enrollmentFormStyles.dropdownContainer, { width: 320 }]}
            textStyle={enrollmentFormStyles.dropdownText}
            labelStyle={enrollmentFormStyles.dropdownLabel}
            placeholderStyle={enrollmentFormStyles.dropdownPlaceholder}
            listItemLabelStyle={enrollmentFormStyles.dropdownLabel}
            zIndex={999}
          />
        </View>
        {/* YEAR LEVEL */}
        <View style={[enrollmentFormStyles.checkboxContainer, { width: 270, height: 80 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>Year Level</Text>
          <DropDownPicker
            placeholder="Select year..."
            open={yearLevelOpen}
            value={yearLevel}
            items={yearLevelItems}
            setOpen={setYearLevelOpen}
            setValue={setYearLevel}
            setItems={setYearLevelItems}
            style={[enrollmentFormStyles.dropdownMenu, { width: 160 }]}
            dropDownContainerStyle={[enrollmentFormStyles.dropdownContainer, { width: 160 }]}
            textStyle={enrollmentFormStyles.dropdownText}
            labelStyle={enrollmentFormStyles.dropdownLabel}
            placeholderStyle={enrollmentFormStyles.dropdownPlaceholder}
            listItemLabelStyle={enrollmentFormStyles.dropdownLabel}
            zIndex={999}
          />
        </View>
        {/* ID */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 116, height: 50, position: "absolute", top: 127, left: 220 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>I.D.</Text>
          <TextInput
            placeholder="2024M0000"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 116, height: 50 }]}
            value={ID}
            onChangeText={setID}
          />
        </View>
        {/* LRN */}
        <View style={[enrollmentFormStyles.inputContainer, { width: 136, height: 50, position: "absolute", top: 287, left: 200 }]}>
          <Text style={enrollmentFormStyles.sectionLabel}>LRN</Text>
          <TextInput
            placeholder="000000000000"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            style={[enrollmentFormStyles.inputField, { width: 136, height: 50 }]}
            value={LRN}
            keyboardType="numeric" // Set to numeric keypad
            onChangeText={(text) => { // Removes non-numeric characters
              const numericText = text.replace(/[^0-9]/g, '');
              setLRN(numericText);
            }}
          />
        </View>
        {/* BOTTOM MARGIN */}
        <View style={[enrollmentFormStyles.bottomMargin, { height: 148 }]}/>
      </View>
      )}

      {/* SCREEN 6: UPLOAD DOCUMENTS/ID & CERTIFICATION */}
      {currentStep === 6 && (
      <View style={enrollmentFormStyles.formContainer}>
        <Text style={enrollmentFormStyles.sectionTitle}>IV. Upload Documents/ID and Certification</Text>
        {/* UPLOAD */}
        <TouchableOpacity style={enrollmentFormStyles.uploadFileButton} onPress={uploadFile}>
        <Text style={enrollmentFormStyles.uploadButtonLabel}>Upload Files</Text>
        </TouchableOpacity>
        {/* UPLOADED FILE */}
        <View style={enrollmentFormStyles.uploadedFilesContainer}>
        {selectedFiles.map((file, index) => (
          <View style={enrollmentFormStyles.fileLine}>
            <Text style={enrollmentFormStyles.fileText} key={index}>📄 {file.name}</Text>
            <TouchableOpacity style={enrollmentFormStyles.removeButton} onPress={() => removeFile(index)}>
            <Text style={enrollmentFormStyles.removeText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        </View>
        <Text style={enrollmentFormStyles.uploadedFilesValidation}>
          *Limit: 4 files per upload*
        </Text>
        {/* BOTTOM MARGIN */}
        <View style={[enrollmentFormStyles.bottomMargin, { height: 153 }]}/>
      </View>
      )}

      {/* SCREEN 7: APPLICANT CERTIFICATION */}
      {currentStep === 7 && (
      <View style={enrollmentFormStyles.formContainer}>
        <Text style={enrollmentFormStyles.sectionTitle}>V. Applicant Certification</Text>
        {/* CERTIFICATION */}
        <View style={enrollmentFormStyles.applicantCertificationContainer}>
          <Text style={enrollmentFormStyles.applicantCertificationLabel}>
          I hereby certify that I have read and fully understood all instructions regarding my application for admissions at West Visayas State University and that the information supplied in this application and the documentation supporting it are correct and complete.{`\n`}
          </Text>
          <Text style={enrollmentFormStyles.applicantCertificationLabel}>
          I understand that incomplete or inaccurate information could be prejudicial to my admission. If accepted as a student of the West Visayas State University, I agree to abide by its policies and regulations.
          </Text>
        </View>
        <BouncyCheckbox
        style={enrollmentFormStyles.applicantCertificationCheckbox}
        useBuiltInState={false}
        isChecked={certified}
        onPress={() => setCertified(!certified)}
        fillColor={colors.primary}
        unFillColor={colors.accent}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={[enrollmentFormStyles.applicantCertificationCheckboxText, { fontSize: 16 }]}
        text="I Agree"
        />
        {/* BOTTOM MARGIN */}
        <View style={[enrollmentFormStyles.bottomMargin, { height: 212 }]}/>
      </View>
      )}


      {/* NAVIGATION BUTTONS */}
      <View style={enrollmentFormStyles.buttonContainer}>
        {/* BACK BUTTON */}
        {currentStep >= 2 && (
        <TouchableOpacity
          style={enrollmentFormStyles.backButton}
          onPress={pressBackButton}
        ><Text style={enrollmentFormStyles.backButtonLabel}>‹</Text>
        </TouchableOpacity>
        )}

        {/* NEXT BUTTON */}
        <TouchableOpacity
        onPress={pressNextButton}
        style={[
        enrollmentFormStyles.nextButton,
        isNextDisabled() && { backgroundColor: "#ccc" }
        ]}><Text style={enrollmentFormStyles.nextButtonLabel}>{currentStep < 7 ? "Next" : "ENROLL"}</Text>
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