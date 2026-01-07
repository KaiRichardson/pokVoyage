import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigator from "./src/navigation/AppNavigator";
import ErrorBoundary from "./src/components/common/ErrorBoundary";
import { useUserStore } from "./src/store/userStore";
import { useTripStore } from "./src/store/tripStore";
import { useNotificationStore } from "./src/store/notificationStore";

// Ignore specific warnings
LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 2,
			staleTime: 5 * 60 * 1000, // 5 minutes
		},
	},
});

function AppContent() {
	const loadUser = useUserStore((state) => state.loadUser);
	const fetchTrips = useTripStore((state) => state.fetchTrips);
	const loadNotifications = useNotificationStore((state) => state.loadNotifications);

	useEffect(() => {
		// Load all initial data
		const initializeApp = async () => {
			try {
				await Promise.all([loadUser(), fetchTrips(), loadNotifications()]);
			} catch (error) {
				console.error("Error initializing app:", error);
			}
		};

		initializeApp();
	}, []);

	return (
		<>
			<AppNavigator />
			<StatusBar style='auto' />
		</>
	);
}

export default function App() {
	return (
		<ErrorBoundary>
			<QueryClientProvider client={queryClient}>
				<AppContent />
			</QueryClientProvider>
		</ErrorBoundary>
	);
}
