import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import BadgerBeatsFavoritesContext from '../contexts/BadgerBeatsFavoritesContext'

import crest from '../assets/uw-crest.svg'

const BadgerBeats = (props) => {

    const [favorites, setFavorites] = useState([]);

    return <div>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        alt="Badger Beats Logo"
                        src={crest}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    BadgerBeats
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/songs">Songs</Nav.Link>
                    <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <div style={{margin: "1rem"}}>
            <BadgerBeatsFavoritesContext.Provider value={[favorites, setFavorites]}>
                <Outlet/>
            </BadgerBeatsFavoritesContext.Provider>
        </div>
    </div>
}

export default BadgerBeats;