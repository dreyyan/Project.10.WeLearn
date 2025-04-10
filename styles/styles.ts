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

        marginTop: "6%",
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

export const registerStyles = StyleSheet.create({
    form: {

    },
    formContainer: {
        height: "44%",
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
        fontSize: 12,
        color: "white",

        marginLeft: 10
    }
})