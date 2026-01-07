import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "@screens/HomeScreen";
import TripsScreen from "@screens/TripsScreen";
import TripDetailScreen from "@screens/TripDetailScreen";
import CreateTripScreen from "@screens/CreateTripScreen";
import DestinationsScreen from "@screens/DestinationsScreen";
import ProfileScreen from "@screens/ProfileScreen";

import { RootStackParamList, TabParamList } from "./types";
import { COLORS } from "@utils/constants";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName: keyof typeof Ionicons.glyphMap;

					switch (route.name) {
						case "Home":
							iconName = focused ? "home" : "home-outline";
							break;
						case "Trips":
							iconName = focused ? "airplane" : "airplane-outline";
							break;
						case "Destinations":
							iconName = focused ? "location" : "location-outline";
							break;
						case "Profile":
							iconName = focused ? "person" : "person-outline";
							break;
						default:
							iconName = "help-outline";
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.textSecondary,
				headerShown: false,
			})}>
			<Tab.Screen name='Home' component={HomeScreen} />
			<Tab.Screen name='Trips' component={TripsScreen} />
			<Tab.Screen name='Destinations' component={DestinationsScreen} />
			<Tab.Screen name='Profile' component={ProfileScreen} />
		</Tab.Navigator>
	);
};

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: COLORS.primary,
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}>
				<Stack.Screen name='MainTabs' component={TabNavigator} options={{ headerShown: false }} />
				<Stack.Screen name='TripDetail' component={TripDetailScreen} options={{ title: "Trip Details" }} />
				<Stack.Screen name='CreateTrip' component={CreateTripScreen} options={{ title: "Create New Trip" }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
