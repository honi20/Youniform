import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DiaryComp from "@components/Diary/Write/DiaryComp";
import { useParams } from "react-router-dom";
import useDiaryStore from "@stores/diaryStore";

const Div = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
`;

const DiaryDetailView = () => {
  const { diaryId } = useParams();
  const { diary, fetchDiary } = useDiaryStore();
  useEffect(() => {
    fetchDiary(diaryId);
  }, [fetchDiary]);
  return (
    <Div>
      <DiaryComp state="write" diary={diary} />
    </Div>
  );
};

export default DiaryDetailView;
