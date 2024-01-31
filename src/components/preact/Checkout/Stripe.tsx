import 'preact/debug'
import { useState, useEffect } from 'preact/hooks'

import { Elements } from '@stripe/react-stripe-js'
import Form from './Form'
import { loadStripe } from '@stripe/stripe-js'
import { medusa } from '@/scripts/medusa'

const stripePromise = loadStripe(
  'pk_test_51Nne0rBDEKW3N2PpbIKv7SLtxl2khvZi0yDm2H46X1TMmIn5EHtGMP7i6tu4Y1wTBvqwVRcmg1mBOwQl5Gnk9j3q00bishGWek'
)

type Props = {
  cartId: string
}

export const Stripe = ({ cartId }: Props) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    medusa.carts.createPaymentSessions(cartId).then(({ cart }) => {
      const isStripeAvailable = cart.payment_sessions?.some(
        (session) => session.provider_id === 'stripe'
      )
      if (!isStripeAvailable) {
        return
      }
      // select stripe payment session
      medusa.carts
        .setPaymentSession(cart.id, {
          provider_id: 'stripe'
        })
        .then(({ cart }) => {
          setClientSecret(cart.payment_session?.data.client_secret as string)
        })
    })
  }, [])

  return (
    <div class='p-8 bg-white'>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret
          }}
        >
          <Form clientSecret={clientSecret} cartId={cartId} />
        </Elements>
      )}
    </div>
  )
}
