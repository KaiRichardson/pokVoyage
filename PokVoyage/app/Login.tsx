import Theme from "@/constants/theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Dimensions,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

const { width } = Dimensions.get("window");

interface LoginScreenProps {
	onSkip: () => void;
	onLogin: () => void;
	onSignUp: boolean;
}

export default function LoginScreen({ onSkip, onLogin, onSignUp }: LoginScreenProps) {
	const { t } = useTranslation();
	const [tab, setTab] = useState(onSignUp ? "login" : "signup");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	// --- Validation logic omitted for brevity, add as needed ---

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<LinearGradient colors={Theme.dark.colorsDark.gradient as [string, string, string]} style={styles.container}>
				<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidView}>
					{/* demo notice (to be removed in production) */}
					<View style={styles.demoNote}>
						<Text style={styles.demoNoteText}>This is a visual demo only. No actual authentication occurs.</Text>
					</View>
					<View style={styles.headerContainer}>
						<Text style={styles.welcomeText}>{tab === "login" ? t("login.title") : t("signup.title")}</Text>
						<Text style={styles.subtitleText}>{tab === "login" ? t("login.subtitle") : t("signup.subtitle")}</Text>
					</View>

					<View style={styles.formContainer}>
						{/* Tabs */}
						<View style={styles.tabContainer}>
							<TouchableOpacity style={[styles.tab, tab === "login" && styles.tabActive]} onPress={() => setTab("login")}>
								<Text style={[styles.tabText, tab === "login" && styles.tabTextActive]}>{t("login.title")}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.tab, tab === "signup" && styles.tabActive]} onPress={() => setTab("signup")}>
								<Text style={[styles.tabText, tab === "signup" && styles.tabTextActive]}>{t("signup.title")}</Text>
							</TouchableOpacity>
						</View>

						{/* Name Input (Signup) */}
						{tab === "signup" && (
							<TextInput
								style={styles.input}
								placeholder={t("signup.name")}
								placeholderTextColor='#a3cef1'
								value={name}
								onChangeText={setName}
								autoCapitalize='words'
							/>
						)}

						{/* Email Input */}
						<TextInput
							style={styles.input}
							placeholder={t("login.email")}
							placeholderTextColor='#a3cef1'
							value={email}
							onChangeText={setEmail}
							autoCapitalize='none'
							keyboardType='email-address'
						/>

						{/* Password Input */}
						<TextInput
							style={styles.input}
							placeholder={t("login.password")}
							placeholderTextColor='#a3cef1'
							value={password}
							onChangeText={setPassword}
							secureTextEntry
						/>

						{/* Confirm Password Input (Signup) */}
						{tab === "signup" && (
							<TextInput
								style={styles.input}
								placeholder={t("signup.confirmPassword")}
								placeholderTextColor='#a3cef1'
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								secureTextEntry
							/>
						)}

						{/* Error Logging (Remove before production)*/}
						{error ? <Text style={styles.error}>{error}</Text> : null}

						{/* Submission Button */}
						<TouchableOpacity style={styles.button} onPress={onLogin}>
							<Text style={styles.buttonText}>{tab === "login" ? t("login.submit") : t("signup.submit")}</Text>
						</TouchableOpacity>

						{/* Social Login Buttons - Vertical, styled */}
						<View style={styles.socialContainer}>
							<TouchableOpacity style={styles.googleButton}>
								<FontAwesome name='google' size={20} color='#EA4335' style={{ marginRight: 8 }} />
								<Text style={styles.googleText}>{t("login.google")}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.appleButton}>
								<Ionicons name='logo-apple' size={22} color='#fff' style={{ marginRight: 8 }} />
								<Text style={styles.appleText}>{t("login.apple")}</Text>
							</TouchableOpacity>
						</View>
					</View>

					{/* Skip for now text at bottom */}
					{/* <TouchableOpacity style={styles.skipContainer} onPress={onSkip}>
						<Text style={styles.skipText}>{t("login.skipForNow")}</Text>
					</TouchableOpacity> */}
				</KeyboardAvoidingView>
			</LinearGradient>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	keyboardAvoidView: {
		flex: 1,
	},
	demoNote: {
		backgroundColor: "rgba(73, 57, 11, 1)",
		height: 50,
		position: "absolute",
		top: 0,
		width: "100%",
		zIndex: 1000,
	},
	demoNoteText: {
		color: "#FFD700",
		fontSize: 12,
		textAlign: "center",
		fontWeight: "bold",
		paddingTop: 30,
		paddingHorizontal: 10,
	},
	headerContainer: {
		marginTop: 60,
		marginBottom: 10,
		alignItems: "center",
	},
	welcomeText: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 8,
	},
	subtitleText: {
		fontSize: 16,
		color: "#a3cef1",
		opacity: 0.7,
		marginBottom: 8,
	},
	formContainer: {
		alignItems: "center",
		width: "100%",
		marginTop: 10,
	},
	tabContainer: {
		flexDirection: "row",
		marginBottom: 20,
		backgroundColor: "#274472",
		borderRadius: 12,
		width: width - 48,
		alignSelf: "center",
	},
	tab: {
		flex: 1,
		paddingVertical: 12,
		alignItems: "center",
		borderRadius: 12,
	},
	tabActive: {
		backgroundColor: "#41729f",
	},
	tabText: {
		color: "#a3cef1",
		fontWeight: "bold",
		fontSize: 16,
	},
	tabTextActive: {
		color: "#fff",
	},
	input: {
		width: width - 48,
		backgroundColor: "#1a2c3d",
		color: "#fff",
		borderRadius: 8,
		padding: 14,
		marginBottom: 14,
	},
	button: {
		backgroundColor: "#41729f",
		paddingHorizontal: 32,
		paddingVertical: 14,
		borderRadius: 24,
		marginTop: 8,
		width: width - 48,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	error: {
		color: "#ffb3b3",
		marginBottom: 8,
	},
	socialContainer: {
		width: width - 48,
		marginTop: 18,
	},
	googleButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 20,
		justifyContent: "center",
		marginBottom: 12,
	},
	googleText: {
		color: "#222",
		fontWeight: "bold",
		fontSize: 16,
	},
	appleButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#111",
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 20,
		justifyContent: "center",
		marginBottom: 12,
	},
	appleText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
	skipContainer: {
		position: "absolute",
		bottom: 40,
		width: "100%",
		alignItems: "center",
	},
	skipText: {
		color: "#a3cef1",
		fontSize: 16,
		textDecorationLine: "underline",
	},
});
