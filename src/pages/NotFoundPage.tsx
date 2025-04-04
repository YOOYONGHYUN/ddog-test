import React from 'react';
import { Box, VStack, Heading, Text, Button, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <VStack 
      justify="center" 
      align="center" 
      spacing={6} 
      h="100vh" 
      px={4}
      bg="brand.50"
    >
      <Box 
        className="bounce-animation" 
        animation="bounce 2s infinite"
      >
        <Image 
          src="https://em-content.zobj.net/thumbs/240/apple/325/dog-face_1f436.png" 
          alt="강아지 이모지"
          boxSize="120px"
        />
      </Box>

      <Heading size="xl" color="brand.800">
        404 페이지를 찾을 수 없습니다
      </Heading>

      <Text fontSize="lg" color="gray.600" textAlign="center">
        앗! 찾으시는 페이지가 없어요.
        <br />
        강아지가 물어간 것 같네요 🐕
      </Text>

      <Button 
        colorScheme="brand" 
        size="lg" 
        onClick={() => navigate('/')}
        mt={4}
      >
        홈으로 돌아가기
      </Button>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-30px);
          }
          60% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </VStack>
  );
};

export default NotFoundPage;