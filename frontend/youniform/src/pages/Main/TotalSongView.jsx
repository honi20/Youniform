import React, { useEffect, useState } from "react";

import { Outlet, useNavigate, useParams } from "react-router-dom";
import usePlayerStore from "@stores/playerStore";
import * as St from "./SongStyle";

const TotalSongView = () => {
  const { total, fetchTotalList } = usePlayerStore();
  const { playerId, teamId } = useParams();
  const navigate = useNavigate();
  // const teamId = 1000;
  const [selectedIndex, setSelectedIndex] = useState(
    teamId ? 0 : total.findIndex((elem) => elem.playerId == playerId)
  );

  useEffect(() => {
    if (!total || total.length == 0) {
      fetchTotalList();
    }
  }, [fetchTotalList]);
  // // console.log(total, playerId);
  // // console.log(total.findIndex((elem) => elem.playerId == playerId));
  const [isOn, setIsOn] = useState(false);
  const handleToggle = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  };
  const handleToggleBtn = (index) => {
    setIsOn(false);
    // console.log(total[index]);
    setSelectedIndex(index);
    if (index == 0) {
      navigate(`/song/team/${teamId}`);
    } else {
      navigate(`/song/player/${total[index].playerId}`);
    }
  };
  const [activeBtn, setActiveBtn] = useState(0);
  const handleBtnClick = (btnIndex) => {
    // console.log(btnIndex);
    setActiveBtn(btnIndex);
  };
  const switchChange = () => {
    const buttonLabels = teamId ? ["공식", "비공식"] : ["등장곡", "응원가"];

    return (
      <>
        {buttonLabels.map((label, index) => (
          <St.Btn
            key={index}
            $isActive={activeBtn === index}
            onClick={() => handleBtnClick(index)}
          >
            {label}
          </St.Btn>
        ))}
      </>
    );
  };
  const isTabSwitcherVisible = !location.pathname.includes(
    `/song/team/${teamId}/`
  );
  // console.log(selectedIndex);
  return (
    <St.Wrapper>
      <St.OuterContainer>
        <St.BlurredBorder />
        <St.ContentWrapper>
          {/* toggle */}
          <St.NavToggle>
            <St.ToggleBtn onClick={() => handleToggle(isOn)}>
              {St.toggle(isOn)}
              {total.find((item, index) => index == selectedIndex)?.name}
            </St.ToggleBtn>
            <St.ToggleList $isOn={isOn}>
              {total.map((item, index) => (
                <St.ToggleItem
                  $isOn={isOn}
                  $isChecked={index == selectedIndex}
                  key={index}
                  onClick={() => handleToggleBtn(index)}
                >
                  {item.name}
                  <St.SelectIcon $isChecked={index == selectedIndex} />
                </St.ToggleItem>
              ))}
            </St.ToggleList>
          </St.NavToggle>
          {/* switch */}
          {isTabSwitcherVisible && (
            <St.TabSwitcher>
              <St.Switcher>{switchChange()}</St.Switcher>
            </St.TabSwitcher>
          )}
          <St.Content>
            <Outlet context={{ activeBtn }} />
          </St.Content>
        </St.ContentWrapper>
      </St.OuterContainer>
    </St.Wrapper>
  );
};

export default TotalSongView;
