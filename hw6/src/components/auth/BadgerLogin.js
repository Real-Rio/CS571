import React, { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../context/LoginContext';

export default function BadgerLogin() {
    const username = useRef();
    const password = useRef();

    const [islogin, setIslogin] = useContext(LoginContext);
    const navigate = useNavigate();

    // TODO Create the login component.
    const handleSubmit= (e)=>{
        e.preventDefault();
        if(username.current.value === "" || password.current.value === ""){
            alert("please fill in all fields");
            return;
        }

        fetch("https://www.cs571.org/s23/hw6/api/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        }).then(handleResponse)
        .then(data => {
            // alert(data.msg)
            setIslogin(true);
            navigate("/");
        })
        .catch(err => {
            alert(err);
        })

    }

    function handleResponse(res){
        return res.json().then(json => {
            if(res.ok){
                return json;
            }else{
                return Promise.reject(json.msg);
            }
        })
    }

    return <>
        <h1>Login</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>username</Form.Label>
                <Form.Control type="username" placeholder="Enter username"  ref={username}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"  ref={password}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    </>
}