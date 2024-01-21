import Medusa from "@medusajs/medusa-js"

//TODO: Move base url to env variable
export const medusa = new Medusa({
    baseUrl: "http://localhost:9000/", //MEDUSA_BACKEND_URL,
    maxRetries: 3
})