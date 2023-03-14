import { SafeAreaView, View, Text } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"

import { Button } from "../components/Button"

export interface ConfirmationParams {
  title: string
  subtitle: string
  buttonTitle: string
  icon: "smile" | "hug"
  nextScreen: string
}

const emojis = {
  smile: "😄",
  hug: "🤗",
}

export function Confirmation() {
  const { navigate } = useNavigation()
  const route = useRoute()

  const { title, subtitle, buttonTitle, icon, nextScreen } =
    route.params as ConfirmationParams

  function handleMoveOn() {
    navigate(nextScreen as any)
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-around">
      <View className="flex-1 justify-center items-center w-full p-8">
        <Text className="text-[78px]">{emojis[icon]}</Text>
        <Text className="text-heading text-center text-2xl mt-4 font-semibold">
          {title}
        </Text>
        <Text className="text-heading text-center text-base py-5 font-regular">
          {subtitle}
        </Text>
        <View className="w-full px-12 mt-5">
          <Button onPress={handleMoveOn} title={buttonTitle} />
        </View>
      </View>
    </SafeAreaView>
  )
}
