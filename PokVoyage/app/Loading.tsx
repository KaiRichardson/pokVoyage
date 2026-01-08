import Theme from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

export default function LoadingScreen() {
	const { t } = useTranslation();
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0.9)).current;
	const [loopCount, setLoopCount] = useState(0);

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.spring(scaleAnim, {
				toValue: 1,
				friction: 8,
				tension: 40,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	const handleAnimationFinish = () => {
		if (loopCount < 2) {
			setLoopCount((prev) => prev + 1);
		} else {
			// After 3 loops, you might want to navigate to the main screen
			// Add navigation logic here if needed
		}
	};

	return (
		<LinearGradient colors={Theme.dark.colorsDark.gradient as [string, string, string]} style={styles.container}>
			<Animated.View style={[styles.contentContainer, { transform: [{ scale: scaleAnim }] }]}>
				<Text style={styles.appName}>Qompyl</Text>
				<Text style={styles.appTagline}>Trading Strategy Wizard</Text>
				<View style={styles.loaderContainer}>
					<LottieView
						source={require("../assets/animations/lottie_loading.json")}
						autoPlay
						loop={true}
						style={styles.lottieAnimation}
						speed={1}
						duration={3000}
					/>
				</View>
				<Text style={styles.loadingText}>{t("loading")}</Text>
			</Animated.View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	contentContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: "80%",
	},
	appName: {
		fontSize: 42,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 8,
		letterSpacing: 1,
	},
	appTagline: {
		fontSize: 16,
		color: "#a3cef1",
		opacity: 0.9,
		letterSpacing: 1,
		marginBottom: 40,
	},
	loaderContainer: {
		marginBottom: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	lottieAnimation: {
		width: 300,
		height: 300,
	},
	loadingText: {
		fontSize: 16,
		color: "#fff",
		opacity: 0.8,
		letterSpacing: 0.5,
	},
});
