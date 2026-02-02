import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  Layout,
  LineHeights,
  Opacity,
  Spacing,
} from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return {
    colorScheme,
    colors,
    spacing: Spacing,
    borderRadius: BorderRadius,
    fontSizes: FontSizes,
    fontWeights: FontWeights,
    lineHeights: LineHeights,
    opacity: Opacity,
    layout: Layout,
  };
}
