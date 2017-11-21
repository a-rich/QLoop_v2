import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

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
                        <NavItem eventKey={1} href="/">My QLoop</NavItem>
                        <NavItem eventKey={2} href="#">SignIn</NavItem>
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
