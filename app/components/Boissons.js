import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Boissons({ boissons = [], handleSelect, select }) {
  return (
    <ScrollView horizontal={true} style={styles.scrollContainer}>
      {Array.isArray(boissons) &&
        boissons.map((boisson) => (
          <TouchableOpacity key={boisson.id} onPress={() => handleSelect(boisson.id)} activeOpacity={1}>
            <View style={[styles.card, select.includes(boisson.id) && styles.active]}>
              <Text style={styles.title}>{boisson.nom}</Text>
              <Text style={styles.points}>{boisson.prix}€</Text>
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
    width: 150,
    height: 150,
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
