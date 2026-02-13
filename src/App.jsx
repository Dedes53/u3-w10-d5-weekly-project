import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// component fissi
import NavbarComponent from "./component/NavbarComponent";
import FooterComponent from "./component/FooterComponent";

// component dinamici
import Home from "./component/Home";
import DetailCity from "./component/DetailCity";

import PageNotFound from "./component/PageNotFound";


function App() {


  return (
    <>
      <BrowserRouter>
        <NavbarComponent
          title="Tempo Pazzerello"
          link={[
            { name: "Home", path: "/" },
            { name: "Cerca la tua città", path: "/search" }
          ]} />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* per le card delle città */}
          <Route path="/city/:cityName" element={<DetailCity />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
