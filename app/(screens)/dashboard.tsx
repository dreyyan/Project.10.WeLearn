import { Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { dashboardStyles, burgerMenuStyles } from "../../styles/styles"
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from "expo-clipboard";
import { Feather } from "@expo/vector-icons";
import { Modal } from "react-native";
import { useState } from "react";

const dashboard = () => {
    const studentID = "117591120149";

    // STATES
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    // HANDLES
    const handleBurgerMenu = () => {
        setIsMenuVisible(true);
      };

    const handleCopy = async () => {
      await Clipboard.setStringAsync("117591120149");
    const studentID = "117591120149";
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
            <Text style={dashboardStyles.subtitle}>DASHBOARD</Text>
        </View>

        <Image
        source={require("../../assets/images/profile-placeholder.jpg")}
        style={dashboardStyles.studentPicture}
        resizeMode="cover"
      />

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
        <TouchableOpacity
            style={dashboardStyles.editInformationButton}
            // onPress={}
            >
            <Text style={dashboardStyles.editInformationButtonLabel}>Edit Information</Text>
            </TouchableOpacity>

        <Modal
        animationType="fade"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => setIsMenuVisible(false)}
        >
            <View style={burgerMenuStyles.modalOverlay}>
                <View style={burgerMenuStyles.menuContainer}>
                <Text style={burgerMenuStyles.menuTitle}>Menu</Text>

                <TouchableOpacity style={burgerMenuStyles.menuItem} onPress={() => {}}>
                    <Text style={burgerMenuStyles.menuItemText}>Student Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={burgerMenuStyles.menuItem} onPress={() => {}}>
                    <Text style={burgerMenuStyles.menuItemText}>Courses</Text>
                </TouchableOpacity>

                <TouchableOpacity style={burgerMenuStyles.menuItem} onPress={() => {}}>
                    <Text style={burgerMenuStyles.menuItemText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={burgerMenuStyles.menuCloseButton}
                    onPress={() => setIsMenuVisible(false)}
                >
                    <Text style={burgerMenuStyles.menuCloseText}>Close</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>
  );
}

export default dashboard