import clsx from "clsx"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

interface EnviromentButtonProps extends TouchableOpacityProps {
  title: string
  active?: boolean
}

export function EnviromentButton({
  title,
  active = false,
  ...rest
}: EnviromentButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={clsx(
        "bg-shape h-[40px] w-[76px] justify-center items-center rounded-xl",
        {
          ["bg-green_light"]: active,
        }
      )}
      {...rest}
    >
      <Text
        className={clsx("text-heading font-regular", {
          ["text-green_dark font-semibold"]: active,
        })}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}
