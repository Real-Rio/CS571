import { useCallback } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

import crest from '../assets/bucky.png'


const Home = (props) => {

    const navigate = useNavigate();

    const gotoSongs = useCallback(() => {
        navigate("/songs")
    }, [navigate]);

    return <Container>
        <Row>
            <Col xs={12} sm={6} md={4}>
                <img width="100%" height="auto" src={crest} alt="Bucky-the-copyright-free Badger looking longingly at the description of Badger Beats"/>
            </Col>
            <Col xs={12} sm={6} md={8}>
                { /* Text Generated using https://chat.openai.com/chat */}
                <h1>Welcome to Badger Beats!</h1>
                <p>Our online music store is based out of Madison, Wisconsin! We are thrilled to offer you a wide selection of music from various genres and artists to meet your listening needs.</p>
                <p>Our store is committed to providing our customers with the highest quality music products and exceptional customer service. Whether you're a fan of rock, pop, country, classical, or any other genre, we've got you covered. Our selection of vinyl, CDs, and digital downloads is constantly updated to ensure that you can find the latest releases, as well as timeless classics.</p>
                <p>We are proud to be a part of the vibrant music community in Madison, a city known for its thriving music scene. As music lovers ourselves, we are dedicated to promoting and supporting local artists and musicians, and we work hard to bring their music to a wider audience.</p>
                <p>Thank you for choosing our online music store. We hope you enjoy shopping with us and finding your next favorite album. If you have any questions or need assistance, our friendly and knowledgeable staff are always here to help. Happy listening!</p>
                <Button onClick={gotoSongs}>Get Started Now!</Button>
            </Col>
        </Row>
    </Container>
}

export default Home;