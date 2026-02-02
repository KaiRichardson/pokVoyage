import { SymbolView, SymbolViewProps, SymbolWeight } from "expo-symbols";
import { useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

export function IconSymbol({
	name,
	size = 24,
	color,
	style,
	weight = "regular",
}: {
	name: SymbolViewProps["name"];
	size?: number;
	color: string;
	style?: StyleProp<ViewStyle>;
	weight?: SymbolWeight;
}) {
	const sizeStyle = useMemo(() => StyleSheet.create({ root: { width: size, height: size } }), [size]);

	return <SymbolView weight={weight} tintColor={color} resizeMode='scaleAspectFit' name={name} style={[sizeStyle.root, style]} />;
}
