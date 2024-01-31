import Medusa from "@medusajs/medusa-js"

//TODO: Move base url to env variable
export const medusa = new Medusa({
    baseUrl: import.meta.env.PUBLIC_MEDUSA_BACKEND_URL,
    maxRetries: 3
})