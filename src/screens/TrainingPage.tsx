import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient} from "react-native-svg";
import { COLORS } from '../constants/colors';
import { MOCK_TRAININGS, MOCK_DOCS } from "../constants/mockData2";
import { Card, SectionTitle, ProgressBar, LogoMark} from "../constants/ui";
import { ChevronRight, DownloadIcon } from '../components/icons';

const TrainingPage: React.FC = () => {
    const totalDone = MOCK_TRAININGS.reduce((acc, training) => acc + training.done, 0);
    const totalModules = MOCK_TRAININGS.reduce((acc, training) => acc + training.total, 0);
    const globalProgress = Math.round(
        MOCK_TRAININGS.reduce((acc, training) => acc + training.progress, 0) /
        MOCK_TRAININGS.length
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Formation</Text>
                <LogoMark />
            </View>

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.content}
            >
                {/* Global progress */}
                <LinearGradient
                    colors={[COLORS.purple, '#7C3AED']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.progressCard}
                >
                    <Text style={styles.progressLabel}>Progression globale</Text>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressValue}>{globalProgress}%</Text>
                        <Text style={styles.progressSubtext}>de complétion</Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View
                            style={[styles.progressBarFill, { width: `${globalProgress}%` }]}
                        />
                    </View>
                    <Text style={styles.progressFooter}>
                        {totalDone} modules complétés sur {totalModules}
                    </Text>
                </LinearGradient>

                {/* My trainings */}
                <SectionTitle>Mes formations</SectionTitle>
                <View style={styles.trainingsContainer}>
                    {MOCK_TRAININGS.map((training) => (
                        <Card key={training.id} style={styles.trainingCard}>
                            <View style={styles.trainingHeader}>
                                <Text style={styles.trainingTitle} numberOfLines={1}>
                                    {training.title}
                                </Text>
                                <ChevronRight color={COLORS.textLight} />
                            </View>
                            <View style={styles.trainingProgress}>
                                <View style={styles.trainingMeta}>
                                    <Text style={styles.trainingModules}>
                                        {training.done}/{training.total} modules
                                    </Text>
                                    <Text
                                        style={[
                                            styles.trainingPercent,
                                            {
                                                color:
                                                    training.progress > 70
                                                        ? COLORS.success
                                                        : training.progress > 40
                                                            ? COLORS.primary
                                                            : COLORS.warning,
                                            },
                                        ]}
                                    >
                                        {training.progress}%
                                    </Text>
                                </View>
                                <ProgressBar
                                    value={training.progress}
                                    height={7}
                                    color={
                                        training.progress > 70
                                            ? COLORS.success
                                            : training.progress > 40
                                                ? COLORS.primary
                                                : COLORS.warning
                                    }
                                />
                            </View>
                        </Card>
                    ))}
                </View>

                {/* Documents */}
                <SectionTitle>Documents</SectionTitle>
                <View style={styles.docsContainer}>
                    {MOCK_DOCS.map((doc) => (
                        <Card key={doc.id} style={styles.docCard}>
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
                            <TouchableOpacity style={styles.downloadButton}>
                                <DownloadIcon size={14} color={COLORS.primary} />
                                <Text style={styles.downloadText}>DL</Text>
                            </TouchableOpacity>
                        </Card>
                    ))}
                </View>
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
    progressCard: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    progressLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.7)',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 4,
    },
    progressHeader: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
        marginBottom: 14,
    },
    progressValue: {
        fontSize: 44,
        fontWeight: '900',
        color: 'white',
        letterSpacing: -2,
    },
    progressSubtext: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.7)',
    },
    progressBarContainer: {
        height: 8,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 8,
        backgroundColor: 'white',
    },
    progressFooter: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.65)',
        marginTop: 10,
    },
    trainingsContainer: {
        gap: 10,
        marginBottom: 20,
    },
    trainingCard: {
        gap: 10,
    },
    trainingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    trainingTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
        flex: 1,
        paddingRight: 8,
    },
    trainingProgress: {
        gap: 6,
    },
    trainingMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    trainingModules: {
        fontSize: 12,
        color: COLORS.textMuted,
    },
    trainingPercent: {
        fontSize: 12,
        fontWeight: '700',
    },
    docsContainer: {
        gap: 10,
    },
    docCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    docIcon: {
        width: 42,
        height: 42,
        borderRadius: 10,
        backgroundColor: COLORS.dangerLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    docIconText: {
        fontSize: 11,
        fontWeight: '800',
        color: COLORS.danger,
    },
    docInfo: {
        flex: 1,
    },
    docTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 2,
    },
    docMeta: {
        fontSize: 11,
        color: COLORS.textLight,
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: COLORS.primaryLight,
    },
    downloadText: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.primary,
    },
});

export default TrainingPage;