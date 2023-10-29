import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainWrapper from "./ui_elements/MainWrapper";
import LandingView from "./views/LandingView";
import BasketView from "./views/BasketView";
import NewProductView from "./views/NewProductView";
import ProductDetailView from "./views/ProductDetailView";
import UpdateProductView from "./views/UpdateProductView";
import PaymentView from "./views/PaymentView";

const App = () => {
  // create routes
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<MainWrapper />}>
          <Route path="/" element={<LandingView />} />
          <Route path="cart" element={<BasketView />} />
          <Route path="create-product" element={<NewProductView />} />
          <Route path="detail-product/:id" element={<ProductDetailView />} />
          <Route path="edit-product/:id" element={<UpdateProductView />} />
          <Route path="checkout" element={<PaymentView />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={routes} />;
};

export default App;