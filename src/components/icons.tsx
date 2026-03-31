import React from 'react';
import Svg, { Path, Rect, Line, Polyline } from 'react-native-svg';

interface IconProps {
    size?: number;
    color?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ size = 22, color = 'currentColor' }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M3 12L12 3l9 9" />
            <Path d="M9 21V12h6v9" />
            <Path d="M5 10v11h14V10" />
        </Svg>
    );
};

export const CalendarIcon: React.FC<IconProps> = ({ size = 22, color = 'currentColor' }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="3" y="4" width="18" height="18" rx="2" />
            <Line x1="16" y1="2" x2="16" y2="6" />
            <Line x1="8" y1="2" x2="8" y2="6" />
            <Line x1="3" y1="10" x2="21" y2="10" />
        </Svg>
    );
};

export const BellIcon: React.FC<IconProps> = ({ size = 22, color = 'currentColor' }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </Svg>
    );
};

export const BookIcon: React.FC<IconProps> = ({ size = 22, color = 'currentColor' }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </Svg>
    );
};

export const LoginIcon: React.FC<IconProps> = ({ size = 22, color = 'currentColor' }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <Polyline points="10 17 15 12 10 7" />
            <Line x1="15" y1="12" x2="3" y2="12" />
        </Svg>
    );
};

export const ChevronRight: React.FC<IconProps> = ({ size = 16, color = 'currentColor' }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Polyline points="9 18 15 12 9 6" />
        </Svg>
    );
};

export const DownloadIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor' }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <Polyline points="7 10 12 15 17 10" />
            <Line x1="12" y1="15" x2="12" y2="3" />
        </Svg>
    );
};