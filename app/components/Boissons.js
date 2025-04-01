import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

export default function Boissons({ boissons = [], handleSelect, select }) {
    const styles = StyleSheet.create({
        basic: {
            backgroundColor: "lightblue",
            borderWidth: 2,
            borderStyle: "solid",
            justifyContent: "space-between",
            margin: 2,
            width: 100,
            height: 100,
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            cursor: "pointer",
        },
        active: {
            borderColor: "orange",
        },
    });
    
    return(
        <ScrollView horizontal={true} style={{paddingLeft: 10}}>
            {Array.isArray(boissons) && boissons.map((boisson) => (
                <View style={{backgroundColor: "white", padding: 10}}>
                    <View key={boisson.id}
                    style={[styles.basic, select.includes(boisson.id) && styles.active]} onClick={() => handleSelect(boisson.id)}>
                        <Text>{boisson.nom}, {"\n"}</Text>
                        <Text>
                            {boisson.prix}€.

                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}