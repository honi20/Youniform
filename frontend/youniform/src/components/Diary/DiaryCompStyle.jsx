import styled from 'styled-components';
import defaultImg from '../../assets/testImg.jpg';

// const defaultImg = '../../assets/testImg2.png';
const Diary = styled.div`
    // layout
    box-sizing: border-box;
    width: 90%;
    height: auto;
    flex-shrink: 0;
    /* position: relative; */
    display: flex;
    flex-direction: column;
    // style
    border-radius: 0.5rem;
    border: 1px solid #B5B5B5;
    margin-top: 3%;
    /* background-image: ; */
`
const DiaryHeader = styled.div`
    // layout
    /* position: absolute; */
    top: 0;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    flex-shrink: 0;
    display: flex;
    align-items: center;

    // style
    border-radius: 0.5rem 0.5rem 0rem 0rem;
    /* border-bottom: 1px solid #DADADA; */
    background-color: #FFF;
    border: 1px solid black;

`
const Profile = styled.div`
    // layout
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    align-items: center;
    margin-left: 0.5rem;
    // style
    /* background-image: url(${props => props.profileUrl || defaultImg}); */
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    border: 0.5px solid #D0D0D0;
`
const HeaderText = styled.span`
    // layout
    flex-shrink: 0;
    /* margin-left: 0.6rem; */
    // typography
    font-size: 1rem;
    color: #363636;
    font-weight: 700;
    font-family: 'Pretendard';
    border: 1px solid red;
`
const TextContainer = styled.div`
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    width: auto;
    padding: 0 0.5rem;
    flex: 1;
    border: 1px solid blue;
`

const Btn = styled.div`
    color: #848484;
    border-bottom: 1px solid #848484;
    border: 1px solid black;
`
const WriteBtnContainer = styled.div`
    flex-shrink: 0;
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: space-between;
    padding: 1rem;
    border: 1px solid purple;
`
const BtnContainer = styled.div`
    flex-shrink: 0;
    display: flex;
    width: 100%;
    height: 90%;
    align-items: flex-end;
    justify-content: space-between;
    padding: 1rem;
    /* border: 1px solid blue; */
`
const BtnGroup = styled.div`
    display: flex;
    gap: 1rem;
    border: 1px solid blue;
`
// Content
const DiaryContent = styled.div`
    display: flex;
    /* border: 1px solid red; */
    height: auto;
    flex-direction: column;
`
const DiaryImageContainer = styled.div`
    display: flex;
    border: 1px solid black;
    height: 100px;
`
const DiaryImage = styled.div`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color:black;
    /* background-image: url(${props => props.imageUrl || '/defaultImg.png'}); */
`
const DiaryText = styled.div`
    display: flex;
    border: 1px solid yellow;
    height: 40px;
`
const DiaryTags = styled.div`
    display: flex;
    border: 1px solid pink;
    height: 40px;
`
const DiaryDate = styled.div`
    display: flex;
    align-items: center;
    /* border: 1px solid pink; */
    height: 40px;
    color: #848484;
    font-family: 'Pretendard';
    /* font-size: 0.9375rem; */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0 10px;
`
const DiaryLine = styled.div`
    display: flex;
    margin: 0 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);

`
// Footer
const DiaryFooter = styled.div`
    display: flex;
    /* border: 1px solid black; */
    height: 40px;
    justify-content: space-between;
    align-items: center;
    & > div {
        display: flex;
        align-items: center;
    }
    & > div > div {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        border: 1px solid black;
    }
`

export { Diary, DiaryHeader, Btn, BtnGroup,
    Profile, HeaderText, TextContainer, 
    DiaryImageContainer, DiaryImage, DiaryText, DiaryTags, DiaryDate,
    DiaryContent, DiaryLine, DiaryFooter, }