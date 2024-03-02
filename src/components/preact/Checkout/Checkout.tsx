import { z } from 'zod'

import { persistentCartId } from '../cartStore'
import { useStore } from '@nanostores/preact'
import { useEffect, useState } from 'preact/hooks'
import { CheckoutCart } from '../Checkout/CheckoutCart'
import { Stripe } from './Stripe/Stripe'
import type { CartType } from '@/components/preact/Cart'
import { InfomationForm } from './InfomationForm'
import { ShippingOptions } from '../Checkout/ShippingOptions'

type Props = {
  regions: any[]
  cart: CartType | null
  shippingOptions: any
}

export enum CheckoutStepEnum {
  INFORMATION,
  SHIPPING,
  PAYMENT,
  THANKYOU
}

export const Checkout = ({ regions, cart, shippingOptions }: Props) => {
  const [currentCart, setCurrentCart] = useState<CartType | null>(cart)
  const [step, setStep] = useState<CheckoutStepEnum>(
    CheckoutStepEnum.INFORMATION
  )
  const cartId = useStore(persistentCartId)

  return (
    <>
      <div class='grid grid-cols-2 gap-4'>
        {step === CheckoutStepEnum.INFORMATION && (
          <InfomationForm
            cartId={cartId}
            regions={regions}
            cart={currentCart}
            updateCart={(cart: CartType) => {
              setCurrentCart(cart)
              setStep(CheckoutStepEnum.SHIPPING)
            }}
          />
        )}
        {step === CheckoutStepEnum.SHIPPING && (
          <div>
            <h2>Shipping</h2>
            <ShippingOptions
              cartId={cartId}
              updateCart={(cart: CartType) => {
                setCurrentCart(cart)
                setStep(CheckoutStepEnum.PAYMENT)
              }}
              shippingOptions={shippingOptions}
            />
          </div>
        )}
        {cart && step === CheckoutStepEnum.PAYMENT && (
          <div>
            <h2>Payment</h2>
            <Stripe
              cart={cart}
              onSuccessfullCheckout={() => setStep(CheckoutStepEnum.THANKYOU)}
            />
          </div>
        )}
        {step === CheckoutStepEnum.THANKYOU && (
          <div>
            <h2>Thank you</h2>
          </div>
        )}
        {step !== CheckoutStepEnum.THANKYOU && (
          <CheckoutCart cartItems={currentCart?.items || null} />
        )}
      </div>
    </>
  )
}
