import { z } from 'zod'
import { useEffect, useState } from 'preact/hooks'

import { addCartItem, persistentCart } from './cartStore'
import { medusa } from '@/scripts/medusa'
import RadioButton from '@/components/preact/RadioButton/RadioButton'
import { isInStock } from './cartStore'

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

  async function addToCart(e: SubmitEvent) {
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
    const cartId = localStorage.getItem('cart_id')
    const medusaCart = persistentCart.get()

    if (cartId) {
      console.log(medusaCart)

      if (!medusaCart) {
        console.log('create new item')
        return await medusa.carts.lineItems
          .create(cartId, {
            variant_id,
            quantity
          })
          .then(({ cart }) => {
            cart.items.forEach(({ id, quantity, variant_id }) => {
              if (!variant_id) {
                throw new Error('No variant id')
              }
              addCartItem({
                lineItemId: id,
                variantId: variant_id,
                quantity: quantity
              })
            })
          })
      }

      return medusaCart.forEach(async (item) => {
        if (item.variantId === variant_id) {
          console.log('update item')
          await medusa.carts.lineItems
            .update(cartId, item.lineItemId, {
              quantity: item.quantity + quantity
            })
            .then(({ cart }) => {
              cart.items.forEach(({ id, quantity, variant_id }) => {
                if (!variant_id) {
                  throw new Error('No variant id')
                }
                addCartItem({
                  lineItemId: id,
                  variantId: variant_id,
                  quantity: quantity
                })
              })
            })
        }
      })
    }

    await medusa.carts.create().then(({ cart }) => {
      localStorage.setItem('cart_id', cart.id)
      medusa.carts.lineItems
        .create(cart.id, {
          variant_id,
          quantity
        })
        .then(({ cart }) => {
          cart.items.forEach(({ id, quantity, variant_id }) => {
            if (!variant_id) {
              throw new Error('No variant id')
            }
            addCartItem({
              lineItemId: id,
              variantId: variant_id,
              quantity: quantity
            })
          })
        })
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
          min='1'
          max={selectedVariant?.inventory_quantity}
          value='1'
        />
      </div>
      <button class='px-4 py-2 font-khmer border-2 border-white text-2xl'>
        Add to cart
      </button>
    </form>
  )
}

const Badge = ({ children }: { children: string }) => (
  <span class='bg-white text-black px-2 font-khmer text-xl'>{children}</span>
)
