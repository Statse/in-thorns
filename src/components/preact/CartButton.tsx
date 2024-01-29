import { cartItemCount } from './cartStore'
import { useStore } from '@nanostores/preact'

export const CartButton = () => {
  const count = useStore(cartItemCount)

  return (
    <a
      id='cart-link'
      class='bg-black border-2 border-white px-4 py-2 self-center ml-auto col-start-5'
      href={`/shop/cart`} //${cartId}
    >
      Cart {`(${count})`}
    </a>
  )
}
