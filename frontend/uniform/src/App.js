import { 
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import MainView from './pages/MainView';
import PhotoCardView from './pages/PhotoCardView';
import DiaryHomeView from './pages/DiaryHomeView';
import CommunityView from './pages/CommunityView';
import MyPageView from './pages/MyPageView';
import NavBar from './components/NavBar';
import Header from './components/Header';
import styled from 'styled-components';

const AppContainer = styled.div`
  background-color: #F8F8F8;
  height: 100vh; /* 화면 전체 높이 */

  /* flex-shrink: 0; */
`
function App() {
  return (
    <>
      <BrowserRouter>
        <AppContainer>
            <Header />
            <Routes>
              <Route path="/" element={ <MainView /> }></Route>
              <Route path="/photo-card" element={ <PhotoCardView /> }></Route>
              <Route path="/diary" element={ <DiaryHomeView /> }></Route>
              <Route path="/community" element={ <CommunityView /> }></Route>
              <Route path="/my-page" element={ <MyPageView /> }></Route>
            </Routes>
            <NavBar />
        </AppContainer>
      </BrowserRouter>
    </>
  );
}

export default App;