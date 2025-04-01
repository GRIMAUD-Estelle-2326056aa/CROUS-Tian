import React from "react";
import { Text, View, StyleSheet } from "react-native";
import data from "../data/datas.json";
import { ScrollView } from "react-native-gesture-handler";
import Entrees from "../components/Entrees";
import Plats from "../components/Plats";
import Desserts from "../components/Desserts";
import { useState } from "react";
import { useDate } from "../context/Context";

// Liste des produits
const produits = data.produit;

// Fonction pour récupérer le nom d'un produit à partir de sa catégorie et de son ID
type ProductCategory = keyof typeof produits;

const getProductName = (category: ProductCategory, id: string) => {
  const product = produits[category]?.find((prod) => prod.id === id);
  return product || null;
};

export default function Edit() {
  let [selectedItems, setSelectedItems] = useState<string[]>([]);

  function handleSelect(id: string): void {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  const { selectedDate }: { selectedDate: keyof typeof data.jour } = useDate();

  // Récupération des jours depuis les données
  const jours = data.jour;

  const date = jours[selectedDate];

  return (
    <>
    <ScrollView>
      {date && (
        <>
          {/* Titre du jour */}
          <Text style={styles.dayTitle}>{selectedDate}</Text>
          {date.map((menu, menuIndex) => (
            <View key={menuIndex}>
              {/* Parcours des catégories dans le menu */}
              {Object.entries(menu).map(([category, items], categoryIndex) => (
                <View key={categoryIndex}>
                  {/* Titre de la catégorie */}
                  <Text style={styles.categoryTitle}>
                    {category.toUpperCase()}
                  </Text>
                    {(category === "entree") ? (
                      (items as { choix: string[]; point: number }[]).map((item, itemIndex) => {
                        return (
                          <Entrees
                          handleSelect={handleSelect}
                          select={selectedItems}
                            entrees={
                              item.choix
                                .map((id: string) => ({
                                  id,
                                  nom: getProductName("entree", id).nom,
                                  points: item.point,
                              })
                            )}
                          />
                        )
                      })
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
                            .join(", ")} | Accompagnement: ${plat.plat[0].accompagnement
                            .map((id) => getProductName("accompagnement", id).nom)
                            .join(", ")}`,
                          })
                          )}
                        />
                      ) : (category === "dessert") && (
                          <Desserts
                            handleSelect={handleSelect}
                            select={selectedItems}
                            desserts={(items as { choix: string[]; point: number }[]).map((item) => ({
                              id: item, // Assuming the first choice as the ID
                              nom: getProductName("dessert", item).nom,
                              points: getProductName("dessert", item).point,
                            }))}
                          />
                      ))
                    )
                  }
                </View>
              ))}
            </View>
          ))}
        </>
      )}
    </ScrollView>
    {/* Footer : cacul des points */}
    <View style={{ padding: 20, backgroundColor: "#f4f4f4" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Total Points: {selectedItems.reduce((total, id) => {
          console.log(date[0]);
          const product =
            getProductName("dessert", id)
            || (getProductName("entree", id) ? date[0]['entree'][0] : 0)
            || date[1]['plats'].find((plat) => plat.nom === id)
            || 0;
          console.log(product);
          return total + product.point;
        }, 0)}
      </Text>
    </View>
    </>
  );
}

// Définition des styles
const styles = StyleSheet.create({
  dayTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    paddingLeft: 10,
  },
  categoryTitle: {
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 10,
  }
});
