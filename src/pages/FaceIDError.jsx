import React from 'react';
import { Center, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import { IoCloseSharp } from "react-icons/io5";
import BodyComponent from '../components/BodyComponent';

function FaceIDError(props) {
    return (
        <BodyComponent headerAlign='right' bg='rgba(40, 37, 37, 0.3)'>
            <Center h='90%' w='100%'>
                <VStack 
                    bg='#FBFCFA' 
                    w='463px' h='477px' 
                    borderRadius='11px' 
                    display='flex' 
                    justifyContent='center'
                    alignItems='center'
                    gap='30px'
                >
                    <Flex w='122px' h='122px' bg='#E43535' borderRadius='200px' justifyContent='center' alignItems='center'>
                        <Center w='35px' h='35px' bg='#FBFCFA' borderRadius='60px'>
                            <Icon fontSize='22px' color='red'>
                                <IoCloseSharp/>
                            </Icon>
                        </Center>
                    </Flex>
                    <Text
                        w='292px' h='108px'
                        fontWeight='600' fontSize='32px'
                        lineHeight='36px'
                        textAlign='center'
                    >
                        Iconsistencies in your identity Detected
                    </Text>
                </VStack>
            </Center>
        </BodyComponent>
    );
}

export default FaceIDError;