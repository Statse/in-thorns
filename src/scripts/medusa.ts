import Medusa from "@medusajs/medusa-js"

//TODO: Move base url to env variable
export const medusa = new Medusa({
    baseUrl: "http://localhost:9000/", //MEDUSA_BACKEND_URL,
    maxRetries: 3
})


export const addCartItem = async ({ variant_id, quantity, }: CartItem) => {
    const existingEntry = await medusa.cartItems.retrieve(variant_id);
    if (existingEntry) {
        await medusa.cartItems.update(variant_id, {
            quantity: existingEntry.quantity + 1,
        });
    } else {
        await medusa.cartItems.create({
            variant_id,
            quantity,
        });
    }
}