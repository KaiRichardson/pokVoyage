import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BorderRadius, Colors, FontSizes, Layout, Spacing } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTripStore } from "@/store/tripStore";
import type { Trip } from "@/types";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function NewTripScreen() {
	const { user } = useAuth();
	const { addTrip } = useTripStore();
	const [name, setName] = useState("");
	const [destination, setDestination] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [description, setDescription] = useState("");
	const colorScheme = useColorScheme() ?? "light";
	const c = Colors[colorScheme];
	const themedStyles = useMemo(
		() =>
			StyleSheet.create({
				input: { ...staticStyles.input, backgroundColor: c.input, color: c.text },
				inputTextArea: { ...staticStyles.input, ...staticStyles.textArea, backgroundColor: c.input, color: c.text },
				btn: { ...staticStyles.btn, backgroundColor: c.tint },
			}),
		[c.input, c.text, c.tint]
	);

	async function handleCreate() {
		if (!user) return;
		if (!name.trim() || !destination.trim() || !startDate || !endDate) {
			Alert.alert("Missing fields", "Please fill in trip name, destination, and dates.");
			return;
		}
		const start = new Date(startDate);
		const end = new Date(endDate);
		if (end < start) {
			Alert.alert("Invalid dates", "End date must be after start date.");
			return;
		}
		const trip: Trip = {
			id: `trip_${Date.now()}_${Math.random().toString(36).slice(2)}`,
			userId: user.id,
			name: name.trim(),
			destination: destination.trim(),
			startDate,
			endDate,
			description: description.trim() || undefined,
			itinerary: [],
			createdAt: new Date().toISOString(),
		};
		await addTrip(trip);
		router.replace(`/trip/${trip.id}` as any);
	}

	return (
		<ThemedView style={staticStyles.container}>
			<TouchableOpacity onPress={() => router.back()} style={staticStyles.backBtn}>
				<ThemedText style={staticStyles.backText}>← Back</ThemedText>
			</TouchableOpacity>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={staticStyles.keyboard}>
				<ScrollView contentContainerStyle={staticStyles.scroll} keyboardShouldPersistTaps='handled'>
					<ThemedText style={staticStyles.label}>Trip Name</ThemedText>
					<TextInput
						style={themedStyles.input}
						placeholder='e.g. Summer in Paris'
						placeholderTextColor={c.placeholder}
						value={name}
						onChangeText={setName}
					/>
					<ThemedText style={staticStyles.label}>Destination</ThemedText>
					<TextInput
						style={themedStyles.input}
						placeholder='e.g. Paris, France'
						placeholderTextColor={c.placeholder}
						value={destination}
						onChangeText={setDestination}
					/>
					<ThemedText style={staticStyles.label}>Start Date (YYYY-MM-DD)</ThemedText>
					<TextInput
						style={themedStyles.input}
						placeholder='2025-06-01'
						placeholderTextColor={c.placeholder}
						value={startDate}
						onChangeText={setStartDate}
					/>
					<ThemedText style={staticStyles.label}>End Date (YYYY-MM-DD)</ThemedText>
					<TextInput
						style={themedStyles.input}
						placeholder='2025-06-10'
						placeholderTextColor={c.placeholder}
						value={endDate}
						onChangeText={setEndDate}
					/>
					<ThemedText style={staticStyles.label}>Description (optional)</ThemedText>
					<TextInput
						style={themedStyles.inputTextArea}
						placeholder="What's this trip about?"
						placeholderTextColor={c.placeholder}
						value={description}
						onChangeText={setDescription}
						multiline
					/>
					<TouchableOpacity style={themedStyles.btn} onPress={handleCreate}>
						<ThemedText style={staticStyles.btnText}>Create Trip</ThemedText>
					</TouchableOpacity>
				</ScrollView>
			</KeyboardAvoidingView>
		</ThemedView>
	);
}

const staticStyles = StyleSheet.create({
	container: { flex: 1 },
	backBtn: { padding: Spacing.lg, paddingBottom: Spacing.xs },
	backText: { fontSize: FontSizes.md, opacity: 0.8 },
	keyboard: { flex: 1 },
	scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
	label: { fontSize: FontSizes.sm, fontWeight: "600", marginBottom: Spacing.xs, marginTop: Spacing.md },
	input: {
		height: Layout.inputHeight,
		borderRadius: BorderRadius.lg,
		paddingHorizontal: Spacing.md,
		fontSize: FontSizes.md,
	},
	textArea: { height: 100, paddingTop: Spacing.sm },
	btn: {
		height: Layout.inputHeight,
		borderRadius: BorderRadius.lg,
		justifyContent: "center",
		alignItems: "center",
		marginTop: Spacing.xxl,
	},
	btnText: { color: Colors.light.white, fontSize: FontSizes.lg, fontWeight: "600" },
});
