import { SafeAreaView, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"

import Watering from "../assets/watering.svg"

export function Welcome() {
  const { navigate } = useNavigation()

  return (
    <SafeAreaView className="flex-1 items-center justify-around">
      <Text className="text-3xl font-semibold text-center text-heading mt-8">
        Gerencie{"\n"}suas plantas de{"\n"}forma fácil
      </Text>
      <Watering />
      <Text className="text-center text-lg font-regular text-heading px-5">
        Não esqueça mais de regar suas{"\n"}plantas. Nós cuidamos de lembrar
        você{"\n"} sempre que precisar.
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-green justify-center items-center rounded-2xl mb-4 h-14 w-14"
        onPress={() => navigate("UserIdentification")}
      >
        <Feather name="chevron-right" size={28} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
