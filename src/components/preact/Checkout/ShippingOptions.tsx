import { medusa } from '@/scripts/medusa'
import { useState, useEffect } from 'preact/hooks'
import { RadioButton } from '@/components/preact/RadioButton'

type Props = {
  cartId: string
}

export const ShippingOptions = ({ cartId }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [shippingOptions, setShippingOptions] = useState<any>([])

  useEffect(() => {
    medusa.shippingOptions
      .listCartOptions(cartId)
      .then(({ shipping_options }) => {
        setShippingOptions(shipping_options)
        setIsLoading(false)
      })
  }, [])

  console.log(shippingOptions)

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      {shippingOptions && !shippingOptions.length && (
        <span>No shipping options</span>
      )}
      {shippingOptions && (
        <ul>
          {shippingOptions.map((shippingOption: any) => (
            <RadioButton
              key={shippingOption.id}
              name={shippingOption.name}
              value={shippingOption.id}
              title={
                shippingOption.name +
                ' ' +
                shippingOption.price_incl_tax / 100 +
                '€'
              }
            />
          ))}
        </ul>
      )}
    </div>
  )
}
