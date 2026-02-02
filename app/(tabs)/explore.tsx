import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BorderRadius, Colors, FontSizes, Layout, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

const DESTINATIONS = [
	{ id: "1", name: "Paris", country: "France", emoji: "🗼" },
	{ id: "2", name: "Tokyo", country: "Japan", emoji: "🗼" },
	{ id: "3", name: "Barcelona", country: "Spain", emoji: "🏛️" },
	{ id: "4", name: "New York", country: "USA", emoji: "🗽" },
	{ id: "5", name: "Rome", country: "Italy", emoji: "🏛️" },
	{ id: "6", name: "Sydney", country: "Australia", emoji: "🏜️" },
	{ id: "7", name: "London", country: "UK", emoji: "🏰" },
	{ id: "8", name: "Dubai", country: "UAE", emoji: "🏙️" },
];

export default function ExploreScreen() {
	const { colors } = useTheme();

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<ThemedText type='title'>Explore</ThemedText>
				<ThemedText style={styles.subtitle}>Discover your next destination</ThemedText>
			</View>

			<FlatList
				data={DESTINATIONS}
				numColumns={2}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.grid}
				columnWrapperStyle={styles.row}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.card} onPress={() => router.push("/new-trip" as any)} activeOpacity={0.8}>
						<LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.cardGradient}>
							<ThemedText style={styles.cardEmoji}>{item.emoji}</ThemedText>
							<ThemedText style={styles.cardName}>{item.name}</ThemedText>
							<ThemedText style={styles.cardCountry}>{item.country}</ThemedText>
						</LinearGradient>
					</TouchableOpacity>
				)}
			/>
		</ThemedView>
	);
}

const { width } = Dimensions.get("window");
const cardWidth = (width - Spacing.xl - Spacing.md * 2) / 2;

const styles = StyleSheet.create({
	container: { flex: 1, paddingTop: Spacing.headerTop, paddingHorizontal: Spacing.md },
	header: { marginBottom: Spacing.xl },
	subtitle: { fontSize: FontSizes.md, opacity: 0.8, marginTop: Spacing.xxs },
	grid: { paddingBottom: Spacing.xl },
	row: { justifyContent: "space-between", marginBottom: Spacing.md },
	card: {
		width: cardWidth,
		height: Layout.cardHeight,
		borderRadius: BorderRadius.xl,
		overflow: "hidden",
	},
	cardGradient: {
		flex: 1,
		padding: Spacing.md,
		justifyContent: "flex-end",
	},
	cardEmoji: { fontSize: FontSizes.xxl, marginBottom: Spacing.xs },
	cardName: { fontSize: FontSizes.lg, fontWeight: "bold", color: Colors.light.white },
	cardCountry: { fontSize: FontSizes.sm - 1, color: Colors.light.whiteMuted },
});
