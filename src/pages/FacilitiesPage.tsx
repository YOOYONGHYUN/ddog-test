import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  Heading,
  Flex,
  Badge,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Divider,
  Tag,
  TagLabel,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import { FiSearch, FiMapPin, FiPhone, FiClock, FiStar, FiHeart } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Facility {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  rating: number;
  image: string;
  distance: number;
  position: [number, number];
  hours: string;
  isFavorite: boolean;
}

const defaultLocation: [number, number] = [37.5665, 126.9780]; // 서울

const categoryIcons: Record<string, string> = {
  '동물병원': '🏥',
  '애견미용': '✂️',
  '애견카페': '☕',
  '사료샵': '🛒',
  '애견호텔': '🏨',
};

const LocationMarker: React.FC<{ facilities: Facility[] }> = ({ facilities }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();
  
  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return (
    <>
      {position !== null && (
        <Marker position={position}>
          <Popup>현재 위치</Popup>
        </Marker>
      )}
      
      {facilities.map(facility => (
        <Marker key={facility.id} position={facility.position}>
          <Popup>
            <b>{facility.name}</b><br />
            {facility.category}<br />
            {facility.phone}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const FacilitiesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([
    {
      id: '1',
      name: '24시 댕댕 동물병원',
      category: '동물병원',
      address: '서울시 강남구 역삼동 123-45',
      phone: '02-123-4567',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7',
      distance: 0.8,
      position: [37.5660, 126.9784],
      hours: '24시간 영업',
      isFavorite: true,
    },
    {
      id: '2',
      name: '멍멍이 미용실',
      category: '애견미용',
      address: '서울시 강남구 역삼동 234-56',
      phone: '02-234-5678',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7',
      distance: 1.2,
      position: [37.5670, 126.9770],
      hours: '평일 10:00 - 20:00',
      isFavorite: false,
    },
    {
      id: '3',
      name: '댕댕이 카페',
      category: '애견카페',
      address: '서울시 강남구 역삼동 345-67',
      phone: '02-345-6789',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1559564099-5555fbccd2f1',
      distance: 0.5,
      position: [37.5675, 126.9790],
      hours: '매일 11:00 - 22:00',
      isFavorite: true,
    },
    {
      id: '4',
      name: '최고급 사료 샵',
      category: '사료샵',
      address: '서울시 강남구 역삼동 456-78',
      phone: '02-456-7890',
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee',
      distance: 1.5,
      position: [37.5655, 126.9775],
      hours: '평일 9:00 - 18:00',
      isFavorite: false,
    },
  ]);
  
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const categories = Array.from(new Set(facilities.map(f => f.category)));
  
  const filteredFacilities = facilities.filter(facility => {
    const matchesCategory = activeCategory ? facility.category === activeCategory : true;
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFacilityClick = (facility: Facility) => {
    setSelectedFacility(facility);
    onOpen();
  };

  const toggleFavorite = (id: string) => {
    setFacilities(facilities.map(f => 
      f.id === id ? { ...f, isFavorite: !f.isFavorite } : f
    ));
    
    toast({
      title: "즐겨찾기가 업데이트되었습니다.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* 검색 및 필터 */}
      <Card>
        <CardBody>
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.400" />
              </InputLeftElement>
              <Input 
                placeholder="시설 검색" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            
            <HStack spacing={2} overflowX="auto" py={2} w="full">
              <Button 
                size="sm" 
                variant={activeCategory === null ? "solid" : "outline"} 
                colorScheme="brand"
                onClick={() => setActiveCategory(null)}
              >
                전체
              </Button>
              {categories.map(category => (
                <Button 
                  key={category}
                  size="sm" 
                  variant={activeCategory === category ? "solid" : "outline"} 
                  colorScheme="brand"
                  onClick={() => setActiveCategory(category)}
                  leftIcon={<Text>{categoryIcons[category] || '🏠'}</Text>}
                >
                  {category}
                </Button>
              ))}
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* 지도 및 시설 목록 */}
      <Tabs colorScheme="brand" variant="enclosed">
        <TabList>
          <Tab>지도</Tab>
          <Tab>목록</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel px={0}>
            <Box borderRadius="lg" overflow="hidden" height="400px">
              <MapContainer 
                center={defaultLocation} 
                zoom={15} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker facilities={filteredFacilities} />
              </MapContainer>
            </Box>
          </TabPanel>
          
          <TabPanel px={0}>
            <VStack spacing={4} align="stretch">
              {filteredFacilities.length === 0 ? (
                <Text textAlign="center" py={8} color="gray.500">
                  검색 결과가 없습니다.
                </Text>
              ) : (
                filteredFacilities.map(facility => (
                  <Card 
                    key={facility.id} 
                    variant="outline" 
                    cursor="pointer" 
                    onClick={() => handleFacilityClick(facility)}
                    _hover={{ shadow: 'md' }}
                  >
                    <CardBody>
                      <Flex>
                        <Avatar 
                          src={facility.image} 
                          size="lg" 
                          borderRadius="md" 
                          mr={4} 
                          name={facility.name} 
                        />
                        <Box flex={1}>
                          <Flex justify="space-between" align="center">
                            <Heading size="sm" noOfLines={1}>{facility.name}</Heading>
                            <HStack>
                              <Icon as={FiStar} color="yellow.400" />
                              <Text fontSize="sm" fontWeight="bold">{facility.rating}</Text>
                            </HStack>
                          </Flex>
                          <Badge colorScheme="purple" my={1}>{facility.category}</Badge>
                          <Text fontSize="xs" color="gray.500" noOfLines={1}>{facility.address}</Text>
                          <Text fontSize="xs" color="gray.500">{facility.phone}</Text>
                          <HStack mt={2}>
                            <Icon as={FiMapPin} color="gray.500" />
                            <Text fontSize="xs">{facility.distance}km</Text>
                          </HStack>
                        </Box>
                      </Flex>
                    </CardBody>
                  </Card>
                ))
              )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* 시설 상세 모달 */}
      {selectedFacility && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedFacility.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box
                bgImage={`url(${selectedFacility.image})`}
                bgSize="cover"
                bgPosition="center"
                height="200px"
                borderRadius="md"
                mb={4}
              />
              
              <Flex justify="space-between" align="center" mb={4}>
                <Badge colorScheme="purple" p={2}>{selectedFacility.category}</Badge>
                <HStack>
                  <Icon as={FiStar} color="yellow.400" />
                  <Text fontWeight="bold">{selectedFacility.rating}</Text>
                </HStack>
              </Flex>
              
              <VStack align="stretch" spacing={3} mb={4}>
                <HStack>
                  <Icon as={FiMapPin} color="gray.500" />
                  <Text>{selectedFacility.address}</Text>
                </HStack>
                <HStack>
                  <Icon as={FiPhone} color="gray.500" />
                  <Text>{selectedFacility.phone}</Text>
                </HStack>
                <HStack>
                  <Icon as={FiClock} color="gray.500" />
                  <Text>{selectedFacility.hours}</Text>
                </HStack>
              </VStack>
              
              <Divider my={4} />
              
              <Flex justify="space-between">
                <Button 
                  leftIcon={<Icon as={FiHeart} />}
                  colorScheme={selectedFacility.isFavorite ? "red" : "gray"}
                  variant="outline"
                  onClick={() => toggleFavorite(selectedFacility.id)}
                >
                  {selectedFacility.isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                </Button>
                <Button colorScheme="brand">예약 문의</Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </VStack>
  );
};

export default FacilitiesPage;