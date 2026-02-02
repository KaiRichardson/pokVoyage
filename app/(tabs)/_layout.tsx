import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { router, Tabs } from "expo-router";
import { useEffect } from "react";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading && !user) {
			router.replace("/(auth)/login" as any);
		}
	}, [user, isLoading]);

	if (!user) return null;

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: "My Trips",
					tabBarIcon: ({ color }) => <IconSymbol size={28} name='suitcase.fill' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='explore'
				options={{
					title: "Explore",
					tabBarIcon: ({ color }) => <IconSymbol size={28} name='paperplane.fill' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='calendar'
				options={{
					title: "Calendar",
					tabBarIcon: ({ color }) => <IconSymbol size={28} name='calendar' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => <IconSymbol size={28} name='person.fill' color={color} />,
				}}
			/>
		</Tabs>
	);
}
