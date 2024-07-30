import "./App.css";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainView from './pages/MainView';
import PhotoCardView from './pages/PhotoCardView';
import DiaryHomeView from './pages/DiaryHomeView';
import CommunityView from './pages/CommunityView';
import MyPageView from './pages/MyPageView';
import NavBar from './components/NavBar';
import Header from './components/Header';
import styled from 'styled-components';
import LoginView from './pages/LoginView';
import FindEmailView from './pages/FindEmailView';
import FindPasswordView from './pages/FindPasswordView';
import DiaryDetailView from './pages/DiaryDetailView';
import WriteDiaryView from './pages/WriteDiaryView';
import Test from './pages/test';
import SelectPlayerView from "./pages/SelectPlayerView";
import NewsView from "./pages/NewsView";
import TotalSongView from "./pages/PlayerSongView";

const AppContainer = styled.div`
  height: 100vh; /* 전체 화면 높이 설정 */
  display: flex;
  flex-direction: column;
  background-color: #F8F8F8;
`;
  
  const ContentContainer = styled.div`
  flex: 1; /* Header와 NavBar를 제외한 남은 공간을 차지 */
  overflow-y: auto;
`;

function App() {
  const headerRef = useRef(null);
  const navBarRef = useRef(null);
  const [contentHeight, setContentHeight] = useState('auto');

  useEffect(() => {
    const updateContentHeight = () => {
      const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
      const navBarHeight = navBarRef.current ? navBarRef.current.offsetHeight : 0;
      const totalHeight = window.innerHeight - headerHeight - navBarHeight;
      setContentHeight(`${totalHeight}px`);
    };

    updateContentHeight();
    window.addEventListener('resize', updateContentHeight);
    return () => window.removeEventListener('resize', updateContentHeight);
  }, []);

  return (
    <BrowserRouter>
      <AppContainer>
        <div ref={headerRef}>
          <Header />
        </div>
        <ContentContainer style={{ height: contentHeight }}>
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/photo-card" element={<PhotoCardView />} />
            <Route path="/diary" element={<DiaryHomeView />} />
            <Route path="/diary/write-diary" element={<WriteDiaryView />} />
            <Route path="/diary/detail" element={<DiaryDetailView />} />
            <Route path="/community" element={<CommunityView />} />

            <Route path="/my-page" element={<MyPageView />} />
            <Route path="/find-email" element={<FindEmailView />} />
            <Route path="/find-password" element={<FindPasswordView />} />
            <Route path="/test" element={<Test />} />
            <Route path="/select-player" element={<SelectPlayerView />} />
            <Route path="/news" element={<NewsView />} />
            <Route path="/songs" element={<TotalSongView />} />
          </Routes>
        </ContentContainer>
        <div ref={navBarRef}>
          <NavBar />
        </div>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
