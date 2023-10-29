import { useNavigate, useParams } from "react-router-dom";
import defaultProductImage from "../assets/deafaultProducts.png";
import useProduct from "../custom_hooks/ProductManager";
import ImageVerifier from "../custom_hooks/imageVerifier";
import { apiClient } from "../api/config";
import { mutate } from "swr";
import { useCart } from "../custom_hooks/cartManager";
import { ArchiveIcon, ChevronLeftIcon, HandIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductDetailView = () => {
    const navigate = useNavigate();

    const { id = "" } = useParams();

    const { data, isLoading, error } = useProduct({ id: id });

    const { addToCart } = useCart();

    const isImageValid = ImageVerifier(data?.image_url);

    const handleDelete = async () => {
        try {
            await apiClient.delete("api/v1/product/", {
                data: { id: Number(id) },
            });
            await mutate("api/v1/product/");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <Card className='mx-4 md:mx-20 lg:mx-44 mb-6 mt-6 shadow-2xl relative'>
                    <Button
                        className="absolute top-4 left-4 z-10"
                        onClick={() => navigate("/")}
                    >
                        <ChevronLeftIcon className="text-2xl mr-2" />Continue Shopping
                    </Button>

                    <CardHeader className="flex flex-col items-center justify-center py-8">
                        <CardTitle className="mb-6 scroll-m-20 border-b pb-2 text-8xl font-semibold tracking-tight first:mt-0">Product Detail</CardTitle>
                        <div className="flex gap-2">
                            <Button variant="destructive" onClick={handleDelete}>
                                Delete
                                <TrashIcon className="ml-2 text-xl" />
                            </Button>
                            <Button variant="secondary" onClick={() => navigate("/edit-product/" + id)}>
                                Edit
                                <Pencil1Icon className="ml-2 text-xl" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="flex flex-col md:flex-row items-center gap-8 py-6">
                        <div className="bg-gray-100 rounded-lg w-full md:w-1/3">
                            <img src={isImageValid ? data?.image_url : defaultProductImage} className="object-cover w-full h-full rounded-lg" />
                        </div>
                        <div className="flex-1 space-y-4 md:space-y-4 text-center md:text-left">
                            <h2 className="font-extrabold text-5xl underline-4 ">{data?.name}</h2>
                            <p className="text-xl"><span className="font-semibold">Rp.</span> {data?.price}</p>
                            <p className="text-xl"><span className="font-semibold">Stock :</span> {data?.stock}</p>
                            <p className="text-xl border-2 border-slate-950 p-2 rounded-sm">{data?.description}</p>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between items-center py-8">
                        <Button onClick={() => addToCart(data)} className="mr-2">
                            Place in Basket
                            <ArchiveIcon className="ml-2 text-xl" />
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </>
    );
};

export default ProductDetailView; 