import { StyleSheet } from 'react-native'
import { colors } from "./colors"

export const globalStyles = StyleSheet.create({
    screen: {
        backgroundColor: colors.accent,

        flex: 1,
        alignItems: 'center',
    },
    banner: {
        width: 394,
        height: 98,
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
})

export const privacyAndSupportStyles = StyleSheet.create({
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
        marginTop: 26,
        marginBottom: 26,
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
    container: {
        width: "90%",
        textAlign: "justify"
    },
    sectionTitle: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 24,

        color: colors.secondary,

        alignSelf: "flex-start",

        marginTop: 10,
        marginLeft: 6,
    },
    sectionText: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 14,

        color: colors.secondary,

        alignSelf: "flex-start",

        marginLeft: 6,
        marginBottom: 10
    },
})

export const settingsStyles = StyleSheet.create({
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
        marginTop: 26,
        marginBottom: 26,
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
})

export const departmentsStyles = StyleSheet.create({
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
        marginTop: 26,
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
    dropdownMenu: {
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 2,

        width: 322,
        marginTop: 28,
        alignSelf: "center"
    },
    dropdownContainer: {
        borderColor: colors.primary,

        borderWidth: 2,
        borderRadius: 8,

        width: 322,
        paddingHorizontal: 10,
        paddingVertical: 12,
        zIndex: 1000,

        position: "absolute",
        left: 35.5,
        top: 76
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
        marginLeft: 4,
        lineHeight: 22,
    },
    departmentImage: {
        width: 100,
        height: 100,

        marginTop: 20,
        marginBottom: 10,
        alignSelf: "center"
    },
    container: {
        width: "90%",
    },
    departmentAcronym: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 30,

        color: colors.secondary,

        alignSelf: "center",

        marginTop: 4,
    },
    sectionTitle: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 20,

        color: colors.secondary,

        alignSelf: "flex-start",

        marginTop: 4,
        marginLeft: 6,
    },
    sectionText: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 16,

        color: colors.secondary,

        alignSelf: "flex-start",

        marginLeft: 6,
        marginBottom: 10
    },
    courseItem: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 16,

        color: colors.secondary,

        alignSelf: "flex-start",
    }
})

export const courseOverviewStyles = StyleSheet.create({
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
        marginTop: 26,
        marginBottom: 26,
    },
    subtitle: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 32,

        color: colors.white,
    },
    dropdownMenu: {
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 2,

        width: 322,
        marginTop: 28,
        alignSelf: "center"
    },
    dropdownContainer: {
        borderColor: colors.primary,

        borderWidth: 2,
        borderRadius: 8,

        width: 322,
        paddingHorizontal: 10,
        paddingVertical: 12,
        zIndex: 1000,

        position: "absolute",
        left: 35.5,
        top: 76
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
        marginLeft: 4,
        lineHeight: 22,
    },
    courseOverviewContainer: {
        height: 500,
        width: 350,

        paddingHorizontal: 10,
        paddingTop: 20,
      },
      courseTitle: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 30,

        color: colors.secondary,
        textAlign: "center"
      },
      courseDepartment: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 26,

        color: colors.secondary,
        textAlign: "center"
      },
      subjectsHeading: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 26,

        color: colors.secondary,
        marginTop: 40,

        textAlign: "center"
      },
      subjectsList: {
        paddingLeft: 10,
      },
      subjectItem: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 18,

        color: colors.secondary,
      },
      table: {
      },
      tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: colors.primary,
        paddingVertical: 8,
        marginTop: 10,
      },
      tableRow: {
        flexDirection: 'row',
        paddingVertical: 6,
      },
      tableCell: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 18,

        color: colors.secondary,
      },
      
})

export const QRCodeStyles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    QRCode: {
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: colors.primary,
        alignItems: "center",

        marginTop: 40,
        paddingTop: 80,

        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderColor: colors.secondary,
        borderRadius: 10,

        width: 320,
        height: 400,
    },
    QRCodeFrame: {
        width: 258,
        height: 258,
        position: "absolute",

        top: 168,
        left: 68,
        zIndex: 1000,
    },
    detailsContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,

        width: 320,
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderColor: colors.secondary,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,

        marginTop: -50,
        paddingVertical: 10,
        paddingBottom: 14
    },
    QRName: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 24,
        width: "100%",
        textAlign: "center",
        color: colors.secondary
    },
    QRID: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 20,

        color: colors.secondary
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
    },
    backButton: {
        backgroundColor: colors.primary,
        alignSelf: "center",

        borderRadius: 40,
        borderWidth: 2,
        borderColor: colors.primary,

        marginTop: 80,
        paddingBottom: 6,
        paddingHorizontal: 20,

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
        fontSize: 34,

        color: colors.white
    },
})

export const editInformationStyles = StyleSheet.create({
    dropdownMenu: {
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 2,

        width: 318,
        marginTop: 28,
    },
    dropdownContainer: {
        borderColor: colors.primary,

        borderWidth: 2,
        borderRadius: 8,

        width: 318,
        marginTop: 26,
        paddingHorizontal: 10,
        paddingVertical: 12,
        zIndex: 1000
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
        lineHeight: 22,
    },
    subtitleContainer: {
        backgroundColor: colors.primary,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        width: 360,
        height: 56,

        // borderWidth: 2,
        // borderColor: colors.secondary,
        borderRadius: 0,

        paddingBottom: 2,
        marginTop: 26,
        marginBottom: 26,
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
        fontSize: 36,

        color: colors.white,
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.accent,

        width: 358,

        borderRadius: 20,

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
        fontSize: 14,

        color: colors.secondary,

        alignSelf: "flex-start",

        position: "absolute",
        top: 2,
        left: 2,
        zIndex: 1,

        marginLeft: 6,
    },
    bottomMargin: {
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

        marginTop: 20,
        marginLeft: -20
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

        marginTop: 16,
        marginBottom: 30,

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
        fontSize: 28,

        color: "white",
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#fff',

        marginTop: 20,
        marginBottom: 0,
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
        fontSize: 16,

        backgroundColor: "white",

        borderRadius: 14,

        paddingTop: 20,
        paddingLeft: 14,
        marginVertical: 2
    },
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
        marginTop: 26,
        marginBottom: 26,
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
        
        width: 358,

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
        fontSize: 18,

        color: colors.secondary,

        alignSelf: "flex-start",

        marginTop: 10,
        marginLeft: 6,
    },
    sectionLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 14,

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
        fontSize: 16,
        
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
        width: 104,
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
        fontSize: 16,
    },
    dropdownPlaceholder: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 16,

        color: colors.gray,

        marginLeft: 10,
    },
    dropdownLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 16,

        color: colors.secondary,

        marginLeft: 10,
        lineHeight: 22,
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
        fontSize: 28,

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
    bottomMargin: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

        marginTop: 20,
        marginLeft: -20
    },
    uploadFileButton: {
        backgroundColor: colors.primary,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",

        width: 180,
        height: 60,

        borderRadius: 30,

        marginTop: 20,
        marginLeft: -20,
        paddingVertical: 12,
        paddingHorizontal: 4,

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    uploadButtonLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 20,

        color: "white",
    },
    uploadedFilesContainer: {
        display: "flex",
        flexDirection: "column",

        backgroundColor: colors.white,
        borderColor: colors.secondary,
        borderRadius: 10,
        borderWidth: 2,
        height: 170,
        width: 320,

        marginTop: 20,
    },
    fileLine: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        height: 40
    },
    fileText: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 16,

        color: colors.secondary,

        marginLeft: 16,

    },
    removeButton: {
        backgroundColor: "#ea1717",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        width: 28,
        height: 28,
        borderRadius: 4,
        marginRight: 10,
        marginBottom: 4
    },
    removeText: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 16,
        fontWeight: "bold",
        color: colors.white,
    },
    applicantCertificationContainer: {
        display: "flex",

        marginRight: 20,
        paddingTop: 10,
        paddingBottom: 14
    },
    applicantCertificationLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 18,

        color: colors.secondary,
        textAlign: "justify"
    },
    applicantCertificationCheckbox: {
        width: 400,
        height: 40,
    },
    applicantCertificationCheckboxText: {
        fontFamily: 'Lklavika-Bold',

        color: colors.secondary,
        textDecorationLine: "none",

        marginLeft: -6
    },
    uploadedFilesValidation: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 14,

        color: colors.secondary,
        textAlign: "center"
    }
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
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",

        columnGap: 18,
        width: "80%",
        marginTop: 20,

    },
    QRCodeButton: {
        backgroundColor: colors.primary,
        display: "flex",
        alignSelf: "flex-start",
        alignItems: "center",
        width: 260,

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
    editInformationButton: {
        backgroundColor: colors.primary,
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-end",

        width: 42,

        marginRight: 34,
        paddingTop: 9,
        paddingVertical: 11,
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

        height: 220,
        width: 320,

        marginTop: 20,
    },
    statusLabelContainer: {
        backgroundColor: colors.primary,

        height: 58,
        width: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 2,

        marginBottom: 10,
        paddingBottom: 4
    },
    statusLabel: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 30,
        
        color: colors.white,
        marginTop: 2,
        alignSelf: "center"
    },
    statusText: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 20,
        
        color: colors.secondary,

        alignSelf: "center",
        textAlign: "center",
        marginTop: 4
    },
    statusComment: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 16,
        
        color: colors.secondary,

        alignSelf: "center",
        textAlign: "center",
    },
    enrollmentFormButton: {
        backgroundColor: colors.primary,

        alignSelf: "center",

        borderRadius: 8,

        marginTop: 16,
        marginBottom: 6,
        paddingTop: 8,
        paddingBottom: 10,
        paddingHorizontal: 20,

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
        fontSize: 20,

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
        left: 70,
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
        left: 18,
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
        fontSize: 16,

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
        lineHeight: 22,
    },
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",

        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 3,

        borderRadius: 10,

        height: 240,
        width: 330,

        marginTop: 10,
        paddingLeft: 60,
        paddingTop: 0,

        // iOS Shadow
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8
    },
    summaryBanner: {
        width: 325,
        height: 46,

        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        position: "absolute",
        top: 0,
        left: 0,
    },
    summaryNameLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 12,
        fontStyle: "italic",

        color: colors.secondary,

        position: "absolute",
        top: 58,
        left: 14,
        zIndex: 1,
    },
    summaryName: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 18,

        color: colors.secondary,

        position: "absolute",
        top: 68,
        left: 14,
        zIndex: 1,
    },
    summaryGenderLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 12,
        fontStyle: "italic",

        color: colors.secondary,

        position: "absolute",
        top: 94,
        left: 14,
        zIndex: 1,
    },
    summaryGender: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 16,

        color: colors.secondary,

        position: "absolute",
        top: 104,
        left: 14,
        zIndex: 1,
    },
    summaryTypeLabel: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 12,
        fontStyle: "italic",

        color: colors.secondary,

        position: "absolute",
        top: 130,
        left: 14,
        zIndex: 1,
    },
    summaryType: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 16,

        color: colors.secondary,

        position: "absolute",
        top: 140,
        left: 14,
        zIndex: 1,
    },
    summaryDepartment: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 18,

        color: colors.secondary,

        position: "absolute",
        top: 190,
        left: 14,
        zIndex: 1,
    },
    summaryCourse: {
        fontFamily: 'Lklavika-Medium',
        fontSize: 16,

        color: colors.secondary,

        position: "absolute",
        top: 206,
        left: 14,
        zIndex: 1,
    },
    summaryID: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 12,

        color: colors.secondary,

        position: "absolute",
        top: 142,
        left: 237,
        zIndex: 1,
    },
    imageButton: {
        width: 82,
        height: 82,

        position: "absolute",
        top: 60,
        left: 230,
        zIndex: 1,
    },
    cardImage: {
        width: 80,
        height: 80,

        borderRadius: 4,
        borderTopRightRadius: 0
    },
    summaryImageSetup: {
        width: 80,
        position: "absolute",
        top: -78,
        left: 226,
        zIndex: 1,
    },
    summaryImage: {
        width: 80,
        position: "absolute",
        top: -70,
        left: 260,
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
        fontSize: 16,

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
        paddingTop: 6,
        paddingBottom: 8,
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
        fontSize: 28,

        color: "white"
    },
    createAccountLink: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 14,
        textDecorationLine: "underline",

        color: colors.primary,
        
        alignSelf: "center",

        marginTop: "4%",
        marginBottom: "0.5%",
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
        fontSize: 16,

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
        paddingTop: 5,
        paddingBottom: 7,
        paddingHorizontal: 16,

        position: "absolute",
        top: 296,
        left: 10,
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

        marginTop: 0,
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
        fontSize: 16,

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

        marginTop: 10
    },
    signUpWithButton: {
        backgroundColor: colors.accent,

        alignSelf: "center",

        borderRadius: 8,

        marginTop: 14,
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
        top: 24,
        left: 310,
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
      studentCourse: {
        fontFamily: 'Lklavika-Bold',
        fontSize: 18,

        color: colors.white,
        marginTop: -6,
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