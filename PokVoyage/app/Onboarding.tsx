import Theme from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Dimensions, FlatList, StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get("window");
const SLIDE_WIDTH = width;

const slidesData = [
	{
		key: "1",
		img: require("../assets/images/big-icon_color.png"),
		titleKey: "onboarding.title1",
		descKey: "onboarding.desc1",
	},
	{
		key: "2",
		img: require("../assets/images/build.png"),
		titleKey: "onboarding.title2",
		descKey: "onboarding.desc2",
	},
	{
		key: "3",
		img: require("../assets/images/test.png"),
		titleKey: "onboarding.title3",
		descKey: "onboarding.desc3",
	},
	{
		key: "4",
		img: require("../assets/images/trade.png"),
		titleKey: "onboarding.title4",
		descKey: "onboarding.desc4",
	},
];

interface OnboardingScreenProps {
	onLogIn?: (event: boolean) => void;
}

export default function OnboardingScreen({ onLogIn }: OnboardingScreenProps) {
	const { t, i18n } = useTranslation();
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;
	const slidesRef = useRef<FlatList>(null);

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
	const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
		if (viewableItems[0]) setCurrentIndex(viewableItems[0].index);
	}).current;

	const handleLogIn = (event: boolean) => {
		if (onLogIn) onLogIn(event);
	};

	const Indicator = () => (
		<View style={styles.indicatorContainer}>
			{slidesData.map((_, i) => {
				const inputRange = [(i - 1) * SLIDE_WIDTH, i * SLIDE_WIDTH, (i + 1) * SLIDE_WIDTH];
				const scale = scrollX.interpolate({
					inputRange,
					outputRange: [0.8, 1.2, 0.8],
					extrapolate: "clamp",
				});
				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.4, 1, 0.4],
					extrapolate: "clamp",
				});
				return (
					<Animated.View
						key={`indicator-${i}`}
						style={[
							styles.indicator,
							{
								transform: [{ scale }],
								opacity,
								backgroundColor: i === currentIndex ? "#41729f" : "rgba(255,255,255,0.5)",
							},
						]}
					/>
				);
			})}
		</View>
	);

	return (
		<LinearGradient colors={Theme.dark.colorsDark.gradient as [string, string, string]} style={styles.container}>
			{/* slides */}
			<View style={styles.flatListContainer}>
				<FlatList
					data={slidesData}
					renderItem={({ item }) => (
						<View style={[styles.slide, { width: SLIDE_WIDTH }]}>
							<Image style={styles.image} source={item.img}></Image>
							<View style={styles.textContainer}>
								<Text style={styles.title}>{t(item.titleKey)}</Text>
								<Text style={styles.description}>{t(item.descKey)}</Text>
							</View>
						</View>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					bounces={false}
					keyExtractor={(item) => item.key}
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
					scrollEventThrottle={32}
					onViewableItemsChanged={onViewableItemsChanged}
					viewabilityConfig={viewConfig}
					ref={slidesRef}
				/>
				<Indicator />
			</View>

			{/* user decisions */}
			<View style={styles.bottomContainer}>
				<TouchableOpacity style={styles.button} onPress={() => handleLogIn(false)}>
					<Text style={styles.buttonText}>{t("onboarding.getStarted")}</Text>
				</TouchableOpacity>

				<Image style={styles.separator} source={require("../assets/images/separator_small.png")}></Image>

				<Text style={styles.haveAccountNoteText}>
					{t("onboarding.haveAccount")}{" "}
					<Text style={styles.haveAccountNoteTextLink} onPress={() => handleLogIn(true)}>
						{t("onboarding.signIn")}
					</Text>
				</Text>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		paddingTop: 100,
	},

	//! container 1
	flatListContainer: {
		flex: 2,
	},
	slide: {
		alignItems: "center",
	},
	image: {
		margin: "5%",
		height: 150,
		resizeMode: "contain",
	},
	textContainer: {
		alignItems: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginBottom: 16,
		paddingHorizontal: 10,
	},
	description: {
		fontSize: 16,
		color: "#a3cef1",
		textAlign: "center",
		lineHeight: 24,
		opacity: 0.85,
		paddingHorizontal: 10,
	},
	indicatorContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	indicator: {
		height: 10,
		width: 10,
		borderRadius: 5,
		marginHorizontal: 8,
	},

	//! container 2
	bottomContainer: {
		flex: 2,
	},
	button: {
		backgroundColor: "#41729f",
		paddingVertical: 16,
		borderRadius: 24,
		alignItems: "center",
		width: width * 0.8,
		alignSelf: "center",
		marginTop: "20%",
	},
	buttonText: {
		fontSize: 16,
		color: "#fff",
		fontWeight: "bold",
	},
	separator: {
		width: width * 0.8,
		paddingVertical: 40,
		alignSelf: "center",
		resizeMode: "contain",
	},
	haveAccountNoteText: {
		color: "#fff",
		fontSize: 12,
		textAlign: "center",
		fontWeight: "bold",
	},
	haveAccountNoteTextLink: {
		color: Theme.dark.colors.info,
		fontSize: 12,
		textAlign: "center",
		fontWeight: "bold",
	},
});
