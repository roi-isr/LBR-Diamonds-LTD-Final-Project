import React from 'react';
import "./Header.css"
import Logo from '../Assets/logo.jpg'
import { Form, FormControl, Button, Nav, Navbar } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SignInSide from '../MaterialUI_code/sign-in-side/SignInSide'

const Header = () => {
    return (
        <header>
            <div class="logo-container">
                <img
                    src={Logo}
                    className="logo"
                    alt="logo image"
                />
            </div>
            <NavItem />
        </header>
    );
}


const NavItem = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
<<<<<<< HEAD
                <Nav
                    className="mr-auto"
                    style={{ justifyContent: "space-between", width: "60%", margin: "auto" }}
                >
                    <Nav.Link href="/sign">
                        <AccountCircleIcon
                            className="login-btn"
                            fontSize="default" />
                    </Nav.Link>
=======
                <Nav className="mr-auto" style={{ justifyContent: "space-between", width: "60%", margin:"auto" }}>
                    <Nav.Link href="/sign"><AccountCircleIcon className="login-btn" fontSize="default" /></Nav.Link>
>>>>>>> 292cd1b0b97e2cb37084c908ec6fbc3cc3a1d919
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/store">Shop</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/qa">FAQ</Nav.Link>
                    <Nav.Link href="/contact">Contact us</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button
                        className="gen-search-btn"
                        variant="outline-success">
                        Search
                    </Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;