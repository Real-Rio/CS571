import React, { useEffect, useState,useContext } from "react"
import BadgerMessage from "./BadgerMessage";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoginContext from "../../context/LoginContext";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [islogin, setIslogin] = useContext(LoginContext);
    const [curuser, setCuruser] = useState("");

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    useEffect(() => {
        fetch("https://cs571.org/s23/hw6/api/whoami", {
                credentials: "include",
                headers: {
                    "X-CS571-ID": "bid_2b48c7a36a98db55355d"
                }
            }).then(res => res.json()).then(json => {
                if(json.user)
                    setCuruser(json.user.username);
            }).catch(err => {
                alert(err);
            })
        }, [islogin]);


    useEffect(() => {
        loadMessages()
    }, [props]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!islogin) {
            alert("please login first");
            return;
        }
        if (title === "" || content === "") {
            alert("please fill in all fields");
            return;
        }
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        }).then(handleResponse).then(data => {
            alert(data.msg);
            loadMessages();
        }).catch(err => {
            alert(err);
        }
        )
    }

    function handleResponse(res) {
        return res.json().then(json => {
            if (res.ok) {
                return json;
            } else {
                return Promise.reject(json.msg);
            }
        })
    }

    const handleDelete = (id,e) => {
        e.preventDefault();
        setMessages(messages.filter(message => message.id !== id));
    }


    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
            <Form>
                <Form.Group className="mb-3" controlId="formPostTitle">
                    <Form.Label>post title</Form.Label>
                    <Form.Control type="title" placeholder="Enter post title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPostContent">
                    <Form.Label>post content</Form.Label>
                    <Form.Control type="content" placeholder="post content" value={content} onChange={(e) => { setContent(e.target.value) }} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        }
        <hr />
        {
            messages.length > 0 ?
                <>
                    {
                        /* TODO: Complete displaying of messages. */
                        messages.map(message => {
                            return <BadgerMessage key={message.id} curuser={curuser} handleDelete={handleDelete} title={message.title} {...message} />

                        })
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}