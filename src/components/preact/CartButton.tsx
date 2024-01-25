import { useEffect, useState } from 'preact/hooks'

export const CartButton = () => {
  const [cartId, setCartId] = useState<string | null>(null)

  useEffect(() => {
    const cartIdFromStorage = localStorage.getItem('cart_id')
    setCartId(cartIdFromStorage)
  }, [])

  return (
    <a
      id='cart-link'
      class='bg-black border-2 border-white px-4 py-2 self-center ml-auto col-start-5'
      href={`/shop/cart/${cartId}`}
    >
      Cart
    </a>
  )
}
