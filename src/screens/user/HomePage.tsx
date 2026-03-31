import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from "react-native-svg";
import { COLORS } from '../../constants/colors';
import {
    MOCK_USER,
    MOCK_SERVICE,
    MOCK_ALERTS,
    MOCK_TRAININGS,
    MOCK_DOCS
} from "../../constants/mockData";
import {
    Avatar,
    Badge,
    ProgressBar,
    Card,
    SectionTitle,
    alertColor
} from "../../constants/ui";
import { BellIcon, DownloadIcon } from '../../components/icons';

const HomePage: React.FC = () => {
    const topAlert = MOCK_ALERTS[0];
    const alertStyle = alertColor(topAlert.type);
    const topTrainings = MOCK_TRAININGS.slice(0, 3);
    const topDocs = MOCK_DOCS.slice(0, 3);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.userInfo}>
                        <Avatar initials={MOCK_USER.avatar} />
                        <View style={styles.userText}>
                            <Text style={styles.greeting}>
                                Bonjour, {MOCK_USER.name.split(' ')[0]} 👋
                            </Text>
                            <Text style={styles.role}>{MOCK_USER.role}</Text>
                        </View>
                    </View>
                    <View style={styles.notificationContainer}>
                        <BellIcon color={COLORS.textMuted} />
                        <View style={styles.notificationBadge} />
                    </View>
                </View>
            </View>

            <View style={styles.pageContent}>
                {/* Next service card */}
                <LinearGradient
                    colors={[COLORS.primary, '#2563EB']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.serviceCard}
                >
                    <View style={styles.serviceCardDecoTop} />
                    <View style={styles.serviceCardDecoBottom} />
                    <Text style={styles.serviceLabel}>Prochain service</Text>
                    <Text style={styles.serviceDate}>{MOCK_SERVICE.date}</Text>
                    <Text style={styles.serviceTime}>
                        {MOCK_SERVICE.start} – {MOCK_SERVICE.end}
                    </Text>
                    <Text style={styles.serviceLocation}>{MOCK_SERVICE.location}</Text>
                </LinearGradient>

                {/* Alert dashboard */}
                <SectionTitle action="Voir tout →">🚨 Alertes</SectionTitle>
                <Card
                    style={[
                        styles.alertCard,
                        { borderLeftWidth: 4, borderLeftColor: alertStyle.color, paddingLeft: 14 },
                    ]}
                >
                    <View style={styles.alertHeader}>
                        <Badge color={alertStyle.color} bg={alertStyle.bg}>
                            {alertStyle.label}
                        </Badge>
                        <Text style={styles.alertTime}>{topAlert.time}</Text>
                    </View>
                    <Text style={styles.alertTitle}>{topAlert.title}</Text>
                    <Text style={styles.alertDesc}>{topAlert.desc}</Text>
                </Card>

                {/* Training dashboard */}
                <SectionTitle action="Voir tout →">📘 Formations</SectionTitle>
                <Card style={styles.trainingCard}>
                    {topTrainings.map((training, index) => (
                        <View
                            key={training.id}
                            style={[
                                styles.trainingItem,
                                index < topTrainings.length - 1 && styles.trainingItemBorder,
                            ]}
                        >
                            <View style={styles.trainingHeader}>
                                <Text style={styles.trainingTitle}>{training.title}</Text>
                                <Text style={styles.trainingProgress}>{training.progress}%</Text>
                            </View>
                            <ProgressBar
                                value={training.progress}
                                color={
                                    training.progress > 70
                                        ? COLORS.success
                                        : training.progress > 40
                                            ? COLORS.primary
                                            : COLORS.warning
                                }
                            />
                        </View>
                    ))}
                </Card>

                {/* Documents dashboard */}
                <SectionTitle action="Voir tout →">📄 Documents récents</SectionTitle>
                <Card style={styles.docsCard}>
                    {topDocs.map((doc, index) => (
                        <View
                            key={doc.id}
                            style={[
                                styles.docItem,
                                index < topDocs.length - 1 && styles.docItemBorder,
                            ]}
                        >
                            <View style={styles.docIcon}>
                                <Text style={styles.docIconText}>PDF</Text>
                            </View>
                            <View style={styles.docInfo}>
                                <Text style={styles.docTitle} numberOfLines={1}>
                                    {doc.title}
                                </Text>
                                <Text style={styles.docMeta}>
                                    {doc.size} · {doc.date}
                                </Text>
                            </View>
                            <DownloadIcon color={COLORS.primary} />
                        </View>
                    ))}
                </Card>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingBottom: 8,
    },
    header: {
        padding: 20,
        paddingBottom: 16,
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    userText: {
        gap: 2,
    },
    greeting: {
        fontSize: 17,
        fontWeight: '700',
        color: COLORS.text,
    },
    role: {
        fontSize: 12,
        color: COLORS.textMuted,
    },
    notificationContainer: {
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 10,
        height: 10,
        backgroundColor: COLORS.danger,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'white',
    },
    pageContent: {
        padding: 16,
        paddingTop: 16,
    },
    serviceCard: {
        borderRadius: 18,
        padding: 18,
        marginBottom: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    serviceCardDecoTop: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.06)',
    },
    serviceCardDecoBottom: {
        position: 'absolute',
        bottom: -30,
        right: 30,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    serviceLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.7)',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 4,
    },
    serviceDate: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        marginBottom: 12,
    },
    serviceTime: {
        fontSize: 28,
        fontWeight: '800',
        color: 'white',
        letterSpacing: -0.5,
    },
    serviceLocation: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.75)',
        marginTop: 4,
    },
    alertCard: {
        marginBottom: 16,
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
    trainingCard: {
        marginBottom: 16,
    },
    trainingItem: {
        paddingBottom: 14,
        marginBottom: 14,
    },
    trainingItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    trainingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    trainingTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.text,
    },
    trainingProgress: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.primary,
    },
    docsCard: {
        marginBottom: 8,
    },
    docItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingBottom: 12,
        marginBottom: 12,
    },
    docItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    docIcon: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: COLORS.dangerLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    docIconText: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.danger,
    },
    docInfo: {
        flex: 1,
    },
    docTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.text,
    },
    docMeta: {
        fontSize: 11,
        color: COLORS.textLight,
    },
});

export default HomePage;