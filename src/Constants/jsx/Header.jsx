import React, { useState, useEffect } from 'react';
import "../css/Header.css";
import Logo from '../../Assets/logo.jpg';
import { NavLink } from 'react-router-dom';
import { Form, FormControl, Button, Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { update_search_str } from '../../store/actions/index';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
            {props.visibility ? <ConnectedNavItem /> : null}
        </header>
    );
}

function CustomizedNavItem(props) {
    const [navExpended, setNavExpended] = useState(false);
    const [searchStr, setSearchStr] = useState("");

    const closeNav = () => setNavExpended(false);

    // Clean search bar
    useEffect(() => {
        if (props.searchStrRedux === "") {
            setSearchStr("");
        }
    }, [props.searchStrRedux]);

    const navItemClickHandler = (item) => {
        if (item.click) {
            item.click();
        }
        closeNav();
    }

    const onSearchClicked = (e) => {
        e.preventDefault();
        // Prevent the character '\' (backslash) as a valid search string
        if(searchStr.includes('\\')){
            return;
        }
        props.sendSearch(searchStr);
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
                    style={{
                        width: "72%", marginLeft: 'auto', marginBottom: navExpended ? '10px' : '0',
                        justifyContent: 'space-between', alignItems: 'center'
                    }}>
                    {props.content.map((item, index) =>
                        <NavLink
                            activeClassName={item.name !== "Logout" ? "active-nav" : "logout-nav"}
                            isActive={false}
                            to={{
                                pathname: item.path ?? null
                            }}
                            key={index}
                            className="nav-link"
                            onClick={() => navItemClickHandler(item)}>
                            {item.name || <AccountCircleIcon />}
                        </NavLink>
                    )}
                </Nav>
                <Form inline onSubmit={onSearchClicked}>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2 search-input-nav"
                        disabled={!props.isSearchVisible}
                        value={searchStr}
                        onChange={(e) => setSearchStr(e.target.value)}
                    />
                    <Button
                        className="gen-search-btn"
                        variant="outline-success"
                        disabled={!props.isSearchVisible}
                        type='submit'>
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
        content: state.navControl.content,
        isSearchVisible: state.searchBar.isVisible,
        searchStrRedux: state.searchBar.searchStr
    }
}


const mapDispatchToPropsNav = (dispatch) => {
    return {
        sendSearch: (searchStr) => dispatch(update_search_str(searchStr))
    }
}

const ConnectedNavItem = connect(mapStateToPropsNav, mapDispatchToPropsNav)(CustomizedNavItem);
export default connect(mapStateToPropsHeader)(Header);