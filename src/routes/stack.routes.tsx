import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Welcome } from "../screens/Welcome"
import { Confirmation } from "../screens/Confirmation"
import { UserIdentification } from "../screens/UserIdentification"
import { PlantSave } from "../screens/PlantSave"
import AuthRoutes from "./tab.routes"

const Stack = createNativeStackNavigator()

const AppRoutes: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="UserIdentification" component={UserIdentification} />
    <Stack.Screen name="Confirmation" component={Confirmation} />
    <Stack.Screen name="PlantSelect" component={AuthRoutes} />
    <Stack.Screen name="PlantSave" component={PlantSave} />
    <Stack.Screen name="MyPlants" component={AuthRoutes} />
  </Stack.Navigator>
)

export default AppRoutes
