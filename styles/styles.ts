import { StyleSheet, Text, View } from 'react-native'
import { colors } from "./colors"
import React from 'react'

export const globalStyles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    title: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 80,
        color: "white",

        marginTop: "8%"
    },
    subtitle: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 44,
        color: "white",

        marginTop: "4%",
        marginBottom: "6%"
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
    button: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 34,
        fontWeight: "bold",

        color: colors.white,
        backgroundColor: colors.primary,

        alignSelf: "center",
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
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
        marginBottom: 10,
        paddingLeft: 20,

        borderRadius: 18
    }
})

export const registerStyles = StyleSheet.create({
    form: {
        // borderWidth: 2,
    },
    formContainer: {
        height: "60%"
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
    continueButtonLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,
        color: "white"
    }
})