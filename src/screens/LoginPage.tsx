import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../constants/colors';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = () => {
        if (!email || !password) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onLogin();
        }, 800);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                {/* Logo + title */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <Svg width={38} height={38} viewBox="0 0 24 24" fill="none">
                                <Path
                                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </Svg>
                        </View>
                    </View>
                    <Text style={styles.title}>MediStaff</Text>
                    <Text style={styles.subtitle}>Plateforme de gestion hospitalière</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Adresse e-mail</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="sophie.martin@hopital.fr"
                            placeholderTextColor={COLORS.textLight}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mot de passe</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="••••••••"
                            placeholderTextColor={COLORS.textLight}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.forgotPasswordContainer}>
                        <TouchableOpacity>
                            <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonLoading]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Connexion…' : 'Se connecter'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.footer}>
                    La création de compte est gérée par votre administrateur système.
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 28,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoContainer: {
        marginBottom: 20,
    },
    logo: {
        width: 72,
        height: 72,
        backgroundColor: COLORS.primary,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textMuted,
    },
    form: {
        gap: 14,
    },
    inputGroup: {
        gap: 6,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.6,
    },
    input: {
        width: '100%',
        padding: 13,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        fontSize: 15,
        color: COLORS.text,
        backgroundColor: COLORS.surfaceAlt,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
    },
    forgotPassword: {
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: '600',
    },
    button: {
        marginTop: 8,
        padding: 15,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
    },
    buttonLoading: {
        opacity: 0.7,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    footer: {
        textAlign: 'center',
        fontSize: 13,
        color: COLORS.textLight,
        marginTop: 32,
        lineHeight: 20,
    },
});

export default LoginPage;