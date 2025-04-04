import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Flex,
  Avatar,
  Image,
  Icon,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  IconButton,
  Textarea,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiHeart,
  FiMessageSquare,
  FiShare2,
  FiEdit,
  FiTrash2,
  FiSend,
  FiCamera,
  FiImage,
  FiUser,
} from 'react-icons/fi';

interface Post {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  createdAt: string;
  likes: number;
  comments: Comment[];
  liked: boolean;
  tags: string[];
}

interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: '댕댕이맘',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
    },
    content: '오늘 우리 쪼꼬 공원에서 처음으로 다른 강아지들과 놀았어요! 처음엔 긴장했지만 금방 적응했답니다 😊',
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
      'https://images.unsplash.com/photo-1583511655826-05700442b372',
    ],
    createdAt: '2시간 전',
    likes: 24,
    comments: [
      {
        id: 'c1',
        user: {
          id: 'user2',
          name: '멍뭉이아빠',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
        },
        content: '너무 귀엽네요! 우리 아이도 다른 강아지들 만나는 걸 좋아해요.',
        createdAt: '1시간 전',
      },
    ],
    liked: false,
    tags: ['소형견', '퍼그', '강아지공원'],
  },
  {
    id: '2',
    user: {
      id: 'user3',
      name: '골든러버',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e',
    },
    content: '오늘 동물병원에서 예방접종 맞고 왔어요. 너무 용감하게 잘 참았답니다! 칭찬해주세요 💉',
    images: [
      'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6',
    ],
    createdAt: '어제',
    likes: 42,
    comments: [
      {
        id: 'c2',
        user: {
          id: 'user4',
          name: '수의사샘',
          avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
        },
        content: '정말 용감하네요! 건강검진도 정기적으로 받는 것 잊지 마세요 😊',
        createdAt: '20시간 전',
      },
      {
        id: 'c3',
        user: {
          id: 'user5',
          name: '강아지훈련사',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
        },
        content: '잘했어요! 간식 많이 주세요~',
        createdAt: '18시간 전',
      },
    ],
    liked: true,
    tags: ['골든리트리버', '예방접종', '건강관리'],
  },
];

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [commentText, setCommentText] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();
  
  const toast = useToast();

  const filteredPosts = posts.filter(post => {
    return (
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked,
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: `c${Date.now()}`,
          user: {
            id: 'currentUser',
            name: '나',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
          },
          content: commentText,
          createdAt: '방금 전',
        };
        
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    }));

    setCommentText('');
    
    toast({
      title: "댓글이 추가되었습니다.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    
    const newPost: Post = {
      id: `p${Date.now()}`,
      user: {
        id: 'currentUser',
        name: '나',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
      content: newPostContent,
      createdAt: '방금 전',
      likes: 0,
      comments: [],
      liked: false,
      tags: ['강아지', '반려견'],
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    onClose();
    
    toast({
      title: "게시물이 작성되었습니다.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    onDetailOpen();
  };

  return (
    <VStack spacing={4} align="stretch" pb={4}>
      {/* 검색 및 게시물 작성 버튼 */}
      <HStack>
        <InputGroup flex={1}>
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input 
            placeholder="검색어를 입력하세요" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <IconButton
          aria-label="새 게시물 작성"
          icon={<FiEdit />}
          colorScheme="brand"
          onClick={onOpen}
        />
      </HStack>

      {/* 탭 */}
      <Tabs colorScheme="brand" index={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab>전체</Tab>
          <Tab>인기</Tab>
          <Tab>팔로잉</Tab>
          <Tab>질문/답변</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel px={0}>
            <PostList 
              posts={filteredPosts} 
              onLike={handleLike}
              onPostClick={openPostDetail}
            />
          </TabPanel>
          
          <TabPanel px={0}>
            <PostList 
              posts={filteredPosts.sort((a, b) => b.likes - a.likes)} 
              onLike={handleLike}
              onPostClick={openPostDetail}
            />
          </TabPanel>
          
          <TabPanel px={0}>
            <VStack spacing={4} align="stretch">
              <Text textAlign="center" py={6} color="gray.500">
                아직 팔로우한 사용자가 없습니다.
              </Text>
            </VStack>
          </TabPanel>
          
          <TabPanel px={0}>
            <PostList 
              posts={filteredPosts.filter(post => post.tags.includes('질문'))} 
              onLike={handleLike}
              onPostClick={openPostDetail}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* 새 게시물 작성 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>새 게시물 작성</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="무슨 생각을 하고 계신가요?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              minH="150px"
            />
            <HStack mt={4}>
              <IconButton
                aria-label="사진 추가"
                icon={<FiImage />}
                variant="ghost"
              />
              <IconButton
                aria-label="카메라"
                icon={<FiCamera />}
                variant="ghost"
              />
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="brand" onClick={handleCreatePost}>
              게시
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 게시물 상세 모달 */}
      {selectedPost && (
        <Modal isOpen={isDetailOpen} onClose={onDetailClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Flex align="center">
                <Avatar src={selectedPost.user.avatar} size="sm" mr={2} />
                <Text>{selectedPost.user.name}</Text>
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={4}>{selectedPost.content}</Text>
              
              {selectedPost.images && selectedPost.images.length > 0 && (
                <Box mb={4}>
                  <Image
                    src={selectedPost.images[0]}
                    alt="게시물 이미지"
                    borderRadius="md"
                    w="full"
                  />
                  {selectedPost.images.length > 1 && (
                    <HStack mt={2} spacing={2} overflowX="auto" py={2}>
                      {selectedPost.images.map((img, idx) => (
                        <Image
                          key={idx}
                          src={img}
                          alt={`이미지 ${idx + 1}`}
                          boxSize="80px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      ))}
                    </HStack>
                  )}
                </Box>
              )}
              
              <HStack spacing={4} mb={2}>
                <Button
                  leftIcon={<Icon as={FiHeart} color={selectedPost.liked ? "red.500" : undefined} />}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(selectedPost.id)}
                >
                  {selectedPost.liked ? '좋아요 취소' : '좋아요'} {selectedPost.likes}
                </Button>
                <Text fontSize="sm" color="gray.500">{selectedPost.createdAt}</Text>
              </HStack>
              
              <HStack mb={4} spacing={2}>
                {selectedPost.tags.map((tag, idx) => (
                  <Badge key={idx} colorScheme="brand" variant="subtle">
                    #{tag}
                  </Badge>
                ))}
              </HStack>
              
              <Divider mb={4} />
              
              <VStack align="stretch" spacing={4} maxH="300px" overflowY="auto">
                <Heading size="sm" mb={2}>
                  댓글 {selectedPost.comments.length}개
                </Heading>
                
                {selectedPost.comments.map(comment => (
                  <Box key={comment.id}>
                    <Flex>
                      <Avatar src={comment.user.avatar} size="xs" mr={2} />
                      <Box flex={1}>
                        <Flex justify="space-between">
                          <Text fontWeight="bold" fontSize="sm">{comment.user.name}</Text>
                          <Text fontSize="xs" color="gray.500">{comment.createdAt}</Text>
                        </Flex>
                        <Text fontSize="sm">{comment.content}</Text>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <HStack w="full">
                <Input
                  placeholder="댓글을 입력하세요"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <IconButton
                  aria-label="댓글 게시"
                  icon={<FiSend />}
                  colorScheme="brand"
                  onClick={() => handleAddComment(selectedPost.id)}
                />
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </VStack>
  );
};

interface PostListProps {
  posts: Post[];
  onLike: (postId: string) => void;
  onPostClick: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onLike, onPostClick }) => {
  return (
    <VStack spacing={4} align="stretch">
      {posts.length === 0 ? (
        <Text textAlign="center" py={8} color="gray.500">
          게시물이 없습니다.
        </Text>
      ) : (
        posts.map(post => (
          <Card key={post.id} variant="outline">
            <CardHeader>
              <Flex>
                <Avatar src={post.user.avatar} size="sm" mr={2} />
                <Box>
                  <Text fontWeight="bold" fontSize="sm">{post.user.name}</Text>
                  <Text fontSize="xs" color="gray.500">{post.createdAt}</Text>
                </Box>
              </Flex>
            </CardHeader>
            
            <CardBody py={2} onClick={() => onPostClick(post)} cursor="pointer">
              <Text mb={4} noOfLines={3}>{post.content}</Text>
              
              {post.images && post.images.length > 0 && (
                <Image
                  src={post.images[0]}
                  alt="게시물 이미지"
                  borderRadius="md"
                  mb={4}
                />
              )}
              
              <HStack spacing={2}>
                {post.tags.map((tag, idx) => (
                  <Badge key={idx} colorScheme="brand" variant="subtle" fontSize="xs">
                    #{tag}
                  </Badge>
                ))}
              </HStack>
            </CardBody>
            
            <CardFooter pt={0}>
              <HStack spacing={4} w="full">
                <Button
                  leftIcon={<Icon as={FiHeart} color={post.liked ? "red.500" : undefined} />}
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike(post.id);
                  }}
                >
                  {post.likes}
                </Button>
                <Button
                  leftIcon={<Icon as={FiMessageSquare} />}
                  variant="ghost"
                  size="sm"
                  onClick={() => onPostClick(post)}
                >
                  {post.comments.length}
                </Button>
                <Button
                  leftIcon={<Icon as={FiShare2} />}
                  variant="ghost"
                  size="sm"
                  ml="auto"
                >
                  공유
                </Button>
              </HStack>
            </CardFooter>
          </Card>
        ))
      )}
    </VStack>
  );
};

export default CommunityPage;