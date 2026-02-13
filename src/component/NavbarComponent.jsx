import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";


const NavbarComponent = function (props) {
    return (
        <Container fluid className="p-3 p-md-5 nav-banner shadowed"
            style={{
                // backgroundImage: `url('/SfondoBanner.png')`,
                // backgroundSize: "cover",
                // backgroundPosition: "center",
                // // height: "400px",
                // borderRadius: "0 0 10px 10px",
                // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
            }}>
            <h1 className="text-center p-3 m-5 p-md-5 m-md-5" style={{ fontSize: "4rem" }}>{props.title}</h1>
            {/* <div className='d-flex justify-content-center align-items-center w-100 gap-3 gap-md-5 px-2'>
                {props.link.map((link, index) => {
                    return <Link key={index} className="text-decoration-none p-3" to={link.path}>{link.name}</Link>
                })}
            </div> */}
        </Container>
    )
}

export default NavbarComponent;




