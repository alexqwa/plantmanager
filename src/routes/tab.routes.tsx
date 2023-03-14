import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons } from "@expo/vector-icons"

import { PlantSelect } from "../screens/PlantSelect"
import { MyPlants } from "../screens/MyPlants"

const Tab = createBottomTabNavigator()

const AuthRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#32B768",
        tabBarInactiveTintColor: "#52665A",
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          paddingVertical: 20,
          height: 88,
        },
      }}
    >
      <Tab.Screen
        name="NewPlant"
        component={PlantSelect}
        options={{
          tabBarLabel: "Nova Planta",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPlant"
        component={MyPlants}
        options={{
          tabBarLabel: "Minhas Plantas",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default AuthRoutes
