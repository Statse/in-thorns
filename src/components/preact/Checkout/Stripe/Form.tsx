import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { medusa } from '@/scripts/medusa'
import type { CartType } from '@/components/preact/Cart'
import {
  persistentCartId,
  isInStock,
  cartItemCount
} from '@/components/preact/cartStore'

type Props = {
  clientSecret: string
  cart: CartType
  onSuccessfullCheckout: () => void
}

export default function Form({
  clientSecret,
  cart,
  onSuccessfullCheckout
}: Props) {
  const stripe = useStripe()
  const elements = useElements()

  async function handlePayment(e: Event) {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }
    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      return
    }

    return stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          //@ts-ignore
          card: cardElement,
          billing_details: {
            name:
              cart.shipping_address.first_name +
              ' ' +
              cart.shipping_address.last_name,
            email: cart.email,
            phone: cart.shipping_address.phone,
            address: {
              city: cart.shipping_address.city,
              country: cart.shipping_address.country_code,
              line1: cart.shipping_address.address_1,
              line2: cart.shipping_address.address_2,
              postal_code: cart.shipping_address.postal_code
            }
          }
        }
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          alert(error.message)
          throw new Error(error.message)
        }

        console.log(paymentIntent)

        medusa.carts.complete(cart.id).then((resp) => {
          console.log(resp)

          isInStock.set(false)
          cartItemCount.set(0)
          persistentCartId.set('')
          onSuccessfullCheckout()
        })
      })
  }

  return (
    <form>
      <CardElement />
      <button className='text-black' onClick={handlePayment}>
        Submit
      </button>
    </form>
  )
}
