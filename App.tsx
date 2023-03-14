import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
  Jost_800ExtraBold,
} from "@expo-google-fonts/jost"
import { StatusBar } from "react-native"

import { Loading } from "./src/components/Loading"
import Routes from "./src/routes"

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
    Jost_800ExtraBold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <>
      <Routes />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </>
  )
}
