import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native"

interface ButtonProps extends TouchableOpacityProps {
  title: string
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className="bg-green justify-center items-center rounded-2xl h-14"
      activeOpacity={0.7}
      {...rest}
    >
      <Text className="text-white font-regular">{title}</Text>
    </TouchableOpacity>
  )
}
