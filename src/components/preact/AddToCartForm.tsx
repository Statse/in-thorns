import { addCartItem, persistentCart } from './cartStore'
import type { ComponentChildren } from 'preact'
import { z } from 'zod'
import { medusa } from '@/scripts/medusa'

import type { CartItemsType } from '@/types/cart'

type Props = {
  children: ComponentChildren
}

export default function AddToCartForm({ children }: Props) {
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

    if (cartId) {
      const medusaCart = localStorage.getItem('medusa_cart')
      const parsedCart = JSON.parse(medusaCart as string) as CartItemsType[]

      console.log('parsedCart', parsedCart)

      if (!parsedCart) {
        console.log('create new item')
        await medusa.carts.lineItems.create(cartId, {
          variant_id,
          quantity
        })
        return
      }

      return parsedCart.forEach(async (item) => {
        if (item.variantId === variant_id) {
          console.log('update item')
          await medusa.carts.lineItems
            .update(cartId, item.lineItemId, {
              quantity: item.quantity + quantity
            })
            .then(({ cart }) => {
              const cartItems = cart.items.map((item) => {
                return {
                  lineItemId: item.id,
                  variantId: item.variant_id,
                  quantity: item.quantity
                }
              })
              localStorage.setItem('medusa_cart', JSON.stringify(cartItems))
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
          const cartItems = cart.items.map((item) => {
            return {
              cartId: cart.id,
              lineItemId: item.id,
              variantId: item.variant_id,
              quantity: item.quantity
            }
          })
          localStorage.setItem('medusa_cart', JSON.stringify(cartItems))
        })
    })
  }

  return <form onSubmit={addToCart}>{children}</form>
}
