import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useTripStore } from "@store/tripStore";
import Button from "@components/common/Button";
import Card from "@components/common/Card";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";
import { RootStackParamList } from "@navigation/types";
import { formatDate, getTripDuration } from "@utils/dateUtils";
import { Activity, Accommodation, Transportation } from "@types/trip";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "TripDetail">;
type TripDetailRouteProp = RouteProp<RootStackParamList, "TripDetail">;

const TripDetailScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const route = useRoute<TripDetailRouteProp>();
	const { tripId } = route.params;

	const { trips, deleteTrip, setCurrentTrip } = useTripStore();
	const [activeTab, setActiveTab] = useState<"overview" | "activities" | "accommodation" | "transport">("overview");

	const trip = trips.find((t) => t.id === tripId);

	useEffect(() => {
		if (trip) {
			setCurrentTrip(trip);
			navigation.setOptions({ title: trip.title });
		}
	}, [trip]);

	if (!trip) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Trip not found</Text>
			</View>
		);
	}

	const duration = getTripDuration(trip.startDate, trip.endDate);
	const totalActivitiesCost = trip.activities.reduce((sum, a) => sum + (a.cost || 0), 0);
	const totalAccommodationCost = trip.accommodations.reduce((sum, a) => sum + a.cost, 0);
	const totalTransportCost = trip.transportations.reduce((sum, t) => sum + t.cost, 0);
	const totalSpent = totalActivitiesCost + totalAccommodationCost + totalTransportCost;
	const remainingBudget = trip.budget - totalSpent;

	const handleDelete = () => {
		Alert.alert("Delete Trip", "Are you sure you want to delete this trip? This action cannot be undone.", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Delete",
				style: "destructive",
				onPress: async () => {
					await deleteTrip(tripId);
					navigation.goBack();
				},
			},
		]);
	};

	const renderOverview = () => (
		<View>
			<Card>
				<View style={styles.infoRow}>
					<Ionicons name='location' size={20} color={COLORS.primary} />
					<View style={styles.infoContent}>
						<Text style={styles.infoLabel}>Destination</Text>
						<Text style={styles.infoValue}>
							{trip.destination.name}, {trip.destination.country}
						</Text>
					</View>
				</View>

				<View style={styles.infoRow}>
					<Ionicons name='calendar' size={20} color={COLORS.primary} />
					<View style={styles.infoContent}>
						<Text style={styles.infoLabel}>Duration</Text>
						<Text style={styles.infoValue}>
							{formatDate(trip.startDate)} - {formatDate(trip.endDate)} ({duration} days)
						</Text>
					</View>
				</View>

				{trip.description && (
					<View style={styles.infoRow}>
						<Ionicons name='document-text' size={20} color={COLORS.primary} />
						<View style={styles.infoContent}>
							<Text style={styles.infoLabel}>Description</Text>
							<Text style={styles.infoValue}>{trip.description}</Text>
						</View>
					</View>
				)}
			</Card>

			<Card>
				<Text style={styles.cardTitle}>Budget Overview</Text>
				<View style={styles.budgetContainer}>
					<View style={styles.budgetItem}>
						<Text style={styles.budgetLabel}>Total Budget</Text>
						<Text style={styles.budgetValue}>
							{trip.currency} {trip.budget.toLocaleString()}
						</Text>
					</View>
					<View style={styles.budgetItem}>
						<Text style={styles.budgetLabel}>Spent</Text>
						<Text style={[styles.budgetValue, styles.spentValue]}>
							{trip.currency} {totalSpent.toLocaleString()}
						</Text>
					</View>
					<View style={styles.budgetItem}>
						<Text style={styles.budgetLabel}>Remaining</Text>
						<Text style={[styles.budgetValue, remainingBudget < 0 ? styles.overBudget : styles.underBudget]}>
							{trip.currency} {remainingBudget.toLocaleString()}
						</Text>
					</View>
				</View>

				<View style={styles.budgetBreakdown}>
					<Text style={styles.breakdownTitle}>Breakdown</Text>
					<View style={styles.breakdownItem}>
						<Text style={styles.breakdownLabel}>Activities</Text>
						<Text style={styles.breakdownValue}>
							{trip.currency} {totalActivitiesCost.toLocaleString()}
						</Text>
					</View>
					<View style={styles.breakdownItem}>
						<Text style={styles.breakdownLabel}>Accommodation</Text>
						<Text style={styles.breakdownValue}>
							{trip.currency} {totalAccommodationCost.toLocaleString()}
						</Text>
					</View>
					<View style={styles.breakdownItem}>
						<Text style={styles.breakdownLabel}>Transportation</Text>
						<Text style={styles.breakdownValue}>
							{trip.currency} {totalTransportCost.toLocaleString()}
						</Text>
					</View>
				</View>
			</Card>

			<Card>
				<Text style={styles.cardTitle}>Quick Stats</Text>
				<View style={styles.statsGrid}>
					<View style={styles.statItem}>
						<Ionicons name='list' size={24} color={COLORS.primary} />
						<Text style={styles.statNumber}>{trip.activities.length}</Text>
						<Text style={styles.statLabel}>Activities</Text>
					</View>
					<View style={styles.statItem}>
						<Ionicons name='bed' size={24} color={COLORS.secondary} />
						<Text style={styles.statNumber}>{trip.accommodations.length}</Text>
						<Text style={styles.statLabel}>Stays</Text>
					</View>
					<View style={styles.statItem}>
						<Ionicons name='car' size={24} color={COLORS.accent} />
						<Text style={styles.statNumber}>{trip.transportations.length}</Text>
						<Text style={styles.statLabel}>Transports</Text>
					</View>
				</View>
			</Card>
		</View>
	);

	const renderActivities = () => (
		<View>
			{trip.activities.length > 0 ? (
				trip.activities
					.sort((a, b) => a.date.getTime() - b.date.getTime())
					.map((activity) => (
						<Card key={activity.id} style={styles.itemCard}>
							<View style={styles.itemHeader}>
								<View style={styles.itemHeaderLeft}>
									<Text style={styles.itemTitle}>{activity.title}</Text>
									<Text style={styles.itemCategory}>{activity.category}</Text>
								</View>
								{activity.cost && (
									<Text style={styles.itemCost}>
										{trip.currency} {activity.cost}
									</Text>
								)}
							</View>
							<View style={styles.itemDetails}>
								<View style={styles.itemDetailRow}>
									<Ionicons name='calendar-outline' size={16} color={COLORS.textSecondary} />
									<Text style={styles.itemDetailText}>
										{formatDate(activity.date)}
										{activity.time && ` at ${activity.time}`}
									</Text>
								</View>
								<View style={styles.itemDetailRow}>
									<Ionicons name='location-outline' size={16} color={COLORS.textSecondary} />
									<Text style={styles.itemDetailText}>{activity.location}</Text>
								</View>
							</View>
							{activity.description && <Text style={styles.itemDescription}>{activity.description}</Text>}
							{activity.notes && (
								<View style={styles.notesContainer}>
									<Text style={styles.notesLabel}>Notes:</Text>
									<Text style={styles.notesText}>{activity.notes}</Text>
								</View>
							)}
						</Card>
					))
			) : (
				<View style={styles.emptyState}>
					<Ionicons name='list-outline' size={64} color={COLORS.border} />
					<Text style={styles.emptyText}>No activities planned yet</Text>
					<Button
						title='Add Activity'
						onPress={() => {
							/* Navigate to add activity */
						}}
						style={styles.addButton}
					/>
				</View>
			)}
		</View>
	);

	const renderAccommodation = () => (
		<View>
			{trip.accommodations.length > 0 ? (
				trip.accommodations
					.sort((a, b) => a.checkIn.getTime() - b.checkIn.getTime())
					.map((accommodation) => (
						<Card key={accommodation.id} style={styles.itemCard}>
							<View style={styles.itemHeader}>
								<View style={styles.itemHeaderLeft}>
									<Text style={styles.itemTitle}>{accommodation.name}</Text>
									<Text style={styles.itemCategory}>{accommodation.type}</Text>
								</View>
								<Text style={styles.itemCost}>
									{trip.currency} {accommodation.cost}
								</Text>
							</View>
							<View style={styles.itemDetails}>
								<View style={styles.itemDetailRow}>
									<Ionicons name='location-outline' size={16} color={COLORS.textSecondary} />
									<Text style={styles.itemDetailText}>{accommodation.address}</Text>
								</View>
								<View style={styles.itemDetailRow}>
									<Ionicons name='calendar-outline' size={16} color={COLORS.textSecondary} />
									<Text style={styles.itemDetailText}>Check-in: {formatDate(accommodation.checkIn)}</Text>
								</View>
								<View style={styles.itemDetailRow}>
									<Ionicons name='calendar-outline' size={16} color={COLORS.textSecondary} />
									<Text style={styles.itemDetailText}>Check-out: {formatDate(accommodation.checkOut)}</Text>
								</View>
							</View>
							{accommodation.confirmationNumber && (
								<View style={styles.confirmationContainer}>
									<Text style={styles.confirmationLabel}>Confirmation:</Text>
									<Text style={styles.confirmationNumber}>{accommodation.confirmationNumber}</Text>
								</View>
							)}
							{accommodation.notes && (
								<View style={styles.notesContainer}>
									<Text style={styles.notesLabel}>Notes:</Text>
									<Text style={styles.notesText}>{accommodation.notes}</Text>
								</View>
							)}
						</Card>
					))
			) : (
				<View style={styles.emptyState}>
					<Ionicons name='bed-outline' size={64} color={COLORS.border} />
					<Text style={styles.emptyText}>No accommodations booked yet</Text>
					<Button
						title='Add Accommodation'
						onPress={() => {
							/* Navigate to add accommodation */
						}}
						style={styles.addButton}
					/>
				</View>
			)}
		</View>
	);

	const renderTransportation = () => (
		<View>
			{trip.transportations.length > 0 ? (
				trip.transportations
					.sort((a, b) => a.departureTime.getTime() - b.departureTime.getTime())
					.map((transport) => (
						<Card key={transport.id} style={styles.itemCard}>
							<View style={styles.itemHeader}>
								<View style={styles.itemHeaderLeft}>
									<Text style={styles.itemTitle}>{transport.type}</Text>
								</View>
								<Text style={styles.itemCost}>
									{trip.currency} {transport.cost}
								</Text>
							</View>
							<View style={styles.transportRoute}>
								<View style={styles.transportLocation}>
									<Ionicons name='location' size={20} color={COLORS.primary} />
									<Text style={styles.transportLocationText}>{transport.departureLocation}</Text>
								</View>
								<Ionicons name='arrow-forward' size={20} color={COLORS.textSecondary} />
								<View style={styles.transportLocation}>
									<Ionicons name='location' size={20} color={COLORS.accent} />
									<Text style={styles.transportLocationText}>{transport.arrivalLocation}</Text>
								</View>
							</View>
							<View style={styles.itemDetails}>
								<View style={styles.itemDetailRow}>
									<Ionicons name='time-outline' size={16} color={COLORS.textSecondary} />
									<Text style={styles.itemDetailText}>
										Departure: {formatDate(transport.departureTime, "MMM dd, yyyy HH:mm")}
									</Text>
								</View>
								<View style={styles.itemDetailRow}>
									<Ionicons name='time-outline' size={16} color={COLORS.textSecondary} />
									<Text style={styles.itemDetailText}>Arrival: {formatDate(transport.arrivalTime, "MMM dd, yyyy HH:mm")}</Text>
								</View>
							</View>
							{transport.confirmationNumber && (
								<View style={styles.confirmationContainer}>
									<Text style={styles.confirmationLabel}>Confirmation:</Text>
									<Text style={styles.confirmationNumber}>{transport.confirmationNumber}</Text>
								</View>
							)}
							{transport.notes && (
								<View style={styles.notesContainer}>
									<Text style={styles.notesLabel}>Notes:</Text>
									<Text style={styles.notesText}>{transport.notes}</Text>
								</View>
							)}
						</Card>
					))
			) : (
				<View style={styles.emptyState}>
					<Ionicons name='airplane-outline' size={64} color={COLORS.border} />
					<Text style={styles.emptyText}>No transportation booked yet</Text>
					<Button
						title='Add Transportation'
						onPress={() => {
							/* Navigate to add transportation */
						}}
						style={styles.addButton}
					/>
				</View>
			)}
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			{trip.imageUrl && (
				<View style={styles.imageContainer}>
					<Image source={{ uri: trip.imageUrl }} style={styles.headerImage} />
					<LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={styles.imageGradient} />
				</View>
			)}

			<View style={styles.tabContainer}>
				<TouchableOpacity
					style={[styles.tab, activeTab === "overview" && styles.activeTab]}
					onPress={() => setActiveTab("overview")}>
					<Text style={[styles.tabText, activeTab === "overview" && styles.activeTabText]}>Overview</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tab, activeTab === "activities" && styles.activeTab]}
					onPress={() => setActiveTab("activities")}>
					<Text style={[styles.tabText, activeTab === "activities" && styles.activeTabText]}>Activities</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tab, activeTab === "accommodation" && styles.activeTab]}
					onPress={() => setActiveTab("accommodation")}>
					<Text style={[styles.tabText, activeTab === "accommodation" && styles.activeTabText]}>Stays</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tab, activeTab === "transport" && styles.activeTab]}
					onPress={() => setActiveTab("transport")}>
					<Text style={[styles.tabText, activeTab === "transport" && styles.activeTabText]}>Transport</Text>
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{activeTab === "overview" && renderOverview()}
				{activeTab === "activities" && renderActivities()}
				{activeTab === "accommodation" && renderAccommodation()}
				{activeTab === "transport" && renderTransportation()}

				<View style={styles.actionsContainer}>
					<Button
						title='Edit Trip'
						onPress={() => {
							/* Navigate to edit */
						}}
						variant='secondary'
						style={styles.actionButton}
					/>
					<Button
						title='Delete Trip'
						onPress={handleDelete}
						variant='outline'
						style={[styles.actionButton, styles.deleteButton]}
					/>
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
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		fontSize: FONT_SIZES.lg,
		color: COLORS.error,
	},
	imageContainer: {
		height: 200,
		position: "relative",
	},
	headerImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	imageGradient: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: 100,
	},
	tabContainer: {
		flexDirection: "row",
		backgroundColor: COLORS.card,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.border,
	},
	tab: {
		flex: 1,
		paddingVertical: SPACING.md,
		alignItems: "center",
		borderBottomWidth: 2,
		borderBottomColor: "transparent",
	},
	activeTab: {
		borderBottomColor: COLORS.primary,
	},
	tabText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		fontWeight: "600",
	},
	activeTabText: {
		color: COLORS.primary,
	},
	content: {
		flex: 1,
		padding: SPACING.md,
	},
	infoRow: {
		flexDirection: "row",
		marginBottom: SPACING.md,
	},
	infoContent: {
		flex: 1,
		marginLeft: SPACING.sm,
	},
	infoLabel: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		marginBottom: SPACING.xs,
	},
	infoValue: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text,
	},
	cardTitle: {
		fontSize: FONT_SIZES.lg,
		fontWeight: "bold",
		color: COLORS.text,
		marginBottom: SPACING.md,
	},
	budgetContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: SPACING.lg,
	},
	budgetItem: {
		flex: 1,
		alignItems: "center",
	},
	budgetLabel: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		marginBottom: SPACING.xs,
	},
	budgetValue: {
		fontSize: FONT_SIZES.lg,
		fontWeight: "bold",
		color: COLORS.text,
	},
	spentValue: {
		color: COLORS.accent,
	},
	underBudget: {
		color: COLORS.success,
	},
	overBudget: {
		color: COLORS.error,
	},
	budgetBreakdown: {
		borderTopWidth: 1,
		borderTopColor: COLORS.border,
		paddingTop: SPACING.md,
	},
	breakdownTitle: {
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
		color: COLORS.text,
		marginBottom: SPACING.sm,
	},
	breakdownItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: SPACING.xs,
	},
	breakdownLabel: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
	},
	breakdownValue: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text,
		fontWeight: "600",
	},
	statsGrid: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: SPACING.md,
	},
	statItem: {
		alignItems: "center",
	},
	statNumber: {
		fontSize: FONT_SIZES.xl,
		fontWeight: "bold",
		color: COLORS.text,
		marginTop: SPACING.xs,
	},
	statLabel: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		marginTop: SPACING.xs,
	},
	itemCard: {
		marginBottom: SPACING.md,
	},
	itemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: SPACING.sm,
	},
	itemHeaderLeft: {
		flex: 1,
	},
	itemTitle: {
		fontSize: FONT_SIZES.md,
		fontWeight: "bold",
		color: COLORS.text,
		marginBottom: SPACING.xs,
	},
	itemCategory: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.primary,
		fontWeight: "600",
	},
	itemCost: {
		fontSize: FONT_SIZES.md,
		fontWeight: "bold",
		color: COLORS.accent,
	},
	itemDetails: {
		marginBottom: SPACING.sm,
	},
	itemDetailRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: SPACING.xs,
	},
	itemDetailText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		marginLeft: SPACING.xs,
	},
	itemDescription: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text,
		marginBottom: SPACING.sm,
	},
	notesContainer: {
		backgroundColor: COLORS.background,
		padding: SPACING.sm,
		borderRadius: 8,
		marginTop: SPACING.sm,
	},
	notesLabel: {
		fontSize: FONT_SIZES.sm,
		fontWeight: "600",
		color: COLORS.textSecondary,
		marginBottom: SPACING.xs,
	},
	notesText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text,
	},
	confirmationContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: SPACING.sm,
	},
	confirmationLabel: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		marginRight: SPACING.xs,
	},
	confirmationNumber: {
		fontSize: FONT_SIZES.sm,
		fontWeight: "600",
		color: COLORS.primary,
	},
	transportRoute: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: SPACING.md,
		paddingVertical: SPACING.sm,
		backgroundColor: COLORS.background,
		borderRadius: 8,
		paddingHorizontal: SPACING.sm,
	},
	transportLocation: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	transportLocationText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text,
		marginLeft: SPACING.xs,
		flex: 1,
	},
	emptyState: {
		alignItems: "center",
		paddingVertical: SPACING.xl * 2,
	},
	emptyText: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textSecondary,
		marginTop: SPACING.md,
		marginBottom: SPACING.lg,
	},
	addButton: {
		paddingHorizontal: SPACING.xl,
	},
	actionsContainer: {
		marginTop: SPACING.lg,
		marginBottom: SPACING.xl,
	},
	actionButton: {
		marginBottom: SPACING.sm,
	},
	deleteButton: {
		borderColor: COLORS.error,
	},
});

export default TripDetailScreen;
