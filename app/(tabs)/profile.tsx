import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BorderRadius, Colors, FontSizes, Layout, Spacing } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { router } from "expo-router";
import { useMemo } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
	const { user, logout } = useAuth();
	const colorScheme = useColorScheme() ?? "light";
	const c = Colors[colorScheme];
	const themedStyles = useMemo(
		() =>
			StyleSheet.create({
				card: { ...staticStyles.card, backgroundColor: c.card },
				logoutBtn: { ...staticStyles.logoutBtn, borderColor: c.tint },
				logoutText: { ...staticStyles.logoutText, color: c.tint },
			}),
		[c.card, c.tint]
	);

	function handleLogout() {
		Alert.alert("Log out", "Are you sure you want to log out?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Log out",
				style: "destructive",
				onPress: async () => {
					await logout();
					router.replace("/(auth)/login" as any);
				},
			},
		]);
	}

	return (
		<ThemedView style={staticStyles.container}>
			<View style={staticStyles.header}>
				<ThemedText type='title'>Profile</ThemedText>
			</View>
			<View style={themedStyles.card}>
				<View style={staticStyles.avatar}>
					<ThemedText style={staticStyles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || "?"}</ThemedText>
				</View>
				<ThemedText type='defaultSemiBold' style={staticStyles.name}>
					{user?.name}
				</ThemedText>
				<ThemedText style={staticStyles.email}>{user?.email}</ThemedText>
			</View>
			<TouchableOpacity style={themedStyles.logoutBtn} onPress={handleLogout}>
				<ThemedText style={themedStyles.logoutText}>Log Out</ThemedText>
			</TouchableOpacity>
		</ThemedView>
	);
}

const staticStyles = StyleSheet.create({
	container: { flex: 1, paddingTop: Spacing.headerTop, paddingHorizontal: Spacing.lg },
	header: { marginBottom: Spacing.xl },
	card: {
		borderRadius: BorderRadius.xl,
		padding: Spacing.xl,
		alignItems: "center",
		marginBottom: Spacing.xl,
	},
	avatar: {
		width: Layout.avatarSize,
		height: Layout.avatarSize,
		borderRadius: Layout.avatarSize / 2,
		backgroundColor: Colors.light.gradientStart,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: Spacing.md,
	},
	avatarText: { fontSize: FontSizes.xxl, color: Colors.light.white, fontWeight: "bold" },
	name: { fontSize: FontSizes.xl, marginBottom: Spacing.xxs },
	email: { fontSize: FontSizes.sm, opacity: 0.7 },
	logoutBtn: {
		borderWidth: 2,
		paddingVertical: Spacing.sm + 2,
		borderRadius: BorderRadius.lg,
		alignItems: "center",
	},
	logoutText: { fontWeight: "600", fontSize: FontSizes.md },
});
