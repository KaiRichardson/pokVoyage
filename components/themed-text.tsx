import { useMemo } from "react";
import { StyleSheet, Text, type TextProps } from "react-native";

import { Colors, FontSizes, LineHeights } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({ style, lightColor, darkColor, type = "default", ...rest }: ThemedTextProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
	const colorStyle = useMemo(() => StyleSheet.create({ root: { color } }), [color]);

	return (
		<Text
			style={[
				colorStyle.root,
				type === "default" ? styles.default : undefined,
				type === "title" ? styles.title : undefined,
				type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
				type === "subtitle" ? styles.subtitle : undefined,
				type === "link" ? styles.link : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		fontSize: FontSizes.md,
		lineHeight: LineHeights.tight,
	},
	defaultSemiBold: {
		fontSize: FontSizes.md,
		lineHeight: LineHeights.tight,
		fontWeight: "600",
	},
	title: {
		fontSize: FontSizes.xxl,
		fontWeight: "bold",
		lineHeight: LineHeights.relaxed,
	},
	subtitle: {
		fontSize: FontSizes.xl,
		fontWeight: "bold",
	},
	link: {
		lineHeight: LineHeights.normal,
		fontSize: FontSizes.md,
		color: Colors.light.tint,
	},
});
