import { useState } from "react"
import { isBefore, format } from "date-fns"
import { SvgFromUri } from "react-native-svg"
import { useNavigation, useRoute } from "@react-navigation/native"
import {
  View,
  Text,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { getBottomSpace } from "react-native-iphone-x-helper"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { PlantProps, plantSave } from "../libs/storage"

import WaterDrop from "../assets/waterdrop.svg"

import { Button } from "../components/Button"

interface Params {
  plant: PlantProps
}

export function PlantSave() {
  const { navigate } = useNavigation()
  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == "ios")

  const route = useRoute()
  const { plant } = route.params as Params

  function handleDateTimePicker() {
    setShowDatePicker((oldState) => !oldState)
  }

  function handleChangeTime(
    event: DateTimePickerEvent,
    dateTime: Date | undefined
  ) {
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState)
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date())
      return Alert.alert("Escolha uma hora no futuro!")
    }

    if (dateTime) {
      setSelectedDateTime(dateTime)
    }
  }

  async function handleSave() {
    try {
      await plantSave({
        ...plant,
        dateTimeNotification: selectedDateTime,
      })

      navigate("Confirmation", {
        title: "Tudo certo",
        subtitle:
          "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor..",
        buttonTitle: "Muito obrigado :D",
        icon: "hug",
        nextScreen: "MyPlants",
      })
    } catch (error) {
      Alert.alert("Não foi possível salvar sua planta!")
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#F0F0F0",
      }}
    >
      <View className="flex-1 justify-between bg-shape">
        <View className="flex-1 px-[30px] py-[50px] items-center justify-center bg-shape">
          <SvgFromUri uri={plant.photo} height={150} width={150} />

          <Text className="font-semibold text-2xl text-heading mt-4">
            {plant.name}
          </Text>
          <Text className="text-center font-regular text-heading text-[17px] mt-[10px]">
            {plant.about}
          </Text>
        </View>
        <View
          className="bg-white px-[20px] pt-[20px]"
          style={{ paddingBottom: getBottomSpace() || 20 }}
        >
          <View className="flex-row justify-between items-center bg-blue_light p-5 rounded-[20px] relative bottom-[60px]">
            <WaterDrop />
            <Text className="flex-1 ml-5 font-regular text-blue text-[17px]">
              {plant.water_tips}
            </Text>
          </View>

          <Text className="text-center font-regular text-heading text-xs mb-[5px]">
            Ecolha o melhor horário para ser lembrado:
          </Text>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          )}

          {Platform.OS === "android" && (
            <TouchableOpacity
              className="w-full items-center py-10"
              onPress={handleDateTimePicker}
            >
              <Text className="text-heading font-regular text-2xl">
                {`Mudar ${format(selectedDateTime, "HH:mm")}`}
              </Text>
            </TouchableOpacity>
          )}

          <Button title="Cadastrar planta" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  )
}
