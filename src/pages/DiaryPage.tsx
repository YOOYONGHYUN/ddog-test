import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  Card,
  CardBody,
  Heading,
  Divider,
  Flex,
  Badge,
  useDisclosure,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { FiPlus, FiCamera, FiCalendar, FiEdit } from 'react-icons/fi';

interface DogProfile {
  name: string;
  breed: string;
  age: string;
  weight: string;
  image: string;
}

interface HealthRecord {
  id: string;
  date: string;
  type: string;
  notes: string;
}

const DiaryPage: React.FC = () => {
  const [dogProfile, setDogProfile] = useState<DogProfile>({
    name: '멍멍이',
    breed: '골든 리트리버',
    age: '3세',
    weight: '25kg',
    image: 'https://images.unsplash.com/photo-1560743173-567a3b5658b1',
  });

  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      date: '2023-04-01',
      type: '예방접종',
      notes: '종합백신 5차 접종 완료',
    },
    {
      id: '2',
      date: '2023-03-15',
      type: '건강검진',
      notes: '체중 증가, 식단 조절 필요',
    },
  ]);

  const { 
    isOpen: isProfileModalOpen, 
    onOpen: onProfileModalOpen, 
    onClose: onProfileModalClose 
  } = useDisclosure();

  const { 
    isOpen: isHealthModalOpen, 
    onOpen: onHealthModalOpen, 
    onClose: onHealthModalClose 
  } = useDisclosure();

  const [newHealthRecord, setNewHealthRecord] = useState<Omit<HealthRecord, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    type: '예방접종',
    notes: '',
  });

  const handleHealthRecordSubmit = () => {
    const newRecord: HealthRecord = {
      ...newHealthRecord,
      id: Date.now().toString(),
    };
    setHealthRecords([newRecord, ...healthRecords]);
    onHealthModalClose();
    setNewHealthRecord({
      date: new Date().toISOString().split('T')[0],
      type: '예방접종',
      notes: '',
    });
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* 반려견 프로필 */}
      <Card>
        <CardBody>
          <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={4}>
            <Box position="relative">
              <Image
                src={dogProfile.image}
                alt={dogProfile.name}
                boxSize="120px"
                objectFit="cover"
                borderRadius="full"
              />
              <IconButton
                icon={<FiEdit />}
                aria-label="Edit profile"
                size="sm"
                colorScheme="blue"
                position="absolute"
                bottom={0}
                right={0}
                borderRadius="full"
                onClick={onProfileModalOpen}
              />
            </Box>
            <VStack align="flex-start" flex={1}>
              <Heading size="md">{dogProfile.name}</Heading>
              <HStack>
                <Badge colorScheme="purple">{dogProfile.breed}</Badge>
                <Badge colorScheme="green">{dogProfile.age}</Badge>
                <Badge colorScheme="blue">{dogProfile.weight}</Badge>
              </HStack>
              <Text color="gray.600" fontSize="sm">
                다음 예방접종: 2023년 7월 1일
              </Text>
            </VStack>
          </Flex>
        </CardBody>
      </Card>

      {/* 건강 기록 */}
      <Box>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md">건강 기록</Heading>
          <Button 
            leftIcon={<FiPlus />} 
            colorScheme="brand" 
            size="sm"
            onClick={onHealthModalOpen}
          >
            기록 추가
          </Button>
        </Flex>
        
        <VStack spacing={4} align="stretch">
          {healthRecords.map((record) => (
            <Card key={record.id} variant="outline">
              <CardBody>
                <Flex justify="space-between" align="center">
                  <VStack align="flex-start" spacing={1}>
                    <HStack>
                      <FiCalendar />
                      <Text fontWeight="bold">{record.date}</Text>
                    </HStack>
                    <Badge colorScheme={record.type === '예방접종' ? 'green' : 'blue'}>
                      {record.type}
                    </Badge>
                    <Text mt={2}>{record.notes}</Text>
                  </VStack>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </Box>

      {/* 사진 앨범 */}
      <Box>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md">사진 앨범</Heading>
          <Button leftIcon={<FiCamera />} colorScheme="brand" size="sm">
            사진 추가
          </Button>
        </Flex>
        <Flex wrap="wrap" gap={2}>
          {[1, 2, 3, 4].map((idx) => (
            <Image
              key={idx}
              src={`https://images.unsplash.com/photo-153803662368${idx}-c34c77c1bafe`}
              fallbackSrc="https://via.placeholder.com/150"
              alt={`Dog photo ${idx}`}
              boxSize="100px"
              objectFit="cover"
              borderRadius="md"
            />
          ))}
        </Flex>
      </Box>

      {/* 반려견 프로필 수정 모달 */}
      <Modal isOpen={isProfileModalOpen} onClose={onProfileModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>반려견 프로필 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>이름</FormLabel>
                <Input 
                  value={dogProfile.name} 
                  onChange={(e) => setDogProfile({...dogProfile, name: e.target.value})}
                />
              </FormControl>
              <FormControl>
                <FormLabel>품종</FormLabel>
                <Input 
                  value={dogProfile.breed} 
                  onChange={(e) => setDogProfile({...dogProfile, breed: e.target.value})}
                />
              </FormControl>
              <FormControl>
                <FormLabel>나이</FormLabel>
                <Input 
                  value={dogProfile.age} 
                  onChange={(e) => setDogProfile({...dogProfile, age: e.target.value})}
                />
              </FormControl>
              <FormControl>
                <FormLabel>체중</FormLabel>
                <Input 
                  value={dogProfile.weight} 
                  onChange={(e) => setDogProfile({...dogProfile, weight: e.target.value})}
                />
              </FormControl>
              <Button colorScheme="brand" w="full" onClick={onProfileModalClose}>
                저장
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* 건강 기록 추가 모달 */}
      <Modal isOpen={isHealthModalOpen} onClose={onHealthModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>건강 기록 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>날짜</FormLabel>
                <Input 
                  type="date" 
                  value={newHealthRecord.date} 
                  onChange={(e) => setNewHealthRecord({...newHealthRecord, date: e.target.value})}
                />
              </FormControl>
              <FormControl>
                <FormLabel>유형</FormLabel>
                <Select 
                  value={newHealthRecord.type}
                  onChange={(e) => setNewHealthRecord({...newHealthRecord, type: e.target.value})}
                >
                  <option value="예방접종">예방접종</option>
                  <option value="건강검진">건강검진</option>
                  <option value="구충제">구충제</option>
                  <option value="기타">기타</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>메모</FormLabel>
                <Textarea 
                  value={newHealthRecord.notes}
                  onChange={(e) => setNewHealthRecord({...newHealthRecord, notes: e.target.value})}
                  placeholder="건강 기록에 대한 메모를 입력하세요"
                />
              </FormControl>
              <Button colorScheme="brand" w="full" onClick={handleHealthRecordSubmit}>
                저장
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default DiaryPage;