import Theme from "@/constants/theme";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";

export default function ProfileScreen() {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const [aboutVisible, setAboutVisible] = useState(false);
	// Placeholder user data
	const userData = {
		name: "",
		email: "",
		joinDate: "",
		totalTrades: 0,
		successRate: "",
		favoriteStrategy: "",
		riskLevel: "",
		accountType: "",
	};

	const settingsOptions = [
		{ title: t("profile.accountSettings"), icon: <Ionicons name='settings-outline' size={22} color='#fff' /> },
		{ title: t("profile.notificationPreferences"), icon: <Ionicons name='notifications-outline' size={22} color='#fff' /> },
		{ title: t("profile.securitySettings"), icon: <Ionicons name='lock-closed-outline' size={22} color='#fff' /> },
		{ title: t("profile.helpSupport"), icon: <Ionicons name='help-circle-outline' size={22} color='#fff' /> },
		{ title: t("profile.aboutQompyl"), icon: <MaterialCommunityIcons name='information-outline' size={22} color='#fff' /> },
	];

	return (
		<LinearGradient colors={Theme.dark.colorsDark.gradient as [string, string, string]} style={styles.mainContainer}>
			{/* <View style={styles.headerRow}>
				<TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
					<Ionicons name='chevron-back' size={28} color='#fff' />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>{t("profile.title")}</Text>
				<TouchableOpacity onPress={() => navigation.navigate("StrategyGrid" as never)} style={styles.headerBtn}>
					<Ionicons name='home-outline' size={28} color='#fff' />
				</TouchableOpacity>
			</View> */}
			<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
				{/* Profile Info */}
				<View style={styles.profileSection}>
					<View style={styles.profileImageContainer}>
						<FontAwesome5 name='user-circle' size={48} color='#274472' />
					</View>
					<Text style={styles.userName}>{userData.name || t("profile.noName")}</Text>
					<Text style={styles.userEmail}>{userData.email || t("profile.noEmail")}</Text>
					<View style={styles.memberSinceContainer}>
						<Text style={styles.memberSince}>
							{t("profile.memberSince")} {userData.joinDate || "-"}
						</Text>
					</View>
				</View>

				{/* Stats Section */}
				<View style={styles.statsContainer}>
					<View style={styles.statItem}>
						<Text style={styles.statValue}>{userData.totalTrades}</Text>
						<Text style={styles.statLabel}>{t("profile.totalTrades")}</Text>
					</View>
					<View style={styles.statDivider} />
					<View style={styles.statItem}>
						<Text style={styles.statValue}>{userData.successRate || "-"}</Text>
						<Text style={styles.statLabel}>{t("profile.successRate")}</Text>
					</View>
					<View style={styles.statDivider} />
					<View style={styles.statItem}>
						<Text style={styles.statValue}>{userData.accountType || "-"}</Text>
						<Text style={styles.statLabel}>{t("profile.accountType")}</Text>
					</View>
				</View>

				{/* Trading Preferences */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>{t("profile.tradingPreferences")}</Text>
					<View style={styles.preferenceItem}>
						<Text style={styles.preferenceLabel}>{t("profile.favoriteStrategy")}</Text>
						<Text style={styles.preferenceValue}>{userData.favoriteStrategy || "-"}</Text>
					</View>
					<View style={styles.preferenceItem}>
						<Text style={styles.preferenceLabel}>{t("profile.riskLevel")}</Text>
						<Text style={styles.preferenceValue}>{userData.riskLevel || "-"}</Text>
					</View>
				</View>

				{/* Settings Section */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>{t("profile.settings")}</Text>
					<TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate("Settings" as never)}>
						<Ionicons name='language-outline' size={22} color='#fff' style={{ marginRight: 16 }} />
						<Text style={styles.settingText}>{t("onboarding.language")}</Text>
					</TouchableOpacity>
					{settingsOptions.map((option, index) => (
						<TouchableOpacity
							key={index}
							style={styles.settingItem}
							onPress={() => {
								if (option.title === t("profile.aboutQompyl")) {
									setAboutVisible(true);
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

			{/* About Qompyl Modal */}
			<Modal visible={aboutVisible} transparent animationType='fade'>
				<BlurView intensity={60} style={StyleSheet.absoluteFill} tint='dark' />
				<View style={styles.aboutCentered}>
					<View style={styles.aboutCard}>
						<TouchableOpacity style={styles.aboutCloseBtn} onPress={() => setAboutVisible(false)}>
							<Ionicons name='close' size={26} color='#fff' />
						</TouchableOpacity>
						<Text style={styles.aboutTitle}>About Qompyl</Text>
						<ScrollView
							style={styles.aboutScroll}
							contentContainerStyle={{ paddingBottom: 8 }}
							showsVerticalScrollIndicator={false}>
							<Text style={styles.aboutParagraph}>
								Qompyl was born from our founder Tyler Charton’s realization that strategy tools were built for institutions — not
								people. After years immersed in markets, Tyler saw how existing platforms felt more like math worksheets than
								decision tools. They ignored risk management, psychology, and real-world usability.
							</Text>
							<Text style={styles.aboutParagraph}>
								At the same time, he noticed how institutional influence and information asymmetries moved markets, leaving
								everyday traders reacting too late. Tyler believed there had to be a better way.
							</Text>
							<Text style={styles.aboutParagraph}>
								Qompyl is that way: an intuitive, code-free platform that turns ideas into executable strategies, tests them
								against real data, and helps users trade with clarity and confidence.
							</Text>
						</ScrollView>
						<Text style={styles.aboutFooter}>©2025 MythLabs</Text>
					</View>
				</View>
			</Modal>
		</LinearGradient>
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
		paddingTop: 40,
		paddingHorizontal: 10,
		backgroundColor: "transparent",
		marginBottom: 0,
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
		marginBottom: 90,
		marginTop: 15,
	},
	profileSection: {
		alignItems: "center",
		paddingVertical: 24,
		backgroundColor: "#274472",
		borderRadius: 24,
		marginHorizontal: 20,
		marginBottom: 20,
	},
	profileImageContainer: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
		overflow: "hidden",
	},
	userName: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 4,
	},
	userEmail: {
		fontSize: 14,
		color: "#fff",
		marginBottom: 8,
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
