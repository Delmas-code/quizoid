import { Center, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { TiTick } from "react-icons/ti";
import noImage from '../assets/no-image.jpg';
import Lottie from "lottie-react";
import uploading from '../anims/upload.json';

const DashedProgressCircle = ({
  size = 349,
  strokeWidth = 36.18,
  progress = 0,
  completedColor = "rgba(35, 120, 4, 1)",
  remainingColor = "rgba(167, 174, 193, 1)",
  dashCount = 10,
  imageSrc = "",
  imageSize = 280,
  loading
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashLength = circumference / (dashCount * 2);
  const gapLength = dashLength;
  const completedDashes = Math.floor((progress / 100) * dashCount);

  // Generate the dashes with a correct offset for each one based on progress
  const dashes = Array.from({ length: dashCount }, (_, index) => {
    // const isCompleted = index < completedDashes;
    const isCompleted = index <= (progress-1);
    const offset = -index * (dashLength + gapLength);
    return (
      <circle
        key={index}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={isCompleted ? completedColor : remainingColor}
        strokeWidth={strokeWidth}
        strokeDasharray={`${dashLength},${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="none"
        style={{
          transform: `rotate(-90deg)`,
          transformOrigin: "center",
        }}
      />
    );
  });

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* Dashed progress */}
      <svg
        width={size}
        height={size}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: 1, // Ensure this is above the video
        }}
      >
        {dashes}
      </svg>

      {/* Video element */}
      <video
        id="video"
        autoPlay
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "80%",
          height: "80%",
          borderRadius: "50%", // Keeps the circular shape
          objectFit: "cover",
          zIndex: 0, // Ensure this is below the dashed progress
        }}
      ></video>

      {/* Center image */}
      {/* {imageSrc && progress !== 10 && !loading && ( */}
      {imageSrc && progress !== 10 && !loading && (
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
            zIndex: 2, // Above the video and dashed progress
          }}
        />
      )}

      {/* Success state */}
      {progress >= 10 && !loading && (
        <Flex
          w="200px"
          h="200px"
          bg="rgba(0, 210, 97, 1)"
          borderRadius="200px"
          justifyContent="center"
          alignItems="center"
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={3} // Ensure this is above everything else
        >
          <Center w="71.11px" h="71.11px" bg="#FBFCFA" borderRadius="60px">
            <Icon fontSize="59px" color="rgba(0, 210, 97, 1)">
              <TiTick />
            </Icon>
          </Center>
        </Flex>
      )}

      {/* Loading state */}
      {loading && (
        <Flex
          w="200px"
          h="200px"
          bg="rgba(0, 210, 97, 1)"
          borderRadius="200px"
          justifyContent="center"
          alignItems="center"
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={3} // Ensure this is above everything else
        >
          <Center bg="#FBFCFA" borderRadius="60px">
            <Lottie
              animationData={uploading}
              style={{ width: "100%", height: "100%" }}
            />
          </Center>
        </Flex>
      )}
    </div>
  );
};


export default DashedProgressCircle;