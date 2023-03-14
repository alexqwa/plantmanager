import { useState, useEffect } from "react"
import { View, Text, FlatList, Alert } from "react-native"
import { PlantProps, loadPlant, plantRemove } from "../libs/storage"
import { formatDistance } from "date-fns"
import { ptBR } from "date-fns/locale"

import Waterdrop from "../assets/waterdrop.svg"

import { Header } from "../components/Header"
import { Loading } from "../components/Loading"
import { PlantCardSecondary } from "../components/PlantCardSecondary"

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([])
  const [nextWatered, setNextWatered] = useState<string>()
  const [loading, setLoading] = useState(true)

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remove a ${plant.name}?`, [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          try {
            await plantRemove(plant.id)
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            )
          } catch (error) {
            Alert.alert("Não foi possível remover!")
          }
        },
      },
    ])
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant()

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      )

      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`
      )

      setMyPlants(plantsStoraged)
      setLoading(false)
    }

    loadStorageData()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 items-center justify-between px-[30px] bg-white">
      <Header />

      <View className="bg-blue_light mt-6 flex-row p-5 rounded-[20px] justify-between items-center">
        <Waterdrop width={60} height={60} />
        <Text className="flex-1 text-blue font-regular px-5">
          {nextWatered}
        </Text>
      </View>

      <View className="flex-1 w-full">
        <Text className="text-2xl font-semibold text-heading my-5">
          Próximas regadas
        </Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              handleRemove={() => handleRemove(item)}
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  )
}
