import { useEffect, useState } from "react";
import { apiClient } from "../api/config";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../custom_hooks/cartManager";
import { CheckIcon } from "@radix-ui/react-icons";


const PaymentView = () => {
    const { cartItems, clearCart } = useCart();

    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate("/");
            return;
        }

        setItems(cartItems);

        const getTotalPriceFromServer = async () => {
            const ids = [];

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                for (let j = 0; j < item.quantity; j++) {
                    ids.push(item.id);
                }
            }

            const totalPriceDto = await apiClient.post(
                "/api/v1/product/sum-price",
                {
                    id: ids,
                }
            );

            console.log(totalPriceDto.data.pro);

            setTotalPrice(totalPriceDto.data.pro);
        };

        getTotalPriceFromServer();

        return () => {
            clearCart();
        };
    }, []);

    return (
        <main className="flex justify-center items-center h-screen bg-gray-200">
            <Card className="w-[480px] bg-white rounded-lg shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Invoice</CardTitle>
                </CardHeader>

                <CardContent>
                    {items.length === 0 ? (
                        <CardDescription></CardDescription>
                    ) : (
                        items.map((item) => (
                            <div className="flex justify-between items-center mb-4" key={item?.id}>
                                <div className="flex-1 text-sm">{item.name}</div>
                                <div className="flex-1 text-sm text-center">Rp. {item.price}</div>
                                <div className="flex-1 text-sm text-center">{item.quantity}</div>
                                <div className="flex-1 text-sm text-right">
                                    Rp. {item.price * item.quantity}
                                </div>
                            </div>
                        ))
                    )}

                    <div className="mt-4 flex justify-between">
                        <CardDescription>Total</CardDescription>
                        <CardDescription className="text-right">Rp. {totalPrice}</CardDescription>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center mt-4">
                    <Button onClick={() => navigate("/")}>
                        <CheckIcon className="mr-2" />
                        Confirm & Pay
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
};

export default PaymentView; 