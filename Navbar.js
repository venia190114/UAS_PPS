import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import { Navbar as BSNavbar, Nav } from 'react-bootstrap';  // Import Bootstrap Navbar components

function Navbar() {
    return (
        <BSNavbar bg="dark" variant="dark" expand="lg">
            <BSNavbar.Brand href="/">GreenBite</BSNavbar.Brand>
            <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BSNavbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Dashboard</Nav.Link>
                    <Nav.Link href="/menu">Daftar menu</Nav.Link>
                    <Nav.Link href="/cart">Cart</Nav.Link>
                    <Nav.Link href="/orderdetail/1">Status Pesanan</Nav.Link>
                </Nav>
            </BSNavbar.Collapse>
        </BSNavbar>
    );
}

export default Navbar;
