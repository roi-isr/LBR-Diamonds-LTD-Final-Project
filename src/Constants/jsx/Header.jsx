import React, { useState } from 'react';
import "../css/Header.css"
import Logo from '../../Assets/logo.jpg'
import { Link } from 'react-router-dom'
import { Form, FormControl, Button, Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux'

function Header(props) {
    return (
        <header>
            <div className="logo-container">
                <img
                    src={Logo}
                    className="logo"
                    alt="logo"
                />
            </div>
            {/* <CircularProgressbar
                value={4}
                maxValue={5}
                background={false}
                text={"מסגרת"}
                // styles={buildStyles({
                //     // Rotation of path and trail, in number of turns (0-1)
                //     rotation: 0.25,
                //     // Text size
                //     textSize: '10px',
                //     // How long animation takes to go from one percentage to another, in seconds
                //     pathTransitionDuration: 0.5,
                //     // Colors
                //     textColor: '#f88',
                //     trailColor: '#d6d6d6',
                // })}
            /> */}

            {props.visibility ? <ConnectedNavItem /> : null}
        </header>
    );
}

function CustomizedNavItem(props) {
    const [navExpended, setNavExpended] = useState(false);

    const closeNav = () => setNavExpended(false);

    const navItemClickHandler = (item) => {
        if (item.click) {
            item.click();
        }
        closeNav();
    }

    return (
        <Navbar
            bg="light"
            expand="lg"
            onToggle={(e) => setNavExpended(e)}
            expanded={navExpended}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                    className="mr-auto site-nav-bar"
                    style={{ width: "70%", justifyContent: 'space-between', alignItems: 'center' }}>
                    {props.content.map((item, index) =>
                        <Nav.Link
                            as={Link}
                            to={{
                                pathname: item.path || null
                            }}
                            className="nav-link"
                            onClick={() => navItemClickHandler(item)}
                            key={index}>
                            {item.name}
                        </Nav.Link>
                    )}
                </Nav>
                <Form inline>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2 search-input-nav" />
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

// Connect Header to Redux's gloal state as a consumer
const mapStateToPropsHeader = (state) => {
    return {
        visibility: state.navControl.visible
    }
}

// Connect Nav to Redux's gloal state as a consumer
const mapStateToPropsNav = (state) => {
    return {
        content: state.navControl.content
    }
}

const ConnectedNavItem = connect(mapStateToPropsNav)(CustomizedNavItem);
export default connect(mapStateToPropsHeader)(Header);