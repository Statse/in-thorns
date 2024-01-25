import { persistentCart, persistentCartId } from './cartStore'
import { useStore } from '@nanostores/preact'

export const CartButton = () => {
  const cartId = useStore(persistentCartId)
  const cart = useStore(persistentCart)

  const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <a
      id='cart-link'
      class='bg-black border-2 border-white px-4 py-2 self-center ml-auto col-start-5'
      href={`/shop/cart/${cartId}`}
    >
      Cart {`(${itemsInCart})`}
    </a>
  )
}
