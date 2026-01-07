import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";

interface LoadingProps {
	message?: string;
	size?: "small" | "large";
}

const Loading: React.FC<LoadingProps> = ({ message, size = "large" }) => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={size} color={COLORS.primary} />
			{message && <Text style={styles.message}>{message}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: SPACING.xl,
	},
	message: {
		marginTop: SPACING.md,
		fontSize: FONT_SIZES.md,
		color: COLORS.textSecondary,
		textAlign: "center",
	},
});

export default Loading;
