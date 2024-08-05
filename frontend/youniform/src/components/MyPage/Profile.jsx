import React, { useEffect } from 'react'
import styled from 'styled-components'
import useUserStore from '../../stores/userStore';
import * as Font from '@/typography';
const ProfileSection = styled.div`
    box-sizing: border-box;
    margin: 0 5%;
    height: 100px;
    display: flex;
    /* border: 1px solid red; */
    `
const ProfileImage = styled.div`
    box-sizing: border-box;
    height: 100px;
    width: 100px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid blue; */
`
const ProfileInfo = styled.div`
    box-sizing: border-box;
    flex: 1;
    margin: 0 5%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    border: 1px solid rebeccapurple;
`
const Nickname = styled.div`
${Font.Small}
    box-sizing: border-box;
    border: 1px solid red;
`
const Introduce = styled.div`
${Font.XSmall}
    box-sizing: border-box;
    display: flex;
    margin-top: 5px;
    font-size: 1rem;
    border: 1px solid blue;
`

const ProfileComp = () => {
    const { user, loading, error, fetchUser, clearUser} = useUserStore();

    useEffect(() => {
        // fetchUser();
    }, [fetchUser])
    return (
        <ProfileSection>
            <ProfileImage>
                <img src={ user.profileUrl }/>
            </ProfileImage>
            <ProfileInfo>
                <Nickname>{ user.nickname }</Nickname>
                <Introduce>{ user.introduce }</Introduce>
            </ProfileInfo>
        </ProfileSection>   
  )
}

const UserSection = styled.div`
    box-sizing: border-box;
    margin: 1% 5%;
    height: 18%;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
`
const ItemWrapper = styled.div`
    width: 95%;
    height: 80%;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid black; */
`
const UserItem = styled.div`
    width: 30%; 
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid blue;
`
const DotLine = styled.div`
    width: 1%;
    height: 80%;
    margin-left: 1px;
    border-right: 1px dashed #DADADA;
`
const IconWrapper = styled.div`
    width: 60%;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
`
import OrderIcon from "@assets/MyPage/order.svg?react";
import NotebookIcon from "@assets/MyPage/notebook.svg?react";
import EditIcon from "@assets/MyPage/edit.svg?react";
const UserComp = () => {
    return (
        <>
        <UserSection>
            <ItemWrapper>
                <UserItem>
                    <IconWrapper>
                        <NotebookIcon />
                    </IconWrapper>
                    나의 다이어리
                </UserItem>
                <DotLine/>
                <UserItem>
                    <IconWrapper>
                    </IconWrapper>
                    나의 포스트
                </UserItem>
                <DotLine/>
                <UserItem>
                    <IconWrapper>
                    </IconWrapper>
                    프로필 변경
                </UserItem>
            </ItemWrapper>
        </UserSection>
        </>
    )
}
const Profile = () => {
    return (
        <>
        <ProfileComp />
        <UserComp />
        </> 
  )
}

export default Profile