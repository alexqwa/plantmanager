import { useEffect, useState } from "react"
import { View, Text, FlatList, ActivityIndicator } from "react-native"
import { PlantProps } from "../libs/storage"
import colors from "tailwindcss/colors"
import api from "../services/api"

import { Header } from "../components/Header"
import { Loading } from "../components/Loading"
import { PlantCardPrimary } from "../components/PlantCardPrimary"
import { EnviromentButton } from "../components/EnviromentButton"
import { useNavigation } from "@react-navigation/native"

interface EnviromentProps {
  key: string
  title: string
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnviromentProps[]>([])
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [environmentSelected, setEnvironmentSelected] = useState("all")

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const { navigate } = useNavigation()

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment)

    if (environment == "all") {
      return setFilteredPlants(plants)
    }

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    )

    setFilteredPlants(filtered)
  }

  function handleFecthMore(distance: number) {
    if (distance < 1) {
      return
    }

    setLoadingMore(true)
    setPage((oldValue) => oldValue + 1)
    fetchPlants()
  }

  function handlePlantSelect(plant: PlantProps) {
    navigate("PlantSave", { plant })
  }

  async function fetchPlants() {
    const { data } = await api.get(
      `/plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    )

    if (!data) {
      return setLoading(true)
    }

    if (page > 1) {
      setPlants((oldvalue) => [...oldvalue, ...data])
      setFilteredPlants((oldvalue) => [...oldvalue, ...data])
    } else {
      setPlants(data)
      setFilteredPlants(data)
    }
    setLoading(false)
    setLoadingMore(false)
  }

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get("/plants_environments")
      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ])
    }

    fetchEnviroment()
  }, [])

  useEffect(() => {
    fetchPlants()
  }, [])

  if (loading) {
    return <Loading />
  }
  return (
    <View className="flex-1 bg-background">
      <View className="px-[30px]">
        <Header />
        <Text className="text-base text-heading font-semibold leading-5 mt-5">
          Em qual ambiente
        </Text>
        <Text className="text-heading font-regular text-base">
          Você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList
          data={environments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton
              className="mx-2"
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: 40,
            justifyContent: "center",
            paddingBottom: 5,
            paddingHorizontal: 30,
            marginVertical: 30,
          }}
        />
      </View>

      <View className="flex-1 px-[30px] justify-center">
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFecthMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator color={colors.green[500]} />
            ) : (
              <></>
            )
          }
          contentContainerStyle={{
            marginBottom: 30,
          }}
        />
      </View>
    </View>
  )
}
