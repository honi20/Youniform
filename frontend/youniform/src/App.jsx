import "./App.css";
import GlobalStyle from "./globalStyles";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import useThemeStore from "@stores/themeStore";
import MainView from "@pages/MainView";
import PhotoCardView from "@pages/PhotoCardView";
import DiaryHomeView from "@pages/DiaryHomeView";
import CommunityView from "@pages/CommunityView";
import MyPageView from "@pages/MyPageView";
import NavBar from "@components/Share/NavBar";
import Header from "@components/Share/Header";
import LoginView from "@pages/LoginView";
import FindEmailView from "@pages/FindEmailView";
import FindPasswordView from "@pages/FindPasswordView";
import DiaryDetailView from "@pages/Diary/DiaryDetailView";
import WriteDiaryView from "@pages/Diary/WriteDiaryView";
import SignUpView from "@pages/SignUpView";
import Test from "@pages/test";
import SelectPlayerView from "@pages/SelectPlayerView";
import NewsView from "@pages/Main/NewsView";
import TotalSongView from "@pages/Main/TotalSongView";
import PlayerSongView from "@pages/Main/PlayerSongView";
import TeamSongView from "@pages/Main/TeamSongView";
import ChatView from "@pages/Main/ChatView";

const AppContainer = styled.div`
  height: 100vh; /* 전체 화면 높이 설정 */
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
`;

const ContentContainer = styled.div`
  flex: 1; /* Header와 NavBar를 제외한 남은 공간을 차지 */
  overflow-y: auto;
  margin-top: 49px;
`;

function App() {
  const headerRef = useRef(null);
  const navBarRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("auto");
  const { theme, setTheme } = useThemeStore();
  useEffect(() => {
    setTheme("monsters");
    const updateContentHeight = () => {
      const headerHeight = headerRef.current
        ? headerRef.current.offsetHeight
        : 0;
      const navBarHeight = navBarRef.current
        ? navBarRef.current.offsetHeight
        : 0;
      const totalHeight = window.innerHeight - headerHeight - navBarHeight;
      setContentHeight(`${totalHeight}px`);
    };

    updateContentHeight();
    window.addEventListener("resize", updateContentHeight);
    return () => window.removeEventListener("resize", updateContentHeight);
  }, []);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
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
                <Route path="/community" element={<CommunityView />} />
                <Route path="/my-page" element={<MyPageView />} />
                <Route path="/find-email" element={<FindEmailView />} />
                <Route path="/find-password" element={<FindPasswordView />} />
                <Route path="/diary/detail" element={<DiaryDetailView />} />
                <Route path="/diary/write" element={<WriteDiaryView />} />
                <Route path="/sign-up" element={<SignUpView />} />
                <Route path="/test" element={<Test />} />
                <Route path="/select-player" element={<SelectPlayerView />} />
                <Route path="/news" element={<NewsView />} />
                {/* 노래 관련 */}
                <Route path="/total-song" element={<TotalSongView />} />
                <Route path="/team-song/:id" element={<TeamSongView />} />
                <Route path="/player-song/:id" element={<PlayerSongView />} />
                {/* 채팅 관련 */}
                <Route path="/chat/:room-id" element={<ChatView />} />
              </Routes>
            </ContentContainer>
            <div ref={navBarRef}>
              <NavBar />
            </div>
          </AppContainer>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
