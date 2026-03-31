import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { COLORS } from '../../constants/colors';
import { UserRole } from '../../types/role';

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);

  const handleLogin = (role: UserRole) => {
    login(role);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CIS Chessy</Text>
      <Text style={styles.subtitle}>Connexion de démonstration</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleLogin('utilisateur')}>
        <Text style={styles.buttonText}>Entrer comme Utilisateur</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleLogin('centre_appel')}>
        <Text style={styles.buttonText}>Entrer comme Centre d’appel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleLogin('admin')}>
        <Text style={styles.buttonText}>Entrer comme Admin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});