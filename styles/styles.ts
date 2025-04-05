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
        marginBottom: "8%"
    },
    label: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,
        color: "white",

        marginTop: "4%",
        marginBottom: "0.5%",
        marginRight: 160
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