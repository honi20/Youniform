import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Font from "@/typography";
import useUserStore from "@stores/userStore";
import Loading from "@components/Share/Loading";
import ImgSvg from "@assets/Post/img_box.svg?react";
import DoneSvg from "@assets/Post/done.svg?react";
const Container = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  /* border: 1px solid black; */
`;

const PostBox = styled.div`
  border: 0.5px solid #dadada;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin: 0% 8% 5% 8%;
  overflow-y: auto;
  cursor: pointer;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  margin-left: 15px;
  /* border: 1px solid pink; */
`;
const ProfileImg = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin: 0 5px;
  border: 0.5px solid #dadada;
`;
const Content = styled.textarea`
  ${Font.Small}
  font-weight: 300;
  background-color: #f6f6f6;
  margin: 0 27px;
  padding: 15px;
  flex: 1;
  border: none;
  resize: none;
  border-radius: 5px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 0 27px;
  padding: 10px 0;
`;
const Tag = styled.span`
  /* background-color: ${(props) => props.theme.primary || "#2196F3"}; */
  color: #848484;
  border: 1px solid #848484;
  padding: 5px 10px;
  border-radius: 15px;
`;
const Footer = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: end;
  margin: 0 18px;
  gap: 10px;
  /* border: 1px solid red; */
`;
const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 40px;
  /* border: 1px solid black; */
`;
const CreateBtn = styled(Btn)`
  border-radius: 5px;
  background-color: ${(props) => props.theme.primary};
  color: white;
`;
const WritePostView = () => {
  const { user, fetchUser, loading } = useUserStore();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [htmlContent, setHtmlContent] = useState("");
  useEffect(() => {
    if (!user) {
      fetchUser();
      console.log("testset");
    }
  }, [user, fetchUser]);

  // 해쉬태그
  useEffect(() => {
    console.log(content);

    const extractedTags = content.match(/#\S+/g) || [];
    const uniqueTags = [
      ...new Set(
        extractedTags.map((tag) =>
          tag.length > 10 ? `${tag.slice(0, 11)}` : tag
        )
      ),
    ];
    setTags(uniqueTags);
  }, [content]);

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        <PostBox>
          <Header>
            <ProfileImg src={user.profileUrl} alt="user profile" />
            {user.nickname}
          </Header>
          <Content
            placeholder="포스트를 작성해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TagsContainer>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
          <Footer>
            <Btn onClick={() => console.log("사진 추가")}>
              <ImgSvg />
            </Btn>
            <CreateBtn onClick={() => console.log("저장")}>
              <DoneSvg />
            </CreateBtn>
          </Footer>
        </PostBox>
      </Container>
    </>
  );
};

export default WritePostView;
