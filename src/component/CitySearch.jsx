import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

const CitySearch = function () {
    return (
        <Container className="mb-5 main text-center mt-5">
            <Row>
                <Col md={6} className="mx-auto border border-1 boxshadow p-4 rounded">
                    <form action="">
                        <input type="text" placeholder="Cerca la tua città..." className="form-control" />
                        <button type="submit" className="btn btn-primary mt-3">Cerca</button>
                    </form>
                </Col>
            </Row>


        </Container>
    )
}

export default CitySearch;