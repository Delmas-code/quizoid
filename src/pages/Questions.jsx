import React, { useEffect } from 'react';
import { Box, Input, Text } from '@chakra-ui/react';
import axios from 'axios';

const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false, // WARNING: This disables SSL validation
});

function Questions() {
    function base64ToBlob(base64) {
        const byteString = atob(base64.split(',')[1]);
        const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    const takeSnapshot = async () => {
        try {
            const BASE_URL = import.meta.env.VITE_REACT_BASE_URL;
            const user = localStorage.getItem("uname");
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            await new Promise((resolve) => {
                video.onloadedmetadata = () => resolve();
            });

            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0);

            stream.getTracks().forEach((track) => track.stop());

            const snapshot = canvas.toDataURL('image/jpeg');

            const formData = new FormData();
            formData.append('username', user);
            const blobImage = base64ToBlob(snapshot);
            formData.append('image', blobImage);

            const response = await axios({
                method: 'post',
                maxBodyLength: Infinity,
                url: `${BASE_URL}/identify/`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.identified === false) {
                window.location.href = '/faceIDError';
            }
        } catch (error) {
            console.error('Error capturing or submitting snapshot:', error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("ABOUT TO TAKE SNAP")
            takeSnapshot();
        }, 60000); //180000

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box h="100vh" w="100vw" p={4} overflowY="scroll">
            <Text fontSize="xl" fontWeight="bold" mb={4}>Quiz Time!</Text>
            <Box mb={6}>
                <Text mb={2}>1. Are you a boy?</Text>
                <Input placeholder="Enter your answer here" />
            </Box>
            <Box mb={6}>
                <Text mb={2}>2. Do you like coding?</Text>
                <Input placeholder="Enter your answer here" />
            </Box>
            <Box mb={6}>
                <Text mb={2}>3. Do you enjoy problem-solving?</Text>
                <Input placeholder="Enter your answer here" />
            </Box>
        </Box>
    );
}

export default Questions;
