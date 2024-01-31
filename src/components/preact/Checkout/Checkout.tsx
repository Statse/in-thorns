import { z } from 'zod'

import { persistentCartId, cartItemCount, countCartItems } from '../cartStore'
import { useStore } from '@nanostores/preact'
import { useEffect, useState } from 'preact/hooks'
import { medusa } from '@/scripts/medusa'
import { ShippingOptions } from '../Checkout/ShippingOptions'

export type CartItemType = {
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
}

export type CartType = {
  id: string
  items: CartItemType[]
  subtotal: number
}

type Props = {
  regions: any[]
}

export const Checkout = ({ regions }: Props) => {
  //   const [cart, setCart] = useState<CartType | null>(null)
  const cartId = useStore(persistentCartId)

  //   useEffect(() => {
  //     medusa.carts.retrieve(cartId).then((res) => {
  //       setCart(res.cart as CartType)
  //     })
  //   }, [])

  //   if (!cart) {
  //     return <div>Loading...</div>
  //   }

  console.log('regions: ', regions)

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const formValues = Object.fromEntries(formData.entries())
    const schema = z.object({
      email: z.string().email(),
      first_name: z.string(),
      last_name: z.string(),
      phone: z.string(),
      company: z.string().optional(),
      address_1: z.string(),
      address_2: z.string().optional(),
      city: z.string(),
      country_code: z.string().optional(), //check this one
      province: z.string(),
      postal_code: z.string()
    })

    const validated = schema.parse(formValues)

    const {
      email,
      first_name,
      last_name,
      phone,
      company,
      address_1,
      address_2,
      city,
      country_code,
      province,
      postal_code
    } = validated

    try {
      await medusa.carts
        .update(cartId, {
          email,
          shipping_address: {
            company,
            first_name,
            last_name,
            phone,
            address_1,
            address_2,
            city,
            country_code,
            province,
            postal_code
          }
        })
        .then((res) => {
          console.log("cart's shipping address updated")
          console.log(res)
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form class='w-full h-auto' onSubmit={onSubmit}>
      <h1 class='text-3xl font-khmer'>Checkout</h1>
      <div class='grid grid-cols-2 gap-4'>
        <div class='flex flex-col gap-4'>
          <div class='flex flex-col gap-4'>
            <label for='email'>Email</label>
            <Input type='email' name='email' id='email' />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='first_name'>First Name</label>
            <Input type='text' name='first_name' id='first_name' />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='last_name'>Last Name</label>
            <Input type='text' name='last_name' id='last_name' />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='phone'>Phone</label>
            <Input type='tel' name='phone' id='phone' />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='address_1'>Adress</label>
            <Input type='text' name='address_1' id='address_1' />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='address_2'>Adress 2 (optional)</label>
            <Input type='text' name='address_2' id='address_2' />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='company'>Company (optional)</label>
            <Input type='text' name='company' id='company' />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='country'>Country</label>
            <select class='text-black'>
              {regions &&
                regions[0].countries.map((country: any) => {
                  return (
                    <option value={country.id}>{country.display_name}</option>
                  )
                })}
            </select>
          </div>
          <div class='flex flex-col gap-4'>
            <label for='city'>City</label>
            <Input type='text' name='city' id='city' />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='province'>Province</label>
            <Input type='text' name='province' id='province' />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='postal_code'>Postal code</label>
            <Input type='text' name='postal_code' id='postal_code' />
          </div>
        </div>
        <ShippingOptions cartId={cartId} />
      </div>
      <button
        type='submit'
        class='border-white border-2 p-2 rounded-md hover:bg-white hover:text-black'
      >
        Submit
      </button>
    </form>
  )
}

const Input = ({
  name,
  type,
  id
}: {
  name: string
  type: string
  id: string
}) => (
  <input
    class='border-2 border-white w-full flex items-center px-2 font-khmer text-2xl text-black'
    type={type}
    name={name}
    id={id}
  />
)
