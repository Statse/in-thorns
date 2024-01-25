import { z } from 'zod'
import { useState } from 'preact/hooks'

import {
  addCartItem,
  persistentCartId,
  persistentCart,
  isInStock
} from './cartStore'
import { medusa } from '@/scripts/medusa'
import RadioButton from '@/components/preact/RadioButton/RadioButton'

export type VariantType = {
  id: string
  title: string
  inventory_quantity: number
}

type Props = {
  variants: VariantType[]
}

export default function AddToCartForm({ variants }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<VariantType | null>(
    null
  )

  const SetSelectedVariant = (variant: VariantType) => {
    isInStock.set(variant.inventory_quantity > 0)
    setSelectedVariant(variant)
  }

  const quantity = selectedVariant?.inventory_quantity
  const isOutOfStock = !quantity

  const addToCart = async (e: SubmitEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const formValues = Object.fromEntries(formData.entries())

    const validatedFormValues = z
      .object({
        quantity: z.coerce.number(),
        variant_id: z.string()
      })
      .parse(formValues)

    const { quantity, variant_id } = validatedFormValues

    let cartId = persistentCartId.get()

    if (!cartId) {
      cartId = await medusa.carts.create().then(({ cart }) => {
        persistentCartId.set(cart.id)
        return cart.id
      })
    }

    await medusa.carts.lineItems.create(cartId, {
      variant_id,
      quantity
    })

    addCartItem({
      quantity,
      variantId: variant_id
    })
  }

  return (
    <form onSubmit={addToCart} class='flex flex-col gap-8 items-start'>
      <div class='flex flex-col gap-4 items-start'>
        <Badge>Option</Badge>
        <div class='flex w-full flex-row flex-wrap h-auto gap-2 gap-y-6'>
          {variants
            ? variants.map((variant) => {
                console.log(variant)
                const { id, title, inventory_quantity } = variant
                if (!id || !title) {
                  throw new Error('variant.id or variant.title is undefined')
                }

                return (
                  <RadioButton
                    name='variant_id'
                    value={id}
                    title={title}
                    onClick={() =>
                      SetSelectedVariant({
                        id,
                        title,
                        inventory_quantity
                      })
                    }
                  />
                )
              })
            : null}
        </div>
      </div>
      <div class='flex flex-col gap-2 items-start'>
        <Badge>quantity</Badge>
        <input
          class='border-2 border-white w-16 flex items-center px-2 font-khmer text-2xl text-black'
          type='number'
          name='quantity'
          id='quantity'
          min={!isOutOfStock ? '1' : '0'}
          max={quantity}
          value={!isOutOfStock ? '1' : '0'}
        />
      </div>
      <button
        class={`px-4 py-2 font-khmer border-2 border-white text-2xl ${
          isOutOfStock ? 'opacity-20' : 'bg-black'
        }`}
        disabled={isOutOfStock}
      >
        Add to cart
      </button>
    </form>
  )
}

const Badge = ({ children }: { children: string }) => (
  <span class='bg-white text-black px-2 font-khmer text-xl'>{children}</span>
)
