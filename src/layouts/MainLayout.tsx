import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Flex, 
  Heading, 
  IconButton, 
  Text,
  VStack,
  HStack
} from '@chakra-ui/react';
import { 
  FiBook, 
  FiMapPin, 
  FiMap, 
  FiUsers,
  FiMenu
} from 'react-icons/fi';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navigationItems = [
    { path: '/diary', label: '건강 다이어리', icon: <FiBook size={20} /> },
    { path: '/walk', label: '산책', icon: <FiMapPin size={20} /> },
    { path: '/facilities', label: '주변 시설', icon: <FiMap size={20} /> },
    { path: '/community', label: '놀이터', icon: <FiUsers size={20} /> },
  ];

  const getPageTitle = () => {
    const currentItem = navigationItems.find(item => item.path === location.pathname);
    if (currentItem) return currentItem.label;
    if (location.pathname === '/') return '건강 다이어리';
    return '페이지를 찾을 수 없습니다';
  };

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Flex
        as="header"
        align="center"
        justify="space-between"
        p={4}
        bg="white"
        boxShadow="sm"
      >
        <HStack>
          <IconButton
            aria-label="Menu"
            icon={<FiMenu />}
            variant="ghost"
            display={{ base: 'flex', md: 'none' }}
          />
          <Heading size="md" color="brand.500">댕댕케어</Heading>
        </HStack>
        <Text fontWeight="bold">{getPageTitle()}</Text>
        <Box w="40px" /> {/* Spacer */}
      </Flex>

      {/* Main Content */}
      <Box p={4} maxW="1200px" mx="auto">
        <Outlet />
      </Box>

      {/* Bottom Navigation */}
      <Flex
        as="nav"
        position="fixed"
        bottom={0}
        w="100%"
        bg="white"
        boxShadow="0 -2px 10px rgba(0,0,0,0.05)"
        justify="space-around"
        py={2}
        zIndex={100}
      >
        {navigationItems.map((item) => (
          <VStack 
            key={item.path}
            spacing={1}
            cursor="pointer"
            onClick={() => navigate(item.path)}
            color={location.pathname === item.path || (item.path === '/diary' && location.pathname === '/') 
              ? 'brand.500' 
              : 'gray.500'
            }
            fontWeight={location.pathname === item.path || (item.path === '/diary' && location.pathname === '/') 
              ? 'bold' 
              : 'normal'
            }
          >
            {item.icon}
            <Text fontSize="xs">{item.label}</Text>
          </VStack>
        ))}
      </Flex>
    </Box>
  );
};

export default MainLayout;