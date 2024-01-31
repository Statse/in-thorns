type Props = {
  name: string
  value: string
  title: string
  onClick?: () => void
}

export const RadioButton = ({
  name,
  value,
  title,
  ...remainingProps
}: Props) => {
  return (
    <label class='radiobutton_container relative cursor-pointer font-khmer text-xl'>
      <input
        class='absolute opacity-0 cursor-pointer'
        type='radio'
        name={name}
        value={value}
        {...remainingProps}
      />
      <span class='checkmark px-4 w-full bg-black text-white border-2 border-white hover:bg-black hover:text-white hover:border-2 hover:border-white hover:opacity-80'>
        {title}
      </span>
    </label>
  )
}
