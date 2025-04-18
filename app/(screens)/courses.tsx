// REACT NATIVE
import { Text, View, TextInput, TouchableOpacity, Alert, Image, TouchableWithoutFeedback, Modal } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
// STYLES
import { dashboardStyles, burgerMenuStyles } from "../../styles/styles"
import { colors } from "@/styles/colors";
// LIBRARY COMPONENTS
import { Ionicons } from '@expo/vector-icons';

export default function courses() {
  // STATES
  const [isMenuVisible, setIsMenuVisible] = useState(false);

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
            <Text style={dashboardStyles.subtitle}>COURSES</Text>
        </View>

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