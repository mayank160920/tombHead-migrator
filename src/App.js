import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header, CardWrapper, Footer, SelectArtist } from "./components/shared";
import artistDb from "./data/data.json";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export default function App() {
  const selectedArtist = useLocation().pathname.slice("1");
  const [artist, setArtist] = useState(artistDb[selectedArtist]);

  useEffect(() => {
    setArtist(artistDb[selectedArtist]);
  }, [selectedArtist]);

  return (
    <div className="app">
      <Header artist={artist} />
      {artist ? (
        <CardWrapper artist={artist} />
      ) : (
        <SelectArtist setArtist={setArtist} />
      )}
      <Footer style={{ visibility: "visible" }} />
      <ToastContainer
        style={{ overflowWrap: "anywhere" }}
        position="bottom-right"
      />
    </div>
  );
}
