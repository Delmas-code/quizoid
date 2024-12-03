import { useEffect, useState } from "react";

export const WebSocketComponentt = ({username}) => {
    const [connectionStatus, setConnectionStatus] = useState('Connecting...');

    useEffect(() => {
        const socket = new WebSocket("wss://quiz-recognition.onrender.com/ws/identify/");
        
        socket.onopen = () => {
            console.log('Web socket connected');
            const payload = {
                type: "identification",
                username: username,
            };
            socket.send(JSON.stringify(payload));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Message received.", data);

            if(data.type === "used") {
                setConnectionStatus("You are already connected.");
            } else if(data.type === "error") {
                setConnectionStatus(`Error: ${data.message}`)
            } else if(data.type === 'confirmation') {
                setConnectionStatus("Connected successfully!")
            }
        }

        socket.onclose = () => {
            console.log("WebSocket disconnected");
            setConnectionStatus("Connection closed.");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            setConnectionStatus("A connection error occurred.");
        };

        return () => {
            socket.close();
        };
    }, [username])

    return {connectionStatus}
}