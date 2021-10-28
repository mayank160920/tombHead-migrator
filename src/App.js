import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Header, CardWrapper, Footer } from "./components/shared";

import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export default function App() {
  const [wallet, setWallet] = useState(false);

  return (
    <div className="app">
      <Header />
      <CardWrapper />
      <Footer />
      <ToastContainer style={{overflowWrap: 'anywhere'}} />
    </div>
  );
}
