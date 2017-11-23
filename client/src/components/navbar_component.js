import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

class NavbarComponent extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">QLoop</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <IndexLinkContainer to="/">
                            <NavItem eventKey={1}>My QLoop</NavItem>
                        </IndexLinkContainer>
                        <LinkContainer to="/signup">
                            <NavItem eventKey={2}>SignIn</NavItem>
                        </LinkContainer>
                        <NavDropdown eventKey={3} title="Booths" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Public Booths</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.2}>Create Booth</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default NavbarComponent;
