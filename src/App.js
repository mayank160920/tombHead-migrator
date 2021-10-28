import { ToastContainer } from "react-toastify";
import { Header, CardWrapper, Footer } from "./components/shared";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <CardWrapper />
      <Footer style={{ visibility: "hidden" }} />
      <ToastContainer
        style={{ overflowWrap: "anywhere" }}
        position="bottom-right"
      />
    </div>
  );
}
