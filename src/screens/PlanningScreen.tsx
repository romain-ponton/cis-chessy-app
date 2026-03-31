import {View, Text, StyleSheet} from "react-native";

export default function PlanningScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Planning Screen</Text>
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