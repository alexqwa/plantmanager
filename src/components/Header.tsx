import { useState, useEffect } from "react"
import { View, Text, Image } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import AsyncStorage from "@react-native-async-storage/async-storage"

import userImg from "../assets/alex.png"

export function Header() {
  const [userName, setUserName] = useState<string>()

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem("@plantmanager:user")
      setUserName(user || "")
    }

    loadStorageUserName()
  }, [])

  return (
    <View
      style={{ marginTop: getStatusBarHeight() + 20 }}
      className={`w-full flex-row justify-between items-center py-5`}
    >
      <View>
        <Text className="text-3xl text-heading font-regular">Olá,</Text>
        <Text className="text-3xl text-heading font-semibold leading-8">
          {userName}
        </Text>
      </View>
      <Image source={userImg} className="w-16 h-16 rounded-full" />
    </View>
  )
}
