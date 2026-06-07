"use client"
import Link from "next/link";
import React from "react";
import { Container, Nav, Navbar, NavDropdown, Row, Col } from "react-bootstrap";

const Header = () => {
  return (
    <header>
        <div className="h-2000">
    
            <Navbar expand="lg" variant="dark" bg="dark" className="w-100">
                <Container fluid className="g-0 no-gutters">
                    <Navbar.Brand href="#home" className="ms-3">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"  className="me-3"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="bg-dark text-white px-3 mt-2">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} href="/">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} href="/login">Login</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div> 
    </header>
    );
};

export default Header;