import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';



function Navbar() {


    return (
        <>
            <Nav className='padding'>
                <NavItem>
                    <NavLink>
                        <Link className="text" to='/'>HOME</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link className="text" to='/Gallery'>GALLERY</Link>
                    </NavLink>
                </NavItem>
            </Nav>
        </>
    );
}

export default Navbar;
