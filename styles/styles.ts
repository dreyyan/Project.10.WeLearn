import { StyleSheet } from 'react-native'
import { colors } from "./colors"

export const globalStyles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.accent,
    },
    banner: {
        width: "100%",
        height: 106,
    },
    icon: {
        marginLeft: 8,
        marginRight: 6,
    },
    label: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,
        color: "white",

        marginTop: "3%",
        marginBottom: "0.5%"
    },
    checkbox: {
        fontFamily: "Lklavika-Medium",
        color: "white"
    },
    // sliderValue: {
    //     fontFamily: 'Lklavika-Medium',
    //     fontSize: 20,
    //     color: "white",

    //     alignSelf: "center"
    // },
})

export const enrollmentFormStyles = StyleSheet.create({
    screen: {
        backgroundColor: colors.accent,

        flex: 1,
        alignItems: 'center',
    },
    subtitleContainer: {
        backgroundColor: colors.primary,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        width: 360,
        height: 56,

        borderWidth: 2,
        borderColor: colors.secondary,
        borderRadius: 8,

        paddingBottom: 2,
        marginTop: 34,
        marginBottom: 20,
        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    subtitle: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 32,

        color: colors.white,
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.accent,


        width: 368,

        borderRadius: 20,

        marginTop: 0,
        paddingLeft: 20,
        paddingTop: 4,
        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    sectionTitle: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 20,

        color: colors.secondary,

        alignSelf: "flex-start",

        marginTop: 10,
        marginLeft: 6,
    },
    sectionLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 12,

        color: colors.secondary,

        alignSelf: "flex-start",

        position: "absolute",
        top: 2,
        left: 2,
        zIndex: 1,

        marginLeft: 6,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#fff',

        marginTop: 20,
        marginBottom: 12,
        paddingTop: 6,
        paddingBottom: 0,

        borderWidth: 2,
        borderColor: colors.secondary,
        borderRadius: 14,

        // iOS Shadow
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    inputField: {
        fontFamily: 'Lklavika',

        backgroundColor: "white",

        borderRadius: 14,

        paddingTop: 20,
        paddingLeft: 14,
        marginVertical: 2
    },
    checkboxContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
    },
    checkbox: {
        width: 110,
        height: 40,
    },
    checkboxText: {
        fontFamily: 'Lklavika-Bold',

        color: colors.secondary,
        textDecorationLine: "none"
    },
    dropdownMenu: {
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 2,

        height: 40,
        marginTop: 10,
        marginBottom: 8,
    },
    dropdownContainer: {
        borderColor: colors.primary,

        borderWidth: 2,
        borderRadius: 8,

        marginTop: 8,
        paddingVertical: 4,
        zIndex: 1000
    },
    dropdownText: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 14,
    },
    dropdownPlaceholder: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 14,

        color: colors.gray,

        marginLeft: 10,
    },
    dropdownLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 14,

        color: colors.secondary,

        marginTop: 2,
        marginLeft: 10,
        lineHeight: 18,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
    },
    nextButton: {
        backgroundColor: colors.primary,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",

        width: 200,
        height: 56,

        borderRadius: 30,

        marginTop: 26,
        marginBottom: 30,
        paddingVertical: 12,
        paddingHorizontal: 20,

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    nextButtonLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 24,

        color: "white",
    },
    backButton: {
        backgroundColor: colors.primary,

        alignSelf: "center",

        borderRadius: 20,

        marginRight: 30,
        paddingTop: 2,
        paddingBottom: 6,
        paddingHorizontal: 16,

        // iOS Shadow
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    backButtonLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 24,

        color: "white"
    },
})

export const dashboardStyles = StyleSheet.create({
    screen: {
        backgroundColor: colors.accent,

        flex: 1,
        alignItems: 'center',
    },
    titleContainer: {
        backgroundColor: colors.primary,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',

        width: "100%",
        height: "10%",
    },
    subtitleContainer: {
        backgroundColor: colors.primary,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        width: "84%",
        height: "10%",

        marginTop: "8%",
        marginBottom: "6%",

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    subtitle: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 50,

        color: colors.white,
    },
    barcodeContainer: {
        height: 36,
        width: 260,

        position: "absolute",
        top: 273,
        left: 110,
        zIndex: 1000,
    },
    editInformationButton: {
        backgroundColor: colors.primary,

        alignSelf: "flex-end",

        marginTop: 20,
        marginBottom: 2,
        marginRight: 34,
        paddingVertical: 10,
        paddingLeft: 12,
        paddingRight: 9,
        borderRadius: 8,

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    welcomeMessage: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 34,

        color: colors.text,

        marginTop: "6%",
        marginBottom: "4%"
    },
    studentInformationTitle: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 24,
        textAlign: "center",

        color: colors.text,


        marginTop: "6%",
        marginBottom: "4%"
    },
    studentPicture: {
        alignSelf: 'center',

        width: 180,
        height: 180,

        borderRadius: 90,

        marginTop: "8%",
        marginBottom: "4%",
    },
    methodButton: {
        backgroundColor: colors.primary,

        alignSelf: "center",

        borderRadius: 8,

        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: "2%",

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    methodButtonLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,

        color: "white"
    },
    statusContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        backgroundColor: colors.white,
        borderColor: colors.secondary,
        borderWidth: 2,
        borderRadius: 4,

        height: 200,
        width: 360,

        marginTop: 40,
    },
    statusLabelContainer: {
        backgroundColor: colors.secondary,

        height: 58,
        width: 358,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 2,

        marginBottom: 20,
        paddingBottom: 4
    },
    statusLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 26,
        
        color: colors.white,

        alignSelf: "center"
    },
    statusText: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 18,
        
        color: colors.secondary,

        alignSelf: "center",
        textAlign: "center"
    },
    statusComment: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 16,
        
        color: colors.secondary,

        alignSelf: "center",
        textAlign: "center"
    },
    enrollmentFormButton: {
        backgroundColor: colors.primary,

        alignSelf: "center",

        borderWidth: 2,
        borderRadius: 8,
        borderColor: colors.secondary,

        marginTop: 8,
        marginBottom: 12,
        paddingVertical: 6,
        paddingLeft: 12,
        paddingRight: 10,

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    enrollmentFormButtonLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 16,

        color: colors.white,
    }
})

export const setupInformationStyles = StyleSheet.create({
    titleContainer: {
        backgroundColor: colors.accent,
        
        display: "flex",
        height: 80,

        borderRadius: 10,

        marginTop: "20%",
        marginBottom: "10%",
        paddingHorizontal: "6%",
    },
    title: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 32,
        textAlign: "center",

        color: colors.primary,
    },
    imageContainer: {
        display: "flex",
        flexDirection: "row",
    },
    vector: {
        width: 180,
        height: 180,

        alignSelf: 'center',

        marginTop: "8%",
        marginBottom: "4%",
    },
    screen2ButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",

        height: 80,

        marginTop: 20,
    },
    screen3ButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",

        height: "10%"
    },
    selectButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",

        width: 160,
        height: 60,

        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 14,

        marginHorizontal: 10,
        paddingVertical: 12,
        paddingHorizontal: 6,
    },
    selectButtonLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 24,
    },
    nextButton: {
        backgroundColor: colors.primary,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",

        width: 300,
        height: 60,

        borderRadius: 30,

        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,

        position: "absolute",
        top: 600,
        left: 60,
        zIndex: 1,

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    nextButtonLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 24,

        color: "white",
    },
    backButton: {
        backgroundColor: colors.primary,

        alignSelf: "center",

        borderRadius: 20,

        marginRight: 30,
        paddingTop: 2,
        paddingBottom: 6,
        paddingHorizontal: 16,

        position: "absolute",
        top: 630,
        left: 12,
        zIndex: 1,

        // iOS Shadow
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    backButtonLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 24,

        color: "white"
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#fff',

        marginTop: 40,
        marginBottom: 16,
        paddingHorizontal: 10,

        borderWidth: 2,
        borderColor: colors.secondary,
        borderRadius: 14,

        // iOS Shadow
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    inputField: {
        fontFamily: 'Lklavika',

        backgroundColor: "white",

        width: 220,
        height: 50,

        marginVertical: 2
    },
    dropdownMenu: {
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 2,

        marginTop: 30,
    },
    dropdownContainer: {
        borderColor: colors.primary,

        borderWidth: 2,
        borderRadius: 8,

        marginTop: 30,
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    dropdownText: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,
    },
    dropdownPlaceholder: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,

        color: colors.gray,

        marginLeft: 10,
    },
    dropdownLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,

        color: colors.secondary,

        marginTop: 2,
        marginLeft: 10,
        lineHeight: 18,
    },
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",

        backgroundColor: colors.white,
        borderColor: colors.secondary,
        borderWidth: 2,
        borderRadius: 10,

        height: 240,
        width: 360,

        marginTop: 20,
        paddingLeft: 60,
        paddingTop: 20
    },
    summaryBanner: {
        width: 356,
        height: 50,

        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
    },
    cardImageContainer: {
        width: 80,
        height: 80,

        position: "absolute",
        top: 70,
        left: 255,
        zIndex: 1,
    },
    cardImage: {
        width: "100%",
        height: "100%"
    },
    summaryNameLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 14,

        color: colors.secondary,

        position: "absolute",
        top: 64,
        left: 16,
        zIndex: 1,
    },
    summaryName: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 16,

        color: colors.secondary,

        position: "absolute",
        top: 80,
        left: 16,
        zIndex: 1,
    },
    summaryGenderLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 14,

        color: colors.secondary,

        position: "absolute",
        top: 110,
        left: 16,
        zIndex: 1,
    },
    summaryGender: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 14,

        color: colors.secondary,

        position: "absolute",
        top: 126,
        left: 16,
        zIndex: 1,
    },
    summaryType: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 10,

        color: colors.secondary,

        position: "absolute",
        top: 164,
        left: 275,
        zIndex: 1,
    },
    summaryID: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 12,

        color: colors.secondary,

        position: "absolute",
        top: 150,
        left: 256,
        zIndex: 1,
    },
    summaryDepartment: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 18,

        color: colors.secondary,

        position: "absolute",
        top: 184,
        left: 14,
        zIndex: 1,
    },
    summaryCourse: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 14,

        color: colors.secondary,

        position: "absolute",
        top: 204,
        left: 14,
        zIndex: 1,
    }
})

export const loginStyles = StyleSheet.create({
    titleContainer: {
        backgroundColor: colors.accent,
        
        display: "flex",
        alignItems: "center",

        height: 50,

        borderRadius: 10,

        marginTop: "20%",
        marginBottom: "20%",
        paddingHorizontal: "6%",
    },
    title: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 32,

        color: colors.primary,
    },
    subtitle: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,
        fontStyle: "italic",

        alignSelf: "center",

        color: colors.secondary,

    },
    formContainer: {
        flex: 1,
        padding: 20,
      },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#fff',

        marginBottom: 16,
        paddingHorizontal: 10,

        borderWidth: 2,
        borderColor: colors.secondary,
        borderRadius: 14,

        // iOS Shadow
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    inputField: {
        fontFamily: 'Lklavika',

        backgroundColor: "white",

        width: 220,
        height: 50,

        marginVertical: 2
    },
    loginButton: {
        backgroundColor: colors.primary,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",

        width: 300,
        height: 60,

        borderRadius: 30,

        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    loginButtonLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 24,

        color: "white"
    },
    createAccountLink: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 14,
        textDecorationLine: "underline",

        color: colors.primary,
        
        alignSelf: "center",

        marginTop: "4%",
        marginBottom: "0.5%"
    },
})

export const signUpStyles = StyleSheet.create({
    formContainer: {
        height: 300,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#fff',

        borderWidth: 2,
        borderColor: colors.secondary,
        borderRadius: 14,

        marginBottom: 16,
        paddingHorizontal: 10,

        // iOS Shadow
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    inputField: {
        fontFamily: 'Lklavika',

        backgroundColor: "white",

        width: 220,
        height: 50,

        marginVertical: 2
    },
    label: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 16,

        color: colors.secondary,

        marginBottom: "0.5%"
    },
    backButton: {
        backgroundColor: colors.primary,

        alignSelf: "center",

        borderRadius: 20,

        marginRight: 30,
        paddingTop: 2,
        paddingBottom: 6,
        paddingHorizontal: 16,

        position: "absolute",
        top: 288,
        left: 22,
        zIndex: 1,

        // iOS Shadow
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    backButtonLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,

        color: "white"
    },
    signUpButton: {
        backgroundColor: colors.primary,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",

        width: 300,
        height: 60,

        borderRadius: 30,

        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    signUpButtonLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 24,

        color: "white"
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",

        height: "10%"
    },
    continueButtonLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,

        color: "white"
    },
    credentialsInputField: {
        backgroundColor: "white",

        fontFamily: 'Lklavika',

        width: 260,
        height: 44,

        borderRadius: 18,

        marginTop: 0,
        marginBottom: 6,
        paddingLeft: 20,
    },
    credentialsValidation: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 10,

        color: "white",

        marginLeft: 10
    },
    textDivider: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 16,
        color: colors.secondary,

        alignSelf: "center",

        marginTop: "8%"
    },
    signUpWithButton: {
        backgroundColor: colors.accent,

        alignSelf: "center",

        borderRadius: 8,

        marginTop: "6%",
        paddingVertical: 8,
        paddingHorizontal: 16,

        // iOS Shadow
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    title: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 32,

        color: colors.primary,
    },
    subtitle: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 16,
        fontStyle: "italic",

        color: colors.secondary,

        alignSelf: "center",
    },
    titleContainer: {
        backgroundColor: colors.accent,
        
        display: "flex",
        alignItems: "center",

        height: 50,

        borderRadius: 10,

        marginTop: "20%",
        marginBottom: "10%",
        paddingHorizontal: "6%",
    },
})

export const burgerMenuStyles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: "rgba(0,0,0,0.5)",

        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
      },
      menuContainer: {
        backgroundColor: colors.primary,

        width: "70%",
        height: "100%",

        paddingTop: "10%",
        paddingLeft: "6%",
        paddingRight: "8%",

        elevation: 5,
      },
      burgerMenuContainer: {
        backgroundColor: colors.primary,

        alignSelf: "center",

        position: "absolute",
        top: 28,
        left: 340,
        zIndex: 1,

        paddingVertical: 6,
        paddingHorizontal: 10,
      },
      burgerMenu: {
        marginLeft: 4
    },
      menuTitle: {
        color: "#0A3D91", 

        fontSize: 24,
        fontWeight: "bold",

        marginBottom: 20,
      },
      menuCloseButton: {
        marginTop: 40,
      },
      
      menuCloseText: {
          color: "gray",
        fontSize: 16,
      },
      studentPicture: {
        width: 140,
        height: 140,

        alignSelf: "center",

        borderRadius: 70,

        marginTop: "6%",
        marginBottom: "8%",
      },
      profile: {
        display: "flex",
        alignItems: "flex-end",

        marginBottom: "20%",
      },
      profileTitle: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 40,

        color: colors.white,

        alignSelf: "center",
      },
      studentName: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 24,

        color: colors.white,
      },
      studentDepartment: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,

        color: colors.white,
      },
      studentCourse: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 18,

        color: colors.white,
      },
      menuItem: {
        marginBottom: 20,
      },
      menuItemText: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 30,
        
        color: colors.accent,
      },
})