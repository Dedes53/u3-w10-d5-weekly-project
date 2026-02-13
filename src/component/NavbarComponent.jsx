import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";


const NavbarComponent = function (props) {
    return (
        <Container fluid className="d-flex flex-column bg-body-tertiary px-0">
            <h1 className="text-center text-md-start p-3 pb-0 mb-0 ">{props.title}</h1>
            <div className='d-flex justify-content-center align-items-center w-100 gap-3 gap-md-5 px-2'>
                {props.link.map((link, index) => {
                    return <Link key={index} className="text-decoration-none p-3" to={link.path}>{link.name}</Link>
                })}
            </div>
        </Container>
    )
}

export default NavbarComponent;




