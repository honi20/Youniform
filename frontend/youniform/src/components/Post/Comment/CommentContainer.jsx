import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import * as Font from "@/typography";
import usePostStore from "@stores/postStore";
// Styled components
const Container = styled.div`
  margin: 1% 3%;
  display: flex;
  flex-direction: column;
  max-height: 30%;
  /* overflow-y: auto; */
`;
const ScrollableView = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  max-height: 40vh;
  position: relative;
`;
const Ellipsis = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.1s ease;
`;
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  flex: 1;
`;

const ProfileContainer = styled.div`
  ${Font.Small}
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  gap: 5px;
  width: 30%;
  margin-right: 5px;
`;

const Comment = styled.div`
  display: flex;
  margin: 5px 0;
`;

const Profile = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;

const UpperContainer = styled(FlexBox)`
  ${Font.Small}
  font-weight: 400;
  flex-direction: column;
  /* border: 1px solid red; */
`;

const LowerContainer = styled(FlexBox)`
  ${Font.Small}
  font-weight: 300;
  flex-direction: row;
  justify-content: end;
  flex: 1;
  color: #848484;
`;

const CreateComment = styled(FlexBox)`
  flex-direction: row;
`;

import Chatsvg from "@assets/Post/chat.svg?react";

const ChatIcon = styled(Chatsvg)`
  width: 24px;
  height: 24px;
`;

const TextWrapper = styled.textarea`
  ${Font.Small}
  font-weight: 400;
  border: none;
  flex: 1;
  height: auto;
  text-align: left;
  resize: none;
`;
const CommentBtn = styled.div`
  /* border: 1px solid black; */
`;
const Btn = styled.div`
  text-decoration-line: underline;

  /* border: 1px solid red; */
`;
// 메모이제이션된 CommentTextarea 컴포넌트
const CommentTextarea = React.memo(({ content, setContent, onKeyDown }) => {
  const handleTextChange = useCallback(
    (e) => {
      setContent(e.target.value);
      autoResize(e.target);
    },
    [setContent]
  );

  const autoResize = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.maxHeight = "3rem";
  };

  return (
    <TextWrapper
      rows="1"
      value={content}
      onChange={handleTextChange}
      onKeyDown={onKeyDown}
      maxLength="500"
    />
  );
});

const CommentContainer = ({ postId, user }) => {
  const [content, setContent] = useState("");
  const post = usePostStore((state) => state.post); // 현재 포스트 가져오기
  const comments = usePostStore((state) => state.comments[postId] || []); // 현재 포스트의 댓글 목록 가져오기
  const { addComment, updateComment, deleteComment, fetchPost } = usePostStore();
  const [showEllipsis, setShowEllipsis] = useState(true);
  const [editedComment, setEditedComment] = useState(null);
  // const { user, fetchUser } = useUserStore();
  const scrollableRef = useRef(null);
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (!isInitialRender.current) {
      fetchPost(postId);
    } else {
      isInitialRender.current = false;
    }
  }, [postId, updateComment]);
  // 스크롤 시 발동하는 함수
  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight;
    console.log(scrollTop, clientHeight, scrollHeight);
    setShowEllipsis({
      top: !isAtTop,
      bottom: !isAtBottom,
    });
  };
  useEffect(() => {
    console.log("showEllipsis updated:", showEllipsis);
  }, [showEllipsis]);

  useEffect(() => {
    if (!isInitialRender.current) {
      const scrollable = scrollableRef.current;
      if (scrollable) {
        scrollable.scrollTop = scrollable.scrollHeight;
      }
    } else {
      isInitialRender.current = false;
    }
  }, [comments]);
  // 댓글 생성 / 수정 / 삭제 요청
  const handleCommentAction = async ({
    action,
    postId,
    commentId,
    content,
  }) => {
    if (action === "add") {
      await addComment(postId, content);
      setContent("");
    } else if (action === "update") {
      await updateComment(commentId, content);
      // setComments
      setEditedComment(null);
    } else if (action === "delete") {
      await deleteComment(commentId);
    }
  };

  const handleEditClick = (comment) => {
    setEditedComment(comment); // Set the comment object being edited
  };

  return (
    <Container onClick={() => console.log("댓글창 클릭됨")}>
      <ScrollableView ref={scrollableRef} onScroll={handleScroll}>
        {comments &&
          comments.map((comment) => (
            <Comment key={comment.commentId}>
              <ProfileContainer>
                <Profile
                  src={comment.imgUrl}
                  alt={`${comment.nickname}의 프로필`}
                />
                {comment.nickname}
              </ProfileContainer>
              <FlexBox>
                {editedComment &&
                editedComment.commentId === comment.commentId ? (
                  <>
                    <UpperContainer>
                      <CommentTextarea
                        content={editedComment.contents}
                        setContent={(value) =>
                          setEditedComment({
                            ...editedComment,
                            contents: value,
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleCommentAction({
                              action: "update",
                              commentId: editedComment.commentId,
                              content: editedComment.contents,
                            });
                          }
                        }}
                      />
                    </UpperContainer>
                    <LowerContainer>
                      <Btn
                        onClick={() =>
                          handleCommentAction({
                            action: "update",
                            commentId: editedComment.commentId,
                            content: editedComment.contents,
                          })
                        }
                      >
                        저장
                      </Btn>
                      &nbsp;
                      <Btn onClick={() => setEditedComment(null)}>취소</Btn>
                    </LowerContainer>
                  </>
                ) : (
                  <>
                    <UpperContainer>{comment.contents}</UpperContainer>
                      <LowerContainer>
                        {comment.createdAt}
                        {user.nickname === comment.nickname && 
                        <>
                          &nbsp;
                          <Btn onClick={() => handleEditClick(comment)}>수정</Btn>
                          &nbsp;
                          <Btn
                            onClick={() =>
                              handleCommentAction({
                                action: "delete",
                                commentId: comment.commentId,
                              })
                            }
                          >
                          삭제
                          </Btn>
                          </>}
                      </LowerContainer>
                  </>
                )
}
              </FlexBox>
            </Comment>
          ))}
      </ScrollableView>
      {showEllipsis && <Ellipsis visible={showEllipsis.bottom}>...</Ellipsis>}
      <CreateComment>
        <ChatIcon />
        <CommentTextarea content={content} setContent={setContent} />
        <CommentBtn
          onClick={() =>
            handleCommentAction({
              action: "add",
              postId: postId,
              content: content,
            })
          }
        >
          전송
        </CommentBtn>
      </CreateComment>
    </Container>
  );
};

export default CommentContainer;
