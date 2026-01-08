// import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "expo-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	ImageBackground,
	ImageSourcePropType,
	Image,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useNavigation } from "@react-navigation/native";
import ptData from "./FakeData.json";
// import Theme from "@/constants/theme";

const { width } = Dimensions.get("window");

export default function Home() {
	const { t } = useTranslation();
	const { width } = Dimensions.get("window");
	const [isPointerShown, setIsPointerShown] = useState(false);
	const navigation = useNavigation() as any;

	const [filteredData, setFilteredData] = useState<{ value: number; date: string }[]>([]);

	//correct date format
	const parseDate = (s: string) => {
		// Expected: MM/DD/YYYY HH:mm:ss
		const [datePart, timePart] = s.split(" ");
		const [month, day, year] = datePart.split("/").map(Number);
		const [hour = 0, minute = 0, second = 0] = timePart ? timePart.split(":").map(Number) : [];

		return new Date(year, month - 1, day, hour, minute, second);
	};

	const [startDate, setStartDate] = useState(parseDate(ptData[0].date));
	const [endDate, setEndDate] = useState(parseDate(ptData[ptData.length - 1].date));

	useEffect(() => {
		const newFilteredData = ptData.filter((item) => {
			const itemDate = parseDate(item.date);
			return itemDate >= startDate && itemDate <= endDate;
		});

		setFilteredData(newFilteredData);
	}, [startDate, endDate]);

	const [selectedRange, setSelectedRange] = useState(3650); // default to 'All' range

	// changing the date range
	const changeDateRange = (days: number) => {
		setSelectedRange(days);
		const last = parseDate(ptData[ptData.length - 1].date);
		if (isNaN(last.getTime())) return;

		const start = new Date(last);
		start.setDate(start.getDate() - days);

		setStartDate(start);
		setEndDate(last);
	};

	// function days_passed(dt: any) {
	// 	const current = new Date(dt.getTime());
	// 	const previous = new Date(dt.getFullYear(), 0, 1);
	// 	return Math.ceil((current.getTime() - previous.getTime() + 1) / 86400000);
	// }

	// get date range value difference
	const dateRangeValueDif = (data: any) => {
		const difference: number = data[data.length - 1].value - data[0].value;
		if (difference > 0) {
			return <Text style={[styles.gainsText, { color: "#2AC48A" }]}>{`+${difference.toLocaleString()}`}</Text>;
		} else if (difference < 0) {
			return <Text style={[styles.gainsText, { color: "#D34547" }]}>{`${difference.toLocaleString()}`}</Text>;
		} else {
			return <Text style={[styles.gainsText, { color: "#D8D8D8" }]}>0</Text>;
		}
	};

	// background images for strategy cards
	const backgroundImageGreen: ImageSourcePropType = require("../../assets/images/strategy-item-card_gn.png");
	const backgroundImageRed: ImageSourcePropType = require("../../assets/images/strategy-item-card_rd.png");
	const backgroundImageNew: ImageSourcePropType = require("../../assets/images/new-strategy-btn.png");

	const GRID_DATA = [
		{ id: 1, name: "Bollinger Bands_01", allTime: 0.1677, thisWeek: -0.0357, status: "active" },
		{ id: 2, name: "Bozo Strategy", allTime: -3.2417, thisWeek: -0.0123, status: "inactive" },
		{ id: 3, name: "Get Rich Quick Scheme", allTime: 16.9477, thisWeek: 0.0232, status: "active" },
		{ id: 4, name: "new item", allTime: 0, thisWeek: 0, status: "null", addNew: true },
	];

	// strategy cards component
	const renderStratCard = ({ item }: any) => (
		<>
			{item.addNew ? (
				<TouchableOpacity
					style={styles.stratCardContainer}
					onPress={() => navigation.navigate("StrategyGrid")}
					activeOpacity={0.8}>
					<ImageBackground source={backgroundImageNew} style={styles.stratCardBackground} resizeMode='contain'></ImageBackground>
				</TouchableOpacity>
			) : (
				<TouchableOpacity style={styles.stratCardContainer} activeOpacity={0.8}>
					<LinearGradient
						colors={["#afabc6", "#0a1b2f", "#4c3f53"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.stratCardGradient}>
						<View style={styles.stratCardGradientContainer}>
							<ImageBackground
								source={item.allTime >= 0 ? backgroundImageGreen : backgroundImageRed}
								style={styles.stratCardBackground}
								resizeMode='cover' // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
							>
								<Text style={styles.stratCardName}>{item.name}</Text>

								<View style={styles.stratCardInfoSection}>
									<View style={styles.stratCardInfoContainer}>
										<Text style={[styles.stratCardInfoLabel]}>All Time:</Text>
										<Text style={[styles.stratCardInfoData, item.allTime >= 0 ? { color: "#2AC48A" } : { color: "#C42A2A" }]}>
											{`${parseFloat((item.allTime * 100).toFixed(4))}%`}
										</Text>
									</View>
									<View style={styles.stratCardInfoContainer}>
										<Text style={[styles.stratCardInfoLabel]}>This Week:</Text>
										<Text style={[styles.stratCardInfoData, item.thisWeek >= 0 ? { color: "#2AC48A" } : { color: "#C42A2A" }]}>
											{`${parseFloat((item.thisWeek * 100).toFixed(4))}%`}
										</Text>
									</View>
									<View style={styles.stratCardInfoContainer}>
										<Text style={[styles.stratCardInfoLabel]}>Status:</Text>
										<Text
											style={[
												styles.stratCardInfoData,
												item.status === "active" ? { color: "#2AC48A" } : { color: "#888888ff" },
											]}>
											{item.status}
										</Text>
									</View>
								</View>
							</ImageBackground>
						</View>
					</LinearGradient>
				</TouchableOpacity>
			)}
		</>
	);

	const BTN_DATA = [
		{ id: 1, text: "1 Active Strategy", icon: false },
		{ id: 2, text: "1,4453 Tokens", icon: require("../../assets/images/token-icon2.png") },
	];

	// top button component
	function renderTopButton({ item }: any) {
		return (
			<TouchableOpacity style={styles.topButtonContainerTouch} activeOpacity={0.8} onPress={() => {}}>
				<LinearGradient
					colors={["#afabc6", "#0a1b2f", "#4c3f53"]}
					start={{ x: 0.06, y: 0.1 }}
					end={{ x: 0.1, y: 1.5 }}
					style={styles.topButtonGradient}>
					<LinearGradient
						colors={["#1d1223", "#352f37ff", "#1d1223"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.topButtonContainerGradient}>
						{item.icon ? <Image style={[styles.topButtonIcon]} source={item.icon}></Image> : null}
						<Text style={styles.topButtonText}>{item.text}</Text>
					</LinearGradient>
				</LinearGradient>
			</TouchableOpacity>
		);
	}

	// range data for selector
	const RNG_DATA = [
		{ id: 1, text: "1D", value: 1 },
		{ id: 2, text: "5D", value: 5 },
		{ id: 3, text: "1M", value: 30 },
		{ id: 4, text: "YTD", value: 366 },
		{ id: 5, text: "1Y", value: 365 },
		{ id: 6, text: "5Y", value: 1780 },
		{ id: 7, text: "All", value: 3650 },
	];

	// range selector items component
	function renderRangeSelectorItems({ item }: any) {
		return (
			<TouchableOpacity style={styles.dateRangePicker} activeOpacity={0.8} onPress={() => changeDateRange(item.value)}>
				{selectedRange === item.value ? (
					<LinearGradient
						colors={["#1d1223", "#352f37c9", "#1d1223"]}
						start={{ x: 0, y: 1 }}
						end={{ x: 1, y: 1 }}
						style={styles.dateRangePickerItemGradient}>
						<Text style={styles.dateRangePickerLabel}>{item.text}</Text>
					</LinearGradient>
				) : (
					<Text style={styles.dateRangePickerLabel}>{item.text}</Text>
				)}
			</TouchableOpacity>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.container} scrollEnabled={!isPointerShown}>
			{/* status */}
			<View style={styles.tradingBalanceContainer}>
				<TouchableOpacity style={styles.tradingBalanceButton} activeOpacity={0.8} onPress={() => {}}>
					<Text style={styles.tradingBalanceButtonText}>Paper Trading Balance</Text>
					<Image style={[styles.tradingBalanceButtonIcon]} source={require("../../assets/images/folder-icon.png")}></Image>
				</TouchableOpacity>

				<Text style={styles.tradingBalance}>{`$${ptData[ptData.length - 1].value.toLocaleString()}`}</Text>
			</View>
			<View style={styles.topButtonContainer}>
				{renderTopButton({ item: BTN_DATA[0] })}
				{renderTopButton({ item: BTN_DATA[1] })}
			</View>

			{/* chart */}
			<View style={styles.chart}>
				<LineChart
					areaChart
					data={filteredData}
					width={width}
					height={200}
					maxValue={7000}
					overflowTop={10}
					adjustToWidth={true}
					disableScroll
					hideDataPoints
					curved
					color='#00C247'
					startFillColor='rgba(20,105,81,0.3)'
					startOpacity={0.3}
					endOpacity={0}
					initialSpacing={0}
					hideRules={true}
					hideYAxisText={true}
					yAxisColor='rgba(0, 0, 0, 0)'
					yAxisLabelWidth={0}
					xAxisColor='rgba(0, 0, 0, 0)'
					pointerConfig={{
						pointerStripHeight: 150,
						pointerStripColor: "lightgray",
						pointerStripWidth: 2,
						pointerColor: "lightgray",
						radius: 6,
						pointerLabelWidth: 100,
						pointerLabelHeight: 90,
						activatePointersOnLongPress: true,
						autoAdjustPointerLabelPosition: false,
						// dynamicLegendContainerStyle: {
						// 	position: "absolute",
						// 	top: 0,
						// },
						// dynamicLegendComponent: (items: any[]) => {
						// 	return (
						// 		<View style={styles.chartStatusContainer}>
						// 			<Text style={styles.chartStatusAmount}>{`$${items[0].value}.0`}</Text>
						// 			<Text style={styles.chartStatusDate}>{`${items[0].date}`}</Text>
						// 		</View>
						// 	);
						// },
						pointerLabelComponent: (items: any[]) => {
							return (
								<View
									style={{
										height: 90,
										width: 100,
										justifyContent: "center",
										marginTop: -30,
										marginLeft: -40,
									}}>
									<Text style={{ color: "white", fontSize: 14, marginBottom: 6, textAlign: "center" }}>{items[0].date}</Text>

									<View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: "white" }}>
										<Text style={{ fontWeight: "bold", textAlign: "center" }}>{"$" + items[0].value}</Text>
									</View>
								</View>
							);
						},
					}}
					getPointerProps={({ pointerX }: { pointerX: number }) => setIsPointerShown(pointerX !== 0)}
				/>
			</View>

			{/* gains display */}
			<View style={styles.gainsContainer}>{filteredData.length > 0 && dateRangeValueDif(filteredData)}</View>

			{/* date range picker */}
			<LinearGradient
				colors={["#afabc6", "#0a1b2f", "#4c3f53"]}
				start={{ x: 0.083, y: 0.1 }}
				end={{ x: 0.1, y: 1.5 }}
				style={styles.dateRangePickerGradient}>
				<View style={styles.dateRangePickerContainer}>
					{renderRangeSelectorItems({ item: RNG_DATA[0] })}
					{renderRangeSelectorItems({ item: RNG_DATA[1] })}
					{renderRangeSelectorItems({ item: RNG_DATA[2] })}
					{renderRangeSelectorItems({ item: RNG_DATA[3] })}
					{renderRangeSelectorItems({ item: RNG_DATA[4] })}
					{renderRangeSelectorItems({ item: RNG_DATA[5] })}
					{renderRangeSelectorItems({ item: RNG_DATA[6] })}
					{/* </View> */}
				</View>
			</LinearGradient>

			{/* cards */}
			<View style={styles.content}>
				<View style={styles.stratSectionHeader}>
					<Text style={styles.stratSectionHeaderTitle}>My Strategies</Text>
					<TouchableOpacity
						style={styles.stratSectionHeaderLinkContainer}
						activeOpacity={0.8}
						onPress={() => navigation.navigate("StrategyGrid")}>
						<Text style={styles.stratSectionHeaderLink}>View all</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.gridWrapper}>
					<FlatList
						data={GRID_DATA}
						renderItem={renderStratCard}
						// keyExtractor={(item) => item.key}
						numColumns={2}
						columnWrapperStyle={{ justifyContent: "space-between" }}
						scrollEnabled={false}
					/>
					{/* <TouchableOpacity style={styles.addStratCardContainer} onPress={() => {}} activeOpacity={0.8}>
						<Ionicons style={styles.addStratCardIcon} name='add-outline' />
					</TouchableOpacity> */}
				</View>
			</View>
		</ScrollView>
	);
}

const CARD_SIZE = (width - 48 - 20) / 2; // 24px padding each side, 16px gap

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#0E0014",
		paddingTop: 20,
		paddingBottom: 40,
		alignItems: "center",
	},

	// top section styles
	tradingBalanceContainer: {
		width: width - 48,
	},
	tradingBalanceButton: {
		flexDirection: "row",
		paddingBottom: 4,
	},
	tradingBalanceButtonText: {
		color: "#9A9A9A",
		fontSize: 16,
		textDecorationLine: "underline",
	},
	tradingBalanceButtonIcon: {
		marginLeft: 6,
		width: 20,
		height: 20,
		resizeMode: "contain",
	},
	tradingBalance: {
		color: "#EAEAEA",
		fontSize: 40,
		paddingBottom: 10,
	},

	topButtonContainer: {
		flexDirection: "row",
		width: width - 48,
	},
	topButtonContainerTouch: {
		paddingRight: 10,
	},
	topButtonGradient: {
		borderRadius: 14,
		padding: 0.3,
		height: 30,
	},
	topButtonContainerGradient: {
		flex: 1,
		flexDirection: "row",
		borderRadius: 37,
		alignItems: "center",
		justifyContent: "center",
		height: 30,
		paddingHorizontal: 15,
	},
	topButtonIcon: {
		width: 20,
		height: 20,
		resizeMode: "contain",
		marginRight: 10,
	},
	topButtonText: {
		color: "#F5F5F5",
		fontSize: 13,
	},

	// chart styles
	chart: {
		alignSelf: "center",
		paddingTop: 20,
	},

	chartStatusContainer: {
		width: width - 48,
		marginVertical: 20,
	},
	chartStatusAmount: {
		fontSize: 32,
		color: "#EAEAEA",
		fontWeight: "bold",
	},
	chartStatusDate: {
		fontSize: 16,
		color: "#ccc",
		marginTop: 4,
	},

	// gains styles
	gainsContainer: {
		width: width - 48,
		alignItems: "center",
		marginBottom: 20,
	},
	gainsText: {
		fontSize: 14,
	},

	// date range picker styles
	dateRangePickerGradient: {
		width: width - 48,
		borderRadius: 10,
		padding: 0.3,
		overflow: "hidden",
		marginBottom: 30,
		height: 40,
	},
	dateRangePickerContainer: {
		flex: 1,
		borderRadius: 11,
		backgroundColor: "#1d1223",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},
	dateRangePicker: {
		height: "100%",
		justifyContent: "center",
	},
	dateRangePickerItemGradient: {
		height: "100%",
		justifyContent: "center",
	},
	dateRangePickerLabel: {
		color: "#969696",
		fontWeight: "bold",
		fontSize: 12,
		textAlign: "center",
		padding: 8,
		borderRadius: 8,
	},

	// strategy card styles
	content: {
		flex: 1,
		alignItems: "center",
	},
	stratSectionHeader: {
		width: width - 48,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 5,
	},
	stratSectionHeaderTitle: {
		color: "#EAEAEA",
		fontSize: 20,
	},
	stratSectionHeaderLinkContainer: {
		padding: 6,
	},
	stratSectionHeaderLink: {
		color: "#9A9A9A",
		fontSize: 14,
	},
	gridWrapper: {
		width: width - 48,
		alignSelf: "center",
		marginBottom: 75,
	},
	stratCardContainer: {
		width: CARD_SIZE,
		height: CARD_SIZE,
		marginBottom: 15,
	},
	stratCardGradient: {
		borderRadius: 10,
		padding: 0.3,
	},
	stratCardGradientContainer: {
		borderRadius: 11,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#1d1223",
		overflow: "hidden",
	},
	stratCardBackground: {
		justifyContent: "space-between",
		alignItems: "center",
		height: CARD_SIZE,
		width: CARD_SIZE,
		borderRadius: 10,
	},
	stratCardName: {
		color: "#EAEAEA",
		fontSize: 16,
		textAlign: "center",
		paddingHorizontal: 15,
		paddingTop: 15,
	},
	stratCardInfoSection: {
		padding: 20,
		width: "100%",
	},
	stratCardInfoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	stratCardInfoLabel: {
		color: "#9A9A9A",
		fontSize: 12,
	},
	stratCardInfoData: {
		fontSize: 12,
	},

	// add strategy card styles
	addStratCardContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#1a2c3da3",
		borderColor: "#27447299",
		borderStyle: "dashed",
		borderRadius: 14,
		borderWidth: 2,
		width: CARD_SIZE,
		height: CARD_SIZE * 0.8,
		padding: 0,
		marginBottom: 16,
	},
	addStratCardIcon: {
		fontSize: 50,
		color: "#4d6996ff",
		opacity: 0.4,
	},
});
