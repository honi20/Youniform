import "./App.css";
import GlobalStyle from "./globalStyles";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import LoginView from "./pages/LoginView";
import FindEmailView from "./pages/Setting/FindEmailView";
import FindPasswordView from "./pages/Setting/FindPasswordView";
import DiaryDetailView from "@pages/Diary/DiaryDetailView";
import WriteDiaryView from "@pages/Diary/WriteDiaryView";
import SignUpView from "./pages/SignUpView";
import SelectPlayerView from "./pages/SelectPlayerView";
import NewsView from "@pages/Main/NewsView";
import TotalSongView from "@pages/Main/TotalSongView";
import PlayerSongView from "@pages/Main/PlayerSongView";
import TeamSongView from "@pages/Main/TeamSongView";
import ChatView from "@pages/Main/ChatView";
import StepOneForm from "./components/SignUp/Step1/StepOneForm";
import StepTwoForm from "./components/SignUp/Step2/StepTwoForm";
import StepThreeForm from "./components/SignUp/Step3/StepThreeForm";
import SignUpSuccess from "./components/SignUp/SignUpSuccess";
import useThemeStore from "@/stores/themeStore";
import Header from "@/components/Share/Header";
import NavBar from "@/components/Share/NavBar";
import MainView from "@/pages/MainView";
import PhotoCardView from "@/pages/PhotoCardView";
import BinderCover from "@/components/Photocard/Home/BinderCover";
import Binder from "@/components/Photocard/Home/Binder";
import DiaryHomeView from "@/pages/DiaryHomeView";
import CommunityView from "@/pages/CommunityView";
import MyPageView from "@/pages/MyPageView";
import SettingView from "@pages/Setting/SettingView";
import ChangePasswordView from "./pages/Setting/ChangePasswordView";
import ChangeTheme from "./pages/Setting/ChangeTheme";
import PushAlarm from "./pages/Setting/PushAlarm";
import Permissions from "./pages/Setting/Permissions";
import Contact from "./pages/Setting/Contact";
import Terms from "@pages/Setting/Terms";
import Privacy from "./pages/Setting/Privacy";
import Version from "@pages/Setting/Version";
const AppContainer = styled.div`
  height: 100vh; /* 전체 화면 높이 설정 */
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  /* min-width: 400px; */
  /* min-height: 100vh; */
  @media (max-width: 400px) {
    padding: 0 10px;
    width: 100%;
    max-width: 400px;
    min-height: 100vh;
    margin: 0 auto;
    position: relative;
    overflow-y: auto;
  }
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
                {/* Photocard */}
                <Route path="/photo-card" element={<PhotoCardView />}>
                  <Route index element={<BinderCover />} />
                  <Route path="cover" element={<BinderCover />} />
                  <Route path="binder" element={<Binder />} />
                </Route>
                <Route path="/diary" element={<DiaryHomeView />} />
                <Route path="/community" element={<CommunityView />} />
                <Route path="/my-page" element={<MyPageView />} />

                <Route path="/diary/detail" element={<DiaryDetailView />} />
                <Route path="/diary/write" element={<WriteDiaryView />} />
                {/* SignUp */}
                <Route path="/sign-up/*" element={<SignUpView />}>
                  <Route index element={<StepOneForm />} />
                  <Route path="step-1" element={<StepOneForm />} />
                  <Route path="step-2" element={<StepTwoForm />} />
                  <Route path="step-3" element={<StepThreeForm />} />
                  <Route path="step-4" element={<SignUpSuccess />} />
                </Route>
                <Route path="/select-player" element={<SelectPlayerView />} />
                <Route path="/news" element={<NewsView />} />
                {/* 노래 관련 */}
                <Route path="/total-song" element={<TotalSongView />} />
                <Route path="/team-song/:id" element={<TeamSongView />} />
                <Route path="/player-song/:id" element={<PlayerSongView />} />
                {/* 채팅 관련 */}
                <Route path="/chat/:room-id" element={<ChatView />} />
                <Route path="/setting/*">
                  <Route index element={<SettingView />} />
                  <Route
                    path="change-password"
                    element={<ChangePasswordView />}
                  />
                  <Route path="theme" element={<ChangeTheme />} />
                  <Route path="notifications" element={<PushAlarm />} />
                  <Route path="permissions" element={<Permissions />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="version" element={<Version />} />
                  <Route path="find-email" element={<FindEmailView />} />
                  <Route path="find-password" element={<FindPasswordView />} />
                </Route>
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
