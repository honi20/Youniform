import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import * as Font from "@/typography";
import useUserStore from "@stores/userStore";
import Loading from "@components/Share/Loading";
import ImgSvg from "@assets/Post/img_box.svg?react";
import DoneSvg from "@assets/Post/done.svg?react";
import { getApiClient } from "@stores/apiClient";
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
const ImgBox = styled.img`
  border: 1px solid black;
  max-width: 50px;
  margin-bottom: 10px;
`;
{
  /* <img
              src={filePreview}
              alt="Preview"
              style={{ maxWidth: "50px", marginBottom: "10px" }}
            /> */
}
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
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  useEffect(() => {
    if (!user) {
      fetchUser();
      console.log("testset");
    }
  }, [user, fetchUser]);

  // 해쉬태그
  useEffect(() => {
    console.log(content);

    const extractedTags = content.match(/# \S+/g) || [];
    const uniqueTags = [
      ...new Set(
        extractedTags.map((tag) =>
          tag.length > 10 ? `${tag.slice(2, 12)}` : tag.slice(2)
        )
      ),
    ];
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
  const handleSave = async () => {
    const cleanedContent = cleanContent();

    console.log("저장할 내용:", cleanedContent);
    console.log("해쉬태그", tags);
    console.log("Selected file:", selectedFile);

    const apiClient = getApiClient();
    const formData = new FormData();
    const dto = {
      contents: cleanedContent,
      tags: tags,
    };
    const imageBlob = await fetch(selectedFile).then((res) => res.blob());
    const dtoBlob = new Blob([JSON.stringify(dto)], {
      type: "application/json",
    });
    formData.append("file", null);
    formData.append("dto", dtoBlob);
    logFormData(formData);
    try {
      const res = await apiClient.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body);
    } catch (error) {
      console.error("Error:", error);
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
          {filePreview && <ImgBox src={filePreview} alt="Preview" />}
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
