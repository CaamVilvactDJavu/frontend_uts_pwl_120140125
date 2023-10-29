import { useNavigate } from "react-router-dom";
import { CartContextValue, useCart } from "../custom_hooks/cartManager";
import { Button } from "@/components/ui/button";
import { ArchiveIcon } from "@radix-ui/react-icons"

const Topbar = () => {
    const navigate = useNavigate();
    const { cartItems }: CartContextValue = useCart();

    const handleLogoClick = () => navigate("/");
    const handleCartClick = () => navigate("/cart");

    const cartItemCount = cartItems?.length ?? 0;

    return (
        <header className='w-full border-b-2 border-slate-900'>
            <div className='mx-4 md:mx-20 lg:mx-44'>
                <nav className='flex justify-between items-center my-2 py-2'>

                    <div className="p-2 rounded-md font-extralight text-3xl hover:bg-black hover:text-white" onClick={handleLogoClick}>
                        <span className="font-extrabold">T</span>oko<span className="font-extrabold">S</span>erba<span className="font-extrabold">A</span>da
                    </div>

                    <Button onClick={handleCartClick}>
                        <ArchiveIcon className="inline-block mr-2" />
                        {cartItemCount}
                    </Button>

                </nav>
            </div >
        </header>
    );
};

export default Topbar;

