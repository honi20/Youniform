import React, { useState, useEffect, useRef } from "react";
import { format, subYears, addYears } from "date-fns";
import styled from "styled-components";
import SvgIcon from "@mui/material/SvgIcon";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowLeft from '@assets/Icons/ArrowLeft.svg?react';
import ArrowRight from '@assets/Icons/ArrowRight.svg?react';

const MonthRow = styled.div`
  display: flex;
  width: 90%;
  height: 40px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

const IconArea = styled.div`
  display: flex;
  gap: 5px;
`;

const CircleIcon = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.theme.secondary};
  border: 1.5px solid #787878;
  border-radius: 50%;
`;

const SelectBox = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 180%;
  left: -20%;
  transform: translateX(-50%);
  width: 300px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 10;
  padding: 15px;
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
`;

const DropdownItem = styled.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SelectYear = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RenderMonth = ({
  curMonth,
  prevMonth,
  nextMonth,
  onYearSelect,
  onMonthSelect,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleYearChange = (direction) => {
    if (direction === "prev") {
      onYearSelect(subYears(curMonth, 1));
    } else if (direction === "next") {
      onYearSelect(addYears(curMonth, 1));
    }
  };

  const handleMonthSelect = (month) => {
    const formattedDate = format(
      new Date(curMonth.getFullYear(), month - 1),
      "yyyy-MM"
    );
    onMonthSelect(month);
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const koMonths = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  return (
    <MonthRow>
      <IconArea>
        <CircleIcon />
        <CircleIcon />
        <CircleIcon />
      </IconArea>
      <div onClick={() => prevMonth()}>
        <ArrowLeft />
      </div>
      <SelectBox onClick={toggleDropdown}>
        <span className="text">
          <span className="text year" style={{marginRight: "5px"}}><strong>{format(curMonth, "yyyy")}</strong> 년</span>
          <span className="text month"><strong>{format(curMonth, "M")}</strong> 월</span>
        </span>
        {showDropdown && (
          <Dropdown ref={dropdownRef} onClick={handleDropdownClick}>
            <SelectYear>
              <SvgIcon
                onClick={() => handleYearChange("prev")}
                component={KeyboardArrowLeftIcon}
              />
              <span style={{ margin: "0 5px" }}>{format(curMonth, "yyyy")}</span>
              <SvgIcon
                onClick={() => handleYearChange("next")}
                component={KeyboardArrowRightIcon}
              />
            </SelectYear>
            <MonthGrid>
              {koMonths.map((month, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => handleMonthSelect(index + 1)}
                >
                  {month}
                </DropdownItem>
              ))}
            </MonthGrid>
          </Dropdown>
        )}
      </SelectBox>
      <div onClick={() => nextMonth()}>
        <ArrowRight />
      </div>
    </MonthRow>
  );
};

export default RenderMonth;
