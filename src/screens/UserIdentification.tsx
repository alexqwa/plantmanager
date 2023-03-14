import clsx from "clsx"
import { useState } from "react"
import {
  View,
  Text,
  Alert,
  Platform,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import EmojiHappy from "../assets/emoji-happy.svg"
import EmojiContent from "../assets/emoji-content.svg"

import { Button } from "../components/Button"

export function UserIdentification() {
  const { navigate } = useNavigation()
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!name)
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value)
    setName(value)
  }

  async function handleSubmit() {
    if (!name) {
      return Alert.alert(
        "Me diz como chamar você",
        "Me diga qual seu nome para podermos da continuidade."
      )
    }

    try {
      await AsyncStorage.setItem("@plantmanager:user", name)
      navigate("Confirmation", {
        title: "Prontinho",
        subtitle:
          "Agora vamos começar a cuidar das suas plantinhas com muito cuidado.",
        buttonTitle: "Começar",
        icon: "smile",
        nextScreen: "PlantSelect",
      })
    } catch (error) {
      Alert.alert("Não foi possível salvar o seu nome!")
    }
  }

  return (
    <SafeAreaView className="flex-1 w-full items-center justify-around">
      <KeyboardAvoidingView
        className="flex-1 w-full items-center justify-around"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1 w-full">
          <View className="flex-1 justify-center items-center px-14">
            <View className="items-center">
              {isFilled ? <EmojiContent /> : <EmojiHappy />}
              <Text className="text-heading font-semibold text-center text-4xl mt-6">
                Como podemos{"\n"}chamar você?
              </Text>
            </View>
            <TextInput
              placeholder="Digite um nome"
              className={clsx(
                "font-regular border-b border-gray text-heading w-full text-lg mt-12 p-2 text-center",
                {
                  ["border-green"]: isFocused || isFilled === true,
                }
              )}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChange}
            />
            <View className="w-full mt-10 px-5">
              <Button title="Confirmar" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
