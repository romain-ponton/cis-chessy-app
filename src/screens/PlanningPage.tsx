import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { CALENDAR_DAYS} from "../constants/mockData2";
import { Card, SectionTitle, LogoMark } from "../constants/ui";
import type { CalendarDay} from "../types/types";

const SERVICE_TIMES = ['06:00', '07:00', '08:00', '12:00', '13:00', '19:00', '20:00'];

const PlanningPage: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<number>(2);
    const [selectedTime, setSelectedTime] = useState<string>('07:00');

    const selectedDayData = CALENDAR_DAYS.find((d) => d.date === selectedDay);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Mon Planning</Text>
                <LogoMark />
            </View>

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.content}
            >
                {/* Month label */}
                <Text style={styles.monthLabel}>Avril 2025</Text>

                {/* Week strip calendar */}
                <Card style={styles.calendarCard}>
                    <View style={styles.calendarGrid}>
                        {CALENDAR_DAYS.map((day) => (
                            <TouchableOpacity
                                key={day.date}
                                onPress={() => setSelectedDay(day.date)}
                                style={[
                                    styles.dayItem,
                                    selectedDay === day.date && styles.dayItemActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dayLabel,
                                        selectedDay === day.date && styles.dayLabelActive,
                                    ]}
                                >
                                    {day.day}
                                </Text>
                                <Text
                                    style={[
                                        styles.dayDate,
                                        selectedDay === day.date && styles.dayDateActive,
                                    ]}
                                >
                                    {day.date}
                                </Text>
                                <View
                                    style={[
                                        styles.dayIndicator,
                                        day.hasService && {
                                            backgroundColor:
                                                selectedDay === day.date
                                                    ? 'rgba(255,255,255,0.8)'
                                                    : COLORS.primary,
                                        },
                                    ]}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </Card>

                {/* Selected day info */}
                {selectedDayData?.hasService ? (
                    <View style={styles.serviceInfo}>
                        <Text style={styles.serviceInfoLabel}>Service planifié</Text>
                        <Text style={styles.serviceInfoText}>
                            Mercredi {selectedDay} Avril — Service Cardiologie
                        </Text>
                    </View>
                ) : (
                    <View style={styles.noServiceInfo}>
                        <Text style={styles.noServiceText}>Aucun service prévu ce jour.</Text>
                    </View>
                )}

                {/* Time selection */}
                <SectionTitle>Heure de prise de service</SectionTitle>
                <View style={styles.timeGrid}>
                    {SERVICE_TIMES.map((time) => (
                        <TouchableOpacity
                            key={time}
                            onPress={() => setSelectedTime(time)}
                            style={[
                                styles.timeItem,
                                selectedTime === time && styles.timeItemActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.timeText,
                                    selectedTime === time && styles.timeTextActive,
                                ]}
                            >
                                {time}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirmer la sélection</Text>
                </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.text,
    },
    scrollContainer: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 8,
    },
    monthLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 12,
    },
    calendarCard: {
        padding: 12,
        paddingHorizontal: 8,
        marginBottom: 20,
    },
    calendarGrid: {
        flexDirection: 'row',
        gap: 4,
    },
    dayItem: {
        flex: 1,
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 12,
    },
    dayItemActive: {
        backgroundColor: COLORS.primary,
    },
    dayLabel: {
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: COLORS.textLight,
    },
    dayLabelActive: {
        color: 'rgba(255,255,255,0.8)',
    },
    dayDate: {
        fontSize: 17,
        fontWeight: '800',
        color: COLORS.text,
    },
    dayDateActive: {
        color: 'white',
    },
    dayIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    serviceInfo: {
        backgroundColor: COLORS.successLight,
        borderRadius: 14,
        padding: 14,
        paddingHorizontal: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: `${COLORS.success}22`,
    },
    serviceInfoLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.success,
        textTransform: 'uppercase',
        letterSpacing: 0.6,
        marginBottom: 4,
    },
    serviceInfoText: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.text,
    },
    noServiceInfo: {
        backgroundColor: COLORS.surfaceAlt,
        borderRadius: 14,
        padding: 14,
        paddingHorizontal: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    noServiceText: {
        fontSize: 14,
        color: COLORS.textMuted,
    },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    timeItem: {
        width: '23%',
        paddingVertical: 10,
        paddingHorizontal: 4,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: COLORS.border,
    },
    timeItemActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    timeText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
    },
    timeTextActive: {
        color: 'white',
    },
    confirmButton: {
        width: '100%',
        padding: 15,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
    },
});

export default PlanningPage;