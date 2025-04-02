import React from "react";
import { Text, View, StyleSheet, ScrollView, Switch } from "react-native";
import data from "../data/datas.json";
import Entrees from "../components/Entrees";
import Plats from "../components/Plats";
import Desserts from "../components/Desserts";
import Boissons from "../components/Boissons";
import { useState } from "react";
import { useDate } from "../context/Context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const produits = data.produit;
type ProductCategory = keyof typeof produits;
const getProductName = (category: ProductCategory, id: string) => {
  const product = produits[category]?.find((prod) => prod.id === id);
  return product || null;
};

export default function Edit() {
  return (
    <GestureHandlerRootView>
      <EditContent />
    </GestureHandlerRootView>
  );
}

function EditContent() {
  let [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isBoursier, setIsBoursier] = useState<boolean>(false);

  function handleSelect(id: string): void {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  const { selectedDate }: { selectedDate: keyof typeof data.jour } = useDate();
  const jours = data.jour;
  const date = jours[selectedDate];

  const [points, setPoints] = useState(0);
  const [prix, setPrix] = useState(0);

  React.useEffect(() => {
    const totalPoints = selectedItems.reduce((total, id) => {
      const product =
        getProductName("dessert", id) ||
        (getProductName("entree", id) ? date[0]["entree"][0] : null) ||
        date[1]["plats"].find((plat) => plat.nom === id) ||
        null;
      return Number((total + (product?.point || 0)).toFixed(2));
    }, 0);

    let totalPrix = 0;

    if(totalPoints > 6) {
      totalPrix = Number(((isBoursier ? 1 : 3.30) + (totalPoints - 6) * (isBoursier ? 1/6 : 3.30/6)).toFixed(2));
    } else if (totalPoints > 0) {
      totalPrix = isBoursier ? 1 : 3.30;
    }

    totalPrix += selectedItems.reduce((total, id) => {
      const product = produits.boisson.find((boisson) => boisson.id === id);
      return total + (product?.prix || 0);
    }, 0);
    totalPrix = Number((totalPrix + Number.EPSILON).toFixed(2));

    setPoints(totalPoints);
    setPrix(totalPrix);
  }, [selectedItems, date, isBoursier]);

  return (
    <>
      <ScrollView style={styles.container}>
        {date && (
          <>
            {date.map((menu, menuIndex) => (
              <View key={menuIndex} style={styles.menuSection}>
                {Object.entries(menu).map(([category, items], categoryIndex) => (
                  <View key={categoryIndex} style={styles.categorySection}>
                    <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
                    {(category === "entree") ? (
                      (items as { choix: string[]; point: number }[]).map((item, entreeIndex) => (
                        <Entrees
                          key={entreeIndex}
                          handleSelect={handleSelect}
                          select={selectedItems}
                          entrees={item.choix.map((id: string) => ({
                            id,
                            nom: getProductName("entree", id).nom,
                            points: item.point,
                          }))}
                        />
                      ))
                    ) : (
                      ((category === "plats") ? (
                        <Plats
                          handleSelect={handleSelect}
                          select={selectedItems}
                          plats={(items as { plat: { principal: string[]; accompagnement: string[] }[]; point: number; nom: string }[]).map(
                            (plat) => ({
                              points: plat.point,
                              id: plat.nom,
                              nom: `${plat.nom} | Principal: ${plat.plat[0].principal
                                .map((id) => getProductName("principal", id).nom)
                                .join(", ")} ${
                                  plat.plat[0].accompagnement.length > 0
                                    ? ` | Accompagnement: ${plat.plat[0].accompagnement
                                        .map((id) => getProductName("accompagnement", id).nom)
                                        .join(", ")}`
                                    : ""
                                }`,
                            })
                          )}
                        />
                      ) : (category === "dessert") && (
                        <Desserts
                          handleSelect={handleSelect}
                          select={selectedItems}
                          desserts={(items as { choix: string[]; point: number }[]).map((item) => ({
                            id: item,
                            nom: getProductName("dessert", item).nom,
                            points: getProductName("dessert", item).point,
                          }))}
                        />
                      ))
                    )}
                  </View>
                ))}
              </View>
            ))}
            <Text style={styles.categoryTitle}>Boissons</Text>
            <Boissons
              handleSelect={handleSelect}
              select={selectedItems}
              boissons={(produits.boisson as { id: string; nom: string; prix: number }[]).map((item) => ({
                id: item.id,
                nom: item.nom,
                prix: item.prix,
              }))}
            />
          </>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Total Points : {points} | Total Prix : {prix} €
        </Text>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Êtes-vous boursier ?</Text>
          <Switch
              value={isBoursier}
              onValueChange={setIsBoursier}
              trackColor={{ false: "#ccc", true: "#00796b" }}
              thumbColor={isBoursier ? "#fff" : "#888"}
              ios_backgroundColor="#ccc"
          />
        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#f8f8f8", paddingHorizontal: 15, paddingTop: 20 },
  menuSection: { marginBottom: 20, padding: 10, backgroundColor: "#fff", borderRadius: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  categorySection: { marginBottom: 15, padding: 10, borderRadius: 6, backgroundColor: "#f0f0f0", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  categoryTitle: { fontWeight: "bold", fontSize: 18, color: "#DE0410", marginBottom: 10 },
  footer: { padding: 15, backgroundColor: "#fefeff", alignItems: "center", borderWidth: 2, borderColor: "#dcdcdc" },
  footerText: { fontSize: 18, fontWeight: "bold", color: "black" },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },

  switchText: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: "bold",
    color: "#333",
  }
});
