import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";
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

      </BrowserRouter>
    </>
  )
}

export default App
