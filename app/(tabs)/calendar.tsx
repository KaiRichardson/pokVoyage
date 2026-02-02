import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BorderRadius, Colors, FontSizes, Spacing } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTripStore } from "@/store/tripStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarScreen() {
	const { user } = useAuth();
	const { trips, loadTrips, loaded } = useTripStore();
	const colorScheme = useColorScheme() ?? "light";
	const c = Colors[colorScheme];
	const [selected, setSelected] = useState("");

	useEffect(() => {
		if (user) loadTrips(user.id);
	}, [user?.id]);

	const markedDates = useCallback(() => {
		const marked: Record<string, { marked?: boolean; dotColor?: string }> = {};
		for (const trip of Object.values(trips)) {
			const start = new Date(trip.startDate);
			const end = new Date(trip.endDate);
			for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
				const key = d.toISOString().slice(0, 10);
				marked[key] = { marked: true, dotColor: c.tint };
			}
			for (const item of trip.itinerary || []) {
				if (item.date) {
					marked[item.date] = { marked: true, dotColor: c.success };
				}
			}
		}
		if (selected) {
			marked[selected] = { ...marked[selected], marked: true };
		}
		return marked;
	}, [trips, selected, c.tint]);

	const getItemsForDate = (date: string) => {
		const items: { trip: string; item: string; time?: string }[] = [];
		for (const trip of Object.values(trips)) {
			if (date >= trip.startDate && date <= trip.endDate) {
				items.push({ trip: trip.name, item: trip.destination, time: undefined });
			}
			for (const i of trip.itinerary || []) {
				if (i.date === date) {
					items.push({
						trip: trip.name,
						item: i.title,
						time: i.startTime,
					});
				}
			}
		}
		return items;
	};

	const dayItems = selected ? getItemsForDate(selected) : [];
	const themedStyles = useMemo(
		() =>
			StyleSheet.create({
				dayCard: { ...staticStyles.dayCard, backgroundColor: c.card },
			}),
		[c.card]
	);

	return (
		<ThemedView style={staticStyles.container}>
			<View style={staticStyles.header}>
				<ThemedText type='title'>Calendar</ThemedText>
			</View>
			<Calendar
				onDayPress={(day) => setSelected(day.dateString)}
				markedDates={{
					...markedDates(),
					...(selected ? { [selected]: { selected: true, selectedColor: c.tint } } : {}),
				}}
				theme={{
					backgroundColor: "transparent",
					calendarBackground: "transparent",
					textSectionTitleColor: c.text,
					selectedDayBackgroundColor: c.tint,
					selectedDayTextColor: c.white,
					todayTextColor: c.tint,
					dayTextColor: c.text,
					textDisabledColor: c.placeholder,
					arrowColor: c.tint,
				}}
				style={staticStyles.calendar}
			/>
			{selected && (
				<View style={staticStyles.daySection}>
					<ThemedText type='subtitle' style={staticStyles.dayTitle}>
						{new Date(selected).toLocaleDateString("en-US", {
							weekday: "long",
							month: "long",
							day: "numeric",
						})}
					</ThemedText>
					<ScrollView style={staticStyles.dayList}>
						{dayItems.length === 0 ? (
							<ThemedText style={staticStyles.noItems}>No activities on this day</ThemedText>
						) : (
							dayItems.map((x, i) => (
								<View key={i} style={themedStyles.dayCard}>
									<ThemedText type='defaultSemiBold'>{x.item}</ThemedText>
									<ThemedText style={staticStyles.dayMeta}>
										{x.trip} {x.time ? `• ${x.time}` : ""}
									</ThemedText>
								</View>
							))
						)}
					</ScrollView>
				</View>
			)}
		</ThemedView>
	);
}

const staticStyles = StyleSheet.create({
	container: { flex: 1, paddingTop: Spacing.headerTop, paddingHorizontal: Spacing.md },
	header: { marginBottom: Spacing.md },
	calendar: { borderRadius: BorderRadius.lg, marginBottom: Spacing.lg },
	daySection: { flex: 1 },
	dayTitle: { marginBottom: Spacing.sm },
	dayList: { flex: 1 },
	dayCard: {
		padding: Spacing.md,
		borderRadius: BorderRadius.lg,
		marginBottom: Spacing.xs,
	},
	dayMeta: { fontSize: FontSizes.sm - 1, opacity: 0.7, marginTop: Spacing.xxs },
	noItems: { opacity: 0.7, paddingVertical: Spacing.lg },
});
