import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
		};
	}

	static getDerivedStateFromError(error: Error): State {
		return {
			hasError: true,
			error,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Error caught by boundary:", error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			return (
				<View style={styles.container}>
					<Ionicons name='alert-circle-outline' size={80} color={COLORS.error} />
					<Text style={styles.title}>Oops! Something went wrong</Text>
					<Text style={styles.message}>{this.state.error?.message || "An unexpected error occurred"}</Text>
					<TouchableOpacity style={styles.button} onPress={this.handleReset}>
						<Text style={styles.buttonText}>Try Again</Text>
					</TouchableOpacity>
				</View>
			);
		}

		return this.props.children;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: SPACING.xl,
		backgroundColor: COLORS.background,
	},
	title: {
		fontSize: FONT_SIZES.xl,
		fontWeight: "bold",
		color: COLORS.text,
		marginTop: SPACING.lg,
		textAlign: "center",
	},
	message: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textSecondary,
		marginTop: SPACING.sm,
		textAlign: "center",
		lineHeight: 24,
	},
	button: {
		backgroundColor: COLORS.primary,
		paddingHorizontal: SPACING.xl,
		paddingVertical: SPACING.md,
		borderRadius: 8,
		marginTop: SPACING.xl,
	},
	buttonText: {
		color: "#fff",
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
	},
});

export default ErrorBoundary;
