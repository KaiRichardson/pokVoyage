import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BorderRadius, Colors, FontSizes, Layout, Spacing } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTripStore } from "@/store/tripStore";
import type { ItineraryItem } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, Modal, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CATEGORIES: ItineraryItem["category"][] = ["activity", "flight", "accommodation", "food", "transport", "other"];
const HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

const CAT_LABELS: Record<ItineraryItem["category"], string> = {
	activity: "Activity",
	flight: "Flight",
	accommodation: "Stay",
	food: "Food",
	transport: "Transport",
	other: "Other",
};

export default function TripDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { user } = useAuth();
	const { trips, loadTrips, reorderItinerary, addItineraryItem, removeItineraryItem, deleteTrip } = useTripStore();
	const [modalVisible, setModalVisible] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newCategory, setNewCategory] = useState<ItineraryItem["category"]>("activity");
	const [newDate, setNewDate] = useState("");
	const [newTime, setNewTime] = useState("");
	const colorScheme = useColorScheme() ?? "light";
	const c = Colors[colorScheme];
	const themedStyles = useMemo(
		() =>
			StyleSheet.create({
				addBtn: { ...staticStyles.addBtn, backgroundColor: c.tint },
				card: { ...staticStyles.card, backgroundColor: c.card },
				cardActive: { ...staticStyles.card, backgroundColor: c.tint + "40" },
				handle: { ...staticStyles.handle, backgroundColor: c.tint },
				modalContent: { ...staticStyles.modalContent, backgroundColor: c.background },
				input: { ...staticStyles.input, backgroundColor: c.card, color: c.text },
				catBtnSelected: { ...staticStyles.catBtn, backgroundColor: c.tint },
				catBtnTextSelected: { ...staticStyles.catBtnText, color: c.white },
				saveBtn: { ...staticStyles.modalBtn, ...staticStyles.saveBtn, backgroundColor: c.tint },
			}),
		[c.tint, c.card, c.background, c.white]
	);

	const trip = id ? trips[id] : null;

	useEffect(() => {
		if (user?.id) loadTrips(user.id);
	}, [user?.id, id]);

	useEffect(() => {
		if (trip) {
			setNewDate(trip.startDate);
		}
	}, [trip?.startDate]);

	if (!trip) {
		return (
			<ThemedView style={staticStyles.container}>
				<ThemedText>Loading...</ThemedText>
			</ThemedView>
		);
	}

	const itinerary = [...(trip.itinerary || [])].sort((a, b) => a.order - b.order);

	async function handleAddItem() {
		if (!trip || !newTitle.trim() || !newDate) {
			Alert.alert("Missing info", "Please enter a title and date.");
			return;
		}
		await addItineraryItem(trip.id, {
			tripId: trip.id,
			title: newTitle.trim(),
			date: newDate,
			startTime: newTime || undefined,
			category: newCategory,
		});
		setNewTitle("");
		setNewTime("");
		setModalVisible(false);
	}

	async function handleRemove(itemId: string) {
		if (!trip) return;
		Alert.alert("Remove", "Remove this item?", [
			{ text: "Cancel", style: "cancel" },
			{ text: "Remove", style: "destructive", onPress: () => removeItineraryItem(trip.id, itemId) },
		]);
	}

	return (
		<ThemedView style={staticStyles.container}>
			<View style={staticStyles.topBar}>
				<TouchableOpacity onPress={() => router.back()} style={staticStyles.backBtn}>
					<ThemedText style={staticStyles.backText}>← Back</ThemedText>
				</TouchableOpacity>
			</View>
			<View style={staticStyles.header}>
				<ThemedText type='title' style={staticStyles.tripName}>
					{trip.name}
				</ThemedText>
				<ThemedText style={staticStyles.dest}>{trip.destination}</ThemedText>
				<ThemedText style={staticStyles.dates}>
					{new Date(trip.startDate).toLocaleDateString()} – {new Date(trip.endDate).toLocaleDateString()}
				</ThemedText>
			</View>

			<View style={staticStyles.itineraryHeader}>
				<ThemedText type='subtitle'>Itinerary</ThemedText>
				<TouchableOpacity style={themedStyles.addBtn} onPress={() => setModalVisible(true)}>
					<ThemedText style={staticStyles.addBtnText}>+ Add</ThemedText>
				</TouchableOpacity>
			</View>

			<ThemedText style={staticStyles.dragHint}>Drag to reorder</ThemedText>

			<GestureHandlerRootView style={staticStyles.dragList}>
				<DraggableFlatList
					data={itinerary}
					keyExtractor={(item) => item.id}
					onDragEnd={({ data }) => reorderItinerary(trip.id, data)}
					renderItem={({ item, drag, isActive }: RenderItemParams<ItineraryItem>) => (
						<ScaleDecorator>
							<TouchableOpacity
								onLongPress={drag}
								disabled={isActive}
								style={isActive ? themedStyles.cardActive : themedStyles.card}>
								<View style={staticStyles.cardLeft}>
									<View style={themedStyles.handle} />
									<View>
										<ThemedText type='defaultSemiBold'>{item.title}</ThemedText>
										<ThemedText style={staticStyles.cardMeta}>
											{CAT_LABELS[item.category]}
											{item.startTime ? ` • ${item.startTime}` : ""}
											{item.date ? ` • ${new Date(item.date).toLocaleDateString()}` : ""}
										</ThemedText>
									</View>
								</View>
								<TouchableOpacity onPress={() => handleRemove(item.id)} style={staticStyles.removeBtn} hitSlop={HIT_SLOP}>
									<ThemedText style={staticStyles.remove}>✕</ThemedText>
								</TouchableOpacity>
							</TouchableOpacity>
						</ScaleDecorator>
					)}
				/>
			</GestureHandlerRootView>

			<Modal visible={modalVisible} animationType='slide' transparent>
				<View style={staticStyles.modalOverlay}>
					<View style={themedStyles.modalContent}>
						<ThemedText type='subtitle' style={staticStyles.modalTitle}>
							Add activity
						</ThemedText>
						<TextInput
							style={themedStyles.input}
							placeholder='Title'
							placeholderTextColor={c.placeholder}
							value={newTitle}
							onChangeText={setNewTitle}
						/>
						<TextInput
							style={themedStyles.input}
							placeholder='Date (YYYY-MM-DD)'
							placeholderTextColor={c.placeholder}
							value={newDate}
							onChangeText={setNewDate}
						/>
						<TextInput
							style={themedStyles.input}
							placeholder='Time (optional, e.g. 14:00)'
							placeholderTextColor={c.placeholder}
							value={newTime}
							onChangeText={setNewTime}
						/>
						<ScrollView horizontal style={staticStyles.catScroll}>
							{CATEGORIES.map((cat) => (
								<TouchableOpacity
									key={cat}
									style={newCategory === cat ? themedStyles.catBtnSelected : staticStyles.catBtn}
									onPress={() => setNewCategory(cat)}>
									<ThemedText style={newCategory === cat ? themedStyles.catBtnTextSelected : staticStyles.catBtnText}>
										{CAT_LABELS[cat]}
									</ThemedText>
								</TouchableOpacity>
							))}
						</ScrollView>
						<View style={staticStyles.modalActions}>
							<TouchableOpacity style={[staticStyles.modalBtn, staticStyles.cancelBtn]} onPress={() => setModalVisible(false)}>
								<ThemedText>Cancel</ThemedText>
							</TouchableOpacity>
							<TouchableOpacity style={themedStyles.saveBtn} onPress={handleAddItem}>
								<ThemedText style={staticStyles.saveBtnText}>Add</ThemedText>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</ThemedView>
	);
}

const staticStyles = StyleSheet.create({
	container: { flex: 1, paddingTop: Platform.OS === "ios" ? Spacing.headerTop : Spacing.lg, paddingHorizontal: Spacing.lg },
	topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: Spacing.sm },
	backBtn: {},
	backText: { fontSize: FontSizes.md, opacity: 0.8 },
	header: { marginBottom: Spacing.xl },
	tripName: { marginBottom: Spacing.xxs },
	dest: { fontSize: FontSizes.md, opacity: 0.8 },
	dates: { fontSize: FontSizes.sm, opacity: 0.6, marginTop: Spacing.xxs },
	itineraryHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: Spacing.xs,
	},
	addBtn: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.md },
	addBtnText: { color: Colors.light.white, fontWeight: "600" },
	dragHint: { fontSize: FontSizes.xs, opacity: 0.6, marginBottom: Spacing.sm },
	dragList: { flex: 1 },
	card: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: Spacing.md,
		borderRadius: BorderRadius.lg,
		marginBottom: Spacing.xs,
	},
	cardLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
	handle: { width: Spacing.xxs, height: 32, borderRadius: BorderRadius.xs, marginRight: Spacing.sm },
	cardMeta: { fontSize: FontSizes.xs, opacity: 0.7, marginTop: 2 },
	removeBtn: { padding: Spacing.xs },
	remove: { fontSize: FontSizes.lg, opacity: 0.6 },
	modalOverlay: {
		flex: 1,
		backgroundColor: Colors.light.overlay,
		justifyContent: "flex-end",
	},
	modalContent: {
		borderTopLeftRadius: BorderRadius.xxl,
		borderTopRightRadius: BorderRadius.xxl,
		padding: Spacing.xl,
		paddingBottom: Spacing.xxxl,
	},
	modalTitle: { marginBottom: Spacing.lg },
	input: {
		height: Layout.inputHeight,
		borderRadius: BorderRadius.lg,
		paddingHorizontal: Spacing.md,
		fontSize: FontSizes.md,
		marginBottom: Spacing.sm,
	},
	catScroll: { marginBottom: Spacing.lg, flexGrow: 0 },
	catBtn: {
		paddingHorizontal: Spacing.md,
		paddingVertical: Spacing.md - 2,
		borderRadius: BorderRadius.md,
		marginRight: Spacing.xs,
		backgroundColor: Colors.light.cardAlt,
	},
	catBtnText: {},
	modalActions: { flexDirection: "row", gap: Spacing.sm },
	modalBtn: {
		flex: 1,
		height: Layout.inputHeight,
		borderRadius: BorderRadius.lg,
		justifyContent: "center",
		alignItems: "center",
	},
	cancelBtn: { backgroundColor: Colors.light.cardAlt },
	saveBtn: {},
	saveBtnText: { color: Colors.light.white, fontWeight: "600" },
});
