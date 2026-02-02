import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BorderRadius, Colors, FontSizes, Layout, Spacing } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, type Href } from "expo-router";
import { useMemo, useState } from "react";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function SignupScreen() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { signup } = useAuth();
	const colorScheme = useColorScheme() ?? "light";
	const c = Colors[colorScheme];
	const themedStyles = useMemo(
		() =>
			StyleSheet.create({
				input: {
					...staticStyles.input,
					backgroundColor: c.input,
					color: c.text,
				},
			}),
		[c.input, c.text]
	);

	async function handleSignup() {
		if (!name.trim() || !email.trim() || !password) {
			setError("Please fill in all fields");
			return;
		}
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}
		if (password.length < 6) {
			setError("Password must be at least 6 characters");
			return;
		}
		setError("");
		setLoading(true);
		const result = await signup(email.trim(), password, name.trim());
		setLoading(false);
		if (result.success) {
			router.replace("/(tabs)");
		} else {
			setError(result.error || "Signup failed");
		}
	}

	return (
		<ThemedView style={staticStyles.container}>
			<LinearGradient
				colors={colorScheme === "dark" ? [c.gradientDarkStart, c.gradientDarkEnd] : [c.gradientStart, c.gradientEnd]}
				style={staticStyles.gradientFill}
			/>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={staticStyles.keyboard}>
				<ScrollView contentContainerStyle={staticStyles.scroll} keyboardShouldPersistTaps='handled'>
					<ThemedText style={staticStyles.logo}>✈️ PokVoyage</ThemedText>
					<ThemedText style={staticStyles.subtitle}>Create your account</ThemedText>

					<View style={staticStyles.form}>
						<TextInput
							style={themedStyles.input}
							placeholder='Full Name'
							placeholderTextColor={c.placeholder}
							value={name}
							onChangeText={setName}
						/>
						<TextInput
							style={themedStyles.input}
							placeholder='Email'
							placeholderTextColor={c.placeholder}
							value={email}
							onChangeText={setEmail}
							keyboardType='email-address'
							autoCapitalize='none'
							autoCorrect={false}
						/>
						<TextInput
							style={themedStyles.input}
							placeholder='Password'
							placeholderTextColor={c.placeholder}
							value={password}
							onChangeText={setPassword}
							secureTextEntry
						/>
						<TextInput
							style={themedStyles.input}
							placeholder='Confirm Password'
							placeholderTextColor={c.placeholder}
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							secureTextEntry
						/>
						{error ? <ThemedText style={staticStyles.error}>{error}</ThemedText> : null}
						<TouchableOpacity style={staticStyles.btn} onPress={handleSignup} disabled={loading}>
							{loading ? (
								<ActivityIndicator color={Colors.light.white} />
							) : (
								<ThemedText style={staticStyles.btnText}>Sign Up</ThemedText>
							)}
						</TouchableOpacity>
						<Link href={"/(auth)/login" as Href} asChild>
							<TouchableOpacity style={staticStyles.linkBtn}>
								<ThemedText style={staticStyles.linkText}>
									Already have an account? <ThemedText style={staticStyles.linkHighlight}>Log in</ThemedText>
								</ThemedText>
							</TouchableOpacity>
						</Link>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</ThemedView>
	);
}

const staticStyles = StyleSheet.create({
	container: { flex: 1 },
	gradientFill: { position: "absolute" as const, left: 0, right: 0, top: 0, bottom: 0 },
	keyboard: { flex: 1 },
	scroll: { flexGrow: 1, justifyContent: "center", padding: Spacing.xl, paddingTop: Spacing.headerTop },
	logo: {
		fontSize: FontSizes.xxxl,
		fontWeight: "bold",
		textAlign: "center",
		color: Colors.light.white,
		marginBottom: Spacing.xs,
	},
	subtitle: { fontSize: FontSizes.md, textAlign: "center", color: Colors.light.whiteMuted, marginBottom: Spacing.xxxl },
	form: { gap: Spacing.sm },
	input: {
		height: Layout.inputHeight,
		borderRadius: BorderRadius.lg,
		paddingHorizontal: Spacing.md,
		fontSize: FontSizes.md,
	},
	error: { color: Colors.light.error, fontSize: FontSizes.sm },
	btn: {
		height: Layout.inputHeight,
		borderRadius: BorderRadius.lg,
		backgroundColor: Colors.light.white,
		justifyContent: "center",
		alignItems: "center",
		marginTop: Spacing.xs,
	},
	btnText: { color: Colors.light.gradientEnd, fontSize: FontSizes.lg, fontWeight: "600" },
	linkBtn: { marginTop: Spacing.md, alignItems: "center" },
	linkText: { color: Colors.light.whiteMuted },
	linkHighlight: { color: Colors.light.white, fontWeight: "600" },
});
