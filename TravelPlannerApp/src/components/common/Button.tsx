import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from "react-native";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";

interface ButtonProps {
	title: string;
	onPress: () => void;
	variant?: "primary" | "secondary" | "outline";
	size?: "small" | "medium" | "large";
	disabled?: boolean;
	loading?: boolean;
	style?: ViewStyle;
	textStyle?: TextStyle;
	icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	title,
	onPress,
	variant = "primary",
	size = "medium",
	disabled = false,
	loading = false,
	style,
	textStyle,
	icon,
}) => {
	const buttonStyles = [styles.button, styles[variant], styles[`${size}Size`], disabled && styles.disabled, style];

	const textStyles = [styles.text, styles[`${variant}Text`], styles[`${size}Text`], textStyle];

	return (
		<TouchableOpacity style={buttonStyles} onPress={onPress} disabled={disabled || loading} activeOpacity={0.7}>
			{loading ? (
				<ActivityIndicator color={variant === "primary" ? "#fff" : COLORS.primary} />
			) : (
				<>
					{icon}
					<Text style={textStyles}>{title}</Text>
				</>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingHorizontal: SPACING.md,
	},
	primary: {
		backgroundColor: COLORS.primary,
	},
	secondary: {
		backgroundColor: COLORS.secondary,
	},
	outline: {
		backgroundColor: "transparent",
		borderWidth: 2,
		borderColor: COLORS.primary,
	},
	disabled: {
		opacity: 0.5,
	},
	smallSize: {
		paddingVertical: SPACING.xs,
	},
	mediumSize: {
		paddingVertical: SPACING.sm,
	},
	largeSize: {
		paddingVertical: SPACING.md,
	},
	text: {
		fontWeight: "600",
		textAlign: "center",
	},
	primaryText: {
		color: "#fff",
	},
	secondaryText: {
		color: "#fff",
	},
	outlineText: {
		color: COLORS.primary,
	},
	smallText: {
		fontSize: FONT_SIZES.sm,
	},
	mediumText: {
		fontSize: FONT_SIZES.md,
	},
	largeText: {
		fontSize: FONT_SIZES.lg,
	},
});

export default Button;
