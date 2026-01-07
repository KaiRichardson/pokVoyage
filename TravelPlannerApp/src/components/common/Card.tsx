import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { COLORS, SPACING } from "@utils/constants";

interface CardProps {
	children: React.ReactNode;
	style?: ViewStyle;
	onPress?: () => void;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
	return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: COLORS.card,
		borderRadius: 12,
		padding: SPACING.md,
		marginVertical: SPACING.sm,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
});

export default Card;
