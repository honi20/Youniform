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
import WriteDiaryView
 from './pages/WriteDiaryView';
 
const AppContainer = styled.div`
  background-color: #F8F8F8;
  /* height: 100vh; 화면 전체 높이 */
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/photo-card" element={<PhotoCardView />} />
          <Route path="/diary" element={<DiaryHomeView />} />
          <Route path="/community" element={<CommunityView />} />
          <Route path="/my-page" element={<MyPageView />} />
          <Route path="/find-email" element={<FindEmailView />} />
          <Route path="/find-password" element={<FindPasswordView />} />
          <Route path="/diary-detail" element={<DiaryDetailView />} />
          <Route path="/write-diary" element={<WriteDiaryView />} />
        </Routes>
        <NavBar />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
