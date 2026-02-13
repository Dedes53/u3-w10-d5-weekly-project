import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MyNavbar.css';

function MyNavbar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🌤️ MeteoApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/search" className="nav-link-custom">
              Cerca la tua città
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
