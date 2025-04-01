import { Stack } from "expo-router";
import { Image } from "react-native";
import { DateProvider } from "./context/Context";

export default function RootLayout() {
  
  return (
    <DateProvider>
      <Stack
        screenOptions={{
          // Utilisation de l'image comme titre
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
          name="edit/index"
          options={{ headerTitle: "Edit" }}
        />
      </Stack>
    </DateProvider>
  );
}
