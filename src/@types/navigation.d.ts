import { PlantProps } from "../libs/storage"
import { ConfirmationParams } from "../screens/Confirmation"

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Welcome: undefined
      UserIdentification: undefined
      Confirmation: Confirma
      tionParams
      PlantSelect: undefined
      PlantSave: {
        plant: PlantProps
      }
      MyPlants: undefined
    }
  }
}
