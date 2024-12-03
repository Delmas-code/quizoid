import { Center, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { TiTick } from "react-icons/ti";
import noImage from '../assets/no-image.jpg';
import Lottie from "lottie-react";
import uploading from '../anims/upload.json';

const CircularVideoDisplay = ({
  size = 349,
}) => {
  

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <video id="video" autoPlay style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        objectFit: "cover",
      }}>

      </video>

      {/* {imageSrc && progress !== 100 && !loading &&(
        <img
          src={progress == 0 ? noImage : imageSrc}
          alt="centered"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: imageSize,
            height: imageSize,
            borderRadius: "50%",
          }}
        />
      )} */}
{/*       
      {loading && (
        <Flex 
            w='200px' h='200px' 
            bg='rgba(0, 210, 97, 1)' 
            borderRadius='200px' 
            justifyContent='center' 
            alignItems='center'
            pos='absolute'
            top='50%' left='50%'
            transform="translate(-50%, -50%)"
        >
            <Center bg='#FBFCFA' borderRadius='60px'>
                <Lottie animationData={uploading} style={{width: '100%', height: '100%'}} />
            </Center>
        </Flex>
      )} */}
    </div>
  );
};

export default CircularVideoDisplay;