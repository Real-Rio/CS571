import { Card, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const Song = (props) => {
    return <Col xs={12} sm={6} md={4} xl={2}><Card >
        <Card.Img variant="top" src={props.song.img} />
        <Card.Body>
            <Card.Title>{props.song.title}</Card.Title>
            <Card.Subtitle>{props.song.artist}</Card.Subtitle>
            <Card.Text>
                {props.song.genre} | {props.song.year} | {props.song.length}
            </Card.Text>
        </Card.Body>
        <Button variant={props.song.isFav ? "danger" : "primary"} onClick={props.song.isFav?()=>{
            props.altFavState(props.song.id);
            props.delFavSong(props.song)
        }:() => {
            props.altFavState(props.song.id);
            props.addFavSong(props.song)
        }}>{props.song.isFav?"Remove from Favorites":"Add to Favorites"}</Button>
    </Card></Col>
}

export default Song;