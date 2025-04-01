import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
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
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < dates.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

  return (
    <View style={styles.container}>
        <View style={styles.dateContainer}>
            <TouchableOpacity onPress={handlePrevious} style={styles.navButton}>
                <Text style={styles.navButtonText}>{'◀'}</Text>
            </TouchableOpacity>
            <Text style={styles.dateText}>{`${currentDate}`}</Text>
            <TouchableOpacity onPress={handleNext} style={styles.navButton}>
                <Text style={styles.navButtonText}>{'▶'}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.menuContainer}>
            <View key="entree" style={styles.listContainer}>
                <Text style={styles.sectionTitle}>Entrée</Text>
                {menu[0].entree[0].choix.map((id) => (
                <Text key={id} style={styles.itemText}>{data.produit.entree.find(e => e.id === id).nom}</Text>
                ))}
            </View>
            <View key="plats" style={styles.listContainer}>
                <Text style={styles.sectionTitle}>Plats</Text>
                {menu[1].plats.map((menu) => (
                    <>
                        <Text style={styles.itemTitle}>{menu.nom}</Text>
                        <View key={menu.nom} style={styles.listContainer}>
                            {menu.plat[0].principal.map((id) => (
                                <Text key={id} style={styles.itemText}>{data.produit.principal.find(p => p.id === id).nom}</Text>
                            ))}
                        </View>
                        <View key={menu.nom} style={styles.listContainer}>
                        {menu.plat[0].accompagnement.map((id) => (
                            <Text key={id} style={styles.itemText}>{data.produit.accompagnement.find(p => p.id === id).nom}</Text>
                        ))}
                        </View>
                    </>
                ))}
            </View>
            <View key="dessert" style={styles.listContainer}>
                <Text style={styles.sectionTitle}>Desserts</Text>
                {menu[2].dessert.map((id) => (
                    <Text key={id} style={styles.itemText}>{data.produit.dessert.find(d => d.id === id).nom}</Text>
                ))}
            </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {
            setSelectedDate(currentDate);
            router.replace("/edit", {});
        }}>
            <Text style={styles.buttonText}>Sélectionner</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#f8f9fa', overflow: "auto" },
    dateContainer: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor: '#fff', borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5, marginBottom: 20 },
    dateText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    navButton: { padding: 10, borderRadius: 5, backgroundColor: '#DE0410' },
    navButtonText: { fontSize: 20, color: '#fff' },
    menuContainer: { padding: 20, backgroundColor: '#fff', borderRadius: 10, width: '100%', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 },
    listContainer: { alignItems: 'center', marginBottom: 10 },
    sectionTitle: { fontSize: 22, fontWeight: 'bold', marginVertical: 10, color: '#DE0410' },
    itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#444' },
    itemText: { fontSize: 16, color: '#666' },
    button: { backgroundColor: '#DE0410', padding: 12, marginTop: 20, borderRadius: 8, width: '80%', alignItems: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 5 },
    buttonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' }
});

export default HomeScreen;