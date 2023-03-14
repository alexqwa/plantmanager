import { View, ActivityIndicator } from "react-native"
import LottieView from "lottie-react-native"
import colors from "tailwindcss/colors"

import loadAnim from "../assets/load.json"

export function Loading() {
  return (
    <View className="flex-1 justify-center items-center">
      <LottieView
        source={loadAnim}
        autoPlay
        loop
        style={{ backgroundColor: "transparent", height: 200, width: 200 }}
      />
    </View>
  )
}
