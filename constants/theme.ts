/**
 * PokVoyage Theme
 * Centralized design tokens for colors, spacing, typography, and more.
 */

import { Platform } from 'react-native';

// ─── Colors ─────────────────────────────────────────────────────────────────
const tintColorLight = '#2563eb';
const tintColorDark = '#60a5fa';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // Semantic
    card: '#f1f5f9',
    cardAlt: '#e2e8f0',
    input: '#fff',
    placeholder: '#888',
    error: '#f87171',
    success: '#10b981',
    overlay: 'rgba(0,0,0,0.5)',
    gradientStart: '#3b82f6',
    gradientEnd: '#1d4ed8',
    gradientDarkStart: '#1e3a5f',
    gradientDarkEnd: '#0f172a',
    white: '#fff',
    whiteMuted: 'rgba(255,255,255,0.9)',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    // Semantic
    card: '#1e293b',
    cardAlt: '#334155',
    input: '#1e293b',
    placeholder: '#888',
    error: '#f87171',
    success: '#10b981',
    overlay: 'rgba(0,0,0,0.5)',
    gradientStart: '#334155',
    gradientEnd: '#1e293b',
    gradientDarkStart: '#1e3a5f',
    gradientDarkEnd: '#0f172a',
    white: '#fff',
    whiteMuted: 'rgba(255,255,255,0.9)',
  },
};

// ─── Spacing ─────────────────────────────────────────────────────────────────
export const Spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  headerTop: 60,
} as const;

// ─── Border Radius ───────────────────────────────────────────────────────────
export const BorderRadius = {
  xs: 2,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

// ─── Font Sizes ──────────────────────────────────────────────────────────────
export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 32,
  xxxl: 36,
} as const;

// ─── Font Weights ────────────────────────────────────────────────────────────
export const FontWeights = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

// ─── Line Heights ────────────────────────────────────────────────────────────
export const LineHeights = {
  tight: 24,
  normal: 30,
  relaxed: 32,
} as const;

// ─── Opacity ─────────────────────────────────────────────────────────────────
export const Opacity = {
  disabled: 0.6,
  muted: 0.7,
  subtle: 0.8,
} as const;

// ─── Layout ──────────────────────────────────────────────────────────────────
export const Layout = {
  inputHeight: 50,
  avatarSize: 80,
  cardHeight: 140,
} as const;

// ─── Fonts ───────────────────────────────────────────────────────────────────
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
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
