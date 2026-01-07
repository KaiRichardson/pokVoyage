import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Card from "@components/common/Card";
import Button from "@components/common/Button";
import { COLORS, SPACING, FONT_SIZES, CURRENCIES } from "@utils/constants";
import { useTripStore } from "@store/tripStore";

const ProfileScreen: React.FC = () => {
	const { trips } = useTripStore();
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [notifications, setNotifications] = useState(true);
	const [darkMode, setDarkMode] = useState(false);
	const [selectedCurrency, setSelectedCurrency] = useState("USD");
	const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);

	// Calculate stats
	const totalTrips = trips.length;
	const upcomingTrips = trips.filter((t) => t.startDate > new Date()).length;
	const totalCountries = new Set(trips.map((t) => t.destination.country)).size;
	const totalBudget = trips.reduce((sum, t) => sum + t.budget, 0);

	const pickImage = async () => {
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			Alert.alert("Permission Required", "Permission to access camera roll is required!");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setProfileImage(result.assets[0].uri);
		}
	};

	const SettingItem = ({
		icon,
		title,
		value,
		onPress,
		showArrow = true,
	}: {
		icon: string;
		title: string;
		value?: string;
		onPress: () => void;
		showArrow?: boolean;
	}) => (
		<TouchableOpacity style={styles.settingItem} onPress={onPress}>
			<View style={styles.settingLeft}>
				<Ionicons name={icon as any} size={24} color={COLORS.primary} />
				<Text style={styles.settingTitle}>{title}</Text>
			</View>
			<View style={styles.settingRight}>
				{value && <Text style={styles.settingValue}>{value}</Text>}
				{showArrow && <Ionicons name='chevron-forward' size={20} color={COLORS.textSecondary} />}
			</View>
		</TouchableOpacity>
	);

	const ToggleSettingItem = ({
		icon,
		title,
		value,
		onValueChange,
	}: {
		icon: string;
		title: string;
		value: boolean;
		onValueChange: (value: boolean) => void;
	}) => (
		<View style={styles.settingItem}>
			<View style={styles.settingLeft}>
				<Ionicons name={icon as any} size={24} color={COLORS.primary} />
				<Text style={styles.settingTitle}>{title}</Text>
			</View>
			<Switch
				value={value}
				onValueChange={onValueChange}
				trackColor={{ false: COLORS.border, true: COLORS.primary }}
				thumbColor={COLORS.card}
			/>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Text style={styles.title}>Profile</Text>
				</View>

				{/* Profile Info */}
				<Card style={styles.profileCard}>
					<TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
						{profileImage ? (
							<Image source={{ uri: profileImage }} style={styles.profileImage} />
						) : (
							<View style={styles.placeholderImage}>
								<Ionicons name='person' size={48} color={COLORS.textSecondary} />
							</View>
						)}
						<View style={styles.editBadge}>
							<Ionicons name='camera' size={16} color='#fff' />
						</View>
					</TouchableOpacity>
					<Text style={styles.userName}>Travel Enthusiast</Text>
					<Text style={styles.userEmail}>user@example.com</Text>

					<Button
						title='Edit Profile'
						onPress={() => Alert.alert("Edit Profile", "Coming soon!")}
						variant='outline'
						size='small'
						style={styles.editButton}
					/>
				</Card>

				{/* Stats */}
				<View style={styles.statsContainer}>
					<View style={styles.statCard}>
						<Ionicons name='airplane' size={32} color={COLORS.primary} />
						<Text style={styles.statNumber}>{totalTrips}</Text>
						<Text style={styles.statLabel}>Total Trips</Text>
					</View>
					<View style={styles.statCard}>
						<Ionicons name='calendar' size={32} color={COLORS.secondary} />
						<Text style={styles.statNumber}>{upcomingTrips}</Text>
						<Text style={styles.statLabel}>Upcoming</Text>
					</View>
					<View style={styles.statCard}>
						<Ionicons name='globe' size={32} color={COLORS.accent} />
						<Text style={styles.statNumber}>{totalCountries}</Text>
						<Text style={styles.statLabel}>Countries</Text>
					</View>
				</View>

				{/* Preferences */}
				<Card>
					<Text style={styles.sectionTitle}>Preferences</Text>

					<SettingItem
						icon='cash-outline'
						title='Default Currency'
						value={selectedCurrency}
						onPress={() => setShowCurrencyPicker(!showCurrencyPicker)}
					/>

					{showCurrencyPicker && (
						<View style={styles.currencyPicker}>
							{CURRENCIES.map((currency) => (
								<TouchableOpacity
									key={currency}
									style={[styles.currencyOption, selectedCurrency === currency && styles.currencyOptionSelected]}
									onPress={() => {
										setSelectedCurrency(currency);
										setShowCurrencyPicker(false);
									}}>
									<Text style={[styles.currencyText, selectedCurrency === currency && styles.currencyTextSelected]}>
										{currency}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					)}

					<ToggleSettingItem
						icon='notifications-outline'
						title='Push Notifications'
						value={notifications}
						onValueChange={setNotifications}
					/>

					<ToggleSettingItem icon='moon-outline' title='Dark Mode' value={darkMode} onValueChange={setDarkMode} />
				</Card>

				{/* Account Settings */}
				<Card>
					<Text style={styles.sectionTitle}>Account</Text>

					<SettingItem
						icon='person-outline'
						title='Account Information'
						onPress={() => Alert.alert("Account Info", "Coming soon!")}
					/>

					<SettingItem
						icon='lock-closed-outline'
						title='Privacy & Security'
						onPress={() => Alert.alert("Privacy", "Coming soon!")}
					/>

					<SettingItem
						icon='document-text-outline'
						title='Terms & Conditions'
						onPress={() => Alert.alert("Terms", "Coming soon!")}
					/>
				</Card>

				{/* App Info */}
				<Card>
					<Text style={styles.sectionTitle}>About</Text>

					<SettingItem icon='information-circle-outline' title='App Version' value='1.0.0' onPress={() => {}} showArrow={false} />

					<SettingItem icon='help-circle-outline' title='Help & Support' onPress={() => Alert.alert("Support", "Coming soon!")} />

					<SettingItem icon='star-outline' title='Rate App' onPress={() => Alert.alert("Rate", "Thank you!")} />
				</Card>

				{/* Logout */}
				<Button
					title='Logout'
					onPress={() => Alert.alert("Logout", "Are you sure?")}
					variant='outline'
					style={styles.logoutButton}
				/>

				<View style={styles.footer}>
					<Text style={styles.footerText}>Made with ❤️ for travelers</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	header: {
		padding: SPACING.md,
	},
	title: {
		fontSize: FONT_SIZES.xxl,
		fontWeight: "bold",
		color: COLORS.text,
	},
	profileCard: {
		alignItems: "center",
		marginHorizontal: SPACING.md,
		marginBottom: SPACING.md,
	},
	imageContainer: {
		position: "relative",
		marginBottom: SPACING.md,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	placeholderImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: COLORS.background,
		justifyContent: "center",
		alignItems: "center",
	},
	editBadge: {
		position: "absolute",
		bottom: 0,
		right: 0,
		backgroundColor: COLORS.primary,
		width: 32,
		height: 32,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 3,
		borderColor: COLORS.card,
	},
	userName: {
		fontSize: FONT_SIZES.xl,
		fontWeight: "bold",
		color: COLORS.text,
		marginBottom: SPACING.xs,
	},
	userEmail: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textSecondary,
		marginBottom: SPACING.md,
	},
	editButton: {
		paddingHorizontal: SPACING.xl,
	},
	statsContainer: {
		flexDirection: "row",
		paddingHorizontal: SPACING.md,
		marginBottom: SPACING.md,
		gap: SPACING.md,
	},
	statCard: {
		flex: 1,
		backgroundColor: COLORS.card,
		padding: SPACING.md,
		borderRadius: 12,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	statNumber: {
		fontSize: FONT_SIZES.xxl,
		fontWeight: "bold",
		color: COLORS.text,
		marginTop: SPACING.sm,
	},
	statLabel: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		marginTop: SPACING.xs,
	},
	sectionTitle: {
		fontSize: FONT_SIZES.lg,
		fontWeight: "bold",
		color: COLORS.text,
		marginBottom: SPACING.md,
	},
	settingItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: SPACING.md,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.border,
	},
	settingLeft: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	settingTitle: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text,
		marginLeft: SPACING.md,
	},
	settingRight: {
		flexDirection: "row",
		alignItems: "center",
	},
	settingValue: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textSecondary,
		marginRight: SPACING.xs,
	},
	currencyPicker: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: SPACING.sm,
		paddingVertical: SPACING.sm,
	},
	currencyOption: {
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.sm,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: COLORS.border,
		backgroundColor: COLORS.background,
	},
	currencyOptionSelected: {
		backgroundColor: COLORS.primary,
		borderColor: COLORS.primary,
	},
	currencyText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text,
		fontWeight: "600",
	},
	currencyTextSelected: {
		color: "#fff",
	},
	logoutButton: {
		marginHorizontal: SPACING.md,
		marginTop: SPACING.md,
		borderColor: COLORS.error,
	},
	footer: {
		alignItems: "center",
		paddingVertical: SPACING.xl,
	},
	footerText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
	},
});

export default ProfileScreen;
