import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";

const CitySearch = function () {

    const [city, setCity] = useState("");

    return (
        <Container className="mb-5 main text-center mt-5">
            <Row>
                <Col md={6} className="mx-auto border border-1 shadowed p-4 rounded">
                    <form action=""
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (city.trim() !== "") {
                                // se la città non è vuota, reindirizzo alla pagina dei dettagli
                                window.location.href = `/city/${city.trim()}`;
                            }
                        }}>
                        <input type="text"
                            placeholder="Cerca la tua città..."
                            className="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary mt-3">Cerca</button>
                    </form>
                </Col>
            </Row>


        </Container>
    )
}

export default CitySearch;