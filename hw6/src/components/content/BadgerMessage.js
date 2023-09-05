import React from "react"
import Button from "react-bootstrap/esm/Button";

function BadgerMessage(props) {

    const dt = new Date(props.created);

    return <>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/><br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {props.poster === props.curuser && <Button variant="danger" onClick={(e)=>props.handleDelete(props.id,e)}>Delete</Button>}
    </>
}

export default BadgerMessage;