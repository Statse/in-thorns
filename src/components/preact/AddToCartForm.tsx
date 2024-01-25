import { addCartItem, cartItems } from './cartStore'
import type { ComponentChildren } from 'preact'
import { z } from 'zod'
// import { medusa } from '@/scripts/medusa'

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

    //Add item to store
    console.log('add item to cart')
    addCartItem(validatedFormValues)

    console.log('currentstore', cartItems.get())

    // const { quantity, variant_id } = validatedFormValues
    // const id = localStorage.getItem('cart_id')

    // if (id) {
    //   console.log('has id...')
    //   const currentCart = await medusa.carts.retrieve(id)
    //   console.log(currentCart)
    //   return
    // }

    // const cart = await medusa.carts.create().then(({ cart }) => {
    //   localStorage.setItem('cart_id', cart.id)
    //   medusa.carts.lineItems.create(cart.id, {
    //     variant_id,
    //     quantity
    //   })
    //   return cart
    // })
    // console.log(cart)

    // isCartOpen.set(true)
    // addCartItem(item)
  }

  return <form onSubmit={addToCart}>{children}</form>
}
