import { useNavigate } from "react-router-dom";
import { CartContextValue, CartItem, useCart } from "../custom_hooks/cartManager";
import CartItemView from "../ui_elements/CartItemView";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, CheckCircledIcon } from "@radix-ui/react-icons";

const BasketView = () => {
    const navigate = useNavigate();
    const { cartItems } = useCart() as CartContextValue;

    return (
        <main className="bg-white rounded-3xl mx-4 md:mx-20 lg:mx-40 mt-6 mb-6 p-6 space-y-6">
            <div className="flex justify-between items-center">
                <Button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <ChevronLeftIcon className="text-2xl mr-2" />Continue Shopping
                </Button>
                <h1 className="scroll-m-20 border-b pb-2 text-8xl font-semibold tracking-tight first:mt-0 mb-6">Your Cart</h1>
                <div>
                    <Button
                        className="flex items-center space-x-2"
                        onClick={async () => {
                            if (cartItems.length === 0) {
                                // if the cart is empty, then alert
                                alert("Your cart is empty");
                                return;
                            }

                            // confirm for checkout using alert
                            const confirm = window.confirm("Are you sure you want to checkout?");

                            if (confirm) {
                                // if confirmed, then navigate to the checkout page
                                navigate("/checkout");
                            }
                        }}
                    >
                        Checkout
                        <CheckCircledIcon className="ml-2 text-2xl" />
                    </Button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-4 grid-cols-2">
                {cartItems.length > 0 ? (
                    cartItems.map((item: CartItem) => (
                        <CartItemView product={item} key={item.id} />
                    ))
                ) : (
                    <p className="text-2xl">Your cart is empty</p>
                )}
            </div>
        </main>
    );
};

export default BasketView;
