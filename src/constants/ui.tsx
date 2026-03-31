import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from "./colors";
import type { AlertType, AlertStyle} from "../types/types";

interface AvatarProps {
    initials: string;
    size?: number;
    bg?: string;
    color?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
                                                  initials,
                                                  size = 44,
                                                  bg = COLORS.primaryLight,
                                                  color = COLORS.primary,
                                              }) => {
    return (
        <View
            style={[
                styles.avatar,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: bg,
                },
            ]}
        >
            <Text style={[styles.avatarText, { fontSize: size * 0.36, color }]}>
                {initials}
            </Text>
        </View>
    );
};

interface BadgeProps {
    children: string;
    color: string;
    bg: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color, bg }) => {
    return (
        <View style={[styles.badge, { backgroundColor: bg }]}>
            <Text style={[styles.badgeText, { color }]}>{children}</Text>
        </View>
    );
};

interface ProgressBarProps {
    value: number;
    color?: string;
    height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
                                                            value,
                                                            color = COLORS.primary,
                                                            height = 6,
                                                        }) => {
    return (
        <View style={[styles.progressBarContainer, { height, borderRadius: height }]}>
            <View
                style={[
                    styles.progressBarFill,
                    {
                        width: `${value}%`,
                        height: '100%',
                        backgroundColor: color,
                        borderRadius: height,
                    },
                ]}
            />
        </View>
    );
};

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
    return <View style={[styles.card, style]}>{children}</View>;
};

interface SectionTitleProps {
    children: string;
    action?: string;
    onActionPress?: () => void;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
                                                              children,
                                                              action,
                                                              onActionPress,
                                                          }) => {
    return (
        <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitleText}>{children}</Text>
            {action && (
                <Text style={styles.sectionTitleAction} onPress={onActionPress}>
                    {action}
                </Text>
            )}
        </View>
    );
};

export const LogoMark: React.FC = () => {
    return (
        <View style={styles.logoMark}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </View>
    );
};

export const alertColor = (type: AlertType): AlertStyle => {
    if (type === 'critique') {
        return {
            color: COLORS.danger,
            bg: COLORS.dangerLight,
            label: 'Critique',
        };
    }
    if (type === 'urgence') {
        return {
            color: COLORS.warning,
            bg: COLORS.warningLight,
            label: 'Urgence',
        };
    }
    return {
        color: COLORS.primary,
        bg: COLORS.primaryLight,
        label: 'Info',
    };
};

const styles = StyleSheet.create({
    avatar: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontWeight: '600',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.4,
    },
    progressBarContainer: {
        backgroundColor: COLORS.border,
        overflow: 'hidden',
    },
    progressBarFill: {},
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 16,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitleText: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.text,
    },
    sectionTitleAction: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '600',
    },
    logoMark: {
        width: 32,
        height: 32,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});