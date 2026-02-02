import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

export default function ModalScreen() {
	return (
		<ThemedView style={styles.container}>
			<ThemedText type='title'>This is a modal</ThemedText>
			<Link href='/' dismissTo asChild>
				<Pressable style={styles.link}>
					<ThemedText type='link'>Go to home screen</ThemedText>
				</Pressable>
			</Link>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: Spacing.lg,
	},
	link: {
		marginTop: Spacing.sm + 3,
		paddingVertical: Spacing.sm + 3,
	},
});
