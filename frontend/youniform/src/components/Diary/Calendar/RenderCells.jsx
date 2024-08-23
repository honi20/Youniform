import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDiaryStore from "@stores/diaryStore";
import styled from "styled-components";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
} from "date-fns";

const CellsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  height: calc(100% - 70px);
  max-height: 550px;
  margin: 0 auto;
  justify-content: space-between;
`;

const Cell = styled.div`
  color: #787878;
  border: 1px solid #ddd;
  height: 100%;
  padding: 5px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &.disabled {
    background-color: #f0f0f0;
    pointer-events: none;
  }

  &.selected {
    color: ${(props) => props.theme.calendar};
  }

  &.not-valid {
    color: #ddd;
  }

  p {
    margin: 0;
  }

  img {
    margin-top: 5px;
    width: 65%;
    height: auto; /* 높이는 자동으로 설정 */
    max-height: 50%; /* 기본 최대 높이 설정 */
    object-fit: contain; /* 이미지가 셀 내부에 적절히 맞춰지도록 설정 */
    margin-left: auto;
    margin-right: 2px;

    /* 뷰포트 높이에 따른 미디어 쿼리 */
    @media (max-height: 568px) { /* iPhone SE와 같은 짧은 화면 */
      width: 65% /* 높이 비율을 줄임 */
    }

    @media (min-height: 700px) { /* iPhone 14 Pro Max와 같은 긴 화면 */
      margin-top: 10px;
      width: 80% /* 높이 비율을 늘림 */
    }
  }
`;

const RenderCells = ({ user, currentMonth, selectedDate, onDateClick }) => {
  const { fetchDiary, monthlyDiaries, fetchMonthlyDiaries } = useDiaryStore();
  const navigate = useNavigate();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const formatDate = `${year}-${month}`;

  useEffect(() => {
    fetchMonthlyDiaries(formatDate);
  }, []);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  let stampDate = "";

  const getStampSrcForDate = (day, date) => {
    if (day > monthEnd || day < monthStart) return null;

    for (const diary of monthlyDiaries) {
      if (diary.diaryDate === date) {
        return diary;
      }
    }
    return null;
  };

  const handleDateClick = (day, stampSrc, nickname) => {
    const formatDate = (day) => format(day, "yyyy-MM-dd");
    const formattedDate = formatDate(day);
    if (user) {
      return;
    }
    if (!stampSrc) {
      navigate(`/diary/write/${formattedDate}`);
    } else {
      onDateClick(cloneDay);
    }
  };

  const loadDiaryDetail = async (diaryId) => {
    navigate(`/diary/${diaryId}`);
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      stampDate = format(day, "yyyy-MM-dd");
      const diaryInfo = getStampSrcForDate(day, stampDate);
      const stampSrc = diaryInfo !== null ? diaryInfo.stampImgUrl : null;
      const cloneDay = new Date(day);
      days.push(
        <Cell
          className={`cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day}
          onClick={
            stampSrc
              ? () => loadDiaryDetail(diaryInfo.diaryId)
              : () => handleDateClick(cloneDay, stampSrc)
          }
        >
          <p
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate}
          </p>
          {stampSrc && (
            <img
              src={stampSrc}
              alt="stamp"
            />
          )}
          {!stampSrc && (
            <div
              style={{
                marginTop: "10px",
                width: "100%",
                height: "20px",
              }}
            ></div>
          )}
        </Cell>
      );
      day = addDays(day, 1);
    }
    rows.push(...days);
    days = [];
  }
  return <CellsContainer>{rows}</CellsContainer>;
};

export default RenderCells;
