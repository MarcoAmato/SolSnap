import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';



function Navbar() {


    return (
        <>
            <Nav>
                <NavItem>
                    <NavLink>
                        <Link to='/'>Home</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to='/Gallery'>Gallery</Link>
                    </NavLink>
                </NavItem>
            </Nav>
        </>
    );
}

export default Navbar;
