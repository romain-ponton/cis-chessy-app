import {View, Text, StyleSheet} from "react-native";

export default function AccountScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Screen</Text>
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