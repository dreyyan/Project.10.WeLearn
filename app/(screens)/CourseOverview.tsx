// REACT NATIVE
import { Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// STYLES
import { burgerMenuStyles, courseOverviewStyles, globalStyles } from "../../styles/styles"
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

export default function Courses() {
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
      
    const subjectsByCourse: { [key: string]: { name: string; time: string }[] } = {
      // CAS
      "BA English Language Studies": [
        { name: "Phonology", time: "8:00 AM - 9:00 AM" },
        { name: "Morphology", time: "9:00 AM - 10:00 AM" },
        { name: "Syntax", time: "10:30 AM - 11:30 AM" },
        { name: "Semantics", time: "1:00 PM - 2:00 PM" }
      ],
      "BA Foreign Languages": [
        { name: "Spanish", time: "8:00 AM - 9:00 AM" },
        { name: "French", time: "9:30 AM - 10:30 AM" },
        { name: "Japanese", time: "11:00 AM - 12:00 PM" },
        { name: "Translation Studies", time: "1:00 PM - 2:00 PM" }
      ],
      "BA Political Science": [
        { name: "Political Theory", time: "8:00 AM - 9:00 AM" },
        { name: "International Relations", time: "9:30 AM - 10:30 AM" },
        { name: "Comparative Politics", time: "11:00 AM - 12:00 PM" }
      ],
      "BS Applied Mathematics": [
        { name: "Linear Algebra", time: "8:00 AM - 9:00 AM" },
        { name: "Numerical Methods", time: "9:30 AM - 10:30 AM" },
        { name: "Operations Research", time: "11:00 AM - 12:00 PM" }
      ],
      "BS Biology": [
        { name: "Genetics", time: "8:00 AM - 9:00 AM" },
        { name: "Cell Biology", time: "9:30 AM - 10:30 AM" },
        { name: "Ecology", time: "11:00 AM - 12:00 PM" },
        { name: "Botany", time: "1:00 PM - 2:00 PM" }
      ],
      "BS Chemistry": [
        { name: "Organic Chemistry", time: "8:00 AM - 9:30 AM" },
        { name: "Inorganic Chemistry", time: "10:00 AM - 11:30 AM" },
        { name: "Biochemistry", time: "1:00 PM - 2:30 PM" },
        { name: "Physical Chemistry", time: "3:00 PM - 4:30 PM" }
      ],
      // CICT
      "BS Information Technology": [
        { name: "Web Development", time: "8:00 AM - 9:30 AM" },
        { name: "Mobile App Dev", time: "10:00 AM - 11:30 AM" },
        { name: "Network & Security", time: "1:00 PM - 2:30 PM" }
      ],
      "BS Computer Science": [
        { name: "Data Structures", time: "8:00 AM - 9:30 AM" },
        { name: "Algorithms", time: "10:00 AM - 11:30 AM" },
        { name: "Operating Systems", time: "1:00 PM - 2:30 PM" }
      ],
      "BS Information Systems": [
        { name: "Systems Analysis", time: "8:00 AM - 9:00 AM" },
        { name: "Enterprise Architecture", time: "9:30 AM - 10:30 AM" },
        { name: "Project Management", time: "11:00 AM - 12:00 PM" }
      ],
      // COM
      "Doctor of Medicine": [
        { name: "Anatomy", time: "8:00 AM - 9:30 AM" },
        { name: "Physiology", time: "10:00 AM - 11:30 AM" },
        { name: "Pathology", time: "1:00 PM - 2:30 PM" },
        { name: "Pharmacology", time: "3:00 PM - 4:30 PM" }
      ],

      // CON
      "BS Nursing": [
        { name: "Fundamentals of Nursing", time: "8:00 AM - 9:00 AM" },
        { name: "Medical-Surgical Nursing", time: "9:30 AM - 10:30 AM" },
        { name: "Community Health Nursing", time: "1:00 PM - 2:00 PM" }
      ],
      // COP
      "Bachelor of Culture and Arts Education": [
        { name: "Cultural Studies", time: "8:00 AM - 9:00 AM" },
        { name: "Arts Integration", time: "9:30 AM - 10:30 AM" },
        { name: "Heritage Studies", time: "1:00 PM - 2:00 PM" }
      ],
      "Bachelor of Performing Arts": [
        { name: "Theater Arts", time: "8:00 AM - 9:30 AM" },
        { name: "Dance", time: "10:00 AM - 11:30 AM" },
        { name: "Performance Theory", time: "1:00 PM - 2:30 PM" }
      ],
      "Bachelor of Physical Education": [
        { name: "Anatomy & Physiology", time: "8:00 AM - 9:00 AM" },
        { name: "Motor Control", time: "9:30 AM - 10:30 AM" },
        { name: "PE Pedagogy", time: "11:00 AM - 12:00 PM" }
      ],
      "Bachelor of Science in Exercise and Sports Sciences": [
        { name: "Exercise Physiology", time: "8:00 AM - 9:00 AM" },
        { name: "Sports Psychology", time: "9:30 AM - 10:30 AM" },
        { name: "Fitness Assessment", time: "1:00 PM - 2:00 PM" }
      ],
      // COL
      "Juris Doctor(J.D.) Program": [
        { name: "Civil Law", time: "8:00 AM - 9:30 AM" },
        { name: "Criminal Law", time: "10:00 AM - 11:30 AM" },
        { name: "Legal Ethics", time: "1:00 PM - 2:00 PM" },
        { name: "Constitutional Law", time: "2:30 PM - 4:00 PM" }
      ],
      // ILS
      "Pre-Elementary": [
        { name: "Pre-Math", time: "8:00 AM - 8:30 AM" },
        { name: "Pre-Reading", time: "9:00 AM - 9:30 AM" },
        { name: "Creative Play", time: "10:00 AM - 11:00 AM" }
      ],
      "Elementary": [
        { name: "English", time: "8:00 AM - 9:00 AM" },
        { name: "Science", time: "9:15 AM - 10:15 AM" },
        { name: "Math", time: "10:30 AM - 11:30 AM" },
        { name: "Filipino", time: "1:00 PM - 2:00 PM" }
      ],
      "Junior High School": [
        { name: "Araling Panlipunan", time: "8:00 AM - 9:00 AM" },
        { name: "Math", time: "9:15 AM - 10:15 AM" },
        { name: "Science", time: "10:30 AM - 11:30 AM" },
        { name: "English", time: "1:00 PM - 2:00 PM" },
        { name: "TLE", time: "2:15 PM - 3:15 PM" }
      ],
      "Senior High School": [
        { name: "Oral Communication", time: "8:00 AM - 9:00 AM" },
        { name: "21st Century Literature", time: "9:15 AM - 10:15 AM" },
        { name: "General Math", time: "10:30 AM - 11:30 AM" },
        { name: "UCSP", time: "1:00 PM - 2:00 PM" }
      ]
    };

    function formatTimeRange(timeRange: string): string {
      return timeRange.replace(/\b(\d):/g, "0$1:");
    }
    Object.keys(subjectsByCourse).forEach((courseKey) => {
      subjectsByCourse[courseKey] = subjectsByCourse[courseKey].map((subject) => ({
        ...subject,
        time: formatTimeRange(subject.time)
      }));
    });

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
              setCourse(data.course);
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
        <View style={courseOverviewStyles.subtitleContainer}>
            <Text style={courseOverviewStyles.subtitle}>COURSE OVERVIEW</Text>
        </View>

        <View style={courseOverviewStyles.courseOverviewContainer}>
        <View style={{backgroundColor: colors.secondary, alignSelf: "center", marginTop: 0, marginBottom: 4, width: 280, height: 2}}/>
        <View style={{backgroundColor: colors.secondary, alignSelf: "center", marginBottom: 40, width: 320, height: 4}}/>
          {course !== "" && (
            <>
              <Text style={courseOverviewStyles.courseTitle}>{course}</Text>
              <Text style={courseOverviewStyles.courseDepartment}>{department}</Text>

              <Text style={courseOverviewStyles.subjectsHeading}>Schedule</Text>

              <View style={courseOverviewStyles.table}>
                <View style={courseOverviewStyles.tableHeader}>
                  <Text style={[courseOverviewStyles.tableCell, { flex: 2, fontFamily: 'Lklavika-Bold', fontSize: 22 }]}>
                  Subject</Text>
                  <Text style={[courseOverviewStyles.tableCell, { flex: 2, textAlign: "right", fontFamily: 'Lklavika-Bold', fontSize: 22  }]}>Time</Text>
                </View>

                {subjectsByCourse[course]?.map((subject, index) => (
                  <View key={index} style={courseOverviewStyles.tableRow}>
                    <Text style={[courseOverviewStyles.tableCell, { flex: 2 }]}>{subject.name}</Text>
                    <Text style={[courseOverviewStyles.tableCell, { flex: 2, textAlign: "right" }]}>{subject.time}</Text>
                  </View>
                ))}
                <View style={{backgroundColor: colors.secondary, alignSelf: "center", marginTop: 60, width: 260, height: 4}}/>
                <View style={{backgroundColor: colors.secondary, alignSelf: "center", marginTop: 4, width: 240, height: 2}}/>
              </View>
            </>
          )}
        </View>

        {/* MENU BURGER BUTTON */}
        <BurgerMenu
        isVisible={isMenuVisible}
        setIsVisible={setIsMenuVisible}
        />
    </View>
  );
}