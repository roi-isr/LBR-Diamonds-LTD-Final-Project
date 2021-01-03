import React from 'react';
import "../css/Header.css"
import Logo from '../../Assets/logo.jpg'
import { Form, FormControl, Button, Nav, Navbar } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux'

<<<<<<< HEAD
const Header = (props) => {
=======
/* Creating header, which contains the logo of the LBR company */
const Header = () => {
>>>>>>> 095f450747dc033e1f7eb56b08fbf27c7b9f2d0e
    return (
        <header>
            <div className="logo-container">
                <img
                    src={Logo}
                    className="logo"
                    alt="logo"
                />
            </div>
            {props.visibility ? <CostumizedNavItem content={props.content} /> : null }
        </header>
    );
}

<<<<<<< HEAD
export const CostumizedNavItem = (props) => {
=======
/* Creating a nav-item, using React-Bootstrap (with mobile capability)*/
const NavItem = () => {
>>>>>>> 095f450747dc033e1f7eb56b08fbf27c7b9f2d0e
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                    className="mr-auto"
                    style={{ justifyContent: "space-between", width: "60%", margin: "auto" }}
                >
                    <Nav.Link href="/sign">
                        <AccountCircleIcon
                            className="login-btn"
                            fontSize="default" />
                    </Nav.Link>
                    {props.content.map(item => <Nav.Link href={item.path}>{item.name}</Nav.Link>)}
                    {/* <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/store">Shop</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/qa">FAQ</Nav.Link>
                    <Nav.Link href="/contact">Contact us</Nav.Link> */}
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

const mapStateToProps = (state) => {
    return {
        visibility: state.navControl.visible,
        content: state.navControl.content
    }
}

export default connect(mapStateToProps)(Header);