import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useTripStore } from "@store/tripStore";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import { COLORS, SPACING, FONT_SIZES, CURRENCIES } from "@utils/constants";
import { RootStackParamList } from "@navigation/types";
import { Destination } from "@types/trip";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CreateTripScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const { addTrip } = useTripStore();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [destinationName, setDestinationName] = useState("");
	const [country, setCountry] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [budget, setBudget] = useState("");
	const [currency, setCurrency] = useState("USD");
	const [showStartDatePicker, setShowStartDatePicker] = useState(false);
	const [showEndDatePicker, setShowEndDatePicker] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		// Validation
		if (!title.trim()) {
			Alert.alert("Error", "Please enter a trip title");
			return;
		}
		if (!destinationName.trim()) {
			Alert.alert("Error", "Please enter a destination");
			return;
		}
		if (!country.trim()) {
			Alert.alert("Error", "Please enter a country");
			return;
		}
		if (endDate < startDate) {
			Alert.alert("Error", "End date must be after start date");
			return;
		}
		if (!budget || parseFloat(budget) <= 0) {
			Alert.alert("Error", "Please enter a valid budget");
			return;
		}

		setLoading(true);

		try {
			const destination: Destination = {
				id: Date.now().toString(),
				name: destinationName,
				country: country,
				coordinates: {
					latitude: 0,
					longitude: 0,
				},
			};

			await addTrip({
				title: title.trim(),
				description: description.trim(),
				destination,
				startDate,
				endDate,
				budget: parseFloat(budget),
				currency,
				activities: [],
				accommodations: [],
				transportations: [],
				participants: [],
			});

			Alert.alert("Success", "Trip created successfully!", [
				{
					text: "OK",
					onPress: () => navigation.goBack(),
				},
			]);
		} catch (error) {
			Alert.alert("Error", "Failed to create trip. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.content}>
					<Input label='Trip Title *' value={title} onChangeText={setTitle} placeholder='e.g., Summer Vacation 2024' />

					<Input
						label='Description'
						value={description}
						onChangeText={setDescription}
						placeholder='Brief description of your trip'
						multiline
						numberOfLines={3}
						style={styles.textArea}
					/>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Destination</Text>
						<Input label='City/Place *' value={destinationName} onChangeText={setDestinationName} placeholder='e.g., Paris' />
						<Input label='Country *' value={country} onChangeText={setCountry} placeholder='e.g., France' />
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Dates</Text>
						<TouchableOpacity style={styles.dateButton} onPress={() => setShowStartDatePicker(true)}>
							<Text style={styles.dateLabel}>Start Date:</Text>
							<Text style={styles.dateValue}>{startDate.toLocaleDateString()}</Text>
						</TouchableOpacity>

						{showStartDatePicker && (
							<DateTimePicker
								value={startDate}
								mode='date'
								display='default'
								onChange={(event, selectedDate) => {
									setShowStartDatePicker(false);
									if (selectedDate) {
										setStartDate(selectedDate);
									}
								}}
							/>
						)}

						<TouchableOpacity style={styles.dateButton} onPress={() => setShowEndDatePicker(true)}>
							<Text style={styles.dateLabel}>End Date:</Text>
							<Text style={styles.dateValue}>{endDate.toLocaleDateString()}</Text>
						</TouchableOpacity>

						{showEndDatePicker && (
							<DateTimePicker
								value={endDate}
								mode='date'
								display='default'
								minimumDate={startDate}
								onChange={(event, selectedDate) => {
									setShowEndDatePicker(false);
									if (selectedDate) {
										setEndDate(selectedDate);
									}
								}}
							/>
						)}
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Budget</Text>
						<View style={styles.budgetContainer}>
							<View style={styles.currencyPicker}>
								<Text style={styles.currency}>{currency}</Text>
							</View>
							<Input
								value={budget}
								onChangeText={setBudget}
								placeholder='0.00'
								keyboardType='numeric'
								containerStyle={styles.budgetInput}
							/>
						</View>
					</View>

					<Button title='Create Trip' onPress={handleSubmit} loading={loading} style={styles.submitButton} />
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
	content: {
		padding: SPACING.md,
	},
	textArea: {
		height: 80,
		textAlignVertical: "top",
	},
	section: {
		marginTop: SPACING.lg,
	},
	sectionTitle: {
		fontSize: FONT_SIZES.lg,
		fontWeight: "bold",
		color: COLORS.text,
		marginBottom: SPACING.md,
	},
	dateButton: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: COLORS.card,
		padding: SPACING.md,
		borderRadius: 8,
		marginBottom: SPACING.sm,
	},
	dateLabel: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text,
		fontWeight: "600",
	},
	dateValue: {
		fontSize: FONT_SIZES.md,
		color: COLORS.primary,
	},
	budgetContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	currencyPicker: {
		backgroundColor: COLORS.card,
		padding: SPACING.md,
		borderRadius: 8,
		marginRight: SPACING.sm,
	},
	currency: {
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
		color: COLORS.text,
	},
	budgetInput: {
		flex: 1,
		marginBottom: 0,
	},
	submitButton: {
		marginTop: SPACING.xl,
		marginBottom: SPACING.lg,
	},
});

export default CreateTripScreen;
