import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function BodyComponent({header, headerAlign='left', bg='#FBFAFC',children}) {
    return (
        <Box h='100vh' w='100vw' bg={bg} padding='20px'>
            <Text fontWeight='700' fontSize='32px' textAlign={headerAlign}>
                {header}
            </Text>
            {children}
        </Box>
    );
}

export default BodyComponent;