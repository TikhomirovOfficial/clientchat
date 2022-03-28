import React, {useEffect, useRef, useState} from 'react';
import styles from './chatroom.module.css'
import Message from "../../components/Message";
import {api} from "../../http/api";
import {socket} from "../../App";

let timeout;
let timeoutConnected;

const uData = JSON.parse(localStorage.getItem("userData"))

const ChatRoom = () => {
    const [messages, setMessages] = useState([])
    const [messageField, setMessageField] = useState("")
    const [feedback, setFeedback] = useState([])
    const [connectedUser, setConnectedUser] = useState("")

    const chatBlockRef = useRef()
    const bottomRef = useRef()

    const scrollToBottom = () => {
        bottomRef.current.scrollIntoView();
    };

    const sendMessage = () => {
        if(messageField.length) {
            api.post("/messages", {
                name: uData.name,
                message: messageField,
                avatarColor: uData.color
            })
            setMessageField("")
        }
    }

    const getMessages = () => {
        api.get("/messages")
            .then((res) => {
               if(res.data) {
                   setMessages(res.data)
                   scrollToBottom()
               }

        })
    }

    const timeoutFun = () => {
        socket.emit("typing", [false, uData.name, uData.uuid])
    }

    const messageListen = (e) => {
        setMessageField(e.target.value)
        socket.emit("typing", [true, uData.name, uData.uuid])
        clearTimeout(timeout)
        timeout = setTimeout(timeoutFun, 2500)
    }

    useEffect(() => {
        const maxScrollHeight = chatBlockRef.current.scrollHeight - chatBlockRef.current.clientHeight
        const scrollPosition = chatBlockRef.current.scrollTop
        const positionDiff = maxScrollHeight - scrollPosition

        //if position scroll above 2 messages then not scroll to now messages
        if (positionDiff <= 270) {
            scrollToBottom()
        }
    }, [messages])

    useEffect(() => {
        getMessages()
        socket.on('join', (name) => {
            setConnectedUser(name)
            clearTimeout(timeoutConnected)
            timeoutConnected = setTimeout(() => {
                setConnectedUser("")
            }, 3000)
        })

        socket.on('message', ({name, message, avatarColor}) => {
            setMessages(prevState => [...prevState, {name, message, avatarColor}])
        })

        socket.on('typing', (data) => {
            if(data) {
                const names = []
                data.map((item) => {
                    if(item.uid !== uData.uuid) {
                        names.push(item.name)
                    }
                })
                setFeedback(names)
            } else {
                setFeedback([])
            }
        })

        socket.on('connect_error', ()=>{
            setTimeout(()=>socket.connect(),5000)
        })
    }, [])

    //RECEIVE NAMES OF USERS ARE TYPING NOW
    const getNamesTyping = (array) => {
        if(array.length == 2) {
            return array.join(" and ")
        }
        return [array[0], array[1]].join(", ") + ` and ${array.length - 2} oth.`
    }
    return (
        <div className={`${styles.chatWrapper} flex-column`}>
            <div className={`${styles.chatHeader} flex-column txt-center`}>
                <p>Какая-то беседа</p>
                <div className="p-rel">
                    <div className={`${styles.joinedAlert} f-center-row`}>
                        <div className={`${styles.joinedAlertBlock} ${connectedUser ? styles.isJoined : ""}`}>{connectedUser || ""} connected</div>
                    </div>
                </div>
            </div>
            <div className={styles.chatBlock} ref={chatBlockRef}>
                {
                    messages.map((message, index) => (
                        <Message key={index} message={message.message} avatarColor={message.avatarColor} username={message.name}/>
                    ))
                }
                {
                    feedback.length ?
                            <p style={{color: "grey"}}>
                                {
                                    feedback.length === 1 ?
                                        `${feedback} is typing` :
                                        `${getNamesTyping(feedback)} are typing`
                                }
                            </p>:
                    null
                }
                <div ref={bottomRef} className="bottomMessages"></div>

            </div>
            <div className={styles.chatForm}>
                <input onKeyUp={(e) => {if (e.code === "Enter") sendMessage()}}
                       value={messageField} onChange={event => messageListen(event)} type="text" placeholder="Напишите сообщение"/>
                <button onClick={sendMessage}>Отправить</button>
            </div>
        </div>
    );
};

export default ChatRoom;