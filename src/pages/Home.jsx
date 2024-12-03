import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { toaster, Toaster } from "../components/ui/toaster"
import { Fieldset, Flex, Input, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router';
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false, // WARNING: This disables SSL validation
});

function Home() {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const BASE_URL = import.meta.env.VITE_REACT_BASE_URL;


    const handleAuth = async() => {
        setLoading(true);
        const formData = new FormData();
        formData.append('username', username);

        try {
            const response = await axios({
                method: 'post',
                maxBodyLength: Infinity,
                url: `${BASE_URL}/register/`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            // const response = fetch(`https://18.227.228.192/register/`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            //     body: formData,
            // })
            // .then(response => {
            //     if (!response.ok) {
            //         throw new Error(`HTTP error! status: ${response.status}`);
            //     }
            //     return response.json();
            // })
            // .then(data => {
            //     console.log(`DATA: ${data}`);
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });

            const result = await response.data;
            console.log(`RESULT: ${result}`)
            localStorage.setItem("uname", username);
            setLoading(false);
            navigate('/faceID')
            return result;
        } catch (error) {
            console.error('Error posting partner', error);
            toaster.create({
                title: "Error",
                type: 'error',
                description: `An error ${error}`
            });
            setLoading(false);
        }
    } 

    return (
        <Flex w='100vw' h='100vh' justifyContent='center' alignItems='center'>
            <Fieldset.Root size='lg' maxW='md'>
                <Stack>
                    <Fieldset.Legend>Login</Fieldset.Legend>
                </Stack>
                <Fieldset.Content>
                <Input  
                    name='username' 
                    placeholder='Enter your username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Button loading={loading} onClick={handleAuth}>Continue</Button>
                </Fieldset.Content>
            </Fieldset.Root>
            <Toaster/>
        </Flex>
    );
}

export default Home;