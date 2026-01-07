import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { useTripStore } from "@store/tripStore";
import TripCard from "@components/trip/TripCard";
import Button from "@components/common/Button";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";
import { RootStackParamList } from "@navigation/types";
import { Trip } from "@types/trip";
import { isUpcoming, isPast } from "@utils/dateUtils";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type FilterType = "all" | "upcoming" | "past";

const TripsScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const { trips, fetchTrips } = useTripStore();
	const [filter, setFilter] = useState<FilterType>("all");

	useEffect(() => {
		fetchTrips();
	}, []);

	const filteredTrips = trips.filter((trip) => {
		switch (filter) {
			case "upcoming":
				return isUpcoming(trip.startDate);
			case "past":
				return isPast(trip.endDate);
			default:
				return true;
		}
	});

	const handleCreateTrip = () => {
		navigation.navigate("CreateTrip");
	};

	const handleTripPress = (tripId: string) => {
		navigation.navigate("TripDetail", { tripId });
	};

	const renderTrip = ({ item }: { item: Trip }) => <TripCard trip={item} onPress={() => handleTripPress(item.id)} />;

	const renderEmptyState = () => (
		<View style={styles.emptyState}>
			<Ionicons name='airplane-outline' size={80} color={COLORS.border} />
			<Text style={styles.emptyText}>No trips found</Text>
			<Text style={styles.emptySubtext}>Start planning your next adventure!</Text>
			<Button title='Create Trip' onPress={handleCreateTrip} style={styles.createButton} />
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>My Trips</Text>
				<TouchableOpacity onPress={handleCreateTrip}>
					<Ionicons name='add-circle' size={32} color={COLORS.primary} />
				</TouchableOpacity>
			</View>

			<View style={styles.filterContainer}>
				<TouchableOpacity style={[styles.filterButton, filter === "all" && styles.filterActive]} onPress={() => setFilter("all")}>
					<Text style={[styles.filterText, filter === "all" && styles.filterTextActive]}>All ({trips.length})</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.filterButton, filter === "upcoming" && styles.filterActive]}
					onPress={() => setFilter("upcoming")}>
					<Text style={[styles.filterText, filter === "upcoming" && styles.filterTextActive]}>Upcoming</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.filterButton, filter === "past" && styles.filterActive]}
					onPress={() => setFilter("past")}>
					<Text style={[styles.filterText, filter === "past" && styles.filterTextActive]}>Past</Text>
				</TouchableOpacity>
			</View>

			<FlatList
				data={filteredTrips}
				renderItem={renderTrip}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={renderEmptyState}
			/>
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
	title: {
		fontSize: FONT_SIZES.xxl,
		fontWeight: "bold",
		color: COLORS.text,
	},
	filterContainer: {
		flexDirection: "row",
		padding: SPACING.md,
		gap: SPACING.sm,
	},
	filterButton: {
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.sm,
		borderRadius: 20,
		backgroundColor: COLORS.card,
		borderWidth: 1,
		borderColor: COLORS.border,
	},
	filterActive: {
		backgroundColor: COLORS.primary,
		borderColor: COLORS.primary,
	},
	filterText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text,
		fontWeight: "600",
	},
	filterTextActive: {
		color: "#fff",
	},
	list: {
		padding: SPACING.md,
		flexGrow: 1,
	},
	emptyState: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: SPACING.xl * 2,
	},
	emptyText: {
		fontSize: FONT_SIZES.lg,
		fontWeight: "600",
		color: COLORS.text,
		marginTop: SPACING.lg,
	},
	emptySubtext: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textSecondary,
		marginTop: SPACING.sm,
		marginBottom: SPACING.xl,
	},
	createButton: {
		paddingHorizontal: SPACING.xl,
	},
});

export default TripsScreen;
