import useSWR from "swr";
import axios from "axios";

interface ProductManagerProps {
    id: string;
}

const fetchProductById = (url: string) => axios.get(url).then(response => response.data);

const ProductManager = ({ id }: ProductManagerProps) => {
    const endpoint = `/api/v1/product/?productId=${id}`;
    const { data, error } = useSWR(endpoint, fetchProductById);

    return {
        isLoading: !data && !error,
        data,
        error
    };
};

export default ProductManager;

