import { Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageNotFound = function () {
    return (
        <Container className="mb-5 main">
            <Alert variant="danger" className="text-center mt-5 px-5">
                <h2 className="text-center mt-3">404 - Pagina non trovata</h2>
                <p className="text-center">La pagina che stai cercando non esiste.</p>
            </Alert>
            <p className="text-center mt-5">Dai non far lo stupido e torna <Link to="/">indietro!</Link></p>

        </Container>
    )
}

export default PageNotFound;