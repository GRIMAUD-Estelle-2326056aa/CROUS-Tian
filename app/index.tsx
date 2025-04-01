import { Button, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import Home from "./home/index";

export default function Index() {
  const router = useRouter();

  return (
      <Home/>
  )
}
