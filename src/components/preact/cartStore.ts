import { atom, map } from 'nanostores';

export const isCartOpen = atom(false);

export type CartItem = {
    variant_id: string;
    quantity: number;
};

export type CartContent = CartItem[];

export type CartItemDisplayInfo = Pick<CartItem, 'variant_id' | 'quantity'>;

export const cartItems = map<Record<string, CartItem>>({});

export function addCartItem({ variant_id, quantity, }: CartItem) {
    console.log('addCartItem', variant_id, quantity);
    const existingEntry = cartItems.get()[variant_id];
    if (existingEntry) {
        cartItems.setKey(variant_id, {
            ...existingEntry,
            quantity: existingEntry.quantity + 1,
        });
    } else {
        cartItems.setKey(variant_id, {
            variant_id,
            quantity,
        });
    }
}