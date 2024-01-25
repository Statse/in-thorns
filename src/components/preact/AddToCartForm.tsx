import { addCartItem, persistentCart } from './cartStore'
import type { ComponentChildren } from 'preact'
import { z } from 'zod'
import { medusa } from '@/scripts/medusa'

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

  return <form onSubmit={addToCart}>{children}</form>
}
