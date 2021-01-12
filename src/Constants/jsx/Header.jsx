import React from 'react';
import "../css/Header.css"
import Logo from '../../Assets/logo.jpg'
import { Form, FormControl, Button, Nav, Navbar } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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

            {props.visibility ? <CostumizedNavItem content={props.content} /> : null}
        </header>
    );
}

export function CostumizedNavItem(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                    className="mr-auto site-nav-bar"
                    style={{ width: "70%", justifyContent: 'space-between' }}
                >
                    {/* <Nav.Link href="/sign">
                        <AccountCircleIcon
                            className="login-btn"
                            fontSize="default" />
                    </Nav.Link> */}
                    {props.content.map((item, index) => <Nav.Link key={index} className="nav-link" onClick={item.click || null} href={item.path || null}>{item.name}</Nav.Link>)}
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2 search-input-nav" />
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

// consumer
const mapStateToProps = (state) => {
    return {
        visibility: state.navControl.visible,
        content: state.navControl.content
    }
}

export default connect(mapStateToProps)(Header);