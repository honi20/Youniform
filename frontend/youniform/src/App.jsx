import "./App.css";
import GlobalStyle from "./globalStyles";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import useAlertStore from '@stores/alertStore';
import { isLoggedIn } from '@stores/apiClient';
import AuthLogin from "./components/Social/AuthLogin";
import AuthLoginExsist from "./components/Social/AuthLoginExsist";
import SocialSignUpView from "./pages/SocialSignUpView";
import SocialStepOneForm from "./components/Social/Step1/SocialStepOneForm";
import SocialStepTwoForm from "./components/Social/Step2/SocialStepTwoForm";

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
    <AppContainer className="App">
      <SSEAlertModal />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <ContentContainer style={{ height: contentHeight }}>
            <Routes>
              <Route path="/" element={<MainView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/find-email" element={<FindEmailView />} />
              <Route path="/find-password" element={<FindPasswordView />} />
              <Route
                path="/reset-password/:uuid"
                element={<ResetPasswordView />}
              />
              <Route exact path='/signup/info' element={<AuthLogin />} />
              <Route exact path='/signup/exist' element={<AuthLoginExsist />} />
              {/* Photocard */}
              <Route path="/photo-card" element={<PhotoCardView />}>
                <Route index element={<BinderCover />} />
                <Route path="cover" element={<BinderCover />} />
                <Route path="binder" element={<Binder />} />
                <Route
                  path="detail/:photocardId"
                  element={<PhotoCardDetail />}
                />
                <Route path="create" element={<PhotoCardCreator />} />
              </Route>
              {/* 다이어리 */}
              <Route path="/diary/*">
                <Route index element={<DiaryHomeView />} />
                <Route path=":diaryId" element={<DiaryDetailView />} />
                <Route path=":diaryId/update" element={<WriteDiaryView />} />
                <Route path="write/:diaryDate" element={<WriteDiaryView />} />
                <Route path="friend/:nickname" element={<MyDiaryView />} />
              </Route>
              <Route path="/post/*">
                <Route index element={<PostView />} />
                <Route path=":postId" element={<PostDetailView />} />
                <Route path="write" element={<WritePostView />} />
                <Route path="write/:postId" element={<WritePostView />} />
                <Route path="friend/:nickname" element={<MyPost />} />
              </Route>
              <Route path="/search" element={<SearchView />} />
              <Route path="/my-page/*">
                <Route index element={<MyPageView />} />
                <Route path="friend-list" element={<FriendView />} />
                <Route path="like-post" element={<LikePostView />} />
                <Route path="my-post" element={<MyPost />} />
                <Route path="my-diary" element={<MyDiaryView />} />
                <Route path="change-profile" element={<ChangeProfile />} />
              </Route>
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
              <Route path="/news/:playerId" element={<NewsView />} />
              {/* 노래 관련 */}
              <Route path="/song" element={<TotalSongView />}>
                <Route path="player/:playerId" element={<PlayerSongView />} />
                <Route path="team/:teamId" element={<TeamSongView />} />
              </Route>
              {/* 채팅 관련 */}
              <Route path="/chat/:roomId" element={<ChatView />} />
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
              <Route path="alert" element={<AlertView />} />
              {/* 공유 모달 테스트 끝나면 삭제해야함 */}
              <Route path="test" element={<TestView />} />
            </Routes>
          </ContentContainer>
          <NavBar />
        </BrowserRouter>
      </ThemeProvider>
    </AppContainer>
  );
}

export default App;
