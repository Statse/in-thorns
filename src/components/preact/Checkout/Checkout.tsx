import { z } from 'zod'

import { persistentCartId } from '../cartStore'
import { useStore } from '@nanostores/preact'
import { useEffect, useState } from 'preact/hooks'
import { medusa } from '@/scripts/medusa'
import { ShippingOptions } from '../Checkout/ShippingOptions'
import { CheckoutCart } from '../Checkout/CheckoutCart'
import { Stripe } from './Stripe'
import type { CartType } from '@/components/preact/Cart'
import { InfomationForm } from './InfomationForm'
import Title from '@/components/title.astro'

type Props = {
  regions: any[]
  cart: CartType | null
}

export enum CheckoutStepEnum {
  INFORMATION,
  SHIPPING,
  PAYMENT
}

export const Checkout = ({ regions, cart }: Props) => {
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
            <ShippingOptions cartId={cartId} />
          </div>
        )}
        {step === CheckoutStepEnum.PAYMENT && (
          <div>
            <h2>Payment</h2>
            <Stripe cartId={cartId} />
          </div>
        )}
        <CheckoutCart cartItems={cart?.items || null} />
      </div>
    </>
  )
}
