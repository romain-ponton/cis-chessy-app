import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { MOCK_ALERTS } from '../../constants/mockData';
import { Card, Badge, alertColor} from "../../constants/ui";
import type { Filter } from '../../types/types';

const FILTERS: Filter[] = [
    { id: 'all', label: 'Toutes' },
    { id: 'critique', label: 'Critique' },
    { id: 'urgence', label: 'Urgence' },
    { id: 'info', label: 'Info' },
];

const AlertsPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const filtered =
        activeFilter === 'all'
            ? MOCK_ALERTS
            : MOCK_ALERTS.filter((alert) => alert.type === activeFilter);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Alertes</Text>
                <Text style={styles.subtitle}>
                    {MOCK_ALERTS.length} notifications actives
                </Text>
            </View>

            {/* Filter chips */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterContainer}
                contentContainerStyle={styles.filterContent}
            >
                {FILTERS.map((filter) => (
                    <TouchableOpacity
                        key={filter.id}
                        onPress={() => setActiveFilter(filter.id)}
                        style={[
                            styles.filterChip,
                            activeFilter === filter.id && styles.filterChipActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                activeFilter === filter.id && styles.filterChipTextActive,
                            ]}
                        >
                            {filter.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Alert list */}
            <ScrollView
                style={styles.listContainer}
                contentContainerStyle={styles.listContent}
            >
                {filtered.map((alert) => {
                    const style = alertColor(alert.type);
                    return (
                        <Card
                            key={alert.id}
                            style={[
                                styles.alertCard,
                                { borderLeftWidth: 4, borderLeftColor: style.color, paddingLeft: 14 },
                            ]}
                        >
                            <View style={styles.alertHeader}>
                                <Badge color={style.color} bg={style.bg}>
                                    {style.label}
                                </Badge>
                                <Text style={styles.alertTime}>{alert.time}</Text>
                            </View>
                            <Text style={styles.alertTitle}>{alert.title}</Text>
                            <Text style={styles.alertDesc}>{alert.desc}</Text>
                        </Card>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingBottom: 16,
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        color: COLORS.textMuted,
    },
    filterContainer: {
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    filterContent: {
        padding: 12,
        paddingHorizontal: 16,
        gap: 8,
    },
    filterChip: {
        paddingVertical: 7,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        backgroundColor: 'white',
    },
    filterChipActive: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primaryLight,
    },
    filterChipText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textMuted,
    },
    filterChipTextActive: {
        color: COLORS.primary,
    },
    listContainer: {
        flex: 1,
    },
    listContent: {
        padding: 12,
        paddingHorizontal: 16,
        gap: 10,
    },
    alertCard: {
        marginBottom: 10,
    },
    alertHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    alertTime: {
        fontSize: 11,
        color: COLORS.textLight,
    },
    alertTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 4,
    },
    alertDesc: {
        fontSize: 13,
        color: COLORS.textMuted,
        lineHeight: 20,
    },
});

export default AlertsPage;