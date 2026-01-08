import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

// import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DrawerItems({ navigation }: DrawerContentComponentProps) {
	const { t } = useTranslation();
	// const navigation = useNavigation();

	// Placeholder user data
	const userData = {
		name: "Kai Richardson",
		email: "kai.richardson@pokvoyage.com",
	};

	const settingsOptions = [
		{ title: t("profile.accountSettings"), icon: <Ionicons name='settings-outline' size={22} color='#fff' /> },
		{ title: t("profile.notificationPreferences"), icon: <Ionicons name='notifications-outline' size={22} color='#fff' /> },
		{ title: t("profile.securitySettings"), icon: <Ionicons name='lock-closed-outline' size={22} color='#fff' /> },
		{ title: t("profile.helpSupport"), icon: <Ionicons name='help-circle-outline' size={22} color='#fff' /> },
		{ title: t("profile.aboutPokVoyage"), icon: <MaterialCommunityIcons name='information-outline' size={22} color='#fff' /> },
	];

	return (
		<>
			<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
				{/* Drawer Header */}
				<View style={styles.headerRow}>
					<TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
						<Ionicons name='close-outline' size={25} color='#fff' />
					</TouchableOpacity>
					{/* <Text style={styles.headerTitle}>{t("profile.title")}</Text> */}
					<TouchableOpacity onPress={() => navigation.navigate("(tabs)", { screen: "HomeTest" })} style={styles.headerBtn}>
						<Ionicons name='help-circle-outline' size={28} color='#fff' />
					</TouchableOpacity>
				</View>

				{/* Profile Info */}
				<TouchableOpacity onPress={() => navigation.navigate("(tabs)", { screen: "Profile" })} style={styles.profileSection}>
					<Ionicons style={styles.profileImage} name='person-circle-outline' />
					<View style={styles.profileTextContainer}>
						<Text style={styles.userName}>{userData.name || t("profile.noName")}</Text>
						{/* <Text style={styles.userEmail}>{userData.email || t("profile.noEmail")}</Text> */}
						<Text style={styles.userEmail}>{"Account & settings"}</Text>
					</View>
					<Ionicons style={styles.profileArrow} name='arrow-forward-outline' />
				</TouchableOpacity>

				{/* Settings Section */}
				{/* <View style={styles.section}></View> */}

				{/* Settings Section */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>{t("profile.settings")}</Text>
					<TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate("Settings")}>
						<Ionicons name='language-outline' size={22} color='#fff' style={{ marginRight: 16 }} />
						<Text style={styles.settingText}>{t("onboarding.language")}</Text>
					</TouchableOpacity>
					{settingsOptions.map((option, index) => (
						<TouchableOpacity
							key={index}
							style={styles.settingItem}
							onPress={() => {
								if (option.title === t("profile.aboutPokVoyage")) {
									// setAboutVisible(true);
								}
							}}>
							{option.icon}
							<Text style={styles.settingText}>{option.title}</Text>
						</TouchableOpacity>
					))}
				</View>

				{/* Logout Button */}
				<TouchableOpacity style={styles.logoutButton}>
					<Text style={styles.logoutText}>{t("profile.logout")}</Text>
				</TouchableOpacity>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "transparent",
	},
	headerBtn: {
		padding: 8,
	},
	headerTitle: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		flex: 1,
	},
	container: {
		flex: 1,
		// marginBottom: 90,
		// marginTop: 15,
	},
	profileSection: {
		// flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		// backgroundColor: "#274472",
		// borderRadius: 24,
		marginHorizontal: 10,
		marginBottom: 20,
	},
	// profileImageContainer: {
	// 	flex: 1,
	// 	// width: 75,
	// 	// height: 75,
	// 	// borderRadius: 50,
	// 	// backgroundColor: "#fff",
	// 	// justifyContent: "center",
	// 	alignItems: "flex-start",
	// 	// marginBottom: 16,
	// 	// overflow: "hidden",
	// },
	profileImage: {
		fontSize: 70,
		color: "#fff",
		// flex: 1,
		// padding: 0,
		// backgroundColor: "grey",

		// alignItems: "flex-start",
	},
	profileArrow: {
		fontSize: 24,
		color: "#fff",
		// flex: 1,
		// alignItems: "flex-end",
		// backgroundColor: "grey",
		// justifyContent: "center",
	},
	profileTextContainer: {
		// left: 1,
		// justifyContent: "center",
		// alignItems: "center",
		// marginBottom: 16,
		// overflow: "hidden",
	},
	// profileArrowContainer: {
	// 	flex: 1,
	// 	// justifyContent: "right",
	// 	alignItems: "flex-end",
	// 	// marginBottom: 16,
	// 	// overflow: "hidden",
	// },
	userName: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 4,
	},
	userEmail: {
		fontSize: 14,
		color: "#9b9b9bff",
		// marginBottom: 4,
	},
	profileText: {
		fontSize: 16,
	},
	memberSinceContainer: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 16,
	},
	memberSince: {
		fontSize: 14,
		color: "#fff",
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 24,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		borderRadius: 24,
		marginHorizontal: 20,
		marginBottom: 20,
	},
	statItem: {
		alignItems: "center",
	},
	statValue: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 4,
	},
	statLabel: {
		fontSize: 14,
		color: "#fff",
		opacity: 0.7,
	},
	statDivider: {
		width: 1,
		height: "100%",
		backgroundColor: "rgba(255, 255, 255, 0.3)",
	},
	section: {
		marginHorizontal: 20,
		marginBottom: 20,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		borderRadius: 24,
		padding: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 16,
	},
	preferenceItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(255, 255, 255, 0.2)",
	},
	preferenceLabel: {
		fontSize: 14,
		color: "#fff",
		opacity: 0.7,
	},
	preferenceValue: {
		fontSize: 14,
		color: "#fff",
		fontWeight: "bold",
	},
	settingItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(255, 255, 255, 0.2)",
	},
	settingText: {
		fontSize: 14,
		color: "#fff",
	},
	logoutButton: {
		marginVertical: 20,
		marginHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: "#41729f",
		borderRadius: 24,
		alignItems: "center",
	},
	logoutText: {
		fontSize: 14,
		color: "#fff",
		fontWeight: "bold",
	},
	aboutCentered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	aboutCard: {
		backgroundColor: "#101a2b",
		borderRadius: 20,
		padding: 24,
		width: "90%",
		maxWidth: 420,
		maxHeight: 500,
		alignItems: "center",
		position: "relative",
	},
	aboutCloseBtn: {
		position: "absolute",
		top: 10,
		right: 10,
		padding: 4,
	},
	aboutTitle: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
	},
	aboutScroll: {
		width: "100%",
	},
	aboutParagraph: {
		color: "#dbe9ff",
		fontSize: 14,
		lineHeight: 20,
		marginBottom: 12,
		textAlign: "left",
	},
	aboutFooter: {
		color: "#dbe9ff",
		fontSize: 12,
		opacity: 0.7,
		marginTop: 16,
		textAlign: "center",
	},
});
