import type { CartItemType } from '@/components/preact/Cart'

type Props = {
  cartItems: CartItemType[] | null
}

export const CheckoutCart = ({ cartItems }: Props) => {
  console.log('hello from checkout cart')
  console.log(cartItems)
  return (
    <div class='flex flex-col gap-4'>
      <h2>Cart</h2>
      <table class='w-full font-khmer text-md'>
        <tr class='h-16'>
          <th class='text-start font-thin font-khmer'>Image</th>
          <th class='text-start font-thin font-khmer'>Product</th>
          <th class='text-start font-thin font-khmer'>Option</th>
          <th class='text-start font-thin font-khmer'>Quantity</th>
          <th class='text-start font-thin font-khmer'>Unit Price</th>
          <th class='text-start font-thin font-khmer'>Total</th>
        </tr>
        {cartItems &&
          cartItems.map((item) => {
            const unitPrice = item.unit_price / 100
            const total = item.total ? item.total / 100 : 0
            return (
              <tr class='border-t-2 border-white h-16'>
                <td>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    class='w-12 h-full'
                  />
                </td>
                <td>
                  <span>{item.title}</span>
                </td>
                <td>
                  <span>{item.variant.title}</span>
                </td>
                <td>{item.quantity}</td>
                <td>
                  <span>{unitPrice}€</span>
                </td>
                <td>
                  <span>{total}€</span>
                </td>
              </tr>
            )
          })}
      </table>
    </div>
  )
}
