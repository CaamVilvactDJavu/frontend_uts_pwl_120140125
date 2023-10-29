import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductManager from "../custom_hooks/ProductManager";
import { Button } from "@/components/ui/button";
import { mutate } from "swr";
import { apiClient } from "../api/config";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Inputs = {
    id: number;
    name: string;
    price: number; description: string;
    image_url: string;
    stock: number;
};

const UpdateProductView = () => {
    const { id = "" } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const { data, isLoading, error } = ProductManager({ id: id });

    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        data.id = Number(id);
        console.log(data);
        try {
            data.price = Number(data.price);
            data.stock = Number(data.stock);
            await apiClient.put("api/v1/product/", data);
            mutate("http://localhost:5173/api/v1/product/");
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
                <main className="mt-6 mb-6">
                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="w-full max-w-md">
                            <div className="flex justify-between items-center mb-6">
                                <Button onClick={() => navigate("/")}>
                                    <ChevronLeftIcon />
                                </Button>
                                <h1 className="font-bold text-2xl underline underline-offset-2">Update Product</h1>
                            </div>

                            <form
                                className="flex flex-col items-start gap-2"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    defaultValue={data?.name}
                                    {...register("name", { required: true })}
                                />

                                <Label htmlFor="description" className="mt-2">Description</Label>
                                <Input
                                    type="text"
                                    id="description"
                                    defaultValue={data?.description}
                                    {...register("description", { required: true })}
                                />

                                <Label htmlFor="stock" className="mt-2">Stock</Label>
                                <Input
                                    type="number"
                                    id="stock"
                                    defaultValue={data?.stock}
                                    {...register("stock", { required: true })}
                                />

                                <Label htmlFor="price" className="mt-2">Price</Label>
                                <Input
                                    type="number"
                                    id="price"
                                    defaultValue={data?.price}
                                    {...register("price", { required: true })}
                                />

                                <Label htmlFor="image_url" className="mt-2">Product Image Url</Label>
                                <Input
                                    type="text"
                                    id="image_url"
                                    defaultValue={data?.image_url}
                                    {...register("image_url", { required: true })}
                                />


                                <Button type="submit" className="mt-4 w-full">
                                    Update
                                </Button>
                            </form>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default UpdateProductView; 
