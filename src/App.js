import { useState } from "react";
import "./styles.css";

import { Header, CardWrapper, Footer } from "./components/shared";

export default function App() {
  const [wallet, setWallet] = useState(false);

  return (
    <div className="app">
      <Header />
      <CardWrapper />
      <Footer />
    </div>
  );
}
