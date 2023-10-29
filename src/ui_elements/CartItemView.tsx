import { useNavigate } from "react-router-dom";
import defaultProductImage from "../assets/deafaultProducts.png";
import imageVerifier from "../custom_hooks/imageVerifier";
import { CartContextValue, CartItem, useCart } from "../custom_hooks/cartManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MinusCircledIcon } from "@radix-ui/react-icons";

const CartItemView: React.FC<{
    product: CartItem;
}> = ({ product }) => {
    const navigate = useNavigate();
    const isImageValid = imageVerifier(product.image_url);
    const { cartItems, removeFromCart }: CartContextValue = useCart() || {
        cartItems: [],
        addToCart: () => { },
        removeFromCart: () => { },
        clearCart: () => { },
    };

    return (
        <Card
            className="w-[380px] cursor-pointer"
            onClick={() => navigate(`/detail-product/${product?.id}`)}
        >
            <CardHeader>
                <CardTitle>{product?.name}</CardTitle>
                <CardDescription>Rp. {product?.price}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <img
                    src={isImageValid ? product.image_url : defaultProductImage}
                    className="object-contain w-36 h-40"
                />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <p className="text-sm">Amount : {product?.quantity}</p>
                <Button
                    onClick={(event) => {
                        event.stopPropagation();
                        removeFromCart(product);
                    }}
                    className="hover:outline-slate-950 hover:bg-white hover:text-black"
                >
                    Remove<MinusCircledIcon className="ml-2" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CartItemView;
