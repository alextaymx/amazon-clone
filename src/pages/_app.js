import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
