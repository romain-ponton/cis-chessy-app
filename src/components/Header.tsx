import { View, Text, StyleSheet} from "react-native";
import { useUser } from "../constants/mockUsers";
import {COLORS} from "../constants/colors";

const ROLE_STYLES = {
    admin: { label: 'Admin'},
    centre_appel: { label: "Centre d'appel"},
    user: { label: 'Utilisateur'},
};

export default function Header() {
    const user = useUser();
    // @ts-ignore
    const roleStyle = ROLE_STYLES[user.role] ?? ROLE_STYLES.user

    return (
        <View style={styles.container}>
            <Text style={styles.sub}>{roleStyle.label} portal</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: '#e0e0e0',
    },
    sub: { fontSize: 17, fontWeight: "600" },
})