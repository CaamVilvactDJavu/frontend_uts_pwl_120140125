import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const RootLayout = () => {
    return (
        <>
            <div className="m-auto">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </>
    );
};

export default RootLayout;

