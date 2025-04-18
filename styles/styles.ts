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
    // checkbox: {
    //     fontFamily: "Lklavika-Medium",
    //     color: "white"
    // },
    // sliderValue: {
    //     fontFamily: 'Lklavika-Medium',
    //     fontSize: 20,
    //     color: "white",

    //     alignSelf: "center"
    // },
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

        color: colors.primary,

        marginLeft: 10,
    },
    dropdownLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,

        color: colors.secondary,

        marginTop: 2,
        marginLeft: 10,
        lineHeight: 22,
    },
    summaryContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",

        height: 200,
        width: 400,

        marginTop: 80,
        paddingLeft: 10,
    },
    firstColumnLabel: {
        display: "flex",
        alignItems: "flex-end",

    },
    secondColumnLabel: {
        display: "flex",
        alignItems: "flex-start",

        width: 260
    },
    firstColumnText: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 18,

        color: colors.secondary,
    },
    secondColumnText: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 18,

        color: colors.primary,
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
        height: 300
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

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    title: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 40,

        color: "white"
    },
    subtitle: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 50,

        color: colors.white,
    },
    studentInformationContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.accent,

        width: "84%",
        height: "24%",

        borderRadius: 20,

        marginVertical: "6%",
        paddingLeft: "4%",

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    studentInformationFirstColumn: {
        alignItems: "flex-end",
        
        paddingLeft: "4%",
        paddingRight: "2%",
    },
    studentInformationSecondColumn: {
        flex: 1,
        alignItems: "flex-start",
    },
    studentInformationFirstColumnLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 18,
        lineHeight: 22,

        color: colors.secondary,
    },
    studentInformationSecondColumnLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 18,
        lineHeight: 22,

        color: colors.secondary,
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
    editInformationButton: {
        backgroundColor: colors.primary,

        alignSelf: "center",

        marginBottom: "4%",
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    editInformationButtonLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,

        color: "white"
    },
    idRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    copyContainer: {
        color: colors.primary,

        marginLeft: "4%",
        marginTop: "4%"
    }
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
      studentSection: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,

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