import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";
import Card from "@components/common/Card";

interface PopularDestination {
	id: string;
	name: string;
	country: string;
	imageUrl: string;
	description: string;
	highlights: string[];
	bestTimeToVisit: string;
}

const POPULAR_DESTINATIONS: PopularDestination[] = [
	{
		id: "1",
		name: "Paris",
		country: "France",
		imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
		description: "The City of Light, known for art, fashion, and culture",
		highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame"],
		bestTimeToVisit: "April-June, September-October",
	},
	{
		id: "2",
		name: "Tokyo",
		country: "Japan",
		imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
		description: "A blend of traditional and modern culture",
		highlights: ["Shibuya Crossing", "Mount Fuji", "Senso-ji Temple"],
		bestTimeToVisit: "March-May, September-November",
	},
	{
		id: "3",
		name: "New York",
		country: "USA",
		imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
		description: "The city that never sleeps",
		highlights: ["Statue of Liberty", "Central Park", "Times Square"],
		bestTimeToVisit: "April-June, September-November",
	},
	{
		id: "4",
		name: "Barcelona",
		country: "Spain",
		imageUrl: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b",
		description: "Mediterranean architecture and beaches",
		highlights: ["Sagrada Familia", "Park Güell", "La Rambla"],
		bestTimeToVisit: "May-June, September-October",
	},
	{
		id: "5",
		name: "Bali",
		country: "Indonesia",
		imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
		description: "Tropical paradise with temples and beaches",
		highlights: ["Ubud Rice Terraces", "Tanah Lot", "Seminyak Beach"],
		bestTimeToVisit: "April-October",
	},
	{
		id: "6",
		name: "Dubai",
		country: "UAE",
		imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
		description: "Luxury and modern architecture",
		highlights: ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall"],
		bestTimeToVisit: "November-March",
	},
];

const DestinationsScreen: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredDestinations, setFilteredDestinations] = useState(POPULAR_DESTINATIONS);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		if (query.trim() === "") {
			setFilteredDestinations(POPULAR_DESTINATIONS);
		} else {
			const filtered = POPULAR_DESTINATIONS.filter(
				(dest) =>
					dest.name.toLowerCase().includes(query.toLowerCase()) || dest.country.toLowerCase().includes(query.toLowerCase())
			);
			setFilteredDestinations(filtered);
		}
	};

	const renderDestination = ({ item }: { item: PopularDestination }) => (
		<TouchableOpacity activeOpacity={0.7}>
			<Card style={styles.destinationCard}>
				<Image source={{ uri: item.imageUrl }} style={styles.destinationImage} />
				<View style={styles.destinationContent}>
					<View style={styles.destinationHeader}>
						<Text style={styles.destinationName}>{item.name}</Text>
						<View style={styles.locationBadge}>
							<Ionicons name='location' size={12} color={COLORS.primary} />
							<Text style={styles.country}>{item.country}</Text>
						</View>
					</View>
					<Text style={styles.description}>{item.description}</Text>

					<View style={styles.highlightsContainer}>
						<Text style={styles.highlightsTitle}>Top Highlights:</Text>
						{item.highlights.slice(0, 3).map((highlight, index) => (
							<View key={index} style={styles.highlightItem}>
								<Ionicons name='checkmark-circle' size={16} color={COLORS.success} />
								<Text style={styles.highlightText}>{highlight}</Text>
							</View>
						))}
					</View>

					<View style={styles.bestTimeContainer}>
						<Ionicons name='calendar-outline' size={16} color={COLORS.textSecondary} />
						<View style={styles.bestTimeContent}>
							<Text style={styles.bestTimeLabel}>Best time to visit:</Text>
							<Text style={styles.bestTimeText}>{item.bestTimeToVisit}</Text>
						</View>
					</View>
				</View>
			</Card>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Explore Destinations</Text>
				<Text style={styles.subtitle}>Discover your next adventure</Text>
			</View>

			<View style={styles.searchContainer}>
				<Ionicons name='search' size={20} color={COLORS.textSecondary} />
				<TextInput
					style={styles.searchInput}
					placeholder='Search destinations...'
					value={searchQuery}
					onChangeText={handleSearch}
					placeholderTextColor={COLORS.textSecondary}
				/>
				{searchQuery.length > 0 && (
					<TouchableOpacity onPress={() => handleSearch("")}>
						<Ionicons name='close-circle' size={20} color={COLORS.textSecondary} />
					</TouchableOpacity>
				)}
			</View>

			<FlatList
				data={filteredDestinations}
				renderItem={renderDestination}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					<View style={styles.emptyState}>
						<Ionicons name='search-outline' size={64} color={COLORS.border} />
						<Text style={styles.emptyText}>No destinations found</Text>
						<Text style={styles.emptySubtext}>Try a different search term</Text>
					</View>
				}
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
		padding: SPACING.md,
	},
	title: {
		fontSize: FONT_SIZES.xxl,
		fontWeight: "bold",
		color: COLORS.text,
	},
	subtitle: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textSecondary,
		marginTop: SPACING.xs,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.card,
		marginHorizontal: SPACING.md,
		marginBottom: SPACING.md,
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.sm,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	searchInput: {
		flex: 1,
		marginLeft: SPACING.sm,
		fontSize: FONT_SIZES.md,
		color: COLORS.text,
	},
	list: {
		padding: SPACING.md,
	},
	destinationCard: {
		padding: 0,
		marginBottom: SPACING.md,
		overflow: "hidden",
	},
	destinationImage: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
	},
	destinationContent: {
		padding: SPACING.md,
	},
	destinationHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: SPACING.sm,
	},
	destinationName: {
		fontSize: FONT_SIZES.xl,
		fontWeight: "bold",
		color: COLORS.text,
	},
	locationBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.background,
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
		borderRadius: 12,
	},
	country: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.primary,
		marginLeft: SPACING.xs,
		fontWeight: "600",
	},
	description: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		marginBottom: SPACING.md,
	},
	highlightsContainer: {
		marginBottom: SPACING.md,
	},
	highlightsTitle: {
		fontSize: FONT_SIZES.sm,
		fontWeight: "600",
		color: COLORS.text,
		marginBottom: SPACING.xs,
	},
	highlightItem: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: SPACING.xs,
	},
	highlightText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text,
		marginLeft: SPACING.xs,
	},
	bestTimeContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		backgroundColor: COLORS.background,
		padding: SPACING.sm,
		borderRadius: 8,
	},
	bestTimeContent: {
		marginLeft: SPACING.xs,
		flex: 1,
	},
	bestTimeLabel: {
		fontSize: FONT_SIZES.xs,
		color: COLORS.textSecondary,
		marginBottom: SPACING.xs,
	},
	bestTimeText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text,
		fontWeight: "600",
	},
	emptyState: {
		alignItems: "center",
		paddingVertical: SPACING.xl * 2,
	},
	emptyText: {
		fontSize: FONT_SIZES.lg,
		fontWeight: "600",
		color: COLORS.text,
		marginTop: SPACING.md,
	},
	emptySubtext: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textSecondary,
		marginTop: SPACING.xs,
	},
});

export default DestinationsScreen;
