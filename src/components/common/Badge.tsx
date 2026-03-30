import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

type Props = {
  label: string;
  danger?: boolean;
};

export default function Badge({ label, danger = false }: Props) {
  return (
    <View style={[styles.badge, danger && styles.dangerBadge]}>
      <Text style={[styles.text, danger && styles.dangerText]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#E9EEF7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  dangerBadge: {
    backgroundColor: COLORS.dangerSoft,
  },
  text: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
  dangerText: {
    color: '#B4232C',
  },
});