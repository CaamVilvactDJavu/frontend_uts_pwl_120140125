import { Button } from "@/components/ui/button";
import ProductItemView from "../ui_elements/ProductItemView";
import { useNavigate } from "react-router-dom";
import useProducts from "../custom_hooks/Items";
import { Product } from "../models/Product";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const LandingView = () => {
    const { data, isLoading, error } = useProducts();
    const navigate = useNavigate();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <main className="mx-4 md:mx-20 lg:mx-44 mt-6 mb-6">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="scroll-m-20 border-b pb-2 text-8xl font-semibold tracking-tight first:mt-0">Product</h1>
                        <div className="self-end mt-4">
                            <Button onClick={() => navigate("/create-product")}>
                                Create New Product
                                <PlusCircledIcon className="inline-block ml-2" />
                            </Button>
                        </div>
                    </div>
                    <div className="mt-8 grid gap-2 md:grid-cols-4 grid-cols-2 ">
                        {data?.map((product: Product) => (
                            <ProductItemView key={product.id} product={product} />
                        ))}
                    </div>
                </main>
            )}
        </>
    );
};


export default LandingView 