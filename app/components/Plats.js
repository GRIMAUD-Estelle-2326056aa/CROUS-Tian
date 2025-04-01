import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

export default function Plats({ plats = [], handleSelect, select }) {      
    return(
        <ScrollView horizontal={true} style={styles.scrollContainer}>
            {Array.isArray(plats) && plats.map((plat) => (
                <TouchableOpacity key={plat.id} onPress={() => handleSelect(plat.id)} activeOpacity={1}>
                    <View style={[styles.card, select.includes(plat.id) && styles.active]}>
                        <Text style={styles.title}>{plat.nom}</Text>
                        <Text style={styles.points}>{plat.points} point(s)</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingLeft: 10,
    },
    card: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 15,
        margin: 5,
        width: 200,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    active: {
        borderColor: "#4bb84b",
        borderWidth: 3,
        shadowColor: "#4bb84b"
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
        marginBottom: 5,
        width: "100%",
    },
    points: {
        fontSize: 13,
        color: "#00796b"
    },
});