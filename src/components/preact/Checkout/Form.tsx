import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

type Props = {
  clientSecret: string
  cartId: string
}

export default function Form({ clientSecret, cartId }: Props) {
  const stripe = useStripe()
  const elements = useElements()

  async function handlePayment(e: any) {
    e.preventDefault()
    // TODO handle payment
  }

  return (
    <form>
      <CardElement />
      <button onClick={handlePayment}>Submit</button>
    </form>
  )
}
