import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';



function Navbar() {


    return (
        <>
            <Nav className='padding'>
                <NavItem>
                    {/* Directly use Link component with className */}
                    <Link className="text nav-link" to='/'>HOME</Link>
                </NavItem>
                <NavItem>
                    {/* Directly use Link component with className */}
                    <Link className="text nav-link" to='/Gallery'>GALLERY</Link>
                </NavItem>
            </Nav>
        </>
    );
}

export default Navbar;
