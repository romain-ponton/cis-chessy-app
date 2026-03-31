import {View, Text, StyleSheet} from "react-native";

export default function AlertsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alerts Screen</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    }
})