import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { COLORS} from "./src/constants/colors";
import BottomNav from "./src/components/BottomNav";
import LoginPage from "./src/screens/LoginPage";
import HomePage from "./src/screens/user/HomePage";
import PlanningPage from "./src/screens/user/PlanningPage";
import AlertsPage from "./src/screens/user/AlertsPage";
import TrainingPage from "./src/screens/user/TrainingPage";
import type { PageName} from "./src/types/types";

const App: React.FC = () => {
    const [page, setPage] = useState<PageName>('login');
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const handleLogin = () => {
        setLoggedIn(true);
        setPage('home');
    };

    const renderPage = () => {
        switch (page) {
            case 'login':
                return <LoginPage onLogin={handleLogin} />;
            case 'home':
                return <HomePage />;
            case 'planning':
                return <PlanningPage />;
            case 'alerts':
                return <AlertsPage />;
            case 'training':
                return <TrainingPage />;
            default:
                return <HomePage />;
        }
    };

    return (
        <View style={styles.appContainer}>
            <StatusBar barStyle="dark-content" />

            {/* Phone frame wrapper */}
            <View style={styles.phoneFrame}>
                {/* Status bar */}
                <View style={styles.statusBar}>
                    <Text style={styles.statusBarTime}>9:41</Text>
                    <View style={styles.notch} />
                    <View style={styles.statusBarIcons}>
                        <Svg width={16} height={12} viewBox="0 0 16 12">
                            <Rect x={0} y={3} width={3} height={9} rx={1} fill={COLORS.text} />
                            <Rect x={4.5} y={2} width={3} height={10} rx={1} fill={COLORS.text} />
                            <Rect x={9} y={0} width={3} height={12} rx={1} fill={COLORS.text} />
                            <Rect x={13.5} y={1} width={2.5} height={4} rx={0.5} fill={COLORS.textLight} />
                        </Svg>
                    </View>
                </View>

                {/* Page content */}
                <View style={styles.pageContent}>{renderPage()}</View>

                {/* Bottom navigation (hidden on login screen) */}
                {loggedIn && <BottomNav page={page} setPage={setPage} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#E8EEF6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    phoneFrame: {
        width: 390,
        height: 844,
        backgroundColor: COLORS.surface,
        borderRadius: 50,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 30 },
        shadowOpacity: 0.25,
        shadowRadius: 80,
        elevation: 30,
    },
    statusBar: {
        height: 50,
        backgroundColor: COLORS.surface,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        zIndex: 10,
    },
    statusBarTime: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
    },
    notch: {
        position: 'absolute',
        left: '50%',
        top: 10,
        width: 100,
        height: 28,
        backgroundColor: '#0a0a1a',
        borderRadius: 20,
        transform: [{ translateX: -50 }],
    },
    statusBarIcons: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    pageContent: {
        flex: 1,
        backgroundColor: COLORS.surfaceAlt,
    },
});

export default App;