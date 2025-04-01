import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

export default function Plats({ plats = [], handleSelect, select }) {
    const styles = StyleSheet.create({
        basic: {
            backgroundColor: "lightblue",
            borderWidth: 2,
            borderStyle: "solid",
            justifyContent: "space-between",
            margin: 2,
            width: 150,
            height: 200,
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
            {Array.isArray(plats) && plats.map((plat) => (
                <View style={{backgroundColor: "white", padding: 10}}>
                    <View key={plat.id}
                    style={[styles.basic, select.includes(plat.id) && styles.active]} onClick={() => handleSelect(plat.id)}>
                        <Text>{plat.nom}, {"\n"}</Text>
                        <Text>
                            {plat.points} point(s).
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}