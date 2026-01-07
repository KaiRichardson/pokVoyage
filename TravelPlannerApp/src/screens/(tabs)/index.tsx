import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { useTripStore } from "@store/tripStore";
import TripCard from "@components/trip/TripCard";
import Button from "@components/common/Button";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";
import { RootStackParamList } from "@navigation/types";
import { isUpcoming } from "@utils/dateUtils";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const { trips, fetchTrips } = useTripStore();

	useEffect(() => {
		fetchTrips();
	}, []);

	const upcomingTrips = trips
		.filter((trip) => isUpcoming(trip.startDate))
		.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
		.slice(0, 3);

	const handleCreateTrip = () => {
		navigation.navigate("CreateTrip");
	};

	const handleTripPress = (tripId: string) => {
		navigation.navigate("TripDetail", { tripId });
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<View>
						<Text style={styles.greeting}>Welcome back!</Text>
						<Text style={styles.subtitle}>Plan your next adventure</Text>
					</View>
					<TouchableOpacity>
						<Ionicons name='notifications-outline' size={28} color={COLORS.text} />
					</TouchableOpacity>
				</View>

				<View style={styles.statsContainer}>
					<View style={styles.statCard}>
						<Ionicons name='airplane' size={32} color={COLORS.primary} />
						<Text style={styles.statNumber}>{trips.length}</Text>
						<Text style={styles.statLabel}>Total Trips</Text>
					</View>
					<View style={styles.statCard}>
						<Ionicons name='calendar' size={32} color={COLORS.secondary} />
						<Text style={styles.statNumber}>{upcomingTrips.length}</Text>
						<Text style={styles.statLabel}>Upcoming</Text>
					</View>
				</View>

				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Upcoming Trips</Text>
						<TouchableOpacity onPress={() => navigation.navigate("MainTabs", { screen: "Trips" })}>
							<Text style={styles.seeAll}>See All</Text>
						</TouchableOpacity>
					</View>

					{upcomingTrips.length > 0 ? (
						upcomingTrips.map((trip) => <TripCard key={trip.id} trip={trip} onPress={() => handleTripPress(trip.id)} />)
					) : (
						<View style={styles.emptyState}>
							<Ionicons name='airplane-outline' size={64} color={COLORS.border} />
							<Text style={styles.emptyText}>No upcoming trips</Text>
							<Button title='Create Your First Trip' onPress={handleCreateTrip} style={styles.createButton} />
						</View>
					)}
				</View>

				<View style={styles.quickActions}>
					<Text style={styles.sectionTitle}>Quick Actions</Text>
					<View style={styles.actionsGrid}>
						<TouchableOpacity style={styles.actionCard} onPress={handleCreateTrip}>
							<Ionicons name='add-circle' size={32} color={COLORS.primary} />
							<Text style={styles.actionText}>New Trip</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.actionCard}>
							<Ionicons name='search' size={32} color={COLORS.primary} />
							<Text style={styles.actionText}>Destinations</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.actionCard}>
							<Ionicons name='bookmark' size={32} color={COLORS.primary} />
							<Text style={styles.actionText}>Saved</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.actionCard}>
							<Ionicons name='settings' size={32} color={COLORS.primary} />
							<Text style={styles.actionText}>Settings</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: SPACING.md,
	},
	greeting: {
		fontSize: FONT_SIZES.xxl,
		fontWeight: "bold",
		color: COLORS.text,
	},
	subtitle: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textSecondary,
		marginTop: SPACING.xs,
	},
	statsContainer: {
		flexDirection: "row",
		padding: SPACING.md,
		gap: SPACING.md,
	},
	statCard: {
		flex: 1,
		backgroundColor: COLORS.card,
		padding: SPACING.md,
		borderRadius: 12,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	statNumber: {
		fontSize: FONT_SIZES.xxl,
		fontWeight: "bold",
		color: COLORS.text,
		marginTop: SPACING.sm,
	},
	statLabel: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		marginTop: SPACING.xs,
	},
	section: {
		padding: SPACING.md,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: SPACING.md,
	},
	sectionTitle: {
		fontSize: FONT_SIZES.xl,
		fontWeight: "bold",
		color: COLORS.text,
	},
	seeAll: {
		fontSize: FONT_SIZES.md,
		color: COLORS.primary,
		fontWeight: "600",
	},
	emptyState: {
		alignItems: "center",
		paddingVertical: SPACING.xl,
	},
	emptyText: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textSecondary,
		marginTop: SPACING.md,
		marginBottom: SPACING.lg,
	},
	createButton: {
		paddingHorizontal: SPACING.xl,
	},
	quickActions: {
		padding: SPACING.md,
	},
	actionsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: SPACING.md,
		marginTop: SPACING.md,
	},
	actionCard: {
		width: "47%",
		backgroundColor: COLORS.card,
		padding: SPACING.lg,
		borderRadius: 12,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	actionText: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text,
		marginTop: SPACING.sm,
		fontWeight: "600",
	},
});

export default HomeScreen;
