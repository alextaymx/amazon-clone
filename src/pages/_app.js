import { Provider } from "react-redux";
import { store } from "../app/store";
import { Provider as AuthProvider } from "next-auth/client";

import "../styles/globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";

import StorageService from "../services/StorageService";
import { hydrate } from "../slices/basketSlice";
import { ToastContainer, Zoom } from "react-toastify";

store.subscribe(() => {
  StorageService.set("basket", JSON.stringify(store.getState().basket));
});

let basket = StorageService.get("basket");
basket = basket ? JSON.parse(basket) : { items: [] };
store.dispatch(hydrate(basket));

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer transition={Zoom} />
      </Provider>
    </AuthProvider>
  );
};

export default MyApp;
