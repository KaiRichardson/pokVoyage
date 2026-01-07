import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";

interface SearchResult {
	id: string;
	name: string;
	country: string;
	type: "destination" | "city" | "attraction";
}

interface DestinationSearchProps {
	onSelectResult: (result: SearchResult) => void;
	placeholder?: string;
}

const DestinationSearch: React.FC<DestinationSearchProps> = ({ onSelectResult, placeholder = "Search destinations..." }) => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [showResults, setShowResults] = useState(false);

	const handleSearch = (text: string) => {
		setQuery(text);

		if (text.length > 2) {
			// Mock search - replace with actual API call
			const mockResults: SearchResult[] = [
				{ id: "1", name: "Paris", country: "France", type: "city" },
				{ id: "2", name: "Eiffel Tower", country: "France", type: "attraction" },
				{ id: "3", name: "Parc des Princes", country: "France", type: "attraction" },
			].filter(
				(item) => item.name.toLowerCase().includes(text.toLowerCase()) || item.country.toLowerCase().includes(text.toLowerCase())
			);

			setResults(mockResults);
			setShowResults(true);
		} else {
			setResults([]);
			setShowResults(false);
		}
	};

	const handleSelectResult = (result: SearchResult) => {
		setQuery(result.name);
		setShowResults(false);
		onSelectResult(result);
	};

	const getIcon = (type: string) => {
		switch (type) {
			case "city":
				return "business-outline";
			case "attraction":
				return "star-outline";
			default:
				return "location-outline";
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<Ionicons name='search' size={20} color={COLORS.textSecondary} />
				<TextInput
					style={styles.input}
					value={query}
					onChangeText={handleSearch}
					placeholder={placeholder}
					placeholderTextColor={COLORS.textSecondary}
				/>
				{query.length > 0 && (
					<TouchableOpacity
						onPress={() => {
							setQuery("");
							setShowResults(false);
						}}>
						<Ionicons name='close-circle' size={20} color={COLORS.textSecondary} />
					</TouchableOpacity>
				)}
			</View>

			{showResults && results.length > 0 && (
				<View style={styles.resultsContainer}>
					<FlatList
						data={results}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<TouchableOpacity style={styles.resultItem} onPress={() => handleSelectResult(item)}>
								<Ionicons name={getIcon(item.type) as any} size={20} color={COLORS.primary} />
								<View style={styles.resultText}>
									<Text style={styles.resultName}>{item.name}</Text>
									<Text style={styles.resultCountry}>{item.country}</Text>
								</View>
							</TouchableOpacity>
						)}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
		zIndex: 1000,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.card,
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.sm,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	input: {
		flex: 1,
		marginLeft: SPACING.sm,
		fontSize: FONT_SIZES.md,
		color: COLORS.text,
	},
	resultsContainer: {
		position: "absolute",
		top: "100%",
		left: 0,
		right: 0,
		backgroundColor: COLORS.card,
		borderRadius: 12,
		marginTop: SPACING.xs,
		maxHeight: 300,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 8,
	},
	resultItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: SPACING.md,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.border,
	},
	resultText: {
		marginLeft: SPACING.sm,
		flex: 1,
	},
	resultName: {
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
		color: COLORS.text,
	},
	resultCountry: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		marginTop: SPACING.xs,
	},
});

export default DestinationSearch;
