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

const Content = styled.div`
  margin-top: 60px;
`
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
            <Header />
            <Content>
            <Routes>
              <Route path="/" element={ <MainView /> }></Route>
              <Route path="/photo-card" element={ <PhotoCardView /> }></Route>
              <Route path="/diary" element={ <DiaryHomeView /> }></Route>
              <Route path="/community" element={ <CommunityView /> }></Route>
              <Route path="/my-page" element={ <MyPageView /> }></Route>
            </Routes>
            </Content>
            <NavBar />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;