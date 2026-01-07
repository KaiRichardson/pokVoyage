import React from "react";
import {
	Modal as RNModal,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZES } from "@utils/constants";

interface ModalProps {
	visible: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	fullScreen?: boolean;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, title, children, fullScreen = false }) => {
	return (
		<RNModal visible={visible} animationType='slide' transparent={!fullScreen} onRequestClose={onClose}>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
				<SafeAreaView style={fullScreen ? styles.fullScreenContent : styles.modalContent}>
					{/* Header */}
					<View style={styles.header}>
						<Text style={styles.title}>{title}</Text>
						<TouchableOpacity onPress={onClose} style={styles.closeButton}>
							<Ionicons name='close' size={24} color={COLORS.text} />
						</TouchableOpacity>
					</View>

					{/* Content */}
					<ScrollView style={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
						{children}
					</ScrollView>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</RNModal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: COLORS.background,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		maxHeight: "90%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	fullScreenContent: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.md,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.border,
	},
	title: {
		fontSize: FONT_SIZES.lg,
		fontWeight: "bold",
		color: COLORS.text,
	},
	closeButton: {
		padding: SPACING.xs,
	},
	content: {
		flex: 1,
	},
});

export default Modal;
