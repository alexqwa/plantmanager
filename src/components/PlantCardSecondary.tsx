import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
  Animated,
} from "react-native"
import { SvgFromUri } from "react-native-svg"
import { Swipeable } from "react-native-gesture-handler"
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"

interface PlantCardProps extends TouchableOpacityProps {
  data: {
    name: string
    photo: string
    hour: string
  }
  handleRemove: () => void
}

export function PlantCardSecondary({
  data,
  handleRemove,
  ...rest
}: PlantCardProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              className="w-[100px] h-[85px] bg-red mt-[15px] rounded-[20px] relative right-5 justify-center items-center pl-4"
              onPress={handleRemove}
            >
              <Feather name="trash" size={32} color={colors.white} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    >
      <TouchableOpacity
        activeOpacity={1}
        className="w-full px-[20px] py-[25px] rounded-[20px] flex-row items-center bg-shape my-[5px]"
        {...rest}
      >
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Text className="flex-1 ml-[10px] font-semibold text-[17px]">
          {data.name}
        </Text>
        <View className="items-end">
          <Text className="text-base font-regular text-body_light">
            Regar às
          </Text>
          <Text className="mt-[5px] text-base font-semibold text-body_dark">
            {data.hour}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}
