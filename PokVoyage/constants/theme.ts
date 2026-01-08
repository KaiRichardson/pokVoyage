/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// const tintColorLight = '#0a7ea4';
// const tintColorDark = '#fff';

// export const Colors = {
//   light: {
//     text: '#11181C',
//     background: '#fff',
//     tint: tintColorLight,
//     icon: '#687076',
//     tabIconDefault: '#687076',
//     tabIconSelected: tintColorLight,
//   },
//   dark: {
//     text: '#ECEDEE',
//     background: '#151718',
//     tint: tintColorDark,
//     icon: '#9BA1A6',
//     tabIconDefault: '#9BA1A6',
//     tabIconSelected: tintColorDark,
//   },
// };

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// const tintColorLight = '#0a7ea4';
// const tintColorDark = '#fff';

// export const Colors = {
//   light: {
//     text: '#11181C',
//     background: '#fff',
//     tint: tintColorLight,
//     icon: '#687076',
//     tabIconDefault: '#687076',
//     tabIconSelected: tintColorLight,
//   },
//   dark: {
//     text: '#ECEDEE',
//     background: '#151718',
//     tint: tintColorDark,
//     icon: '#9BA1A6',
//     tabIconDefault: '#9BA1A6',
//     tabIconSelected: tintColorDark,
//   },
//   gradient: {
//     dark: ['#201f35', '#1a0822', '#1a0822'],
//     light: ['#274472', '#41729f', '#a3cef1'],
//   },
// };

const colors = {
  // logo colors
  logoYellow: '#FFCC00',
  logoTeal: '#49BDBC',
  logoBlue: '#3184C8',
  logoIndigo: '#4A4CA0',
  logoPurple: '#773891',
  logoPink: '#E7368E',

  // Status Colors
  success: '#2AC48A',
  info: '#3e76e7ff',
  warning: '#FFE16A',
  error: '#D34547',
  disabled: '#D8D8D8',
  disabledButton: '#879AC1',

  // Transparent variations
  transparent: 'transparent',
  shadow: '#7d7d7dff',
  white: '#FFFFFF',
  black: '#000000',
};

const colorsLight = {
  // Primary Colors
  primary: '#007AFF',
  primaryLight: '#5AC8FA',
  primaryDark: '#0051D5',

  // Secondary Colors
  secondary: '#5856D6',
  secondaryLight: '#AF52DE',
  secondaryDark: '#3634A3',

  // Neutral Colors
  background: '#FFFFFF',
  surface: '#F2F2F7',
  card: '#FFFFFF',

  // Text Colors
  text: '#11181C',
  textSecondary: '#8E8E93',
  textDisabled: '#C7C7CC',
  textInverse: '#FFFFFF',

  // UI Elements
  border: '#C6C6C8',
  divider: '#E5E5EA',
  overlay: 'rgba(0, 0, 0, 0.5)',
  tint: '#0a7ea4',
  icon: '#687076',
  tabIconDefault: '#687076',
  tabIconSelected: '#0a7ea4',
  gradient: ['#274472', '#41729f', '#a3cef1'],
}

const colorsDark = {
  // Primary Colors
  primary: '#201f35',
  primaryLight: '#504D7D',
  primaryDark: '#424152',

  // Secondary Colors
  secondary: '#1a0822',
  secondaryLight: '#6F4D7D',
  secondaryDark: '#4D4152',

  // Neutral Colors
  background: '#000000',
  surface: '#1C1C1E',
  card: '#2C2C2E',

  // Text Colors
  text: '#ECEDEE',
  textSecondary: '#98989D',
  textDisabled: '#48484A',
  textInverse: '#000000',

  // UI Elements
  border: '#38383A',
  divider: '#48484A',
  overlay: 'rgba(0, 0, 0, 0.5)',
  tint: '#FFFFFF',
  icon: '#9BA1A6',
  tabIconDefault: '#9BA1A6',
  tabIconSelected: '#FFFFFF',
  gradient: ['#201f35', '#1a0822', '#1a0822'],
}

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const typography = {
  // Font Families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    light: 'System',
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },

  // Font Weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
};

const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
};

const layout = {
  // Screen padding
  screenPadding: spacing.md,

  // Container widths
  containerMaxWidth: 1200,

  // Common dimensions
  buttonHeight: 48,
  inputHeight: 48,
  iconSize: 24,
  avatarSize: {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  },
};

const animations = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// Component-specific styles
// const components = {
//   button: {
//     primary: {
//       backgroundColor: colors.primary,
//       color: colors.textInverse,
//       paddingHorizontal: spacing.lg,
//       paddingVertical: spacing.md,
//       borderRadius: borderRadius.md,
//       ...shadows.sm,
//     },
//     secondary: {
//       backgroundColor: colors.secondary,
//       color: colors.textInverse,
//       paddingHorizontal: spacing.lg,
//       paddingVertical: spacing.md,
//       borderRadius: borderRadius.md,
//       ...shadows.sm,
//     },
//     outline: {
//       backgroundColor: colors.transparent,
//       color: colors.primary,
//       borderWidth: 1,
//       borderColor: colors.primary,
//       paddingHorizontal: spacing.lg,
//       paddingVertical: spacing.md,
//       borderRadius: borderRadius.md,
//     },
//     ghost: {
//       backgroundColor: colors.transparent,
//       color: colors.primary,
//       paddingHorizontal: spacing.lg,
//       paddingVertical: spacing.md,
//     },
//   },

//   card: {
//     default: {
//       backgroundColor: colors.card,
//       borderRadius: borderRadius.lg,
//       padding: spacing.md,
//       ...shadows.md,
//     },
//     elevated: {
//       backgroundColor: colors.card,
//       borderRadius: borderRadius.lg,
//       padding: spacing.md,
//       ...shadows.lg,
//     },
//     outlined: {
//       backgroundColor: colors.card,
//       borderRadius: borderRadius.lg,
//       padding: spacing.md,
//       borderWidth: 1,
//       borderColor: colors.border,
//     },
//   },

//   input: {
//     default: {
//       backgroundColor: colors.surface,
//       borderRadius: borderRadius.md,
//       paddingHorizontal: spacing.md,
//       paddingVertical: spacing.sm,
//       fontSize: typography.fontSize.md,
//       color: colors.text,
//       height: layout.inputHeight,
//       borderWidth: 1,
//       borderColor: colors.border,
//     },
//     focused: {
//       borderColor: colors.primary,
//       backgroundColor: colors.white,
//     },
//     error: {
//       borderColor: colors.error,
//     },
//   },
// };

const Theme = {
  light: {
    colors,
    colorsLight,
    spacing,
    typography,
    borderRadius,
    shadows,
    layout,
    animations,
    // components,
  },
  dark: {
    colors,
    colorsDark,
    spacing,
    typography,
    borderRadius,
    shadows,
    layout,
    animations,
    // components: {
    // ...components,
    // Override component styles for dark mode if needed
    // },
  },
};

export default Theme;

