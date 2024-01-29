import { persistentAtom } from '@nanostores/persistent'
import { atom } from 'nanostores';
import type { CartItemType } from '@/components/preact/Cart';

export const isInStock = atom<boolean>(true);
export const cartItemCount = persistentAtom<number>('item_count', 0, {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export const persistentCartId = persistentAtom<string>('cart_id', "", {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export const countCartItems = (items: CartItemType[]) => {
    let count = 0
    items.forEach(item => {
        count += item.quantity
    })

    return count
}