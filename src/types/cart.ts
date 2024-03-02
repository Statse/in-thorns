export type CartItemsType = {
    variantId: string;
    lineItemId: string
    quantity: number;
}


export type ShippingOptionsType = {
    id: string;
    created_at: Date,
    updated_at: Date,
    deleted_at: Date | null,
    name: string,
    region_id: string,
    profile_id: string,
    provider_id: string,
    price_type: string,
    amount: number,
    is_return: boolean,
    admin_only: boolean,
    data: { id: string, },
    metadata: {},
    profile: {
        id: string,
        created_at: Date,
        updated_at: Date,
        deleted_at: Date | null,
        name: string,
        type: string,
        metadata: any | null
    },
    requirements: any[],
    price_incl_tax: number,
    tax_rates: any[],
    tax_amount: number
}