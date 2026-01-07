import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Trip } from "@types/trip";
import { formatDate, getTripDuration } from "@utils/dateUtils";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";
import Card from "@components/common/Card";

interface TripCardProps {
	trip: Trip;
	onPress: () => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onPress }) => {
	const duration = getTripDuration(trip.startDate, trip.endDate);

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.7}>
			<Card style={styles.card}>
				{trip.imageUrl && <Image source={{ uri: trip.imageUrl }} style={styles.image} />}
				<View style={styles.content}>
					<Text style={styles.title}>{trip.title}</Text>
					<View style={styles.destination}>
						<Ionicons name='location-outline' size={16} color={COLORS.textSecondary} />
						<Text style={styles.destinationText}>
							{trip.destination.name}, {trip.destination.country}
						</Text>
					</View>
					<View style={styles.dates}>
						<Ionicons name='calendar-outline' size={16} color={COLORS.textSecondary} />
						<Text style={styles.datesText}>
							{formatDate(trip.startDate)} - {formatDate(trip.endDate)}
						</Text>
						<Text style={styles.duration}>({duration} days)</Text>
					</View>
					<View style={styles.footer}>
						<View style={styles.budget}>
							<Text style={styles.budgetLabel}>Budget:</Text>
							<Text style={styles.budgetValue}>
								{trip.currency} {trip.budget.toLocaleString()}
							</Text>
						</View>
						<View style={styles.activities}>
							<Ionicons name='list-outline' size={16} color={COLORS.primary} />
							<Text style={styles.activitiesText}>{trip.activities.length} activities</Text>
						</View>
					</View>
				</View>
			</Card>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		padding: 0,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
	},
	content: {
		padding: SPACING.md,
	},
	title: {
		fontSize: FONT_SIZES.lg,
		fontWeight: "bold",
		color: COLORS.text,
		marginBottom: SPACING.xs,
	},
	destination: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: SPACING.xs,
	},
	destinationText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		marginLeft: SPACING.xs,
	},
	dates: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: SPACING.md,
	},
	datesText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		marginLeft: SPACING.xs,
	},
	duration: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		marginLeft: SPACING.xs,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	budget: {
		flexDirection: "row",
		alignItems: "center",
	},
	budgetLabel: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
	},
	budgetValue: {
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
		color: COLORS.primary,
		marginLeft: SPACING.xs,
	},
	activities: {
		flexDirection: "row",
		alignItems: "center",
	},
	activitiesText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text,
		marginLeft: SPACING.xs,
	},
});

export default TripCard;
