import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

export interface CartItem {
    id: number;
    name: string;
    image_url: string;
    price: number;
    quantity: number;
}

export type CartContextValue = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (item: CartItem) => void;
    clearCart: () => void;
};

const CartContext = createContext({});

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

        if (itemInCart) {
            const newCartItems: CartItem[] = cartItems.map((cartItem) => {
                if (cartItem.id === item.id) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                    };
                } else {
                    return cartItem;
                }
            });
            setCartItems(newCartItems);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (item: CartItem) => {
        const newCartItems: CartItem[] = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity - 1,
                };
            } else {
                return cartItem;
            }
        });

        setCartItems(newCartItems.filter((cartItem) => cartItem.quantity > 0));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const value: CartContextValue = {
        cartItems: cartItems,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        clearCart: clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
