import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function BadgerRegister() {

    // TODO Create the register component.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [comfirmPassword, setComfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // check input
        if (username === "" || password === "" || comfirmPassword === "") {
            alert("please fill in all fields");
            return;
        }
        if (password !== comfirmPassword) {
            alert("passwords do not match");
            return;
        }
        fetch("https://www.cs571.org/s23/hw6/api/register", {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(handleResponse)
            .then(data => {
                alert(data.msg)
            })
            .catch(err => {
                alert(err);
            })

        function handleResponse(res) {
            return res.json().then(json => {
                if (res.ok) {
                    return json;
                } else {
                    return Promise.reject(json.msg);
                }
            })
        }

    }

    return <>
        <h1>Register</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Comfirm Password</Form.Label>
                <Form.Control type="password" placeholder="Repeat Password" value={comfirmPassword} onChange={(e) => setComfirmPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    </>
}