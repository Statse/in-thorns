type Props = {
  name: string
  value: string
  title: string
  onClick?: () => void
}

function RadioButton({ name, value, title, ...remainingProps }: Props) {
  return (
    <label class='radiobutton_container font-khmer text-xl'>
      <input type='radio' name={name} value={value} {...remainingProps} />
      <span class='checkmark px-4 w-full'> {title}</span>
    </label>
  )
}

export default RadioButton
