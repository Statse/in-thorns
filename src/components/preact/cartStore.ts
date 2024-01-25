import { persistentAtom } from '@nanostores/persistent'
import { atom } from 'nanostores';

export const isInStock = atom<boolean>(false);

//TODO: Think if we actually need this

export type CartItem = {
    variantId: string;
    quantity: number;
    lineItemId: string
};

export type CartContent = CartItem[];
export type CartItemDisplayInfo = Pick<CartItem, 'variantId' | 'quantity'>;

export const persistentCart = persistentAtom<CartContent>('medusa_cart', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export function addCartItem({ variantId, quantity, lineItemId }: CartItem) {
    const existingEntry = persistentCart.get().find((item) => item.variantId === variantId);

    if (existingEntry) {
        persistentCart.set([
            ...persistentCart.get().filter((item) => item.variantId !== variantId),
            {
                ...existingEntry,
                quantity: existingEntry.quantity + quantity,
            },
        ]);
    } else {
        persistentCart.set([
            ...persistentCart.get(),
            {
                variantId,
                quantity,
                lineItemId
            },
        ]);
    }
}

export function removeCartItem({ variantId, quantity }: CartItem) {
    const existingEntry = persistentCart.get().find((item) => item.variantId === variantId);

    if (existingEntry) {
        persistentCart.set([
            ...persistentCart.get().filter((item) => item.variantId !== variantId),
            {
                ...existingEntry,
                quantity: existingEntry.quantity - quantity,
            },
        ]);
    }
}