import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import Input from "@components/common/Input";
import Button from "@components/common/Button";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";
import { ActivityCategory } from "@types/trip";

interface ActivityFormProps {
	tripId: string;
	onSubmit: (activity: any) => void;
	onCancel: () => void;
	initialData?: any;
}

const CATEGORIES = Object.values(ActivityCategory);

const ActivityForm: React.FC<ActivityFormProps> = ({ tripId, onSubmit, onCancel, initialData }) => {
	const [title, setTitle] = useState(initialData?.title || "");
	const [description, setDescription] = useState(initialData?.description || "");
	const [location, setLocation] = useState(initialData?.location || "");
	const [date, setDate] = useState(initialData?.date || new Date());
	const [time, setTime] = useState(initialData?.time || "");
	const [cost, setCost] = useState(initialData?.cost?.toString() || "");
	const [category, setCategory] = useState<ActivityCategory>(initialData?.category || ActivityCategory.SIGHTSEEING);
	const [notes, setNotes] = useState(initialData?.notes || "");
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showCategoryPicker, setShowCategoryPicker] = useState(false);

	const handleSubmit = () => {
		if (!title.trim()) {
			Alert.alert("Error", "Please enter activity title");
			return;
		}
		if (!location.trim()) {
			Alert.alert("Error", "Please enter location");
			return;
		}

		const activityData = {
			tripId,
			title: title.trim(),
			description: description.trim(),
			location: location.trim(),
			date,
			time: time.trim(),
			cost: cost ? parseFloat(cost) : undefined,
			category,
			notes: notes.trim(),
		};

		onSubmit(activityData);
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<Input label='Activity Title *' value={title} onChangeText={setTitle} placeholder='e.g., Visit Eiffel Tower' />

			<Input
				label='Description'
				value={description}
				onChangeText={setDescription}
				placeholder='Brief description'
				multiline
				numberOfLines={3}
				style={styles.textArea}
			/>

			<Input label='Location *' value={location} onChangeText={setLocation} placeholder='e.g., Champ de Mars, Paris' />

			<View style={styles.section}>
				<Text style={styles.label}>Date *</Text>
				<TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
					<Ionicons name='calendar-outline' size={20} color={COLORS.primary} />
					<Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
				</TouchableOpacity>

				{showDatePicker && (
					<DateTimePicker
						value={date}
						mode='date'
						display='default'
						onChange={(event, selectedDate) => {
							setShowDatePicker(false);
							if (selectedDate) {
								setDate(selectedDate);
							}
						}}
					/>
				)}
			</View>

			<Input label='Time (Optional)' value={time} onChangeText={setTime} placeholder='e.g., 10:00 AM' />

			<View style={styles.section}>
				<Text style={styles.label}>Category *</Text>
				<TouchableOpacity style={styles.categoryButton} onPress={() => setShowCategoryPicker(!showCategoryPicker)}>
					<Text style={styles.categoryText}>{category}</Text>
					<Ionicons name={showCategoryPicker ? "chevron-up" : "chevron-down"} size={20} color={COLORS.textSecondary} />
				</TouchableOpacity>

				{showCategoryPicker && (
					<View style={styles.categoryPicker}>
						{CATEGORIES.map((cat) => (
							<TouchableOpacity
								key={cat}
								style={[styles.categoryOption, category === cat && styles.categoryOptionSelected]}
								onPress={() => {
									setCategory(cat);
									setShowCategoryPicker(false);
								}}>
								<Text style={[styles.categoryOptionText, category === cat && styles.categoryOptionTextSelected]}>{cat}</Text>
							</TouchableOpacity>
						))}
					</View>
				)}
			</View>

			<Input label='Cost (Optional)' value={cost} onChangeText={setCost} placeholder='0.00' keyboardType='numeric' />

			<Input
				label='Notes'
				value={notes}
				onChangeText={setNotes}
				placeholder='Additional notes or reminders'
				multiline
				numberOfLines={3}
				style={styles.textArea}
			/>

			<View style={styles.buttonContainer}>
				<Button title='Cancel' onPress={onCancel} variant='outline' style={styles.button} />
				<Button title={initialData ? "Update" : "Add Activity"} onPress={handleSubmit} style={styles.button} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: SPACING.md,
	},
	textArea: {
		height: 80,
		textAlignVertical: "top",
	},
	section: {
		marginBottom: SPACING.md,
	},
	label: {
		fontSize: FONT_SIZES.sm,
		fontWeight: "600",
		color: COLORS.text,
		marginBottom: SPACING.xs,
	},
	dateButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.card,
		padding: SPACING.md,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: COLORS.border,
	},
	dateText: {
		marginLeft: SPACING.sm,
		fontSize: FONT_SIZES.md,
		color: COLORS.text,
	},
	categoryButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: COLORS.card,
		padding: SPACING.md,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: COLORS.border,
	},
	categoryText: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text,
	},
	categoryPicker: {
		marginTop: SPACING.sm,
		backgroundColor: COLORS.card,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: COLORS.border,
	},
	categoryOption: {
		padding: SPACING.md,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.border,
	},
	categoryOptionSelected: {
		backgroundColor: COLORS.primary,
	},
	categoryOptionText: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text,
	},
	categoryOptionTextSelected: {
		color: "#fff",
		fontWeight: "600",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: SPACING.lg,
		marginBottom: SPACING.xl,
	},
	button: {
		flex: 1,
		marginHorizontal: SPACING.xs,
	},
});

export default ActivityForm;
