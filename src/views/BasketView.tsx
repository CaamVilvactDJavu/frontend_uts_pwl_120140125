import { useNavigate } from "react-router-dom";
import { CartContextValue, CartItem, useCart } from "../custom_hooks/cartManager";
import CartItemView from "../ui_elements/CartItemView";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BasketView = () => {
    const navigate = useNavigate();
    const { cartItems } = useCart() as CartContextValue;

    const handleContinue = () => {
        if (cartItems.length === 0) return;
        navigate("/checkout");
    };

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
                <h1 className="scroll-m-20 border-b pb-2 text-8xl font-semibold tracking-tight first:mt-0 mb-6">Items in Your Basket</h1>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="flex items-center space-x-2">
                            Payment
                            <CheckCircledIcon className="ml-2 text-2xl" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Payment Confirmation</AlertDialogTitle>
                            <AlertDialogDescription>
                                Add for payment. Would you like to continue to payment processing?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
            <div className="grid gap-4 md:grid-cols-4 grid-cols-2">
                {cartItems.length > 0 ? (
                    cartItems.map((item: CartItem) => (
                        <CartItemView product={item} key={item.id} />
                    ))
                ) : (
                    <p></p>
                )}
            </div>
        </main>
    );
};

export default BasketView;
