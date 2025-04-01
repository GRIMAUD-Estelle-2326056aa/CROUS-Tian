import { Stack } from "expo-router";
import { Image, Text, StyleSheet } from "react-native";
import { DateProvider, useDate } from "./context/Context";

export default function RootLayout() {
  
  return (
    <DateProvider>
      <Header/>
    </DateProvider>
  );
}

function Header() {
  const { selectedDate } = useDate();

  return (
    <Stack
        screenOptions={{
          
          headerTitle: () => (
            <Image
              source={require("../assets/images/logo.png")}
              style={{ width: 50, height: 50 }}
            />
          ),
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="calculate/index"
          options={{ headerTitle: () =>(
          <Text style={styles.dayTitle}>{selectedDate}</Text>),
          headerTitleAlign: "center",
        }}
        />
      </Stack>
  );
}

const styles = StyleSheet.create({
  dayTitle: { fontWeight: "bold", fontSize: 22, textAlign: "center", marginBottom: 15, color: "#333" },
});
