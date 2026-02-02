import { ThemedText } from "@/components/themed-text";
import { FontSizes, Spacing } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function IndexScreen() {
	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (isLoading) return;
		if (user) {
			router.replace("/(tabs)");
		} else {
			router.replace("/(auth)/login" as any);
		}
	}, [user, isLoading]);

	return (
		<View style={styles.container}>
			<ThemedText style={styles.logo}>✈️ PokVoyage</ThemedText>
			<ActivityIndicator size='large' style={styles.spinner} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
	logo: { fontSize: FontSizes.xxl, fontWeight: "bold", marginBottom: Spacing.xl },
	spinner: { marginTop: Spacing.md },
});
