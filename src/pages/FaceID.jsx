import React, { useEffect, useRef, useState } from 'react';
import { Center, Text, VStack, Spinner, Box } from '@chakra-ui/react';
import BodyComponent from '../components/BodyComponent';
import DashedProgressCircle from '../components/DashedProgressCircle';
import {toaster, Toaster} from '../components/ui/toaster';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function FaceID() {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false)
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totImages, setTotImages] = useState(0); // Progress state

    const user = localStorage.getItem("uname");
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

    const handleSubmit = async () => {
        const BASE_URL = import.meta.env.VITE_REACT_BASE_URL;
        try {
            if (images.length >= 10) {
                setLoading(true);
    
                // Create FormData
                // const formData = new FormData();
                // formData.append('username', user);
                // images.forEach((image, index) => {
                //     formData.append(`images[${index}]`, image);
                // });

                const formData = new FormData();
                formData.append('username', user);
                images.forEach((image) => {
                    const blobImage = base64ToBlob(image);
                    formData.append('images', blobImage); // Use the same key for all images
                });
                
                setIsProcessing(true);
                // Send request to endpoint
                const response = await axios({
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${BASE_URL}/store_snapshots/`,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Check if response was successful
                if (response.status === 200) {
                    const result = response.data;
                    console.log(`RESULT: ${result}`);
                    
                    // Store user data and navigate to the next page   
                    localStorage.setItem("uname", user);
                    navigate('/quest');
                } else {
                    // Handle unsuccessful response (e.g., status not 200)
                    throw new Error(`Unexpected response status: ${response.status}`);
                    
                }
            } else {
                toaster.create({
                    title: "Error",
                    type: 'error',
                    description: "You need to upload at least 10 images to submit.",
                    action: {
                        label: 'Close',
                        onClick: () => toaster.dismiss()
                    }
                });
            }
        } catch (error) {
            console.error('Error posting partner', error);
            toaster.create({
                title: "Error",
                type: 'error',
                description: `An error occurred: ${error.message || error}`,
                action: {
                    label: 'Close',
                    onClick: () => toaster.dismiss()
                }
            });
        } finally {
            setLoading(false);
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        const toastId = toaster.create({
            title: 'Info',
            description: 'Please position yourself for pictures in 4 secs',
            type: 'loading',
            action: {
                label: 'Close',
                onClick: () => toaster.dismiss(toastId)
            }
        });

        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;
            } catch (err) {
                alert('Error accessing the camera: ' + err.message);
            }
        }

        function captureSnapshot() {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0);
            return canvas.toDataURL('image/jpeg');
        }

        const startSnapshotSequence = async () => {
            const totalSnapshots = 10;
            let currentProgress = 0;

            if (!video.srcObject) {
                await startCamera();
            }

            const interval = setInterval(() => {
                if (currentProgress < totalSnapshots) {
                    const snapshot = captureSnapshot();

                    // Update the `images` state and progress
                    setImages((prevImages) => {
                        const updatedImages = [...prevImages, snapshot];
                        setTotImages((updatedImages.length / totalSnapshots) * 1000);
                        return updatedImages;
                    });

                    currentProgress++;
                } else {
                    clearInterval(interval);
                    setLoading(false);
                }
            }, 1000);
        };

        // Automatically close after 3000ms
        setTimeout(() => {
            toaster.dismiss(toastId);
            startSnapshotSequence();
        }, 3000);

        startCamera();
    }, []); // Run once when component mounts

    // Trigger handleSubmit only when images length reaches 10 or more
    useEffect(() => {
        if (images.length >= 10) {
            handleSubmit();
        }
    }, [images]); // Dependency array includes images

    const current = images.length;

    return (
        <BodyComponent header='Setup'>
            <Box>
                {/* <button onClick={handleSubmit}>Submit</button> */}
                {isProcessing && (
                    <Box
                        position="fixed"
                        top="0"
                        left="0"
                        width="100vw"
                        height="100vh"
                        bg="rgba(0, 0, 0, 0.5)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        zIndex="1000"
                    >
                        <Box bg="white" p={6} borderRadius="md" shadow="lg" textAlign="center">
                            <Spinner size="xl" />
                            <Text mt={4} fontSize="lg">
                                Processing, please wait...
                            </Text>
                        </Box>
                    </Box>
                )}
            </Box>

            <Center h='90%' w='100%'>
                <VStack>
                    <DashedProgressCircle 
                        // progress={totImages}
                        progress={images.length} 
                        strokeWidth={12} 
                        imageSrc={images[current - 1]} 
                        loading={loading}
                    />
                    <Text mt={10} fontWeight='700' fontSize='32px' textAlign='center'>
                        {images.length} / 10
                    </Text>
                </VStack>
            </Center>
            <Toaster />
        </BodyComponent>
    );
}


export default FaceID;