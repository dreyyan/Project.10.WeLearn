// REACT NATIVE
import { Text, View, TextInput, Alert, Image } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// STYLES
import { burgerMenuStyles, departmentsStyles, globalStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// FIRESTORE DATABASE & FIREBASE AUTHENTICATION
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../configurations/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// LIBRARY COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
// COMPONENTS
import BurgerMenu from "@/components/BurgerMenu";

export default function Departments() {
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

  const departmentData: {
    [key: string]: {
      image: any;
      about: string;
      dean: string;
    };
  } = {
    CAS: {
      image: require("../../assets/images/CAS.png"),
      about:
        "The College of Arts and Sciences focuses on providing a well-rounded education in the humanities, natural sciences, social sciences, and interdisciplinary studies. It nurtures students' critical thinking, creativity, and research skills.",
      dean: "Dr. Alexander J. Balsomo",
    },
    CBM: {
      image: require("../../assets/images/CBM.png"),
      about:
        "The College of Business and Management offers courses in business administration, management, marketing, finance, and entrepreneurship. It prepares students for leadership roles in the business world with practical knowledge and innovative strategies.",
      dean: "Dr. Ma. Corazon M. Samorin",
    },
    COC: {
      image: require("../../assets/images/COC.png"),
      about:
        "The College of Communication provides education in broadcasting, journalism, and development communication. It equips students with essential media skills and fosters critical thinking in communication studies.",
      dean: "Prof. Rona Dhel C. Alingasa, MDC, LPT",
    },
    COD: {
      image: require("../../assets/images/COD.png"),
      about:
        "The College of Dentistry is dedicated to training future dental professionals with the knowledge and skills necessary to provide high-quality dental care. The department emphasizes clinical practice, oral health research, and patient care.",
      dean: "Dr. Liza Assumpta M. Jover",
    },
    COE: {
      image: require("../../assets/images/COE.png"),
      about:
        "The College of Education provides programs that prepare students for careers in teaching, counseling, and other education-related fields. It focuses on building the knowledge and skills needed for shaping the future of students across various educational stages.",
      dean: "Dr. Ricky M. Magno",
    },
    CICT: {
      image: require("../../assets/images/CICT.png"),
      about:
        "The College of Information & Communications Technology specializes in educating students in the fields of information technology, computer science, software engineering, and telecommunications. The department focuses on developing technological solutions for modern challenges.",
      dean: "Dr. Ma. Beth S. Concepcion",
    },
    COM: {
      image: require("../../assets/images/COM.png"),
      about:
        "The College of Medicine is focused on producing skilled and compassionate healthcare professionals. It provides a comprehensive medical education with hands-on training in diagnostics, treatment, and patient care.",
      dean: "Dr. Victor A. Amantillo Jr.",
    },
    CON: {
      image: require("../../assets/images/CONursing.png"),
      about:
        "The College of Nursing trains students to become highly competent nurses who can provide care to individuals and communities. The department emphasizes clinical practice, patient advocacy, and healthcare delivery.",
      dean: "Dr. Madonna S. Palmes",
    },
    COP: {
      image: require("../../assets/images/COP.png"),
      about:
        "The College of PESCAR offers education in physical education, sports, and recreation management. It aims to develop students' knowledge and skills for promoting physical fitness, leading athletic programs, and fostering well-being in communities.",
      dean: "Dr. Porferio J. Barlas Jr.",
    },
    COL: {
      image: require("../../assets/images/COL.png"),
      about:
        "The College of Law offers a comprehensive legal education that prepares students to become competent and ethical legal professionals. It focuses on developing critical thinking, legal research skills, and a deep understanding of the law and its application.",
      dean: "Atty. Pauline Grace Buñol-Alfuente, C.P.A.",
    },
    ILS: {
      image: require("../../assets/images/ILS.jpg"),
      about:
        "The Integrated Laboratory School (ILS) provides quality education from the elementary level through to senior high school. It serves as a laboratory school that integrates innovative teaching strategies and modern learning approaches to develop the academic, social, and personal skills of its students.",
      dean: "Prof. Mary June D. Pineda",
    },
  };  

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
        <View style={departmentsStyles.subtitleContainer}>
            <Text style={departmentsStyles.subtitle}>DEPARTMENTS</Text>
        </View>

        <DropDownPicker
        open={departmentOpen}
        value={department}
        items={departmentItems}
        setOpen={setDepartmentOpen}
        setValue={setDepartment}
        setItems={setDepartmentItems}
        placeholder="Choose a course"
        disabled={!department}
        style={departmentsStyles.dropdownMenu}
        dropDownContainerStyle={departmentsStyles.dropdownContainer}
        textStyle={departmentsStyles.dropdownText}
        labelStyle={departmentsStyles.dropdownLabel}
        placeholderStyle={departmentsStyles.dropdownPlaceholder}
        listItemLabelStyle={departmentsStyles.dropdownLabel}
        zIndex={999}
        />

        {/* DISPLAY DEPARTMENT DYNAMICALLY */}
        {department && departmentData[department] && (
          <View style={departmentsStyles.container}>
            <Image
              source={departmentData[department].image}
              style={departmentsStyles.departmentImage}
              resizeMode="cover"
            />
            <Text style={departmentsStyles.departmentAcronym}>
              {department}
            </Text>
            <Text style={departmentsStyles.sectionTitle}>ABOUT US</Text>
            <Text style={departmentsStyles.sectionText}>
              {departmentData[department].about}
            </Text>
            <Text style={departmentsStyles.sectionTitle}>DEAN</Text>
            <Text style={departmentsStyles.sectionText}>
              {departmentData[department].dean}
            </Text>
            <Text style={departmentsStyles.sectionTitle}>COURSES OFFERED</Text>
            {coursesByDepartment[department]?.map((course, index) => (
              <Text key={index} style={departmentsStyles.courseItem}>
                {`  ~ `}{course}
              </Text>
            ))}
          </View>
        )}
        {/* MENU BURGER BUTTON */}
        <BurgerMenu
        isVisible={isMenuVisible}
        setIsVisible={setIsMenuVisible}
        />
    </View>
  );
}