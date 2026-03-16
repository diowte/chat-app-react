import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import Message from "./Message";
import Sidebar from "./Sidebar";

function Chat({ username, room, setConnected, setRoom }) {
    const socket = useSocket();

    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleReceiveMessage = (messageData) => {
            setMessages((prev) => [...prev, messageData]);

            if (
                messageData.author !== username &&
                !messageData.system &&
                messageData.id
            ) {
                socket.emit("message_seen", {
                    messageId: messageData.id,
                    room,
                    viewer: username,
                });
            }
        };

        const handleRoomUsers = (updatedUsers) => {
            setUsers(updatedUsers);
        };

        const handleMessageSeen = ({ messageId }) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === messageId ? { ...msg, seen: true } : msg
                )
            );
        };

        socket.on("receive_message", handleReceiveMessage);
        socket.on("room_users", handleRoomUsers);
        socket.on("message_seen", handleMessageSeen);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
            socket.off("room_users", handleRoomUsers);
            socket.off("message_seen", handleMessageSeen);
        };
    }, [socket, username, room]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!currentMessage.trim()) return;

        const messageData = {
            id: Date.now().toString() + Math.random().toString(36).slice(2),
            room,
            author: username,
            message: currentMessage.trim(),
            time: new Date().toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            seen: false,
        };

        socket.emit("send_message", messageData);
        setCurrentMessage("");
    };

    const leaveRoom = () => {
        socket.emit("leave_room", { username, room });
        setConnected(false);
        setRoom("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="chatWrapper">
            <Sidebar
                users={users}
                room={room}
                show={showSidebar}
                onClose={() => setShowSidebar(false)}
            />

            <div className="chatMain">
                <div className="chatHeader">
                    <button
                        className="sidebarToggle"
                        onClick={() => setShowSidebar(!showSidebar)}
                        title="Voir les participants"
                    >
                        <span></span><span></span><span></span>
                    </button>

                    <div className="chatHeaderInfo">
                        <div className="chatHeaderAvatar">
                            {room.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3>#{room}</h3>
                            <p>{users.length} participant{users.length > 1 ? "s" : ""}</p>
                        </div>
                    </div>

                    <button className="leaveBtn" onClick={leaveRoom}>
                        Quitter la salle
                    </button>
                </div>

                <div className="messagesArea">
                    {messages.length === 0 && (
                        <div className="emptyChat">
                            <p>Aucun message pour l'instant.<br />Soyez le premier à écrire ! 👋</p>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <Message key={msg.id || index} msg={msg} username={username} />
                    ))}

                    <div ref={messagesEndRef} />
                </div>

                <div className="inputArea">
                    <input
                        type="text"
                        placeholder="Écrire un message..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        maxLength={500}
                    />
                    <button
                        className="sendBtn"
                        onClick={sendMessage}
                        disabled={!currentMessage.trim()}
                        title="Envoyer"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;