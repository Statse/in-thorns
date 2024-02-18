import { z } from 'zod'

import { medusa } from '@/scripts/medusa'
import type { CartType } from '@/components/preact/Cart'

type RegionsType = {
  countries: {
    id: string
    display_name: string
    iso_2: string
    iso_3: string
  }[]
}

type Props = {
  cartId: string
  regions: RegionsType[]
  cart: CartType | null
  updateCart: (cart: CartType) => void
}

export const InfomationForm = ({
  cartId,
  regions,
  cart,
  updateCart
}: Props) => {
  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const formValues = Object.fromEntries(formData.entries())
    const schema = z.object({
      email: z.string().email(),
      first_name: z.string().min(2),
      last_name: z.string().min(2),
      phone: z.string().min(6),
      company: z.string().optional(),
      address_1: z.string().min(2),
      address_2: z.string().optional(),
      city: z.string().min(2),
      country_code: z.string().optional(), //check this one
      province: z.string().min(2),
      postal_code: z.string().min(2)
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
      country_code, //check this one
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
            province,
            postal_code
          }
        })
        .then((res) => {
          console.log("cart's shipping address updated")
          updateCart(res.cart as CartType)
        })
    } catch (error) {
      return console.error(error)
    }
  }

  return (
    <form class='w-full h-auto flex flex-col' onSubmit={onSubmit}>
      <h1 class='text-3xl font-khmer'>Information</h1>
      <div class='flex flex-col gap-4'>
        <div class='flex flex-col gap-4'>
          <div class='flex flex-col gap-4'>
            <label for='email'>Email</label>
            <Input
              type='email'
              name='email'
              id='email'
              defaultValue={cart?.email}
            />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='first_name'>First Name</label>
            <Input
              type='text'
              name='first_name'
              id='first_name'
              defaultValue={cart?.shipping_address.first_name}
            />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='last_name'>Last Name</label>
            <Input
              type='text'
              name='last_name'
              id='last_name'
              defaultValue={cart?.shipping_address.last_name}
            />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='phone'>Phone</label>
            <Input
              type='tel'
              name='phone'
              id='phone'
              defaultValue={cart?.shipping_address.phone}
            />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='address_1'>Adress</label>
            <Input
              type='text'
              name='address_1'
              id='address_1'
              defaultValue={cart?.shipping_address.address_1}
            />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='address_2'>Adress 2 (optional)</label>
            <Input
              type='text'
              name='address_2'
              id='address_2'
              defaultValue={cart?.shipping_address.address_2}
            />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='company'>Company (optional)</label>
            <Input
              type='text'
              name='company'
              id='company'
              defaultValue={cart?.shipping_address.company}
            />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='country'>Country</label>
            <select
              class='text-black'
              name='country_code'
              // defaultValue={cart?.shipping_address.country_code}
            >
              {regions &&
                regions[0].countries.map((country) => {
                  return (
                    <option value={country.iso_2}>
                      {country.display_name}
                    </option>
                  )
                })}
            </select>
          </div>
          <div class='flex flex-col gap-4'>
            <label for='city'>City</label>
            <Input
              type='text'
              name='city'
              id='city'
              defaultValue={cart?.shipping_address.city}
            />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='province'>Province</label>
            <Input
              type='text'
              name='province'
              id='province'
              defaultValue={cart?.shipping_address.province}
            />
          </div>
          <div class='flex flex-col gap-4'>
            <label for='postal_code'>Postal code</label>
            <Input
              type='text'
              name='postal_code'
              id='postal_code'
              defaultValue={cart?.shipping_address.postal_code}
            />
          </div>
        </div>
        <button
          type='submit'
          class='border-white border-2 p-2 hover:bg-white hover:text-black mr-auto'
        >
          Submit
        </button>
      </div>
    </form>
  )
}

const Input = ({
  name,
  type,
  id,
  defaultValue
}: {
  name: string
  type: string
  id: string
  defaultValue?: string
}) => (
  <input
    class='border-2 border-white w-full flex items-center px-2 text-black'
    type={type}
    name={name}
    id={id}
    defaultValue={defaultValue}
  />
)
