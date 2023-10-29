import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { mutate } from "swr";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Inputs = {
    name: string;
    price: number;
    description: string;
    image_url: string;
    stock: number;
};

const NewProductView = () => {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        try {
            data.price = Number(data.price);
            data.stock = Number(data.stock);
            await axios.post("api/v1/product/", data);
            mutate("api/v1/product/");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="mt-6 mb-6">
            <div className="flex flex-col items-center justify-center py-6">
                <div className="w-full max-w-md">
                    <div className="flex justify-between items-center mb-6">
                        <Button onClick={() => navigate("/")}>
                            <ChevronLeftIcon />
                        </Button>
                        <h1 className="font-bold text-2xl underline underline-offset-2">Create New Product</h1>
                    </div>

                    <form
                        className="flex flex-col items-start gap-2"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            type="text"
                            id="name"
                            {...register("name", { required: true })}
                        />

                        <Label htmlFor="description">Description</Label>
                        <Input
                            type="text"
                            id="description"
                            {...register("description", { required: true })}
                        />

                        <Label htmlFor="stock">Stock</Label>
                        <Input
                            type="number"
                            id="stock"
                            {...register("stock", { required: true })}
                        />

                        <Label htmlFor="price">Price</Label>
                        <Input
                            type="number"
                            id="price"
                            {...register("price", { required: true })}
                        />

                        <Label htmlFor="image_url">Product Image Url</Label>
                        <Input
                            type="text"
                            id="image_url"
                            {...register("image_url", { required: true })}
                        />

                        <Button type="submit" className="mt-4 w-full">
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default NewProductView;
