import { persistentAtom } from '@nanostores/persistent'
import { atom } from 'nanostores';

export const isInStock = atom<boolean>(true);

//TODO: Think if we actually need this

export type CartItem = {
    variantId: string;
    quantity: number;
};

export type CartContent = CartItem[];
export type CartItemDisplayInfo = Pick<CartItem, 'variantId' | 'quantity'>;

export const persistentCartId = persistentAtom<string>('cart_id', "", {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export const persistentCart = persistentAtom<CartContent>('medusa_cart', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export function addCartItem({ variantId, quantity }: CartItem) {
    const cart = persistentCart.get()
    const existingEntry = cart.findIndex((item) => item.variantId === variantId);
    const entryExists = existingEntry >= 0

    if (entryExists) {
        cart[existingEntry].quantity += quantity
        return persistentCart.set([
            ...cart,
        ]);
    }

    persistentCart.set([
        ...cart,
        {
            variantId,
            quantity,
        },
    ]);
}

export function deleteCartItem({ variantId, quantity }: CartItemDisplayInfo) {
    const cart = persistentCart.get()
    const existingEntry = cart.findIndex((item) => item.variantId === variantId);
    const entryExists = existingEntry >= 0

    if (entryExists) {
        const newQty = cart[existingEntry].quantity += quantity
        if (newQty <= 0) {
            return cart.splice(existingEntry, 1)
        }
        return cart[existingEntry].quantity = newQty
    }

    console.error("Item not found in cart")
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