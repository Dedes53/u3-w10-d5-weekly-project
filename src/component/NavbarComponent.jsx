import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const NavbarComponent = function (props) {
    return (
        <div className="d-flex flex-column bg-body-tertiary">
            <h1 className="p-3 pb-0 mb-0 ms-5">{props.title}</h1>
            <div className='d-flex justify-content-center align-items-center w-100 gap-5'>
                {props.link.map((link, index) => {
                    return <Link key={index} className="text-decoration-none p-3" to={link.path}>{link.name}</Link>
                })}
            </div>
        </div >
    )
}

export default NavbarComponent;




