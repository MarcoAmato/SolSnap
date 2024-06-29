import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

function Navbar() {


    return (
        <>
            <Nav>
                <NavItem>
                    <NavLink active href="#">Homepage</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Gallery</NavLink>
                </NavItem>
            </Nav>
        </>
    );
}

export default Navbar;
