import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { createBottomTabNavigator, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import Home from "./index";
// import HomeTestApi from "./HomeTestApi";
// import Marketplace from "./Marketplace";
// import StrategyGrid from "./StrategyGrid";
import Explore from "./Explore";
// import Settings from "./Settings";
import Profile from "./Profile";

const { width: screenWidth } = Dimensions.get("window");

const Tab = createBottomTabNavigator();

const LowNavbar = ({ navigation, state }: BottomTabBarProps) => {
	const { t } = useTranslation();
	const isHomeActive = state?.routes[state.index]?.name === "Home";
	const isStrategiesActive = state?.routes[state.index]?.name === "StrategyGrid";
	const isProfileActive = state?.routes[state.index]?.name === "Profile";

	return (
		// <View style={styles.mobileNavbar}>
		<BlurView experimentalBlurMethod='dimezisBlurView' intensity={40} tint='dark' style={styles.mobileNavbar}>
			{/* Home Button */}
			<TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Home" as never)}>
				<Image
					style={[styles.logo, isHomeActive ? { opacity: 1 } : { opacity: 0.7 }]}
					source={require("../../assets/images/favicon.png")}></Image>
				<Text style={[styles.iconText, isHomeActive ? { opacity: 1 } : { opacity: 0.7 }]}>{t("navBar.home")}</Text>
			</TouchableOpacity>

			{/* Strategies Button */}
			{/* <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("StrategyGrid" as never)}>
				<Ionicons
					name='analytics-outline'
					size={26}
					color={isStrategiesActive ? "#3578e5" : "#a3cef1"}
					style={isStrategiesActive ? { opacity: 1 } : { opacity: 0.7 }}
				/>
				<Text style={[styles.iconText, isStrategiesActive ? { opacity: 1 } : { opacity: 0.7 }]}>{t("navBar.strategies")}</Text>
			</TouchableOpacity> */}

			{/* <View style={styles.ellipseWrapper}>
					<TouchableOpacity style={styles.fab} onPress={() => {}}>
						<Ionicons name='add' size={32} color='#fff' />
					</TouchableOpacity>
				</View> */}

			{/* <TouchableOpacity style={styles.iconContainer} onPress={() => {}}>
					<Ionicons name='construct-outline' size={26} color='#a3cef1' />
				</TouchableOpacity> */}

			{/* Account Button */}
			<TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Profile" as never)}>
				<Ionicons
					name='person-outline'
					size={26}
					color={isProfileActive ? "#3578e5" : "#a3cef1"}
					style={isProfileActive ? { opacity: 1 } : { opacity: 0.7 }}
				/>
				{/* <Text style={[styles.iconText, isProfileActive ? { opacity: 1 } : { opacity: 0.7 }]}>{t("navBar.explore")}</Text> */}
				<Text style={[styles.iconText, isProfileActive ? { opacity: 1 } : { opacity: 0.7 }]}>Profile</Text>
			</TouchableOpacity>
		</BlurView>
		// </View>
	);
};

const styles = StyleSheet.create({
	mobileNavbar: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		position: "absolute",
		bottom: screenWidth * 0.05,
		left: "auto",
		right: "auto",
		height: 80,
		width: screenWidth - screenWidth * 0.05,
		alignSelf: "center",
		zIndex: 100,
		borderWidth: 1,
		borderStartColor: "#ffffff4f",
		borderTopColor: "#ffffff4f",
		borderColor: "#ffffff33",
		borderRadius: 40,
		overflow: "hidden",
	},
	iconContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		// height: "100%",
		// borderRadius: 40,
		// paddingBottom: 15,
	},
	iconText: {
		color: "#a3cef1",
		fontSize: 10,
		marginTop: 4,
	},
	logo: {
		width: 26,
		height: 26,
		resizeMode: "contain",
	},

	// ellipseWrapper: {
	// 	width: 60,
	// 	height: 60,
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	marginBottom: 15,
	// 	zIndex: 101,
	// },
	// fab: {
	// 	width: 56,
	// 	height: 56,
	// 	borderRadius: 28,
	// 	backgroundColor: "#274472",
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	shadowColor: "#000",
	// 	shadowOffset: { width: 0, height: 4 },
	// 	shadowOpacity: 0.2,
	// 	shadowRadius: 8,
	// 	elevation: 8,
	// 	borderWidth: 3,
	// 	borderColor: "#16213e",
	// },
});

export default function TabLayout() {
	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
			tabBar={(props) => <LowNavbar {...props} />}>
			{/* <Tab.Screen name='HomeTest' component={HomeTestApi} /> */}
			<Tab.Screen name='Home' component={Home} />
			{/* <Tab.Screen name='Marketplace' component={Marketplace} /> */}
			{/* <Tab.Screen name='StrategyGrid' component={StrategyGrid} /> */}
			<Tab.Screen name='Explore' component={Explore} />
			<Tab.Screen name='Profile' component={Profile} />
			{/* <Tab.Screen name='Settings' component={Settings} /> */}
		</Tab.Navigator>
	);
}
