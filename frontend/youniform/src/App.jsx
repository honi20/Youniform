import "./App.css";
import GlobalStyle from "./globalStyles";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import LoginView from "./pages/LoginView";
import FindEmailView from "./pages/Setting/FindEmailView";
import FindPasswordView from "./pages/FindPasswordView";
import DiaryDetailView from "@pages/Diary/DiaryDetailView";
import WriteDiaryView from "@pages/Diary/WriteDiaryView";
import SignUpView from "./pages/SignUpView";
import SelectPlayerView from "./pages/SelectPlayerView";
import NewsView from "@pages/Main/NewsView";
import TotalSongView from "@pages/Main/TotalSongView";
import SongView from "@pages/Main/SongView";
import PlayerSongView from "@pages/Main/PlayerSongView";
import TeamSongView from "@pages/Main/TeamSongView";
import ChatView from "@pages/Main/ChatView";
import StepOneForm from "@components/SignUp/Step1/StepOneForm";
import StepTwoForm from "@components/SignUp/Step2/StepTwoForm";
import StepThreeForm from "@components/SignUp/Step3/StepThreeForm";
import SignUpSuccess from "@components/SignUp/SignUpSuccess";
import useThemeStore from "@/stores/themeStore";
import Header from "@/components/Share/Header";
import NavBar from "@/components/Share/NavBar";
import MainView from "@/pages/MainView";
import PhotoCardView from "@/pages/PhotoCardView";
import BinderCover from "@/components/Photocard/Home/BinderCover";
import Binder from "@/components/Photocard/Slot/Binder";
import PhotoCardCreator from "@/pages/PhotoCardCreator";
import DiaryHomeView from "@/pages/DiaryHomeView";
import PostView from "@/pages/PostView";
import MyPageView from "@/pages/MyPageView";
import SettingView from "@pages/Setting/SettingView";
import ChangePasswordView from "@pages/Setting/ChangePasswordView";
import ChangeTheme from "@pages/Setting/ChangeTheme";
import PushAlarm from "@pages/Setting/PushAlarm";
import Permissions from "@pages/Setting/Permissions";
import Contact from "@pages/Setting/Contact";
import Terms from "@pages/Setting/Terms";
import Privacy from "@pages/Setting/Privacy";
import Version from "@pages/Setting/Version";
import PhotoCardDetail from "@components/Photocard/Slot/PhotoCardDetail";
import LikePostView from "@pages/MyPage/LikePostView";
import FriendView from "@pages/MyPage/FriendView";
import PostDetailView from "@pages/Post/PostDetailView";
import SearchView from "@pages/Post/SearchView";
import WritePostView from "@pages/Post/WritePostView";
import MyPost from "@pages/MyPage/MyPost";
import ChangeProfile from "@pages/MyPage/ChangeProfile";
import MyDiaryView from "@pages/Diary/MyDiaryView";
import AlertView from "./pages/AlertView";
import ResetPasswordView from "./pages/ResetPasswordView";
import TestView from "@pages/Diary/TestView";
import SSEAlertModal from "@/components/Modal/SSEAlertModal";
import PlayerPushAlarm from "@/pages/Setting/PlayerPushAlarm";
import useAlertStore from '@stores/alertStore';
import { isLoggedIn } from "@stores/apiClient";
import AuthLogin from "./components/Social/AuthLogin";
import AuthLoginExsist from "./components/Social/AuthLoginExsist";
import SocialSignUpView from "./pages/SocialSignUpView";
import SocialStepOneForm from "./components/Social/Step1/SocialStepOneForm";
import SocialStepTwoForm from "./components/Social/Step2/SocialStepTwoForm";
import LanDingView from './pages/LandingView';

const AppContainer = styled.div`
  height: 100vh; /* 전체 화면 높이 설정 */
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
`;

const ContentContainer = styled.div`
  flex: 1; /* Header와 NavBar를 제외한 남은 공간을 차지 */
  overflow-y: auto;
  /* margin-top: 49px; */
`;

function App() {
  const [contentHeight, setContentHeight] = useState("auto");
  const { theme, setTheme } = useThemeStore();

  // const subscribe = useAlertStore(state => state.subscribe);

  // useEffect(() => {
  //   if (isLoggedIn()) {
  //     subscribe(); // 로그인된 상태일 때만 subscribe 요청
  //   }
  // }, [subscribe]);

  useEffect(() => {
    setTheme("monsters");
  }, []);

  return (
    <BrowserRouter>
      <AppContainer className="App">
        <SSEAlertModal />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ContentWithHeader contentHeight={contentHeight} />
          <NavBar />
        </ThemeProvider>
      </AppContainer>
    </BrowserRouter>
  );
}

function ContentWithHeader({ contentHeight }) {
  const location = useLocation();
  const shouldHideHeader = location.pathname === "/";

  return (
    <>
      {!shouldHideHeader && <Header />}
      <ContentContainer style={{ height: contentHeight }}>
        <Routes>
          <Route path="/" element={<LanDingView />} />
          <Route path="/main" element={isLoggedIn() ? <MainView /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/find-email" element={<FindEmailView />} />
          <Route path="/find-password" element={<FindPasswordView />} />
          <Route path="/reset-password/:uuid" element={<ResetPasswordView />} />
          <Route exact path="/signup/info" element={<AuthLogin />} />
          <Route exact path="/signup/exist" element={<AuthLoginExsist />} />
          {/* SignUp */}
          <Route path="/sign-up/*" element={<SignUpView />}>
            <Route index element={<StepOneForm />} />
            <Route path="step-1" element={<StepOneForm />} />
            <Route path="step-2" element={<StepTwoForm />} />
            <Route path="step-3" element={<StepThreeForm />} />
            <Route path="step-4" element={<SignUpSuccess />} />
          </Route>
          <Route path="/social/sign-up/*" element={<SocialSignUpView />}>
            <Route index element={<SocialStepOneForm />} />
            <Route path="step-1" element={<SocialStepOneForm />} />
            <Route path="step-2" element={<SocialStepTwoForm />} />
            <Route path="step-3" element={<SignUpSuccess />} />
          </Route>
          <Route path="/select-player" element={<SelectPlayerView />} />

          {/* Photocard */}
          <Route path="/photo-card" element={isLoggedIn() ? <PhotoCardView /> : <Navigate to="/login" />}>
            <Route index element={isLoggedIn() ? <BinderCover /> : <Navigate to="/login" />} />
            <Route path="cover" element={isLoggedIn() ? <BinderCover /> : <Navigate to="/login" />} />
            <Route path="binder" element={isLoggedIn() ? <Binder /> : <Navigate to="/login" />} />
            <Route path="detail/:photocardId" element={isLoggedIn() ? <PhotoCardDetail /> : <Navigate to="/login"/>} />
            <Route path="create" element={isLoggedIn() ? <PhotoCardCreator /> : <Navigate to="/login" />} />
          </Route>
          {/* 다이어리 */}
          <Route path="/diary/*">
            <Route index element={isLoggedIn() ? <DiaryHomeView /> : <Navigate to="/login" />} />
            <Route path=":diaryId" element={isLoggedIn() ? <DiaryDetailView /> : <Navigate to="/login" />} />
            <Route path=":diaryId/update" element={isLoggedIn() ? <WriteDiaryView /> : <Navigate to="/login" />} />
            <Route path="write/:diaryDate" element={isLoggedIn() ? <WriteDiaryView /> : <Navigate to="/login" />} />
            <Route path="friend/:nickname" element={isLoggedIn() ? <MyDiaryView /> : <Navigate to="/login" />} />
          </Route>
          <Route path="/post/*">
            <Route index element={isLoggedIn() ? <PostView /> : <Navigate to="/login" />} />
            <Route path=":postId" element={isLoggedIn() ? <PostDetailView /> : <Navigate to="/login" />} />
            <Route path="write" element={isLoggedIn() ? <WritePostView /> : <Navigate to="/login" />} />
            <Route path="write/:postId" element={isLoggedIn() ? <WritePostView /> : <Navigate to="/login" />} />
            <Route path="friend/:nickname" element={isLoggedIn() ? <MyPost /> : <Navigate to="/login" />} />
          </Route>
          <Route path="/search" element={isLoggedIn() ? <SearchView />: <Navigate to="/login" />} />
          <Route path="/my-page/*">
            <Route index element={isLoggedIn() ? <MyPageView />: <Navigate to="/login" />} />
            <Route path="friend-list" element={isLoggedIn() ? <FriendView /> : <Navigate to="/login" />} />
            <Route path="like-post" element={isLoggedIn() ? <LikePostView /> : <Navigate to="/login" />} />
            <Route path="my-post" element={isLoggedIn() ? <MyPost /> : <Navigate to="/login" />} />
            <Route path="my-diary" element={isLoggedIn() ? <MyDiaryView />: <Navigate to="/login" />} />
            <Route path="change-profile" element={isLoggedIn() ? <ChangeProfile /> : <Navigate to="/login" />} />
          </Route>
          <Route path="/news/:playerId" element={isLoggedIn() ? <NewsView /> : <Navigate to="/login" />} />
          {/* 노래 관련 */}
          <Route path="/song/*">
            <Route index element={isLoggedIn() ? <TotalSongView /> : <Navigate to="/login" />} />
            <Route path="player/:playerId" element={isLoggedIn() ?<PlayerSongView /> : <Navigate to="/login" />} />
            <Route path="team/:teamId" element={isLoggedIn() ? <TotalSongView /> : <Navigate to="/login" />} />
            <Route path="team-song/:teamSongId" element={isLoggedIn() ? <SongView /> : <Navigate to="/login" />} />
          </Route>
          {/* 채팅 관련 */}
          <Route path="/chat/:roomId" element={isLoggedIn() ? <ChatView /> : <Navigate to="/login" />} />
          <Route path="/setting/*">
            <Route index element={isLoggedIn() ? <SettingView /> : <Navigate to="/login" />} />
            <Route path="change-password" element={isLoggedIn() ? <ChangePasswordView /> : <Navigate to="/login" />} />
            <Route path="theme" element={isLoggedIn() ? <ChangeTheme /> : <Navigate to="/login" />} />
            <Route path="notifications">
              <Route index element={isLoggedIn() ? <PushAlarm /> : <Navigate to="/login" />} />
              <Route path="player" element={isLoggedIn() ? <PlayerPushAlarm /> : <Navigate to="/login" />} />
            </Route>
            <Route path="permissions" element={isLoggedIn() ? <Permissions /> : <Navigate to="/login" />} />
            <Route path="contact" element={isLoggedIn() ? <Contact /> : <Navigate to="/login" />} />
            <Route path="terms" element={isLoggedIn() ? <Terms /> : <Navigate to="/login" />} />
            <Route path="privacy" element={isLoggedIn() ? <Privacy /> : <Navigate to="/login" />} />
            <Route path="version" element={isLoggedIn() ? <Version /> : <Navigate to="/login" />} />
            <Route path="find-email" element={isLoggedIn() ? <FindEmailView /> : <Navigate to="/login" />} />
            <Route path="find-password" element={isLoggedIn() ? <FindPasswordView /> : <Navigate to="/login" />} />
          </Route>
          <Route path="alert" element={isLoggedIn() ? <AlertView /> : <Navigate to="/login" />} />
          {/* 공유 모달 테스트 끝나면 삭제해야함 */}
          <Route path="test" element={isLoggedIn() ? <TestView /> : <Navigate to="/login" />} />
        </Routes>
      </ContentContainer>
    </>
  );
}

export default App;
