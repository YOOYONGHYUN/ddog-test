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
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Image,
  useToast,
} from '@chakra-ui/react';
import { FiPlay, FiPause, FiMapPin, FiClock, FiActivity, FiSun } from 'react-icons/fi';
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

// Custom marker icons
const dogIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const personIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface WalkRecord {
  id: string;
  date: string;
  duration: number; // 분 단위
  distance: number; // km 단위
  path: [number, number][]; // [lat, lng]
}

const defaultLocation: [number, number] = [37.5665, 126.9780]; // 서울

const LocationMarker: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();
  
  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return position === null ? null : (
    <>
      <Marker position={position} icon={personIcon}>
        <Popup>당신의 현재 위치</Popup>
      </Marker>
      <Marker position={[position[0] + 0.0005, position[1] + 0.0003]} icon={dogIcon}>
        <Popup>멍멍이</Popup>
      </Marker>
    </>
  );
};

const WalkPage: React.FC = () => {
  const [isWalking, setIsWalking] = useState(false);
  const [walkTime, setWalkTime] = useState(0); // seconds
  const [walkRecords, setWalkRecords] = useState<WalkRecord[]>([
    {
      id: '1',
      date: '2023-04-03',
      duration: 30,
      distance: 1.5,
      path: [[37.5665, 126.9780], [37.5675, 126.9790], [37.5685, 126.9800]],
    },
    {
      id: '2',
      date: '2023-04-02',
      duration: 25,
      distance: 1.2,
      path: [[37.5665, 126.9780], [37.5655, 126.9770], [37.5645, 126.9760]],
    },
  ]);
  
  const toast = useToast();

  const formattedTime = () => {
    const minutes = Math.floor(walkTime / 60);
    const seconds = walkTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleWalk = () => {
    if (isWalking) {
      // 산책 종료 로직
      const newRecord: WalkRecord = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        duration: Math.floor(walkTime / 60),
        distance: +(Math.random() * 2).toFixed(1), // 임시 랜덤 데이터
        path: [[37.5665, 126.9780], [37.5675, 126.9790]], // 임시 경로 데이터
      };
      setWalkRecords([newRecord, ...walkRecords]);
      
      toast({
        title: '산책 기록이 저장되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setWalkTime(0);
    }
    setIsWalking(!isWalking);
  };
  
  // 산책 타이머 로직
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWalking) {
      interval = setInterval(() => {
        setWalkTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWalking]);

  // 오늘의 목표 산책량 계산 (30분)
  const walkGoal = 30;
  const walkProgress = Math.min((walkTime / 60 / walkGoal) * 100, 100);

  // 날씨 정보 (실제로는 API 연동 필요)
  const weatherInfo = {
    temp: '22°C',
    condition: '맑음',
    icon: FiSun,
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* 산책 현황 */}
      <Card>
        <CardBody>
          <VStack spacing={4}>
            <Flex w="full" justify="space-between" align="center">
              <Heading size="md">오늘의 산책</Heading>
              <HStack>
                <Icon as={weatherInfo.icon} color="orange.400" />
                <Text>{weatherInfo.temp}</Text>
                <Badge colorScheme="green">{weatherInfo.condition}</Badge>
              </HStack>
            </Flex>
            
            <HStack w="full" justify="space-between">
              <VStack align="flex-start">
                <Text fontSize="sm" color="gray.500">진행 시간</Text>
                <Text fontSize="2xl" fontWeight="bold">{formattedTime()}</Text>
              </VStack>
              <Button
                size="lg"
                colorScheme={isWalking ? "red" : "brand"}
                leftIcon={isWalking ? <FiPause /> : <FiPlay />}
                onClick={toggleWalk}
                borderRadius="full"
              >
                {isWalking ? "산책 종료" : "산책 시작"}
              </Button>
            </HStack>
            
            <Box w="full">
              <Text mb={1} fontSize="sm">일일 목표 ({walkGoal}분)</Text>
              <Progress value={walkProgress} colorScheme="brand" borderRadius="full" />
            </Box>
          </VStack>
        </CardBody>
      </Card>

      {/* 지도 */}
      <Card>
        <CardBody>
          <Heading size="md" mb={4}>실시간 위치</Heading>
          <Box borderRadius="lg" overflow="hidden" height="400px">
            <MapContainer 
              center={defaultLocation} 
              zoom={16} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
          </Box>
          
          {isWalking && (
            <Flex justify="center" mt={4}>
              <Badge 
                colorScheme="green" 
                p={2} 
                borderRadius="full" 
                fontSize="md"
                className="dog-character"
              >
                🐕 산책중... 🐾
              </Badge>
            </Flex>
          )}
        </CardBody>
      </Card>

      {/* 산책 통계 */}
      <Card>
        <CardBody>
          <Heading size="md" mb={4}>이번 주 산책 통계</Heading>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <Stat>
              <StatLabel>총 산책 횟수</StatLabel>
              <StatNumber>5회</StatNumber>
              <StatHelpText>주 평균 4회</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>총 산책 거리</StatLabel>
              <StatNumber>7.2km</StatNumber>
              <StatHelpText>주 평균 6km</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>총 산책 시간</StatLabel>
              <StatNumber>145분</StatNumber>
              <StatHelpText>주 평균 120분</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>평균 속도</StatLabel>
              <StatNumber>3km/h</StatNumber>
              <StatHelpText>평상시 3.2km/h</StatHelpText>
            </Stat>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* 최근 산책 기록 */}
      <Box>
        <Heading size="md" mb={4}>최근 산책 기록</Heading>
        <VStack spacing={4} align="stretch">
          {walkRecords.map(record => (
            <Card key={record.id} variant="outline">
              <CardBody>
                <Flex justify="space-between" align="center">
                  <VStack align="flex-start" spacing={1}>
                    <Text fontWeight="bold">{record.date}</Text>
                    <HStack>
                      <HStack>
                        <Icon as={FiClock} />
                        <Text>{record.duration}분</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiMapPin} />
                        <Text>{record.distance}km</Text>
                      </HStack>
                    </HStack>
                  </VStack>
                  <Button size="sm" colorScheme="gray">자세히</Button>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default WalkPage;