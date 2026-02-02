import { useMemo } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");
	const themedStyles = useMemo(() => StyleSheet.create({ root: { backgroundColor } }), [backgroundColor]);

	return <View style={[themedStyles.root, style]} {...otherProps} />;
}
