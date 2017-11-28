import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { logout } from '../actions/auth';

class NavbarComponent extends Component {
    onLogout() {
        this.props.logout();
    }

    render() {
        const { isAuthenticated } = this.props;

        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">QLoop</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <IndexLinkContainer to="/myQLoop">
                                <NavItem eventKey={1}>My QLoop</NavItem>
                            </IndexLinkContainer>

                            <NavDropdown eventKey={2} title="Booths" id="basic-nav-dropdown">
                                <MenuItem eventKey={2.1}>Public Booths</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={2.2}>Create Booth</MenuItem>
                            </NavDropdown>
                        </Nav>

                        <Nav pullRight>
                            {isAuthenticated ?
                                <NavItem onClick={this.onLogout.bind(this)} eventKey={3}>SignOut</NavItem>
                                :
                                <LinkContainer to="/login">
                                    <NavItem eventKey={3}>SignIn</NavItem>
                                </LinkContainer>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.credentials.token
    }
}

export default connect(mapStateToProps, { logout }, null, { pure: false })(NavbarComponent);
