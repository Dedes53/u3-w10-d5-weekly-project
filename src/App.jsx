import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
// component fissi
import NavbarComponent from "./component/NavbarComponent";
import FooterComponent from "./component/FooterComponent";

// component dinamici
import Home from "./component/Home";
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

        </Routes>

        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
