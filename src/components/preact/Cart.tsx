import { persistentCart, persistentCartId } from './cartStore'
import { useStore } from '@nanostores/preact'
import { useEffect, useState } from 'preact/hooks'
import { medusa } from '@/scripts/medusa'

type CartType = {
  id: string
  items: {
    id: string
    title: string
    quantity: number
    unit_price: number
    total: number
    thumbnail: string
    variant: {
      title: string
      inventory_quantity: number
    }
  }[]
  subtotal: number
}

export const Cart = () => {
  const [cart, setCart] = useState<CartType | null>(null)
  // const cart = useStore(persistentCart)
  // const cartId = useStore(persistentCartId)
  const cartId = useStore(persistentCartId)

  useEffect(() => {
    medusa.carts.retrieve(cartId).then((res) => {
      setCart(res.cart as CartType)
    })
  }, [])

  if (!cart) {
    return <div>Loading...</div>
  }

  const deleteItem = async (itemId: string) => {
    await medusa.carts.lineItems.delete(cartId, itemId).then((res: any) => {
      setCart(res.cart as CartType)
      // medusa.carts.retrieve(cartId).then((res) => {
      //   setCart(res.cart as CartType)
      // })
    })
  }

  console.log(cart)

  return (
    <form class='w-full h-auto'>
      <table class='w-full font-khmer text-xl'>
        <tr class='h-16'>
          <th class='text-start font-thin font-khmer'>Image</th>
          <th class='text-start font-thin font-khmer'>Product</th>
          <th class='text-start font-thin font-khmer'>Option</th>
          <th class='text-start font-thin font-khmer'>Quantity</th>
          <th class='text-start font-thin font-khmer'>Unit Price</th>
          <th class='text-start font-thin font-khmer'>Total</th>
          <th class='text-start font-thin font-khmer'>Actions</th>
        </tr>
        {cart.items.map((item) => {
          const unitPrice = item.unit_price / 100
          const total = item.total ? item.total / 100 : 0

          return (
            <tr class='border-t-2 border-white h-24'>
              <td>
                <img src={item.thumbnail} alt={item.title} class='w-20 h-20' />
              </td>
              <td>
                <span>{item.title}</span>
              </td>
              <td>
                <span>{item.variant.title}</span>
              </td>
              <td>
                <input
                  class='border-2 border-white w-16 flex items-center px-2 font-khmer text-2xl text-black'
                  name={item.id}
                  type='number'
                  // defaultValue={`${item.quantity}`}
                  value={`${item.quantity}`}
                  min='1'
                  max={item.variant.inventory_quantity}
                />
              </td>
              <td>
                <span>{unitPrice}€</span>
              </td>
              <td>
                <span>{total}€</span>
              </td>
              <td>
                <button
                  type='button'
                  class='px-4 py-2 font-khmer border-2 border-white text-2xl'
                  onClick={() => deleteItem(item.id)}
                >
                  X
                </button>
              </td>
            </tr>
          )
        })}
        <tr class='h-24 border-t-2 border-white'>
          <td colspan={4} class='text-end'>
            <span class='font-khmer text-xl pr-8'>Subtotal:</span>
          </td>
          <td>
            <span>{cart.subtotal ? cart.subtotal / 100 : cart.subtotal}€</span>
          </td>
        </tr>
      </table>
      <div class='flex flex-row gap-4'>
        <button class='px-4 py-2 font-khmer border-2 border-white text-2xl'>
          Update
        </button>
        <a
          href={`/shop/checkout/${cartId}`}
          class='px-4 py-2 font-khmer border-2 border-white text-2xl'
        >
          Proceed to checkout
        </a>
      </div>
    </form>
  )
}
