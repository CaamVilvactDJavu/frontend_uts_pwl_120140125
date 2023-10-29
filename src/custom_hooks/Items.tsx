import axios from "axios";
import useSWR from "swr";

const Items = () => {
    const fethcer = (url: string) => axios.get(url).then((res) => res.data);
    const { data, error, isValidating } = useSWR("/api/v1/product/", fethcer);

    return { data, error, isLoading: isValidating };
};

export default Items;

