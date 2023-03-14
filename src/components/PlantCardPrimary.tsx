import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native"
import { SvgFromUri } from "react-native-svg"

interface PlantCardProps extends TouchableOpacityProps {
  data: {
    name: string
    photo: string
  }
}

export function PlantCardPrimary({ data, ...rest }: PlantCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-1 max-w-[45%] bg-shape rounded-[20px] py-[10px] items-center m-[10px]"
      {...rest}
    >
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text className="text-green_dark font-semibold my-4">{data.name}</Text>
    </TouchableOpacity>
  )
}
