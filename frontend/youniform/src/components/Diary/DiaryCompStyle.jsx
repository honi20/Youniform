import styled from 'styled-components';
import defaultImg from '../../assets/testImg.jpg'

const Diary = styled.div`
    // layout
    box-sizing: border-box;
    width: 90%;
    height: 90%;
    flex-shrink: 0;
    position: relative;
    display: flex;

    // style
    border-radius: 1.25rem;
    border: 1px solid #B5B5B5;
    /* background-image: ; */
`
const DiaryHeader = styled.div`
    // layout
    position: absolute;
    top: 0;
    box-sizing: border-box;
    width: 100%;
    height: 5rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;

    // style
    border-radius: 1.25rem 1.25rem 0rem 0rem;
    border-bottom: 1px solid #DADADA;
    background-color: #FFF;

`
const Profile = styled.div`
    // layout
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
    align-items: center;
    margin-left: 1rem;

    // style
    background-image: url(${props => props.imageUrl || defaultImg});
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
`
const Header = styled.div`
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    width: auto;
    padding: 0 1rem;
    flex: 1;
`

const Btn = styled.button`
    color: black;
`
const WriteBtnContainer = styled.div`
    flex-shrink: 0;
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: space-between;
    padding: 1rem;
`
const EditBtnContainer = styled.div`
    flex-shrink: 0;
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: space-between;
    padding: 1rem;
`
const BtnGroup = styled.div`
    display: flex;
    gap: 0.5rem;
`

export { Diary, DiaryHeader, Profile, HeaderText, Header, Btn, WriteBtnContainer, EditBtnContainer, BtnGroup }