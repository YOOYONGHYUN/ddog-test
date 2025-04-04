import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import DiaryPage from './pages/DiaryPage';
import WalkPage from './pages/WalkPage';
import FacilitiesPage from './pages/FacilitiesPage';
import CommunityPage from './pages/CommunityPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DiaryPage />} />
          <Route path="diary" element={<DiaryPage />} />
          <Route path="walk" element={<WalkPage />} />
          <Route path="facilities" element={<FacilitiesPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;