import { StyleSheet, Text, View } from 'react-native'
import { colors } from "./colors"
import React from 'react'

export const globalStyles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    div: {
        flex: 1
    },
    // titleContainer: {
    //     backgroundColor: colors.primary,

    //     width: "100%",
    //     alignItems: 'center'
    // },
    title: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 80,
        color: "white",

        marginTop: "2%",
        marginBottom: "10%"
    },
    // subtitleContainer: {
    //     backgroundColor: colors.primary,

    //     width: "100%",
    //     alignItems: 'center',
    // },
    subtitle: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 38,
        color: "white",

        marginTop: "4%",
        marginBottom: "4%"
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
    sliderValue: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,
        color: "white",

        alignSelf: "center"
    },
    backButton: {
        backgroundColor: colors.primary,

        alignSelf: "center",
        marginRight: 30,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,

        // iOS Shadow
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    continueButton: {
        backgroundColor: colors.primary,

        alignSelf: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    }
})

export const loginStyles = StyleSheet.create({
    inputField: {
        backgroundColor: "white",

        fontFamily: 'Lklavika',

        width: 260,
        height: 44,

        marginTop: 0,
        marginBottom: 6,
        paddingLeft: 20,

        borderRadius: 18
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",

        height: "20%"
    },
    loginButtonLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,
        color: "white"
    },
    noAccountLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 14,
        color: "white",

        marginBottom: "0.5%",
    },
    signUpLink: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 14,
        color: "white",

        textDecorationLine: "underline",

        marginTop: "3%",
        marginBottom: "0.5%"
    },
    usernameLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,
        color: "white",

        marginTop: "1.8%",
        marginBottom: "0.5%"
    },
})

export const signUpStyles = StyleSheet.create({
    form: {

    },
    formContainer: {
        height: "63%",
        width: "61.4%"
    },
    inputField: {
        backgroundColor: "white",

        fontFamily: 'Lklavika',

        width: 260,
        height: 44,

        marginTop: 0,
        marginBottom: 10,
        paddingLeft: 20,

        borderRadius: 18
    },
    inputFieldMiddleInitial: {
        backgroundColor: "#bfbfbf",

        fontFamily: 'Lklavika',

        width: 260,
        height: 44,

        marginTop: 0,
        marginBottom: 10,
        paddingLeft: 20,

        borderRadius: 18
    },
    ageLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,
        color: "white",

        marginTop: "6%"
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",

        height: "16%"
    },
    backButtonLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,
        color: "white"
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

        marginTop: 0,
        marginBottom: 6,
        paddingLeft: 20,

        borderRadius: 18
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
        color: "white",

        alignSelf: "center",

        marginTop: "16%"
    },
    signUpWithButton: {
        backgroundColor: colors.accent,

        alignSelf: "center",
        marginTop: "6%",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,

        // iOS Shadow
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    }
})

export const dashboardStyles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.accent,
    },
    titleContainer: {
        backgroundColor: colors.primary,
        display: "flex",
        flexDirection: "row",

        justifyContent: "space-evenly",

        width: "100%",
        height: "10%",
        alignItems: 'center',
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

        paddingLeft: "4%",
        marginVertical: "6%",
        borderRadius: 20,

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

        paddingRight: "2%",
    },
    studentInformationSecondColumn: {
        alignItems: "flex-start"
    },
    studentInformationFirstColumnLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 20,
        color: colors.text
    },
    studentInformationSecondColumnLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 18,

        paddingTop: "1.1%",
        color: colors.text
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
        color: colors.text,

        textAlign: "center",

        marginTop: "6%",
        marginBottom: "4%"
    },
    studentPicture: {
        width: 140,
        height: 140,

        marginTop: "6%",
        alignSelf: 'center',
        borderRadius: 70
    },
    methodButton: {
        backgroundColor: colors.primary,

        alignSelf: "center",

        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: "2%",

        borderRadius: 8,

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
    burgerMenu: {
        marginLeft: "16%"
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
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      },
      
      menuContainer: {
        width: "70%",
        height: "100%",
        backgroundColor: "#fff",
        paddingTop: 60,
        paddingHorizontal: 20,
        elevation: 5,
      },
      
      menuTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#0A3D91",
      },
      
      menuItem: {
        marginBottom: 20,
      },
      
      menuItemText: {
        fontSize: 18,
        color: "#0A3D91",
      },
      
      menuCloseButton: {
        marginTop: 40,
      },
      
      menuCloseText: {
        fontSize: 16,
        color: "gray",
      },      
})