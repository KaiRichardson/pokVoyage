import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Trip } from "@types/trip";
import TripCard from "./TripCard";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";

interface TripListProps {
	trips: Trip[];
	onTripPress: (tripId: string) => void;
	emptyMessage?: string;
}

const TripList: React.FC<TripListProps> = ({ trips, onTripPress, emptyMessage = "No trips available" }) => {
	const renderItem = ({ item }: { item: Trip }) => <TripCard trip={item} onPress={() => onTripPress(item.id)} />;

	const renderEmpty = () => (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyText}>{emptyMessage}</Text>
		</View>
	);

	return (
		<FlatList
			data={trips}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			showsVerticalScrollIndicator={false}
			ListEmptyComponent={renderEmpty}
			contentContainerStyle={styles.listContent}
		/>
	);
};

const styles = StyleSheet.create({
	listContent: {
		flexGrow: 1,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: SPACING.xl,
	},
	emptyText: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textSecondary,
	},
});

export default TripList;
