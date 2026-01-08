import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Modal,
	ScrollView,
	ActivityIndicator,
	Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width > 600 ? 340 : width - 40;
const SERVER_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080/api";

function StrategyCard({ strategy, onPress }: { strategy: any; onPress: () => void }) {
	return (
		<TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
			<View style={styles.cardHeader}>
				<Ionicons name='trophy-outline' size={28} color='#3578e5' style={{ marginRight: 10 }} />
				<Text style={styles.cardTitle}>{strategy.name}</Text>
			</View>
			<Text style={styles.cardDesc} numberOfLines={2}>
				{strategy.description}
			</Text>
			<View style={styles.cardMetaRow}>
				<MaterialCommunityIcons name='account-outline' size={18} color='#a3cef1' />
				<Text style={styles.cardMeta}>{strategy.owner}</Text>
				<MaterialCommunityIcons name='chart-line' size={18} color='#a3cef1' style={{ marginLeft: 12 }} />
				<Text style={styles.cardMeta}>{strategy.strategyType}</Text>
			</View>
		</TouchableOpacity>
	);
}

function ChartPatternCard({ pattern }: { pattern: any }) {
	const isLong = pattern.market_situation === "LONG";
	const isShort = pattern.market_situation === "SHORT";
	return (
		<View style={[styles.patternCard, isLong ? styles.patternLong : isShort ? styles.patternShort : styles.patternNeutral]}>
			<Text style={styles.patternCode}>{pattern.code.replace(/_/g, " ")}</Text>
			<Text style={styles.patternDesc}>{pattern.description}</Text>
			<Text
				style={[
					styles.patternSituation,
					isLong ? styles.patternLongText : isShort ? styles.patternShortText : styles.patternNeutralText,
				]}>
				{pattern.market_situation}
			</Text>
		</View>
	);
}

export default function ExploreStrategies() {
	const [strategies, setStrategies] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState<any | null>(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [patterns, setPatterns] = useState<any[]>([]);
	const [patternsLoading, setPatternsLoading] = useState(true);
	const [patternsError, setPatternsError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		setError(null);
		fetch(`${SERVER_URL}/strategies`, { headers: { accept: "application/json" } })
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data.value)) {
					setStrategies(data.value);
				} else if (data.data && typeof data.data === "object") {
					setStrategies([data.data]);
				} else {
					setStrategies([]);
				}
				setLoading(false);
			})
			.catch(() => {
				setError("Could not load strategies.");
				setLoading(false);
			});
		setPatternsLoading(true);
		setPatternsError(null);
		fetch(`${SERVER_URL}/reference/chart_patterns`, { headers: { accept: "application/json" } })
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data.value)) setPatterns(data.value);
				else setPatterns([]);
				setPatternsLoading(false);
			})
			.catch(() => {
				setPatternsError("Could not load chart patterns.");
				setPatternsLoading(false);
			});
	}, []);

	const openDetails = (strategy: any) => {
		setSelected(strategy);
		setModalVisible(true);
	};

	return (
		<LinearGradient colors={["#0a2342", "#274472", "#41729f"]} style={styles.container}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
				<Text style={styles.pageTitle}>Top Strategies</Text>
				{loading ? (
					<ActivityIndicator size='large' color='#3578e5' style={{ marginTop: 40 }} />
				) : error ? (
					<Text style={styles.errorText}>{error}</Text>
				) : strategies.length === 0 ? (
					<Text style={styles.emptyText}>No strategies found. Be the first to create one!</Text>
				) : (
					<FlatList
						data={strategies}
						keyExtractor={(item) => item.reference}
						renderItem={({ item }) => <StrategyCard strategy={item} onPress={() => openDetails(item)} />}
						contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
						ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
						scrollEnabled={false}
					/>
				)}
				<Text style={styles.sectionTitle}>Chart Patterns</Text>
				{patternsLoading ? (
					<ActivityIndicator size='large' color='#3578e5' style={{ marginTop: 20 }} />
				) : patternsError ? (
					<Text style={styles.errorText}>{patternsError}</Text>
				) : patterns.length === 0 ? (
					<Text style={styles.emptyText}>No chart patterns found.</Text>
				) : (
					<FlatList
						data={patterns}
						keyExtractor={(item) => item.code}
						renderItem={({ item }) => <ChartPatternCard pattern={item} />}
						contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
						ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
						scrollEnabled={false}
					/>
				)}
			</ScrollView>
			<Modal visible={modalVisible} transparent animationType='fade'>
				<View style={styles.modalOverlay}>
					<View style={styles.modalCard}>
						<ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
							<Text style={styles.modalTitle}>{selected?.name}</Text>
							<Text style={styles.modalDesc}>{selected?.description}</Text>
							<View style={styles.modalMetaRow}>
								<MaterialCommunityIcons name='account-outline' size={20} color='#a3cef1' />
								<Text style={styles.modalMeta}>{selected?.owner}</Text>
								<MaterialCommunityIcons name='chart-line' size={20} color='#a3cef1' style={{ marginLeft: 14 }} />
								<Text style={styles.modalMeta}>{selected?.strategyType}</Text>
							</View>
							<Text style={styles.modalSection}>Details</Text>
							<Text style={styles.modalDetail}>
								State: <Text style={styles.modalDetailValue}>{selected?.state}</Text>
							</Text>
							<Text style={styles.modalDetail}>
								Market Type: <Text style={styles.modalDetailValue}>{selected?.marketType}</Text>
							</Text>
							<Text style={styles.modalDetail}>
								Exposure:{" "}
								<Text style={styles.modalDetailValue}>
									{selected?.exposure?.value} {selected?.exposure?.type}
								</Text>
							</Text>
							<Text style={styles.modalDetail}>
								Open Trade Limit: <Text style={styles.modalDetailValue}>{selected?.open_trade_limit}</Text>
							</Text>
							<Text style={styles.modalDetail}>
								Timeliness:{" "}
								<Text style={styles.modalDetailValue}>
									{selected?.timeliness?.interval} {selected?.timeliness?.type}
								</Text>
							</Text>
							<Text style={styles.modalDetail}>
								Expiration:{" "}
								<Text style={styles.modalDetailValue}>
									{selected?.expiration?.count} {selected?.expiration?.type}
								</Text>
							</Text>
							<Text style={styles.modalDetail}>
								Tradeables:{" "}
								<Text style={styles.modalDetailValue}>{selected?.tradeables?.map((t: any) => t.reference).join(", ")}</Text>
							</Text>
							<Text style={styles.modalDetail}>
								Order Type: <Text style={styles.modalDetailValue}>{selected?.order?.orderType}</Text>
							</Text>
							<Text style={styles.modalDetail}>
								Account Size: <Text style={styles.modalDetailValue}>{selected?.order?.accountSize}</Text>
							</Text>
							<Text style={styles.modalDetail}>
								Notifications:{" "}
								<Text style={styles.modalDetailValue}>
									{selected?.notification
										? Object.entries(selected.notification)
												.filter(([k, v]) => v)
												.map(([k]) => k)
												.join(", ")
										: ""}
								</Text>
							</Text>
						</ScrollView>
						<TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
							<Ionicons name='close' size={32} color='#fff' />
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 12 },
	pageTitle: {
		color: "#3578e5",
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 24,
		marginBottom: 12,
		letterSpacing: 1,
	},
	card: {
		backgroundColor: "rgba(25,38,58,0.92)",
		borderRadius: 18,
		padding: 22,
		width: CARD_WIDTH,
		alignSelf: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.18,
		shadowRadius: 8,
		elevation: 6,
		borderWidth: 1.5,
		borderColor: "#274472",
	},
	cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
	cardTitle: { color: "#fff", fontSize: 22, fontWeight: "bold", flex: 1 },
	cardDesc: { color: "#a3cef1", fontSize: 15, marginBottom: 10, fontWeight: "600" },
	cardMetaRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
	cardMeta: { color: "#a3cef1", fontSize: 13, marginLeft: 4, marginRight: 8 },
	modalOverlay: { flex: 1, backgroundColor: "#000a", justifyContent: "center", alignItems: "center" },
	modalCard: {
		backgroundColor: "#101a2b",
		borderRadius: 22,
		padding: 24,
		width: CARD_WIDTH + 20,
		maxWidth: 420,
		alignItems: "center",
		position: "relative",
		maxHeight: "85%",
	},
	modalTitle: { color: "#3578e5", fontSize: 26, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
	modalDesc: { color: "#a3cef1", fontSize: 16, marginBottom: 14, textAlign: "center", fontWeight: "600" },
	modalMetaRow: { flexDirection: "row", alignItems: "center", marginBottom: 10, justifyContent: "center" },
	modalMeta: { color: "#a3cef1", fontSize: 14, marginLeft: 6, marginRight: 10 },
	modalSection: { color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 12, marginBottom: 6 },
	modalDetail: { color: "#a3cef1", fontSize: 15, marginBottom: 2 },
	modalDetailValue: { color: "#3578e5", fontWeight: "bold" },
	closeBtn: { position: "absolute", top: 10, right: 10, backgroundColor: "#3578e5", borderRadius: 20, padding: 4 },
	errorText: { color: "#e74c3c", fontSize: 16, textAlign: "center", marginTop: 40 },
	emptyText: { color: "#a3cef1", fontSize: 18, textAlign: "center", marginTop: 40 },
	sectionTitle: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 32,
		marginBottom: 8,
		letterSpacing: 0.5,
	},
	patternCard: {
		backgroundColor: "rgba(25,38,58,0.92)",
		borderRadius: 16,
		padding: 18,
		width: CARD_WIDTH,
		alignSelf: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.12,
		shadowRadius: 6,
		elevation: 4,
		borderWidth: 1.2,
		borderColor: "#274472",
		marginBottom: 2,
	},
	patternCode: { color: "#3578e5", fontSize: 18, fontWeight: "bold", marginBottom: 4, textTransform: "capitalize" },
	patternDesc: { color: "#a3cef1", fontSize: 15, marginBottom: 6, fontWeight: "600" },
	patternSituation: { fontSize: 14, fontWeight: "bold", alignSelf: "flex-end", marginTop: 2 },
	patternLong: { borderLeftWidth: 6, borderLeftColor: "#4dff88" },
	patternShort: { borderLeftWidth: 6, borderLeftColor: "#e74c3c" },
	patternNeutral: { borderLeftWidth: 6, borderLeftColor: "#a3cef1" },
	patternLongText: { color: "#4dff88" },
	patternShortText: { color: "#e74c3c" },
	patternNeutralText: { color: "#a3cef1" },
});
