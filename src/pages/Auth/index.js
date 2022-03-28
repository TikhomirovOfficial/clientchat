import React, {useState} from 'react';
import Wrapper from "../../components/Wrapper";
import styles from "./auth.module.css"
import {socket} from "../../App";

const colors = [
    'green',
    'yellow',
    'red',
    'orange',
    'gray',
    'black',
    'blue'
]

const Auth = () => {
    const [userName, setUserName] = useState('')

    const auth = () => {
        localStorage.setItem("userData", JSON.stringify({
            name: userName,
            uuid: Date.now(),
            color:  colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)]
        }))
        socket.emit('join', userName)
        window.location.reload()
    }

    return (
       <Wrapper>
           <div className={`${styles.auth} flex-column gap-20`}>
               <h1>Вход</h1>
               <input onChange={(e) => setUserName(e.target.value)} placeholder="Введите имя" type="text"/>
               <button onClick={auth}>Войти</button>
           </div>
       </Wrapper>
    );
};

export default Auth;