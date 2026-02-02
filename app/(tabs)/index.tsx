import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BorderRadius, Colors, FontSizes, Spacing } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTripStore } from "@/store/tripStore";
import { Link, router } from "expo-router";
import { useEffect, useMemo } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

export default function TripsScreen() {
	const { user } = useAuth();
	const { trips, loadTrips, loaded } = useTripStore();
	const colorScheme = useColorScheme() ?? "light";
	const c = Colors[colorScheme];
	const themedStyles = useMemo(
		() =>
			StyleSheet.create({
				addBtn: { ...staticStyles.addBtn, backgroundColor: c.tint },
				ctaBtn: { ...staticStyles.ctaBtn, backgroundColor: c.tint },
				card: { ...staticStyles.card, backgroundColor: c.card },
			}),
		[c.tint, c.card]
	);

	useEffect(() => {
		if (user) loadTrips(user.id);
	}, [user?.id]);

	const tripList = Object.values(trips).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	return (
		<ThemedView style={staticStyles.container}>
			<View style={staticStyles.header}>
				<ThemedText type='title'>My Trips</ThemedText>
				<Link href={"/new-trip" as any} asChild>
					<TouchableOpacity style={themedStyles.addBtn}>
						<ThemedText style={staticStyles.addBtnText}>+ New Trip</ThemedText>
					</TouchableOpacity>
				</Link>
			</View>

			{!loaded ? (
				<ThemedText style={staticStyles.empty}>Loading...</ThemedText>
			) : tripList.length === 0 ? (
				<View style={staticStyles.emptyState}>
					<ThemedText style={staticStyles.emptyIcon}>✈️</ThemedText>
					<ThemedText type='subtitle' style={staticStyles.emptyTitle}>
						No trips yet
					</ThemedText>
					<ThemedText style={staticStyles.emptyDesc}>Plan your next adventure! Create a trip to get started.</ThemedText>
					<Link href={"/new-trip" as any} asChild>
						<TouchableOpacity style={themedStyles.ctaBtn}>
							<ThemedText style={staticStyles.ctaBtnText}>Create your first trip</ThemedText>
						</TouchableOpacity>
					</Link>
				</View>
			) : (
				<FlatList
					data={tripList}
					keyExtractor={(t) => t.id}
					contentContainerStyle={staticStyles.list}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={themedStyles.card}
							onPress={() => router.push(`/trip/${item.id}` as any)}
							activeOpacity={0.7}>
							<View style={staticStyles.cardHeader}>
								<ThemedText type='defaultSemiBold' style={staticStyles.cardTitle}>
									{item.name}
								</ThemedText>
								<ThemedText style={staticStyles.cardDest}>{item.destination}</ThemedText>
							</View>
							<ThemedText style={staticStyles.cardDates}>
								{formatDate(item.startDate)} – {formatDate(item.endDate)}
							</ThemedText>
							{item.itinerary?.length ? (
								<ThemedText style={staticStyles.cardMeta}>{item.itinerary.length} activities planned</ThemedText>
							) : null}
						</TouchableOpacity>
					)}
				/>
			)}
		</ThemedView>
	);
}

function formatDate(s: string) {
	return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const staticStyles = StyleSheet.create({
	container: { flex: 1, paddingTop: Spacing.headerTop, paddingHorizontal: Spacing.lg },
	header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: Spacing.xl },
	addBtn: {
		paddingHorizontal: Spacing.md,
		paddingVertical: Spacing.md - 2,
		borderRadius: BorderRadius.md,
	},
	addBtnText: { color: Colors.light.white, fontWeight: "600", fontSize: FontSizes.sm },
	list: { paddingBottom: Spacing.xl },
	card: {
		borderRadius: BorderRadius.xl,
		padding: Spacing.lg,
		marginBottom: Spacing.sm,
	},
	cardHeader: { marginBottom: Spacing.xxs },
	cardTitle: { fontSize: FontSizes.lg, marginBottom: 2 },
	cardDest: { fontSize: FontSizes.sm, opacity: 0.8 },
	cardDates: { fontSize: FontSizes.sm - 1, opacity: 0.7, marginTop: Spacing.xxs },
	cardMeta: { fontSize: FontSizes.xs, opacity: 0.6, marginTop: 2 },
	empty: { textAlign: "center", marginTop: Spacing.xxxl },
	emptyState: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: Spacing.xxxl },
	emptyIcon: { fontSize: 64, marginBottom: Spacing.md },
	emptyTitle: { marginBottom: Spacing.xs },
	emptyDesc: { textAlign: "center", marginBottom: Spacing.xl, opacity: 0.8 },
	ctaBtn: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm + 2, borderRadius: BorderRadius.lg },
	ctaBtnText: { color: Colors.light.white, fontWeight: "600", fontSize: FontSizes.md },
});
