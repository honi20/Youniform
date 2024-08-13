import React from "react";
import styled from "styled-components";
import SelectPlayerView from "@pages/SelectPlayerView";

const EmptyBox = styled.div`
  height: 1.5rem;
`;

const StepThreeForm = () => {
  return (
    <>
      <EmptyBox />
      <SelectPlayerView />
    </>
  );
};

export default StepThreeForm;
