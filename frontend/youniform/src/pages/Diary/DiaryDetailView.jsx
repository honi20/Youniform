import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DiaryComp from "@components/Diary/Write/DiaryComp";
import { useParams } from "react-router-dom";
import useDiaryStore from "@stores/diaryStore";
import Loading from "@components/Share/Loading";
import Error from "@components/Share/Error";
const Div = styled.div`
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  /* border: 1px solid black; */
  justify-content: center;
`;
const Container = styled.div`
  /* border: 5px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SearchBarContainer = styled.div`
  flex: 0 0 auto;
  border-bottom: ${(props) => (props.$isScrolled ? "1px solid #ccc" : "none")};
  transition: border-bottom 0.3s;
  padding-bottom: 3%;
`;
const ScrollableDiaryView = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`;
const DiaryDetailView = ({ diaries }) => {
  const { diaryId } = useParams();
  const { diary, fetchDiary, loading, error } = useDiaryStore();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    if (diaryId) {
      fetchDiary(diaryId);
    }
  }, [fetchDiary]);

  const handleScroll = (event) => {
    if (event.target.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  if (loading)
    return <Loading />
  if (error) {
    return <Error message={error} />;
  }
  // console.log(diaries)
  return (
    <>
        <Div>
          
          {diaryId ? <DiaryComp key={diary.diaryId} diary={diary} /> : 
          <>
          
          <ScrollableDiaryView onScroll={handleScroll}>
            <Container>
              {diaries &&
                diaries.map((diary) => {
                  return <DiaryComp key={diary.diaryId} diary={diary} />;
                })}
            </Container>
          </ScrollableDiaryView>
          </>}
        </Div>
    </>
  );
};

export default DiaryDetailView;
