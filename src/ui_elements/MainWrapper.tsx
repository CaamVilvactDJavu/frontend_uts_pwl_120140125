import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import FooterView from "./FooterView";

const MainWrapper = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Topbar />
            <div className="flex-grow">
                <Outlet />
            </div>
            <FooterView />
        </div>
    );
};

export default MainWrapper;


