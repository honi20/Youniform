import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import * as Font from "@/typography";
import useUserStore from "@stores/userStore";
import Loading from "@components/Share/Loading";
import ImgSvg from "@assets/Post/img_box.svg?react";
import DoneSvg from "@assets/Post/done.svg?react";
import CloseSvg from "@assets/Post/Close_round_light.svg?react"
import { getApiClient } from "@stores/apiClient";
import usePostStore from "@stores/postStore";
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
const ImageContainer = styled.div`
  padding: 5 27px;
  display: flex;
  align-items: center;
  position: relative;
  /* background-color: red; */
`
const ImgBox = styled.img`
  height: 60px;
`;
const DeleteBtn = styled.button`
  position: absolute;
  top: 5px;
  left: 27px;
  background: transparent;
  background-color: #b4b4b4;
  border: 1px solid white;
  border-radius: 50%;
  cursor: pointer;
`;
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 0 27px;
  padding: 10px 0;
`;
const Tag = styled.span`
  color: #848484;
  border: 1px solid #f6f6f6;
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
  const { addPost, updatePost } = usePostStore();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const stripHtmlTags = (input) => {
    return input.replace(/<\/?[^>]+>/gi, ''); // 모든 HTML 태그 제거
  };
  
  useEffect(() => {
    if (location.state && location.state.post) {
      const post = location.state.post;
      setContent(stripHtmlTags(post.contents));
      console.log(post.contents);
      setTags(post.tags.map((tag) => tag.contents));
      if (post.imageUrl) {
        setFilePreview(post.imageUrl);
      }
    }
    if (!user) {
      fetchUser();
    }
  }, [location.state, user, fetchUser]);

  // 해쉬태그
  useEffect(() => {
    const extractedTags = content.match(/# \S+/g) || [];
    const uniqueTags = [
      ...new Set(
        extractedTags.map((tag) =>
          tag.length > 10 ? `${tag.slice(2, 12)}` : tag.slice(2)
        )
      ),
    ].slice(0, 10); // 태그 개수를 10개로 제한
    setTags(uniqueTags);
    console.log("해쉬태그", uniqueTags);
  }, [content]);

  const cleanContent = () => {
    return content.replace(/# \S+/g, "").trim();
  };
  const logFormData = (formData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };
  const createFormData = async () => {
    const cleanedContent = cleanContent();

    console.log("저장할 내용:", cleanedContent);
    console.log("해쉬태그", tags);
    console.log("Selected file:", selectedFile);

    const formData = new FormData();
    const dto = {
      contents: cleanedContent,
      tags: tags,
    };

    const newBlob = new Blob();
    if (selectedFile) {
      formData.append("file", selectedFile, selectedFile.name);
    } else {
      formData.append("file", newBlob);
    }
    const dtoBlob = new Blob([JSON.stringify(dto)], {
      type: "application/json",
    });

    formData.append("dto", dtoBlob);
    logFormData(formData);
    return formData;
  };
  const handleSave = async () => {
    if (!content.trim()) {  // content가 비어 있거나 공백만 있는 경우
      alert("내용을 입력해주세요.");  // 사용자에게 경고 메시지 표시
      return;  // 저장을 시도하지 않음
    }
    try {
      const formData = await createFormData();
      let newPostId = "";
      if (postId) {
        console.log("업데이트", postId);
        logFormData(formData);
        await updatePost(postId, formData);
      } else {
        newPostId = await addPost(formData);
      }
      await moveToDetailPage(newPostId ? newPostId : postId);
    } catch (error) {
      console.error("Error saving post object:", error);
    }
  };
  const moveToDetailPage = async (postId) => {
    try {
      if (postId) {
        console.log(postId);
        navigate(`/post/${postId}`); // 페이지 이동
      }
    } catch (error) {
      console.error("Error moving to detail page:", error);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhotoClick = () => {
    fileInputRef.current.click();
  };
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setFilePreview(null);
  };
  
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
          <ImageContainer>
          {filePreview && <><ImgBox src={filePreview} alt="Preview" >
          </ImgBox>
          <DeleteBtn onClick={handleRemoveImage}>
            <CloseSvg/>
          </DeleteBtn>
          </>}
          </ImageContainer>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <TagsContainer>
            {tags.map((tag, index) => (
              <Tag key={index}># {tag}</Tag>
            ))}
          </TagsContainer>
          <Footer>
            <Btn onClick={handleAddPhotoClick}>
              <ImgSvg />
            </Btn>
            <CreateBtn onClick={handleSave}>
              <DoneSvg />
            </CreateBtn>
          </Footer>
        </PostBox>
      </Container>
    </>
  );
};

export default WritePostView;
