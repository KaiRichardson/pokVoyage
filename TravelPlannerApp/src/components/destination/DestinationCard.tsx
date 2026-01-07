import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Destination } from "@types/destination";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";

interface DestinationCardProps {
	destination: Destination;
	onPress: () => void;
	variant?: "default" | "compact";
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - SPACING.md * 2;

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onPress, variant = "default" }) => {
	if (variant === "compact") {
		return (
			<TouchableOpacity style={styles.compactCard} onPress={onPress} activeOpacity={0.7}>
				<Image source={{ uri: destination.thumbnail || destination.imageUrl }} style={styles.compactImage} />
				<View style={styles.compactContent}>
					<Text style={styles.compactName} numberOfLines={1}>
						{destination.name}
					</Text>
					<Text style={styles.compactCountry} numberOfLines={1}>
						{destination.country}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
			<Image source={{ uri: destination.imageUrl }} style={styles.image} resizeMode='cover' />
			<View style={styles.overlay}>
				<View style={styles.header}>
					<View style={styles.locationBadge}>
						<Ionicons name='location' size={14} color='#fff' />
						<Text style={styles.country}>{destination.country}</Text>
					</View>
					{destination.touristRating && (
						<View style={styles.ratingBadge}>
							<Ionicons name='star' size={14} color='#FFD700' />
							<Text style={styles.rating}>{destination.touristRating.toFixed(1)}</Text>
						</View>
					)}
				</View>
				<View style={styles.footer}>
					<Text style={styles.name}>{destination.name}</Text>
					{destination.budget && (
						<View style={styles.budgetContainer}>
							<Ionicons name='wallet-outline' size={16} color='#fff' />
							<Text style={styles.budget}>{destination.budget}</Text>
						</View>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		width: CARD_WIDTH,
		height: 250,
		borderRadius: 16,
		overflow: "hidden",
		marginBottom: SPACING.md,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.3)",
		justifyContent: "space-between",
		padding: SPACING.md,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	locationBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
		borderRadius: 12,
	},
	country: {
		color: "#fff",
		fontSize: FONT_SIZES.sm,
		fontWeight: "600",
		marginLeft: SPACING.xs,
	},
	ratingBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
		borderRadius: 12,
	},
	rating: {
		color: "#fff",
		fontSize: FONT_SIZES.sm,
		fontWeight: "600",
		marginLeft: SPACING.xs,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	name: {
		fontSize: FONT_SIZES.xl,
		fontWeight: "bold",
		color: "#fff",
		flex: 1,
		textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	budgetContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
		borderRadius: 12,
	},
	budget: {
		color: "#fff",
		fontSize: FONT_SIZES.sm,
		fontWeight: "600",
		marginLeft: SPACING.xs,
	},
	compactCard: {
		width: 150,
		marginRight: SPACING.sm,
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: COLORS.card,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	compactImage: {
		width: "100%",
		height: 100,
	},
	compactContent: {
		padding: SPACING.sm,
	},
	compactName: {
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
		color: COLORS.text,
		marginBottom: SPACING.xs,
	},
	compactCountry: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
	},
});

export default DestinationCard;
