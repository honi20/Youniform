import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DiaryComp from "@components/Diary/Write/DiaryComp";
import { useParams } from "react-router-dom";
import useDiaryStore from "@stores/diaryStore";
import Loading from "@components/Share/Loading";
import ShareModal from "@components/Modal/ShareModal";
const Div = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
`;
const Container = styled.div`
  /* border: 5px solid red; */
`;
const ScrollableDiaryView = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`;
const DiaryDetailView = ({ diaries }) => {
  const { diaryId } = useParams();
  const { diary, fetchDiary, loading } = useDiaryStore();

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
  
  return (
    <>
      <ShareModal isOpen="true" />
    </>
  );
};

export default DiaryDetailView;
