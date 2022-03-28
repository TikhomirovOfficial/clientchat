import React from 'react';
import styles from "./message.module.css"

const Message = ({message, username,  avatarColor}) => {
    return (
        <div className={`${styles.messageItem} d-f gap-10 al-center"`}>
            <div className={styles.avatar} style={{background: avatarColor}}/>
            <div className="flex-column gap-5">
                <h3>{username}</h3>
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    );
};

export default Message;