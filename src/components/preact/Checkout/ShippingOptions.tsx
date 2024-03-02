import { medusa } from '@/scripts/medusa'
import { useState, useEffect } from 'preact/hooks'
import { RadioButton } from '@/components/preact/RadioButton'
import type { CartType } from '@/components/preact/Cart'
import type { ShippingOptionsType } from '@/types/cart'

type Props = {
  cartId: string
  shippingOptions: ShippingOptionsType[]
  updateCart: (cart: CartType) => void
}

export const ShippingOptions = ({
  cartId,
  updateCart,
  shippingOptions
}: Props) => {
  const [selectedShippingOption, setSelectedShippingOption] =
    useState<ShippingOptionsType | null>(null)
  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    console.log('onSubmit')
    if (!selectedShippingOption) {
      return
    }
    await medusa.carts
      .addShippingMethod(cartId, {
        option_id: selectedShippingOption.id
      })
      .then((res) => {
        console.log('res.cart', res.cart)
        updateCart(res.cart as CartType)
      })
  }

  return (
    <form onSubmit={onSubmit}>
      {shippingOptions && !shippingOptions.length && (
        <span>No shipping options</span>
      )}
      {shippingOptions && (
        <ul>
          {shippingOptions.map((shippingOption) => (
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
              onClick={async () => {
                setSelectedShippingOption(shippingOption)
              }}
            />
          ))}
        </ul>
      )}
      <button type='submit'>Continue</button>
    </form>
  )
}
