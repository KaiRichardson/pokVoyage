import React from "react";
import { TextInput, View, Text, StyleSheet, TextInputProps } from "react-native";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";

interface InputProps extends TextInputProps {
	label?: string;
	error?: string;
	containerStyle?: object;
}

const Input: React.FC<InputProps> = ({ label, error, containerStyle, ...textInputProps }) => {
	return (
		<View style={[styles.container, containerStyle]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				style={[styles.input, error && styles.inputError]}
				placeholderTextColor={COLORS.textSecondary}
				{...textInputProps}
			/>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: SPACING.md,
	},
	label: {
		fontSize: FONT_SIZES.sm,
		fontWeight: "600",
		color: COLORS.text,
		marginBottom: SPACING.xs,
	},
	input: {
		backgroundColor: COLORS.background,
		borderWidth: 1,
		borderColor: COLORS.border,
		borderRadius: 8,
		padding: SPACING.sm,
		fontSize: FONT_SIZES.md,
		color: COLORS.text,
	},
	inputError: {
		borderColor: COLORS.error,
	},
	error: {
		fontSize: FONT_SIZES.xs,
		color: COLORS.error,
		marginTop: SPACING.xs,
	},
});

export default Input;
