import { Container } from "react-bootstrap";

const FooterComponent = function () {
    return (
        <Container fluid id="footer" className="bg-body-tertiary p-3">
            <p className="text-center" style={{ fontSize: "12px" }}>© 2026 Tempo Pazzerello. All rights reserved to me!!.</p>
            <p className="text-center " style={{ fontSize: "12px" }}>Un esercizio per <a href="https://www.epicode.com/" target="_blank" rel="noopener noreferrer">Epicode</a></p>
        </Container>
    )
}

export default FooterComponent;