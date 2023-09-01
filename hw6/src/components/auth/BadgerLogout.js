import React, { useEffect,useContext } from 'react';
import LoginContext from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';

export default function BadgerLogout() {
    const [islogin, setIslogin] = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d"
            },
        }).then(res => res.json()).then(json => {
            // Maybe you need to do something here?
            setIslogin(false);
            navigate("/");
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}