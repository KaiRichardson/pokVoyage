import React from "react";
import { View, TextInput, StyleSheet, Image, ViewStyle, TextStyle, ImageStyle } from "react-native";

// Define the interface for the component's props
interface CustomSearchBarProps {
	searchText: string;
	onSearchChange: (text: string) => void;
	placeholder?: string;
	style?: ViewStyle;
	inputStyle?: TextStyle;
	iconStyle?: ImageStyle;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
	searchText,
	onSearchChange,
	placeholder = "Search...",
	style,
	inputStyle,
}) => {
	return (
		<View style={[styles.container, style]}>
			{/* You can add a search icon here if needed, e.g., using @expo/vector-icons or a local Image component */}
			{/* <Image source={require('./assets/search-icon.png')} style={[styles.icon, iconStyle]} /> */}
			<TextInput
				style={[styles.input, inputStyle]}
				placeholder={placeholder}
				value={searchText}
				onChangeText={onSearchChange} // The function signature matches the prop type
				returnKeyType='search'
				autoCapitalize='none'
				autoCorrect={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
		paddingHorizontal: 12,
		margin: 10,
	},
	input: {
		flex: 1,
		height: 40,
		fontSize: 16,
	},
	// icon: {
	//   width: 20,
	//   height: 20,
	//   marginRight: 8,
	// },
});

export default CustomSearchBar;
