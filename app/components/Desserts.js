import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

export default function Desserts({ desserts = [], handleSelect, select }) {
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
            {Array.isArray(desserts) && desserts.map((dessert) => (
                <View style={{backgroundColor: "white", padding: 10}}>
                    <View key={dessert.id}
                    style={[styles.basic, select.includes(dessert.id) && styles.active]} onClick={() => handleSelect(dessert.id)}>
                        <Text>{dessert.nom}, {"\n"}</Text>
                        <Text>
                            {dessert.points} point(s).
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}