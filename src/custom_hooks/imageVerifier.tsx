import { useEffect, useState } from "react";

const imageVerifier = (imageUrl: string) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        const img = new Image();

        img.onload = () => {
            setIsLoaded(true);
            setHasError(false);
        };

        img.onerror = () => {
            setIsLoaded(false);
            setHasError(true);
        };

        img.src = imageUrl;

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [imageUrl]);

    return isLoaded && !hasError;
};

export default imageVerifier;

