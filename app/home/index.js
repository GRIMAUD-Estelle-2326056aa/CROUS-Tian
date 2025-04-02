import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import data from "../data/datas.json";
import { useDate } from "../context/Context";

const HomeScreen = () => {
    const router = useRouter();
    const dates = Object.keys(data.jour);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentDate = dates[currentIndex];
    const menu = data.jour[currentDate];

    const { setSelectedDate } = useDate();

    const handlePrevious = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleNext = () => {
        if (currentIndex < dates.length - 1) setCurrentIndex(currentIndex + 1);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={handlePrevious} style={styles.navButton}>
                        <Text style={styles.navButtonText}>{'◀'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.dateText}>{currentDate}</Text>
                    <TouchableOpacity onPress={handleNext} style={styles.navButton}>
                        <Text style={styles.navButtonText}>{'▶'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.menuContainer}>
                    <View style={styles.listContainer}>
                        <Text style={styles.sectionTitle}>Entrée</Text>
                        {menu[0].entree[0].choix.map((id) => (
                            <Text key={id} style={styles.itemText}>{data.produit.entree.find(e => e.id === id).nom}</Text>
                        ))}
                    </View>

                    <View style={styles.listContainer}>
                        <Text style={styles.sectionTitle}>Plats</Text>
                        {menu[1].plats.map((menu) => (
                            <View key={menu.nom} style={styles.listContainer}>
                                <Text style={styles.itemTitle}>{menu.nom}</Text>
                                <View style={styles.innerList}>
                                    {menu.plat[0].principal.map((id) => (
                                        <Text key={id} style={styles.itemText}>{data.produit.principal.find(p => p.id === id).nom}</Text>
                                    ))}
                                </View>
                                {menu.plat[0].accompagnement.length > 0 && (
                                    <View style={styles.innerList}>
                                        {menu.plat[0].accompagnement.map((id) => (
                                            <Text key={id} style={styles.itemText}>{data.produit.accompagnement.find(p => p.id === id).nom}</Text>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>

                    <View style={styles.listContainer}>
                        <Text style={styles.sectionTitle}>Desserts</Text>
                        {menu[2].dessert.map((id) => (
                            <Text key={id} style={styles.itemText}>{data.produit.dessert.find(d => d.id === id).nom}</Text>
                        ))}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { setSelectedDate(currentDate); router.replace("/calculate"); }}
                >
                    <Text style={styles.buttonText}>Sélectionner</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
        width: '100%'
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
        width: '90%'
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        flex: 1
    },
    navButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#DE0410'
    },
    navButtonText: {
        fontSize: 20,
        color: '#fff'
    },
    menuContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'center'
    },
    listContainer: {
        alignItems: 'center',
        marginBottom: 10,
        width: '100%'
    },
    innerList: {
        alignItems: 'center',
        width: '100%'
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#DE0410',
        textAlign: 'center'
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
        textAlign: 'center'
    },
    itemText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#DE0410',
        padding: 12,
        marginTop: 20,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default HomeScreen;
