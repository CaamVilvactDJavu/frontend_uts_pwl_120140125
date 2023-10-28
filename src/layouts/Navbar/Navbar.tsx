import { useNavigate } from "react-router-dom";
import { CartContextValue, useCart } from "../../hooks/useCart";
import { Button } from "@/components/ui/button";
import { ArchiveIcon } from "@radix-ui/react-icons"

const Header = () => {
    const navigate = useNavigate();
    const { cartItems }: CartContextValue = useCart();

    const handleLogoClick = () => navigate("/");
    const handleCartClick = () => navigate("/cart");

    const cartItemCount = cartItems?.length ?? 0;

    return (
        <header className='w-full border-b-2 border-slate-900'>
            <div className='container mx-auto px-4 md:px-20 lg:px-40'>
                <nav className='flex justify-between items-center my-2 p-2'>

                    <div className="px-6 py-2 rounded-md outline font-extralight text-3xl hover:bg-black hover:text-white" onClick={handleLogoClick}>
                        <span className="font-extrabold">T</span>oko <span className="font-extrabold">S</span>erba<span className="font-extrabold">A</span>da
                    </div>

                    <Button onClick={handleCartClick}>
                        <ArchiveIcon className="inline-block mr-2" />
                        {cartItemCount}
                    </Button>

                </nav>
            </div >
        </header >
    );
};

export default Header;

