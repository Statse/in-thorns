import { persistentAtom } from '@nanostores/persistent'

//TODO: Think if we actually need this

export type CartItem = {
    variant_id: string;
    quantity: number;
};

export type CartContent = CartItem[];
export type CartItemDisplayInfo = Pick<CartItem, 'variant_id' | 'quantity'>;

export const persistentCart = persistentAtom<CartContent>('cart', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export function addCartItem({ variant_id, quantity, }: CartItem) {
    const existingEntry = persistentCart.get().find((item) => item.variant_id === variant_id);

    if (existingEntry) {
        persistentCart.set([
            ...persistentCart.get().filter((item) => item.variant_id !== variant_id),
            {
                ...existingEntry,
                quantity: existingEntry.quantity + quantity,
            },
        ]);
    } else {
        persistentCart.set([
            ...persistentCart.get(),
            {
                variant_id,
                quantity,
            },
        ]);
    }
}