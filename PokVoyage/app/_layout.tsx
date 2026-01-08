import { DarkTheme, DefaultTheme, ThemeProvider, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps } from "@react-navigation/drawer";
import { Text, View, StyleSheet, TouchableOpacity, Image, Linking } from "react-native";
// import { Drawer } from "expo-router/drawer";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import "react-native-reanimated";
import i18n from "../i18n";
import { Ionicons } from "@expo/vector-icons";
// import { Stack } from 'expo-router';
import "react-native-reanimated";
// import { HelpProvider } from './contexts/HelpContext';

import LoadingScreen from "./Loading";
import LoginScreen from "./Login";
import OnboardingScreen from "./Onboarding";
import DrawerItems from "./Drawer";
import TabLayout from "./(tabs)/_layout";
import SearchBar from "../components/search-bar";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});
	const [showOnboarding, setShowOnboarding] = useState(true);
	const [showLoading, setShowLoading] = useState(true);
	const [showLogin, setShowLogin] = useState(false);
	const [isLogIn, setIsLogIn] = useState(false);
	const [search, setSearch] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	const navigation = useNavigation() as any;
	const Drawer = createDrawerNavigator();

	const updateSearch = (search: string) => {
		setSearch(search);
	};

	useEffect(() => {
		// Simulate loading
		const timer = setTimeout(() => setShowLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	function CustomDrawerContent(props: DrawerContentComponentProps) {
		return (
			<DrawerContentScrollView>
				<DrawerItems {...props} />
			</DrawerContentScrollView>
		);
	}

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			{!loaded || showLoading ? (
				<LoadingScreen />
			) : showOnboarding ? (
				<OnboardingScreen
					onLogIn={(isLogIn) => {
						setShowOnboarding(false);
						setShowLogin(true);
						setIsLogIn(isLogIn);
					}}
				/>
			) : showLogin ? (
				<LoginScreen onSignUp={isLogIn} onSkip={() => setShowLogin(false)} onLogin={() => setShowLogin(false)} />
			) : (
				<>
					<Drawer.Navigator
						drawerContent={(props) => <CustomDrawerContent {...props} />}
						screenOptions={{
							swipeEnabled: false,
							headerStyle: {
								backgroundColor: "#0E0014",
								height: 100,
							},
							headerTintColor: "#ECEDEE",
						}}>
						<Drawer.Screen
							name='(tabs)'
							component={TabLayout}
							options={{
								headerShown: true,
								headerTitleAlign: "left",
								headerLeft: (props) => "",
								// <View style={styles.headerLeft}>
								// 	<TouchableOpacity style={styles.headerButton}>
								// 		<Ionicons name='menu' style={styles.headerButtonIcon} />
								// 	</TouchableOpacity>
								// </View>
								headerTitle: () => (
									<SearchBar searchText={searchQuery} onSearchChange={setSearchQuery} placeholder='Search...' />
									// <SearchBar
									// 	containerStyle={styles.searchContainer}
									// 	inputContainerStyle={styles.searchInput}
									// 	inputStyle={styles.searchInputText}
									// 	placeholder='Search'
									// 	onChangeText={updateSearch}
									// 	value={search}
									// 	round
									// />
									// <Text style={styles.greetingText}>Hey, Sofian!</Text>
								),
								headerRight: () => (
									<View style={styles.headerRight}>
										<TouchableOpacity style={styles.headerTokens} onPress={() => {}}>
											<Image style={[styles.token]} source={require("../assets/images/token-icon.png")}></Image>
											<Text style={styles.tokenText}> {1025}</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate("Profile")}>
											<Ionicons name='notifications-outline' style={styles.headerButtonIcon} />
											{/* <Image style={styles.headerButtonIcon} source={require("../assets/images/notifications.png")}></Image> */}
										</TouchableOpacity>
									</View>
								),
							}}
						/>
						{/* <Stack.Screen name='+not-found' /> */}
					</Drawer.Navigator>
					<StatusBar style='auto' />
				</>
			)}
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	headerRight: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 5,
	},
	greetingText: {
		color: "#fff",
		fontSize: 36,
		// fontWeight: "300",
	},
	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	headerButton: {
		padding: 4,
		marginHorizontal: 15,
	},
	headerButtonIcon: {
		width: 46,
		// height: 26,
		resizeMode: "contain",
	},
	searchContainer: {
		backgroundColor: "transparent",
		borderTopWidth: 0,
		borderBottomWidth: 0,
	},
	searchInput: {
		height: 30,
		width: 150,
	},
	searchInputText: {
		fontSize: 16,
	},
	headerTokens: {
		flexDirection: "row",
	},
	token: {
		width: 20,
		height: 20,
		resizeMode: "contain",
	},
	tokenText: {
		color: "#fff",
		fontSize: 15,
		fontWeight: "bold",
	},
});
